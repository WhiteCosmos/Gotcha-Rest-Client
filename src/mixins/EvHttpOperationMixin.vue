<script>
    import HttpOperationBuilder from '@/core/builder/HttpOperationBuilder'
    import RabiHttpOperationDao from '@/core/dao/RabiHttpOperationDao'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import {v4} from 'uuid'
    import JsonMethodContentDao from '@/core/dao/JsonMethodContentDao'

    const rabiHttpOperationDao = new RabiHttpOperationDao()

    export default {
        name: "EvHttpOperationMixin",

        mixins: [
            EvStoreMixin
        ],

        methods: {
            async queryHttpOperations(jsonMethod) {
                return await rabiHttpOperationDao.batchQuery({
                    versionId: this.currentVersion.id,
                    operationId: jsonMethod.operationId
                })
            },

            async createHttpOperation(jsonMethod) {
                let builder = new HttpOperationBuilder(this.currentVersion)

                let actualJsonMethod = await new JsonMethodContentDao().query({id: jsonMethod.id})

                let httpOperation = builder.buildHttpOperation(actualJsonMethod)

                return await rabiHttpOperationDao.save(httpOperation)
            },

            async updateHttpOperation(httpOperation) {
                await rabiHttpOperationDao.save(httpOperation)
            },

            /**
             * Duplicate a http operation
             *
             * @param {JsonMethod} jsonMethod
             * @param {GHCHttpOperation} httpOperation
             */
            async duplicateHttpOperation(httpOperation) {
                let duplicatedHttpOperation = await rabiHttpOperationDao.clone(httpOperation)

                delete duplicatedHttpOperation.id

                duplicatedHttpOperation.name = duplicatedHttpOperation.name + " Copy"

                this.removeHttpResponse(duplicatedHttpOperation)

                this.dispatchNewUniqueId(duplicatedHttpOperation)

                return await rabiHttpOperationDao.save(duplicatedHttpOperation)
            },

            dispatchNewUniqueId(httpOperation) {
                httpOperation.uid = v4()

                httpOperation.httpRequest.uid = v4()
            },

            removeHttpResponse(httpOperation) {
                httpOperation.httpResponse = undefined

                httpOperation.httpError = undefined
            },

            /**
             * Delete a http operation
             *
             * @param {JsonMethod} jsonMethod
             * @param {GHCHttpOperation} httpOperation
             */
            async deleteHttpOperation(httpOperation) {
                await rabiHttpOperationDao.delete(httpOperation)
            }
        }
    }
</script>
