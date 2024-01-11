import RabiBaseDao
    from '@/core/dao/RabiBaseDao'
import IndexedDB
    from '@/core/IndexedDB'

class JsonStructContentDao extends RabiBaseDao {
    async query(condition) {
        this.openDatabase()

        return await IndexedDB.JsonStructContent.where(condition).first()
    }

    async batchQuery(condition) {
        this.openDatabase()

        return await IndexedDB.JsonStructContent.where(condition).toArray()
    }

    async save(jsonStructContent) {
        this.openDatabase()

        return await IndexedDB.JsonStructContent.put(jsonStructContent)
    }

    async batchSave(jsonStructContents) {
        this.openDatabase()

        return await IndexedDB.JsonStructContent.bulkAdd(jsonStructContents, {allKeys: true})
    }

    async batchDelete(jsonMethodContents) {
        if (!jsonMethodContents || jsonMethodContents.length === 0) {
            return
        }

        this.openDatabase()

        await IndexedDB.JsonStructContent.bulkDelete(jsonMethodContents.map(content => {
            return content.id
        }))
    }
}

export default JsonStructContentDao