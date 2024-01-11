import _
    from 'lodash'
import {
    v4
} from 'uuid'

/**
 * @created_at 2022/11/11
 * @app_version 1.6.0
 */
class GHCJsonSchemaResolver {
    constructor(jsonSchemaPool) {
        this.jsonSchemaPool = jsonSchemaPool
    }

    resolveReferenceTreeNodes(treeNodes = [], uidChecker = new Set()) {
        if (_.isEmpty(treeNodes)) {
            return
        }

        for (let i = 0; i < treeNodes.length; i++) {
            let treeNode = treeNodes[i]

            if (uidChecker.size === 0) { // 确保第一个treeNode也放入
                uidChecker.add(treeNode.uid)
            }

            if (treeNode.$ref) {
                this._buildReferenceFlattenTree(treeNode, new Set([...uidChecker]))
            } else {
                this.resolveReferenceTreeNodes(treeNode.children, new Set([...uidChecker]))
            }
        }
    }

    _buildReferenceFlattenTree(treeNode, uidChecker = new Set()) {
        let refTreeNode = this.jsonSchemaPool.get(treeNode.$ref)

        if (!refTreeNode) {
            treeNode.isRefExists = false

            treeNode.children = [] // 引用不存在后 清空Children

            return
        }

        if (uidChecker.has(refTreeNode.uid)) {
            treeNode.isRecursive = true
            return
        } else {
            uidChecker.add(refTreeNode.uid)
        }

        treeNode.refName = refTreeNode.key

        treeNode.isRefExists = true

        treeNode.children = this._duplicateReferenceFlattenTreeRecursively(refTreeNode.children, new Set([...uidChecker]))
    }

    _duplicateReferenceFlattenTreeRecursively(treeNodes, uidChecker = new Set()) {
        if (_.isEmpty(treeNodes)) {
            return []
        }

        let children = []

        for (let i = 0; i < treeNodes.length; i++) {
            let treeNode = treeNodes[i]

            let clonedTreeNode = _.clone(treeNode)

            clonedTreeNode.uid = v4()

            clonedTreeNode.isReadOnly = true

            clonedTreeNode.isRecursive = false

            clonedTreeNode.children = []

            children.push(clonedTreeNode)

            if (clonedTreeNode.$ref) {
                this._buildReferenceFlattenTree(clonedTreeNode, new Set([...uidChecker]))
            } else {
                clonedTreeNode.children = this._duplicateReferenceFlattenTreeRecursively(treeNode.children, new Set([...uidChecker]))
            }
        }

        return children
    }
}

export default GHCJsonSchemaResolver