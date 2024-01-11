import RabiBaseDao
    from '@/core/dao/RabiBaseDao'
import IndexedDB
    from '@/core/IndexedDB'

class JsonMethodContentDao extends RabiBaseDao {
    async batchQuery(condition) {
        this.openDatabase()

        return IndexedDB.JsonMethodContent.where(condition).toArray()
    }

    async query(condition) {
        this.openDatabase()

        return IndexedDB.JsonMethodContent.where(condition).first()
    }

    async batchSave(jsonMethods) {
        this.openDatabase()

        return IndexedDB.JsonMethodContent.bulkAdd(jsonMethods, {allKeys: true})
    }

    async batchDelete(jsonMethodContents) {
        if (!jsonMethodContents || jsonMethodContents.length === 0) {
            return
        }

        this.openDatabase()

        await IndexedDB.JsonMethodContent.bulkDelete(jsonMethodContents.map(content => {
            return content.id
        }))
    }
}

export default JsonMethodContentDao