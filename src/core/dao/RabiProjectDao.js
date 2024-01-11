import RabiBaseDao
    from '@/core/dao/RabiBaseDao'
import IndexedDB
    from '@/core/IndexedDB'
import RabiProjectSource
    from '@/data/gotcha/RabiProjectSource'

class RabiProjectDao extends RabiBaseDao {
    async batchQuery(condition) {
        if (!condition) {
            condition = {repositoryId: 1}

            let projects = []

            let playground = await this.queryPlaygroundProject()

            projects.push(playground)

            let results = await IndexedDB.RabiProject.where(condition).toArray()

            results = results.filter(project => {
                return project.source !== RabiProjectSource.SYSTEM
            })

            projects.push(...results)

            return projects
        } else {
            return await IndexedDB.RabiProject.where(condition).toArray()
        }
    }

    async query(condition) {
        return await IndexedDB.RabiProject.where(condition).first()
    }

    async queryPlaygroundProject() {
        let array = await IndexedDB.RabiProject.where({repositoryId: 1}).toArray()

        return array.find(project => {
            return project.source === "SYSTEM"
        })
    }

    async save(project) {
        await IndexedDB.RabiProject.put(project)

        return await this.query({id: project.id})
    }

    async delete(project) {
        await IndexedDB.RabiProject.delete(project.id)
    }
}

export default RabiProjectDao