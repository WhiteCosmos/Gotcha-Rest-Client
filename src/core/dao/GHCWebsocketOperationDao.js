/**
 * @created_at 2022/8/30
 * @app_version 1.5.0
 */
import RabiBaseDao
    from '@/core/dao/RabiBaseDao'
import IndexedDB
    from '@/core/IndexedDB'

class GHCWebsocketOperationDao extends RabiBaseDao {
    constructor() {
        super()
    }

    async query(condition) {
        this.openDatabase()

        return await IndexedDB.GHCWebsocketOperation.where(condition).first()
    }

    async batchQuery(condition) {
        this.openDatabase()

        return await IndexedDB.GHCWebsocketOperation.where(condition).toArray()
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

    a
}

export default GHCWebsocketOperationDao