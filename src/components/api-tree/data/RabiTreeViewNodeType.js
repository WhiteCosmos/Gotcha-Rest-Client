class RabiTreeViewNodeType {
    static HTTP_DEFINITION = "HTTP_REQUEST"

    static HTTP_OPERATION = "HTTP_OPERATION"

    static MOCK_OPERATION = "MOCK_OPERATION"

    static HTTP_REQUEST = "HTTP_REQUEST"

    static WEBSOCKET_REQUEST = "WEBSOCKET_REQUEST"

    static HTTP_MOCK = "HTTP_MOCK"

    static GROUP = "GROUP"

    static checkIsGroup(treeViewNode) {
        return treeViewNode && treeViewNode.type === this.GROUP
    }

    static checkIsHttpRequest(treeViewNode) {
        return treeViewNode && treeViewNode.type === this.HTTP_REQUEST
    }
}

export default RabiTreeViewNodeType