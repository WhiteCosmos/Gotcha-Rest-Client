import GHCTreeNode
    from '@/components/api-tree/data/GHCTreeNode'
import GHCHttpOperation
    from '@/data/gotcha/http-operation/GHCHttpOperation'
import RabiHttpOperationDao
    from '@/core/dao/RabiHttpOperationDao'
import RabiTreeViewNodeType
    from '@/components/api-tree/data/RabiTreeViewNodeType'
import {
    v4
} from 'uuid'
import GHCHttpClientUrlHelper
    from '@/views/http-client/core/GHCHttpClientUrlHelper'
import RabiHttpOperationStatus
    from '@/data/gotcha/http-operation/RabiHttpOperationStatus'

class RabiTreeViewHttpRequestNodeBuilder {
    constructor(project, version, dynamicVariableRender) {
        this.project = project

        this.version = version

        this.dynamicVariableRender = dynamicVariableRender
    }

    async buildTreeViewHttpRequestNode() {
        let node = GHCTreeNode.newTreeViewHttpRequestNode()

        let operation = _.cloneDeep(this.project.globalTemplate)

        this.dispatchNewUniqueId(operation)

        operation.projectId = this.project.id

        operation.versionId = this.version.id

        operation.name = node.name

        operation = await new RabiHttpOperationDao().save(operation)

        node.httpRequestId = operation.id

        let httpRequest = operation.httpRequest

        node.requestMethod = httpRequest.requestMethod

        let helper = new GHCHttpClientUrlHelper(httpRequest, this.dynamicVariableRender)

        node.requestPath = helper.getRequestPath()

        return node
    }

    async buildTreeViewHttpRequestNodeFromTemplate(template) {
        let node = GHCTreeNode.newTreeViewHttpRequestNode()

        let operation = _.cloneDeep(template.httpOperation)

        this.dispatchNewUniqueId(operation)

        operation.projectId = this.project.id

        operation.versionId = this.version.id

        operation.name = template.name

        operation.createdAt = new Date()

        operation.updatedAt = new Date()

        operation = await new RabiHttpOperationDao().save(operation)

        let httpRequest = operation.httpRequest

        node.httpRequestId = operation.id

        node.name = template.name

        node.requestMethod = httpRequest.requestMethod

        let helper = new GHCHttpClientUrlHelper(httpRequest, this.dynamicVariableRender)

        node.requestPath = helper.getRequestPath()

        return node
    }

    async duplicateTreeViewHttpRequestNode(treeViewNode) {
        let duplicatedNode = new GHCTreeNode(treeViewNode)

        if (treeViewNode.type === RabiTreeViewNodeType.GROUP) {
            duplicatedNode.isContainer = true

            for (const child of treeViewNode.children) {
                duplicatedNode.children.push(await this.duplicateTreeViewHttpRequestNode(child))
            }
        }

        if (treeViewNode.type === RabiTreeViewNodeType.HTTP_REQUEST) {
            let httpRequestId = treeViewNode.httpRequestId

            let httpOperation = await new RabiHttpOperationDao().query({id: httpRequestId})

            let duplicatedHttpRequest = await this.duplicateHttpOperation(httpOperation)

            duplicatedNode.httpRequestId = duplicatedHttpRequest.id
        }

        return duplicatedNode
    }

    async duplicateHttpOperation(httpOperation) {
        let duplicatedHttpOperation = _.cloneDeep(httpOperation)

        delete duplicatedHttpOperation.id

        duplicatedHttpOperation.name = duplicatedHttpOperation.name + " Copy"

        this.removeHttpResponse(duplicatedHttpOperation)

        this.dispatchNewUniqueId(duplicatedHttpOperation)

        return await new RabiHttpOperationDao().save(duplicatedHttpOperation)
    }

    dispatchNewUniqueId(httpOperation) {
        httpOperation.uid = v4()

        httpOperation.httpRequest.uid = v4()
    }

    removeHttpResponse(httpOperation) {
        httpOperation.httpResponse = undefined

        httpOperation.httpError = undefined
    }
}

export default RabiTreeViewHttpRequestNodeBuilder