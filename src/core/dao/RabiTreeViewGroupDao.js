import RabiBaseDao
    from '@/core/dao/RabiBaseDao'
import IndexedDB
    from '@/core/IndexedDB'

class RabiTreeViewGroupDao extends RabiBaseDao {
    async batchQuery(condition) {
        this.openDatabase()

        return await IndexedDB.RabiTreeViewGroup.where(condition).toArray()
    }

    async query(condition) {
        this.openDatabase()

        return await IndexedDB.RabiTreeViewGroup.where(condition).first()
    }

    async save(group) {
        this.openDatabase()

        await IndexedDB.RabiTreeViewGroup.put(group)

        return this.query({id: group.id})
    }

    async delete(group) {
        this.openDatabase()

        await IndexedDB.RabiTreeViewGroup.delete(group.id)
    }

    async batchDelete(groups) {
        if (!groups || groups.length === 0) {
            return
        }

        this.openDatabase()

        await IndexedDB.RabiTreeViewGroup.bulkDelete(groups.map(content => {
            return content.id
        }))
    }
}

export default RabiTreeViewGroupDao