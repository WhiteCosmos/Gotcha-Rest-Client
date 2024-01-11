import GHCContentTabType
    from '@/components/tabs/GHCContentTabType'
import GHCComponent
    from '@/data/gotcha/GHCComponent'
import RabiTreeViewNodeType
    from '@/components/api-tree/data/RabiTreeViewNodeType'

class GHCContentTab extends GHCComponent {
    constructor() {
        super()

        this.name = ""

        this.type = GHCContentTabType.API_DEFINITION

        this.treeNode = undefined

        /**
         * Reference of original tree node chain
         *
         * TODO refactor
         *
         * @type {undefined}
         */
        this.treeNodes = undefined

        this.breadcrumbs = []

        /**
         * @type {undefined}
         */
        this.httpDefinition = undefined

        /**
         * @type {GHCHttpOperation}
         */
        this.httpOperation = undefined

        /**
         * @type {undefined}
         */
        this.mockOperation = undefined

        // Legacy Properties

        /**
         * @type {JsonMethod}
         */
        this.jsonMethod = undefined

        /**
         * @type {JsonStruct}
         */
        this.jsonStruct = undefined

        /**
         * TODO refactor
         *
         * @type {RabiOperationNode}
         */
        this.httpRequest = undefined

        /**
         * @since 1.5.2
         */
        this.websocketOperation = undefined

        // Control

        this.closable = true

        this.active = true
    }

    isWelcomePage() {
        return this.type === GHCContentTabType.WELCOME
    }

    isApiDefinition() {
        return this.type === GHCContentTabType.API_DEFINITION
    }

    isStructDefinition() {
        return this.type === GHCContentTabType.STRUCT_DEFINITION
    }

    isApiHttpOperation() {
        return this.type === GHCContentTabType.API_HTTP_REQUEST
    }

    isApiHttpClient() {
        return this.type === GHCContentTabType.API_HTTP_CLIENT || this.type === GHCContentTabType.API_HTTP_REQUEST
    }

    isApiMockClient() {
        return this.type === GHCContentTabType.API_MOCK_CLIENT
    }

    toApiDefinition() {
        if (this.jsonMethod && this.jsonMethod.isHttpService) {
            this.type = GHCContentTabType.API_DEFINITION
        }
    }

    toApiHttpClient() {
        if (this.jsonMethod && this.jsonMethod.isHttpService) {
            this.type = GHCContentTabType.API_HTTP_CLIENT
        }
    }

    toApiMockClient() {
        if (this.jsonMethod && this.jsonMethod.isHttpService) {
            this.type = GHCContentTabType.API_MOCK_CLIENT
        }
    }

    static buildContentTabByJsonMethod(jsonMethod) {
        let tab = new GHCContentTab()

        if (jsonMethod.summary) {
            tab.name = jsonMethod.summary
        } else {
            tab.name = jsonMethod.methodName
        }

        tab.type = GHCContentTabType.API_DEFINITION

        return tab
    }

    static buildContentTabByJsonStruct(jsonStruct) {
        let tab = new GHCContentTab()

        tab.name = jsonStruct.fieldName

        tab.type = GHCContentTabType.STRUCT_DEFINITION

        return tab
    }

    static buildContentTabsByTreeNode(treeNodes) {
        let tab = new GHCContentTab()

        let treeNode = treeNodes[treeNodes.length - 1]

        tab.treeNodes = treeNodes

        tab.treeNode = treeNode

        tab.name = treeNode.name

        if (treeNode.type === RabiTreeViewNodeType.HTTP_REQUEST) {
            tab.type = GHCContentTabType.API_HTTP_REQUEST
        }

        if (treeNode.type === RabiTreeViewNodeType.WEBSOCKET_REQUEST) {
            tab.type = GHCContentTabType.WEBSOCKET_OPERATION
        }

        return tab
    }

    static OVERVIEW_CONTENT_TAB() {
        let tab = new GHCContentTab()

        tab.name = "Overview"

        tab.type = GHCContentTabType.WELCOME

        tab.closable = false

        return tab
    }
}

export default GHCContentTab