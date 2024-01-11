import RabiHttpOperationDao
    from '@/core/dao/RabiHttpOperationDao'

const rabiHttpOperationDao = new RabiHttpOperationDao()

class RabiHttpOperationUpdater {
    constructor() {

    }

    /**
     * @param {GHCHttpOperation} httpOperation
     * @param {JsonMethod} jsonMethod
     */
    async update(httpOperation, jsonMethod) {
        // Update url

        // Update headers

        // Update urlParams

        // Update requestBody

        await rabiHttpOperationDao.save(httpOperation)
    }
}

export default RabiHttpOperationUpdater
