import RabiBaseDao
    from '@/core/dao/RabiBaseDao'
import IndexedDB
    from '@/core/IndexedDB'

class GHCCookieJarsDao extends RabiBaseDao {
    async batchQuery(condition) {
        this.openDatabase()

        return IndexedDB.GHCCookieJars.where(condition).toArray()
    }

    async query(condition) {
        this.openDatabase()

        return IndexedDB.GHCCookieJars.where(condition).first()
    }

    async save(cookieJars) {
        this.openDatabase()

        await IndexedDB.GHCCookieJars.put(cookieJars)

        return this.query({id: cookieJars.id})
    }

    async delete(cookieJars) {
        return IndexedDB.GHCCookieJars.delete(cookieJars.id)
    }
}

export default GHCCookieJarsDao