import IndexedDB
    from '@/core/IndexedDB'
import RabiBaseDao
    from '@/core/dao/RabiBaseDao'

class RabiModuleDao extends RabiBaseDao {
    async query(condition) {
        this.openDatabase()

        return await IndexedDB.RabiModule.where(condition).first()
    }

    async batchQuery(condition) {
        this.openDatabase()

        return await IndexedDB.RabiModule.where(condition).toArray()
    }

    async save(module) {
        this.openDatabase()

        await IndexedDB.RabiModule.put(module)

        return await this.query({id: module.id})
    }

    async delete(module) {
        this.openDatabase()

        await IndexedDB.RabiModule.delete(module.id)
    }
}

export default RabiModuleDao