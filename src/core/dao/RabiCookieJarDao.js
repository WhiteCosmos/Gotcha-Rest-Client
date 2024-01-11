import RabiBaseDao
    from '@/core/dao/RabiBaseDao'
import IndexedDB
    from '@/core/IndexedDB'

class RabiCookieJarDao extends RabiBaseDao {
    async query(condition) {
        this.openDatabase()

        return await IndexedDB.RabiCookieJar.where(condition).first()
    }

    async batchQuery(condition) {
        this.openDatabase()

        return await IndexedDB.RabiCookieJar.where(condition).toArray()
    }

    async save(cookieJar) {
        this.openDatabase()

        await IndexedDB.RabiCookieJar.put(cookieJar)

        return this.query({id: cookieJar.id})
    }

    async delete(cookieJar) {
        this.openDatabase()

        await IndexedDB.RabiCookieJar.delete(cookieJar.id)
    }
}

export default RabiCookieJarDao
