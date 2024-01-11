import EvFlattenTreeNode
    from '@/components/flatten-tree/EvFlattenTreeNode'
import RabiTreeViewNodeType
    from '@/components/api-tree/data/RabiTreeViewNodeType'
import GHCTreeNodeStatus
    from '@/components/api-tree/data/GHCTreeNodeStatus'

/**
 * Used in EvApiTreeView
 */
class GHCTreeNode extends EvFlattenTreeNode {
    constructor(props) {
        !props && (props = {})

        super()

        /**
         * @type {string}
         */
        this.name = props.name || ''

        /**
         * Tree node type
         *
         * @type {string}
         */
        this.type = props.type || ''

        this.status = GHCTreeNodeStatus.NONE

        // UI Control Fields

        this.size = props.size || 28

        // Data Fields

        /**
         * http-definition
         * @type {number}
         */
        this.httpDefinitionId = props.httpDefinitionId || -1

        /**
         * Http Request Id -> RabiHttpOperation
         *
         * @type {number}
         * @deprecated
         */
        this.httpRequestId = props.httpRequestId || -1

        /**
         * http-operation
         * @type {*|number|number}
         */
        this.httpOperationId = props.httpOperationId || -1


        /**
         * Websocket Request Id
         *
         * @since 1.5.2
         */
        this.websocketOperationId = props.websocketOperationId || -1

        /**
         * Http Mock Id
         *
         * @type {number}
         */
        this.httpMockId = props.httpMockId || -1

        this.requestMethod = props.requestMethod || "GET"

        this.requestPath = props.requestPath || "/"

        /**
         * Http operations under API Definition
         *
         * @type {*[]}
         */
        this.httpOperations = []

        /**
         * Mock operations under API Definition
         *
         * @type {*[]}
         */
        this.mockOperations = []

        // 用于导入数据时，临时存放请求

        /**
         * @since 1.4.5
         */
        this.httpRequest = undefined

        /**
         * @since 1.4.5
         */
        this.httpOperation = undefined

        /**
         * @since 1.4.5
         */
        this.httpDefinition = undefined


        /**
         * Export configs which this node belongs to
         *
         * @since 1.5.0
         * @type {*[]}
         */
        this.exportConfigs = []
    }

    static newTreeViewGroupNode() {
        let node = new GHCTreeNode()

        node.type = RabiTreeViewNodeType.GROUP

        node.name = "New Group"

        node.isContainer = true

        node.expand = true

        node.size = 28

        return node
    }

    static newTreeViewHttpRequestNode() {
        let node = new GHCTreeNode()

        node.type = RabiTreeViewNodeType.HTTP_REQUEST

        node.name = "Http Request"

        node.size = 56

        return node
    }

    static newTreeViewWebsocketRequestNode() {
        let node = new GHCTreeNode()

        node.type = RabiTreeViewNodeType.WEBSOCKET_REQUEST

        node.name = "Websocket Request"

        node.size = 56

        return node
    }
}

export default GHCTreeNode