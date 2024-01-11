import Dexie
    from 'dexie'
import RabiBaseDao
    from '@/core/dao/RabiBaseDao'
import IndexedDB
    from '@/core/IndexedDB'

class RabiHttpOperationDao extends RabiBaseDao {
    constructor() {
        super()

        this.originalRequest = undefined
    }

    async query(condition) {
        this.openDatabase()

        return await IndexedDB.RabiHttpOperation.where(condition).first()
    }

    async batchQuery(condition) {
        this.openDatabase()

        return await IndexedDB.RabiHttpOperation.where(condition).toArray()
    }

    async save(httpOperation) {
        if (!httpOperation) {
            return
        }

        this.openDatabase()

        this._removeOriginalRequest(httpOperation)

        await IndexedDB.RabiHttpOperation.put(httpOperation)

        this._appendOriginalRequest(httpOperation)

        return await this.query({id: httpOperation.id})
    }

    async clone(httpOperation) {
        if (!httpOperation) {
            return
        }

        return Dexie.deepClone(httpOperation)
    }

    async delete(httpOperation) {
        if (!httpOperation) {
            return
        }

        this.openDatabase()

        await IndexedDB.RabiHttpOperation.delete(httpOperation.id)
    }

    async batchDelete(httpOperations) {
        if (!httpOperations || httpOperations.length === 0) {
            return
        }

        this.openDatabase()

        await IndexedDB.RabiHttpOperation.bulkDelete(httpOperations.map(content => {
            return content.id
        }))
    }

    async batchSave(httpOperations) {
        if (!httpOperations || httpOperations.length === 0) {
            return
        }

        this.openDatabase()

        await IndexedDB.RabiHttpOperation.bulkPut(httpOperations)
    }

    /**
     * Remove GOT request
     *
     * @param {GHCHttpOperation} httpOperation
     * @private
     */
    _removeOriginalRequest(httpOperation) {
        this.originalRequest = httpOperation.httpRequest.originalRequest

        httpOperation.httpRequest.originalRequest = undefined
    }

    _appendOriginalRequest(httpOperation) {
        httpOperation.httpRequest.originalRequest = this.originalRequest
    }
}

export default RabiHttpOperationDao