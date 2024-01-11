import GHCTreeNode
    from '@/components/api-tree/data/GHCTreeNode'
import GHCWebsocketOperation
    from '@/data/websocket/GHCWebsocketOperation'
import GHCIndexedDBDao
    from '@/core/dao/GHCIndexedDBDao'

/**
 * @created_at 2022/8/30
 * @app_version 1.5.2
 */
class GHCTreeViewWebsocketRequestNodeBuilder {
    constructor(project, version) {
        this.project = project

        this.version = version
    }

    async build() {
        let node = GHCTreeNode.newTreeViewWebsocketRequestNode()

        let operation = new GHCWebsocketOperation()

        operation.projectId = this.project.id

        operation.versionId = this.version.id

        operation.name = node.name

        operation = await new GHCIndexedDBDao(GHCIndexedDBDao.GHCWebsocketOperation).save(operation)

        node.websocketOperationId = operation.id

        return node
    }
}

export default GHCTreeViewWebsocketRequestNodeBuilder