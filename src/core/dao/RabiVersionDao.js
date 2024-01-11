import RabiBaseDao
    from '@/core/dao/RabiBaseDao'
import IndexedDB
    from '@/core/IndexedDB'

class RabiVersionDao extends RabiBaseDao {
    async query(condition) {
        this.openDatabase()

        return await IndexedDB.RabiVersion.where(condition).first()
    }

    async batchQuery(condition) {
        this.openDatabase()

        return await IndexedDB.RabiVersion.where(condition).toArray()
    }

    async save(version) {
        this.openDatabase()

        await IndexedDB.RabiVersion.put(version)

        return this.query({id: version.id})
    }

    async delete(version) {
        this.openDatabase()

        await IndexedDB.RabiVersion.delete(version.id)
    }
}

export default RabiVersionDao
