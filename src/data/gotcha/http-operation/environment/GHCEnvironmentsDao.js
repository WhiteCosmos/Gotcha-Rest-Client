import RabiBaseDao
    from '@/core/dao/RabiBaseDao'
import IndexedDB
    from '@/core/IndexedDB'

class GHCEnvironmentsDao extends RabiBaseDao {
    async query(condition) {
        this.openDatabase()

        return await IndexedDB.RabiHttpEnvironment.where(condition).first()
    }

    async save(environments) {
        this.openDatabase()

        await IndexedDB.RabiHttpEnvironment.put(environments)

        return this.query({id: environments.id})
    }

    async delete(environments) {
        this.openDatabase()

        await IndexedDB.RabiHttpEnvironment.delete(environments.id)
    }
}

export default GHCEnvironmentsDao