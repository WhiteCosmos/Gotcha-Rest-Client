<script>
    import ImportLocalProjectOptions from '@/modals/import-local-project/ImportLocalProjectOptions'

    import _ from 'lodash'
    import JsonVersionHelper from '@/core/evalon4j/JsonVersionHelper'
    import JsonProjectHelper from '@/core/evalon4j/JsonProjectHelper'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvAuthorizationMixin from '@/mixins/EvAuthorizationMixin'

    import * as electron from 'electron'
    import AppConfig from '@/AppConfig'
    import GHCJson from '@/core/json/GHCJson'

    let nodegit = electron.remote.require("nodegit")

    export default {
        name: "EvImportLocalProjectMixin",

        mounted() {
            this.init()
        },

        mixins: [
            EvStoreMixin,
            EvAuthorizationMixin
        ],

        props: {
            dialog: {
                type: Boolean,
                default: false,
            },

            targetProjectPath: {
                type: String,

                default: undefined
            },

            targetProjectBookmark: {
                type: String,

                default: undefined,
            },

            targetBranchName: {
                type: String,

                default: undefined,
            },

            isProjectCreate: false,

            isBranchCreate: false,

            isBranchRefresh: false,
        },

        data() {
            return {
                options: new ImportLocalProjectOptions(),

                evalon4jResult: undefined,

                phase: "CHOOSE_PROJECT_TYPE",

                phases: {
                    CHOOSE_PROJECT_TYPE: "CHOOSE_PROJECT_TYPE",

                    IMPORT_PROCESSING: "PROCESSING",

                    IMPORT_COMPLETE: "IMPORT_COMPLETE",

                    IMPORT_FAILED: "IMPORT_FAILED",

                    PATH_NOT_EXISTS: "PATH_NOT_EXISTS",

                    API_NOT_EXISTS: "API_NOT_EXISTS",

                    BRANCH_CHECKOUT_FAILED: "BRANCH_CHECKOUT_FAILED",
                },

                error: {
                    errorCode: "",

                    errorMessage: ""
                },
            }
        },

        methods: {
            init() {
                this.options = new ImportLocalProjectOptions()

                this.evalon4jResult = undefined

                this.phase = this.phases.CHOOSE_PROJECT_TYPE
            },

            async handle() {
                let stopAccessHomeRelativePath = this.startAccessingHomeRelativePath()

                let stopAccessProjectRelativePath = this.startAccessProjectRelativePath(this.targetProjectBookmark)

                try {
                    if (this.isProjectCreate) {
                        // await this.handleProjectCreate(stopAccessProjectRelativePath)

                        this.toPhase(this.phases.CHOOSE_PROJECT_TYPE)

                        // 手动执行导入

                        return
                    }

                    if (this.isBranchCreate) {
                        await this.handleBranchCreate(stopAccessProjectRelativePath)

                        // 自动执行导入
                    }

                    if (this.isBranchRefresh) {
                        await this.handleBranchRefresh(stopAccessProjectRelativePath)

                        // 自动执行导入
                    }

                    stopAccessHomeRelativePath()
                } catch (e) {
                    stopAccessHomeRelativePath()

                    stopAccessProjectRelativePath()

                    console.log("Project Add Error", e)

                    this.exceptionMessage = e.toString()

                    this.to(this.codes.PROJECT_ADD_FAILED)
                }
            },

            doImportProject() {
                if (!this.checkIsPathExists(this.options)) {
                    this.toPhase(this.phases.PATH_NOT_EXISTS)

                    return
                }

                this.toPhase(this.phases.IMPORT_PROCESSING)

                this.executeEvalon4j(this.options)
            },

            doRefreshVersion(jsonProject, jsonBranch) {
                if (!this.checkIsPathExists(this.options)) {
                    this.toPhase(this.phases.PATH_NOT_EXISTS)

                    return
                }

                this.toPhase(this.phases.IMPORT_PROCESSING)

                let options = new ImportLocalProjectOptions()

                if (JsonVersionHelper.isNoneVersion(jsonBranch)) {
                    this.executeEvalon4j(options)
                }

                if (JsonVersionHelper.isGitVersion(jsonBranch)) {
                    options.onComplete = this.checkoutBranch(jsonBranch.branchName)

                    this.executeEvalon4j(options)
                }

                if (JsonVersionHelper.isSemanticVersion(jsonBranch)) {
                    this.executeEvalon4j(options)
                }
            },

            async doCreateVersion(versionName) {
                let jsonProject = this.currentProject

                let jsonBranch = this.currentBranch

                if (!this.checkIsPathExists(this.options)) {
                    this.toPhase(this.phases.PATH_NOT_EXISTS)

                    return
                }

                this.toPhase(this.phases.IMPORT_PROCESSING)

                let options = new ImportLocalProjectOptions()

                if (JsonProjectHelper.isJavaProject(jsonProject)
                    && JsonVersionHelper.isGitVersion(jsonBranch)) {

                    options.onComplete = this.checkoutBranch(versionName)

                    this.executeEvalon4j(options)
                }

                if (JsonProjectHelper.isRabiProject(jsonProject)) {
                    // TODO
                }
            },

            checkIsImportDirectory(options) {
                return options
                    && options.type === 'DIRECTORY'
                    && _.isEmpty(this.options.directoryPath)
            },

            checkIsImportFile(options) {
                return options
                    && options.type === 'FILE'
                    && _.isEmpty(this.options.filePath)
            },

            checkIsCreateProject() {
                // TODO
            },

            checkIsPathExists(options) {
                const fs = require('fs')

                if (_.isEmpty(options.filePath)) {
                    return fs.existsSync(options.filePath)
                }

                if (_.isEmpty(options.directoryPath)) {
                    return fs.existsSync(options.directoryPath)
                }

                return false
            },

            executeEvalon4j(options) {
                const {spawn} = require('child_process')

                const path = require('path')

                let stopAccessingHomeRelativePath = this.startAccessingHomeRelativePath()

                let evalon4jPath

                if (AppConfig.isDevelopment()) {
                    evalon4jPath = "./public/evalon4j-core/bin/evalon4j"
                } else {
                    let dirname = path.resolve(__dirname, '..')

                    evalon4jPath = path.join(dirname, 'evalon4j-core/bin/evalon4j')
                }

                let targetPath = ''

                // TODO apidocJS

                if (this.checkIsImportDirectory(options)) {
                    targetPath = options.directoryPath
                }

                if (this.checkIsImportFile(options)) {
                    targetPath = options.filePath
                }

                let stopAccessingProjectRelativePath = this.startAccessProjectRelativePath(targetPath)

                let evalon4j = spawn(evalon4jPath, ['-p', targetPath, '-o', 'evalon'])

                let json = ''

                evalon4j.stdout.on('data', (data) => {
                    json += data
                })

                evalon4j.stdout.on('close', () => {
                    let evalon4jResult = GHCJson.parse(json)

                    this.evalon4jResult = evalon4jResult

                    if (this.hasEvalon4JError(evalon4jResult)) {
                        this.handleEvalon4JError(evalon4jResult)
                    } else {
                        this.handleEvalon4JComplete(evalon4jResult)
                    }

                    options.onComplete && options.onComplete()

                    stopAccessingHomeRelativePath()

                    stopAccessingProjectRelativePath()
                })
            },

            hasEvalon4JError(evalon4JResult) {
                if (evalon4JResult.hasError) {
                    return true
                }

                let jsonProject = evalon4JResult.data

                return _.isEmpty(jsonProject.modules)
            },

            handleEvalon4JError(evalon4JResult) {
                if (evalon4JResult.hasError) {
                    this.toPhase(this.phases.IMPORT_FAILED)

                    return
                }

                let jsonProject = evalon4JResult.data

                if (_.isEmpty(jsonProject.modules)) {
                    this.toPhase(this.phases.API_NOT_EXISTS)

                    return true
                }

                return false
            },

            async handleEvalon4JComplete(evalon4jResult) {
                let jsonProject = evalon4jResult.data

                await this.setGitVersion(jsonProject)

                await this.saveJsonProject(jsonProject)

                this.toPhase(this.phases.IMPORT_COMPLETE)
            },

            async setGitVersion(jsonProject) {
                let jsonVersion = jsonProject.version

                let nodegit = electron.remote.require("nodegit")

                if (await this.checkIsGitProject(jsonProject)) {
                    jsonVersion.versionType = 'GIT'

                    let repo = await nodegit.Repository.open(jsonProject.projectPath)

                    let branch = await repo.getCurrentBranch()

                    // let commit = await repo.getReferenceCommit(branch)

                    jsonVersion.isDefaultBranch = false

                    jsonVersion.branchName = branch.shorthand()

                    jsonVersion.versionName = branch.shorthand()

                    jsonVersion.commit = {
                        // author: "",
                        // message: commit.message(),
                        // date: "",
                        // sha: commit.sha(),
                    }

                }
            },

            setCommit(jsonVersion) {

            },

            async checkIsGitProject(jsonProject) {
                try {
                    await nodegit.Repository.open(jsonProject.projectPath)

                    return true
                } catch (error) {
                    return false
                }
            },

            async checkoutBranch(jsonProject, branchName) {
                let repository = await nodegit.Repository.open(jsonProject.projectPath)

                let previousBranch = await repository.getCurrentBranch()

                try {
                    await repository.checkoutBranch(branchName)
                } catch (error) {
                    throw error
                }

                return () => {
                    repository.checkoutBranch(previousBranch)
                }
            },

            toPhase(phase) {
                this.phase = phase
            },

            isPhase(phase) {
                return this.phase === phase
            }
        },
    }
</script>

