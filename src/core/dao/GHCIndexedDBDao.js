/**
 * @created_at 2022/8/30
 * @app_version 1.5.0
 */
import RabiBaseDao
    from '@/core/dao/RabiBaseDao'
import IndexedDB
    from '@/core/IndexedDB'

class GHCIndexedDBDao extends RabiBaseDao {
    static GHCWebsocketOperation = "GHCWebsocketOperation"

    constructor(database) {
        super()

        this.database = database
    }

    async query(condition) {
        this.openDatabase()

        return await IndexedDB[this.database].where(condition).first()
    }

    async batchQuery(condition) {
        this.openDatabase()

        return await IndexedDB[this.database].where(condition).toArray()
    }

    async save(model) {
        this.openDatabase()

        await IndexedDB[this.database].put(model)

        return this.query({id: model.id})
    }

    async delete(model) {
        this.openDatabase()

        await IndexedDB[this.database].delete(model.id)
    }
}

export default GHCIndexedDBDao