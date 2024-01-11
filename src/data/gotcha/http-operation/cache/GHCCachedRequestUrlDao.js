import RabiBaseDao
    from '@/core/dao/RabiBaseDao'
import IndexedDB
    from '@/core/IndexedDB'

/**
 * @created_at 2022/3/14
 * @app_version 1.4.2
 */
class GHCCachedRequestUrlDao extends RabiBaseDao {
    async batchQuery(condition) {
        this.openDatabase()

        return IndexedDB.GHCCachedRequestUrl.where(condition).toArray()
    }

    async queryAll() {
        this.openDatabase()

        return IndexedDB.GHCCachedRequestUrl.toArray()
    }

    async save(url) {
        this.openDatabase()

        await IndexedDB.GHCCachedRequestUrl.put(url)
    }
}

export default GHCCachedRequestUrlDao