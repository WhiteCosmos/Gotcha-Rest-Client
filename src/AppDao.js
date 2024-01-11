import GHCProject
    from '@/data/gotcha/GHCProject'
import RabiProjectDao
    from '@/core/dao/RabiProjectDao'
import RabiVersionDao
    from '@/core/dao/RabiVersionDao'
import RabiModuleDao
    from '@/core/dao/RabiModuleDao'
import GHCModule
    from '@/data/gotcha/GHCModule'
import JsonMethodContentDao
    from '@/core/dao/JsonMethodContentDao'
import RabiProjectType
    from '@/data/gotcha/RabiProjectType'
import RabiHttpOperationDao
    from '@/core/dao/RabiHttpOperationDao'
import JsonStructContentDao
    from '@/core/dao/JsonStructContentDao'
import _
    from 'lodash'
import RabiTreeViewGroupDao
    from '@/core/dao/RabiTreeViewGroupDao'
import GHCVersion
    from '@/data/gotcha/GHCVersion'
import RabiTreeViewGroup
    from '@/views/sidebar/group-selector/RabiTreeViewGroup'
import RabiProjectSource
    from '@/data/gotcha/RabiProjectSource'

const rabiProjectDao = new RabiProjectDao()

const rabiVersionDao = new RabiVersionDao()

const rabiModuleDao = new RabiModuleDao()

const jsonMethodContentDao = new JsonMethodContentDao()

const jsonStructContentDao = new JsonStructContentDao()

const rabiHttpOperationDao = new RabiHttpOperationDao()

class AppDao {
    constructor() {

    }

    async createPlayground() {
        let project = new GHCProject()

        project.name = "Playground"

        project.type = "RABIAPI"

        project.source = RabiProjectSource.SYSTEM

        project = await new RabiProjectDao().save(project)

        let version = new GHCVersion()

        version.projectId = project.id

        version.name = "1.0.0"

        version = await new RabiVersionDao().save(version)

        let module = new GHCModule()

        module.name = "Playground"

        module.versionId = version.id

        module = await new RabiModuleDao().save(module)

        let group = RabiTreeViewGroup.API_GROUP(module.id)

        await new RabiTreeViewGroupDao().save(group)

        return {
            project: project,
            version: version
        }
    }

    /**
     * Create an empty project
     */
    async createProject(projectName) {
        let project = GHCProject.buildEmptyProject(projectName)

        project = await new RabiProjectDao().save(project)

        let version = new GHCVersion()

        version.projectId = project.id

        version.name = "1.0.0"

        version = await new RabiVersionDao().save(version)

        let module = new GHCModule()

        module.name = "Default Module"

        module.versionId = version.id

        module = await new RabiModuleDao().save(module)

        let group = RabiTreeViewGroup.API_GROUP(module.id)

        await new RabiTreeViewGroupDao().save(group)

        return {
            project: project,
            version: version
        }
    }

    /**
     * @param {Evalon4JParseResult} result
     */
    async importProject(result) {
        let jsonProject = result.data

        return await this._createRabiProject(jsonProject)
    }

    async _createRabiProject(jsonProject) {
        let existsProject = await rabiProjectDao.query({
            name: jsonProject.name,
            type: jsonProject.type,
        })

        let project

        if (existsProject) {
            project = existsProject

            project.updatedAt = new Date()
        } else {
            project = GHCProject.buildFromJsonProject(jsonProject)
        }

        project = await rabiProjectDao.save(project)

        let version = await this._createRabiVersion(project, jsonProject)

        return {
            project: project,
            version: version,
        }
    }

    async _createRabiVersion(project, jsonProject) {
        let jsonVersion = jsonProject.version

        let version

        let existsVersion = await rabiVersionDao.query({
            projectId: project.id,
            name: jsonVersion.name
        })

        if (existsVersion) {
            version = existsVersion

            GHCVersion.updateFromJsonVersion(version, jsonVersion)
        } else {
            version = GHCVersion.buildFromJsonVersion(project, jsonVersion)
        }

        version = await rabiVersionDao.save(version)

        if (project.type === RabiProjectType.JAVA) {
            await this._handleCreateVersionWithMultipleModule(version, jsonProject.modules)
        } else {
            await this._handleCreateVersionWithSingleModule(version, jsonProject.modules[0])
        }

        return version
    }

    async _handleCreateVersionWithMultipleModule(version, jsonModules) {
        let modules = await rabiModuleDao.batchQuery({versionId: version.id})

        let deletedModules = this._getAllDeletedModules(modules, jsonModules)

        for (const module of deletedModules) {
            await this._removeRabiModule(module)
        }

        for (const jsonModule of jsonModules) {
            let existsModule = await rabiModuleDao.query({
                versionId: version.id,
                name: jsonModule.name
            })

            if (existsModule) {
                await this._updateRabiModule(existsModule, jsonModule)
            } else {
                await this._createRabiModule(version, jsonModule)
            }
        }
    }

    async _handleCreateVersionWithSingleModule(version, jsonModule) {
        let module = await rabiModuleDao.query({versionId: version.id})

        if (module) {
            await this._updateRabiModule(module, jsonModule)
        } else {
            await this._createRabiModule(version, jsonModule)
        }
    }

    async _createRabiModule(version, jsonModule) {
        let module = new GHCModule()

        module.versionId = version.id

        module.name = jsonModule.name

        module = await rabiModuleDao.save(module)

        await this._saveServicesAndModels(module, jsonModule)

        module.javaServices = jsonModule.javaServices

        module.javaModels = jsonModule.javaModels

        module.restfulApis = jsonModule.restfulApis

        module.restfulModels = jsonModule.restfulModels

        this._clearServicesAndModels(module)

        this._sortServicesAndModels(module)

        await this._createRabiTreeViewGroup(module)

        await rabiModuleDao.save(module)
    }

    async _createRabiTreeViewGroup(module) {
        if (!_.isEmpty(module.restfulApis)) {
            let group = RabiTreeViewGroup.HTTP_SERVICE_GROUP(module.id)

            await new RabiTreeViewGroupDao().save(group)
        }

        if (!_.isEmpty(module.restfulModels)) {
            let group = RabiTreeViewGroup.HTTP_MODEL_GROUP(module.id)

            await new RabiTreeViewGroupDao().save(group)
        }

        if (!_.isEmpty(module.javaServices)) {
            let group = RabiTreeViewGroup.JAVA_SERVICE_GROUP(module.id)

            await new RabiTreeViewGroupDao().save(group)
        }

        if (!_.isEmpty(module.javaModels)) {
            let group = RabiTreeViewGroup.JAVA_MODEL_GROUP(module.id)

            await new RabiTreeViewGroupDao().save(group)
        }
    }

    async _saveServicesAndModels(module, jsonModule) {
        let javaMethods = []

        let javaModels = []

        let restfulApis = []

        let restfulModels = []

        jsonModule.javaServices && jsonModule.javaServices.forEach(jsonService => {
            jsonService.methods && jsonService.methods.forEach(jsonMethod => {
                jsonMethod.moduleId = module.id

                !jsonMethod.groupIds && (jsonMethod.groupIds = [])

                javaMethods.push(jsonMethod)
            })
        })

        jsonModule.javaModels && jsonModule.javaModels.forEach(jsonStruct => {
            jsonStruct.moduleId = module.id

            javaModels.push(jsonStruct)
        })

        jsonModule.restfulApis && jsonModule.restfulApis.forEach(jsonService => {
            jsonService.methods && jsonService.methods.forEach(jsonMethod => {
                jsonMethod.moduleId = module.id

                !jsonMethod.groupIds && (jsonMethod.groupIds = [])

                restfulApis.push(jsonMethod)
            })
        })

        jsonModule.restfulModels && jsonModule.restfulModels.forEach(jsonStruct => {
            jsonStruct.moduleId = module.id

            restfulModels.push(jsonStruct)
        })

        let javaMethodKeys = await jsonMethodContentDao.batchSave(javaMethods)

        let javaModelKeys = await jsonStructContentDao.batchSave(javaModels)

        let restfulApiKeys = await jsonMethodContentDao.batchSave(restfulApis)

        let restfulModelKeys = await jsonStructContentDao.batchSave(restfulModels)

        javaMethods.forEach((javaMethod, index) => {
            javaMethod.id = javaMethodKeys[index]
        })

        javaModels.forEach((javaModel, index) => {
            javaModel.id = javaModelKeys[index]
        })

        restfulApis.forEach((restfulApi, index) => {
            restfulApi.id = restfulApiKeys[index]
        })

        restfulModels.forEach((restfulModel, index) => {
            restfulModel.id = restfulModelKeys[index]
        })
    }

    _clearServicesAndModels(module) {
        module.javaServices && module.javaServices.forEach(jsonService => {
            jsonService.methods && jsonService.methods.forEach(jsonMethod => {
                this._clearJsonMethod(jsonMethod)
            })
        })

        module.javaModels && module.javaModels.forEach(jsonStruct => {
            this._clearJsonStruct(jsonStruct)
        })

        module.restfulApis && module.restfulApis.forEach(jsonService => {
            jsonService.methods && jsonService.methods.forEach(jsonMethod => {
                this._clearJsonMethod(jsonMethod)
            })
        })

        module.restfulModels && module.restfulModels.forEach(jsonStruct => {
            this._clearJsonStruct(jsonStruct)
        })
    }

    _clearJsonMethod(jsonMethod) {
        jsonMethod.parameters = []

        jsonMethod.responses = []

        jsonMethod.exceptions = []

        jsonMethod.httpRequest = undefined

        jsonMethod.httpResponses = []
    }

    _clearJsonStruct(jsonStruct) {
        jsonStruct.children = []
    }

    _sortServicesAndModels(module) {
        module.javaServices = _.sortBy(module.javaServices, ['serviceName'])

        module.javaModels = _.sortBy(module.javaModels, ['fieldName'])

        module.restfulApis = _.sortBy(module.restfulApis, ['serviceName'])

        module.restfulModels = _.sortBy(module.restfulModels, ['fieldName'])
    }

    /**
     * 1. Fetch all groups from old tree view
     * 2. Update http operation by new API definition
     *
     * @param module
     * @param jsonModule
     * @returns {Promise<void>}
     * @private
     */
    async _updateRabiModule(module, jsonModule) {
        await this._removeServicesAndModels(module)

        let oldJavaMethods = this._getAllJavaMethodsFromModule(module)

        let oldRestfulApis = this._getAllRestfulApisFromModule(module)

        let newJavaMethods = this._getAllJavaMethodsFromModule(jsonModule)

        let newRestfulApis = this._getAllRestfulApisFromModule(jsonModule)

        let deletedRestfulApis = this._getAllDeletedRestfulApis(oldRestfulApis, newRestfulApis)

        this._transferGroupIds(oldJavaMethods, newJavaMethods)

        this._transferGroupIds(oldRestfulApis, newRestfulApis)

        deletedRestfulApis.forEach(jsonMethod => {
            rabiHttpOperationDao.batchQuery({
                moduleId: module.id,
                operationId: jsonMethod.operationId
            }).then(httpOperations => {
                rabiHttpOperationDao.batchDelete(httpOperations)
            })
        })

        newRestfulApis.forEach(jsonMethod => {
            rabiHttpOperationDao.batchQuery({
                moduleId: module.id,
                operationId: jsonMethod.operationId
            }).then(httpOperations => {
                httpOperations.forEach(httpOperation => { // TODO v1.4.x
                    // new RabiHttpOperationUpdater().update(httpOperation, jsonMethod)
                })
            })
        })

        await this._saveServicesAndModels(module, jsonModule)

        module.javaServices = jsonModule.javaServices

        module.javaModels = jsonModule.javaModels

        module.restfulApis = jsonModule.restfulApis

        module.restfulModels = jsonModule.restfulModels

        this._clearServicesAndModels(module)

        this._sortServicesAndModels(module)

        await rabiModuleDao.save(module)
    }

    _transferGroupIds(oldJsonMethods, newJsonMethods) {
        newJsonMethods.forEach(newJsonMethod => {
            let oldJsonMethod = oldJsonMethods.find(oldJsonMethod => {
                return newJsonMethod.operationId === oldJsonMethod.operationId
            })

            if (!oldJsonMethod) {
                return
            }

            newJsonMethod.groupIds = oldJsonMethod.groupIds
        })
    }

    /**
     * @param {GHCModule} module
     * @private
     */
    async _removeRabiModule(module) {
        await this._removeServicesAndModels(module)

        await this._removeTreeViewGroups(module)

        let httpOperations = await rabiHttpOperationDao.batchQuery({moduleId: module.id})

        await rabiHttpOperationDao.batchDelete(httpOperations)

        await rabiModuleDao.delete(module)
    }

    async _removeTreeViewGroups(module) {
        let groups = await new RabiTreeViewGroupDao().batchQuery({moduleId: module.id})

        await new RabiTreeViewGroupDao().batchDelete(groups)
    }

    async _removeServicesAndModels(module) {
        let jsonMethodContents = await jsonMethodContentDao.batchQuery({moduleId: module.id})

        await jsonMethodContentDao.batchDelete(jsonMethodContents)

        let jsonStructContents = await jsonStructContentDao.batchQuery({moduleId: module.id})

        await jsonStructContentDao.batchDelete(jsonStructContents)
    }

    async removeProject(project) {
        let versions = await rabiVersionDao.batchQuery({projectId: project.id})

        for (let version of versions) {
            await this.removeVersion(version)
        }

        await rabiProjectDao.delete(project)
    }

    async removeVersion(version) {
        let modules = await rabiModuleDao.batchQuery({versionId: version.id})

        for (let module of modules) {
            await this._removeRabiModule(module)
        }

        await rabiVersionDao.delete(version)
    }

    _getAllJavaMethodsFromModule(module) {
        let jsonMethods = []

        module.javaServices && module.javaServices.forEach(jsonService => {
            jsonService.methods && jsonService.methods.forEach(jsonMethod => {
                jsonMethods.push(jsonMethod)
            })
        })

        return jsonMethods
    }

    _getAllRestfulApisFromModule(module) {
        let jsonMethods = []

        module.restfulApis && module.restfulApis.forEach(jsonService => {
            jsonService.methods && jsonService.methods.forEach(jsonMethod => {
                jsonMethods.push(jsonMethod)
            })
        })

        return jsonMethods
    }

    _getAllDeletedRestfulApis(oldRestfulApis, newRestfulApis) {
        let jsonMethods = []

        oldRestfulApis.forEach(oldJsonMethod => {
            let newJsonMethod = newRestfulApis.find(newJsonMethod => {
                return oldJsonMethod.operationId === newJsonMethod.operationId
            })

            if (!newJsonMethod) {
                jsonMethods.push(oldJsonMethod)
            }
        })

        return jsonMethods
    }

    _getAllDeletedModules(oldModules, newModules) {
        let modules = []

        oldModules.forEach(oldModule => {
            let newModule = newModules.find(newModule => {
                return oldModule.name === newModule.name
            })

            if (!newModule) {
                modules.push(oldModule)
            }
        })

        return modules
    }
}

export default AppDao