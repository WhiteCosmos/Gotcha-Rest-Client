import _
    from 'lodash'
import {
    v4
} from 'uuid'

/**
 * Flatten Tree Operation -> Tree -> Rebuild Flatten Tree
 *
 * @created_at 2022/5/13
 * @app_version 1.4.7
 */
class GHCFlattenTree {
    static LAYER = {
        LOW: 'LOW', // 子节点
        MIDDLE: 'MIDDLE', // 相邻节点
        HIGH: "HIGH", // 外侧节点
    }

    constructor(treeNodes) {
        this.treeNodes = treeNodes

        treeNodes && (this.rootTreeNode = treeNodes[0])

        this.flattenTreeNodes = []

        this.childToParentMap = new Map() // child -> parent map

        this.expandToCollapseMap = new Map() // expand treeNode -> collapsed treeNodes
    }

    // Public API

    async buildFlattenTree(search = false) {
        this.childToParentMap = new Map()

        this.expandToCollapseMap = new Map()

        this._buildNodesRelationshipRecursively(this.treeNodes)

        this.flattenTreeNodes = this._buildFlattenTreeRecursively(this.treeNodes)

        if (search) {
            this.flattenTreeNodes = this.flattenTreeNodes.filter(node => {
                return node.matched
            })
        }

        return this.flattenTreeNodes
    }

    async rebuildFlattenTree() { // 部分更新
        return this._buildFlattenTreeRecursively(this.treeNodes)
    }

    /**
     * Add new node to the root, tail or head
     *
     * @param node
     * @param tail tail or head
     * @returns {Promise<void>}
     */
    async addTreeNodeToRoot(node, tail = true) {
        if (tail) {
            this.treeNodes.push(node)
        } else {
            this.treeNodes.unshift(node)
        }

        return this.buildFlattenTree()
    }

    async addTreeNode(sn, tn, layer = 'MIDDLE', callback = (sn, tn) => {
    }) {
        if (layer === GHCFlattenTree.LAYER.LOW) {
            this._addNodeAsChild(sn, tn)
        }

        if (layer === GHCFlattenTree.LAYER.MIDDLE) {
            this._addNodeAsSibling(sn, tn)
        }

        callback(sn, tn)

        return this.buildFlattenTree()
    }

    addTreeNodes(sns, tn, layer = 'MIDDLE', callback = (sns, tn) => {
    }) {
        if (layer === GHCFlattenTree.LAYER.LOW) {
            this._addNodesAsChildren(sns, tn)
        }

        if (layer === GHCFlattenTree.LAYER.MIDDLE) {
            this._addNodesAsSibling(sns, tn)
        }

        callback(sns, tn)

        return this.buildFlattenTree()
    }

    async moveTreeNode(sn, tn, layer, callback = (sn, tn) => {
    }) {
        if (!this.checkIsTreeNodeMovable(sn, tn, layer)) {
            return this.flattenTreeNodes
        }

        if (layer === GHCFlattenTree.LAYER.LOW) {
            this._removeNodeFromParent(sn)

            // noinspection RedundantConditionalExpressionJS
            this._addNodeAsChild(sn, tn, tn.expand ? true : false)
        }

        if (layer === GHCFlattenTree.LAYER.MIDDLE) {
            this._removeNodeFromParent(sn)

            this._addNodeAsSibling(sn, tn)
        }

        if (layer === GHCFlattenTree.LAYER.HIGH) {
            let parent = this.childToParentMap.get(tn)

            if (parent) {
                return this.moveTreeNode(sn, parent, GHCFlattenTree.LAYER.MIDDLE, callback)
            }
        }

        callback(sn, tn)

        return this.buildFlattenTree()
    }

    async moveTreeNodes(sns, tn, layer, callback = (sns, tn) => {
    }) {
        sns = this._filterTreeNodes(sns)

        if (!this.checkIsTreeNodesMovable(sns, tn, layer)) {
            return this.flattenTreeNodes
        }

        if (layer === GHCFlattenTree.LAYER.LOW) {
            this._removeNodesFromParent(sns)
            // noinspection RedundantConditionalExpressionJS
            this._addNodesAsChildren(sns, tn, tn.expand ? true : false)
        }

        if (layer === GHCFlattenTree.LAYER.MIDDLE) {
            this._removeNodesFromParent(sns)

            this._addNodesAsSibling(sns, tn)
        }

        if (layer === GHCFlattenTree.LAYER.HIGH) {
            let parent = this.childToParentMap.get(tn)

            if (parent) {
                return this.moveTreeNodes(sns, parent, GHCFlattenTree.LAYER.MIDDLE, callback)
            }
        }

        callback(sns, tn)

        return this.buildFlattenTree()
    }

    async groupTreeNodes(sns, tn, callback = (sn) => {
    }) {

    }

    async ungroupTreeNodes(sns, tn, callback = (sn) => {
    }) {

    }

    async removeTreeNode(sn, callback = (sn) => {
    }) {
        this._removeNodeFromParent(sn)

        callback(sn)

        return this.buildFlattenTree()
    }

    async removeTreeNodes(sns, callback = (sns) => {
    }) {
        sns = this._filterTreeNodes(sns)

        this._removeNodesFromParent(sns)

        callback(sns)

        return this.buildFlattenTree()
    }

    async filterTreeNodes(predict = (node) => {
        return true
    }) {
        this._clearTreeNodesRecursively(this.treeNodes)

        this._filterTreeNodesRecursively(this.treeNodes, predict)

        return this.buildFlattenTree(true)
    }

    _clearTreeNodesRecursively(treeNodes) {
        treeNodes.forEach(treeNode => {
            treeNode.matched = false

            treeNode.isContainer && (this._clearTreeNodesRecursively(treeNode.children))
        })
    }

    _filterTreeNodesRecursively(treeNodes, predict) {
        treeNodes.forEach(treeNode => {
            if (predict(treeNode)) {
                treeNode.isContainer && (treeNode.expand = true)

                if (treeNode.isContainer) {
                    treeNode.expand = true

                    treeNode.children.forEach(child => {
                        child.matched = true
                    })
                }

                treeNode.matched = true

                let parents = this.getAllParents(treeNode)

                parents.forEach(parent => {
                    parent.expand = true

                    parent.matched = true
                })
            } else {
                let parent = this.getParent(treeNode)

                if (parent && !parent.matched) {
                    parent.expand = false
                }
            }

            treeNode.isContainer && (this._filterTreeNodesRecursively(treeNode.children, predict))
        })
    }

    checkIsLastTreeNode(sn) {
        let parent = this.childToParentMap.get(sn)

        if (parent) {
            return parent.children[parent.children.length - 1] === sn
        }

        return false
    }

    checkIsTreeNodeMovable(sn, tn, layer) {
        if (sn === tn) {
            return layer === GHCFlattenTree.LAYER.HIGH
        }

        let parents = this.getAllParents(tn)

        // noinspection RedundantIfStatementJS
        return !parents.includes(sn)
    }

    checkIsTreeNodesMovable(sns, tn, layer) {
        if (sns[sns.length - 1] === tn) {
            return layer === GHCFlattenTree.LAYER.HIGH
        }

        if (sns.includes(tn)) {
            return false
        }

        let parents = this.getAllParents(tn)

        let oops = sns.filter(sn => {
            return parents.includes(sn)
        })

        return oops.length === 0
    }

    /**
     * 获取可以显示的移动层级
     *
     * @param tn
     */
    getAvailableLayers(tn) {
        let parent = this.childToParentMap.get(tn)

        if (tn.isContainer) {
            if (parent) {
                if (tn.expand) {
                    if (tn.children.length === 0) {
                        if (this.checkIsLastTreeNode(tn)) {
                            return [GHCFlattenTree.LAYER.HIGH, GHCFlattenTree.LAYER.MIDDLE, GHCFlattenTree.LAYER.LOW]
                        } else {
                            return [GHCFlattenTree.LAYER.MIDDLE, GHCFlattenTree.LAYER.LOW]
                        }
                    } else {
                        return [GHCFlattenTree.LAYER.LOW]
                    }
                } else {
                    if (this.checkIsLastTreeNode(tn)) {
                        return [GHCFlattenTree.LAYER.HIGH, GHCFlattenTree.LAYER.MIDDLE, GHCFlattenTree.LAYER.LOW]
                    } else {
                        return [GHCFlattenTree.LAYER.MIDDLE, GHCFlattenTree.LAYER.LOW]
                    }
                }
            } else {
                if (tn.expand) {
                    if (tn.children.length === 0) {
                        return [GHCFlattenTree.LAYER.MIDDLE, GHCFlattenTree.LAYER.LOW]
                    } else {
                        return [GHCFlattenTree.LAYER.LOW]
                    }
                } else {
                    return [GHCFlattenTree.LAYER.MIDDLE, GHCFlattenTree.LAYER.LOW]
                }
            }
        } else {
            if (parent) {
                if (this.checkIsLastTreeNode(tn)) {
                    return [GHCFlattenTree.LAYER.HIGH, GHCFlattenTree.LAYER.MIDDLE]
                } else {
                    return [GHCFlattenTree.LAYER.MIDDLE]
                }
            } else {
                return [GHCFlattenTree.LAYER.MIDDLE]
            }
        }
    }

    getPossibleLayer(tn) {
        if (tn.isContainer) {
            return tn.expand ? GHCFlattenTree.LAYER.LOW : GHCFlattenTree.LAYER.MIDDLE
        } else {
            return GHCFlattenTree.LAYER.MIDDLE
        }
    }

    getAvailableLayer(tn, actualLayer) {
        let availableLayers = this.getAvailableLayers(tn)

        let index = availableLayers.indexOf(actualLayer)

        if (index === -1) {
            return availableLayers[0]
        } else {
            return actualLayer
        }
    }

    async expandAllTreeNodes() {
        this._iterateTreeNodes(this.treeNodes, (treeNode) => {
            treeNode.isContainer && (treeNode.expand = true)
        })

        return this.rebuildFlattenTree()
    }

    async expandTreeNodeRecursively(treeNode) {
        this._iterateTreeNodes([treeNode], (treeNode) => {
            treeNode.isContainer && (treeNode.expand = true)
        })

        return this.buildFlattenTree()
    }

    async expandTreeNode(treeNode) {
        treeNode.expand = true

        return this.rebuildFlattenTree()
    }

    async collapseAllTreeNodes(options) {
        let skipRoot = options ? options.skipRoot : false

        if (skipRoot) {
            this.treeNodes.forEach(treeNode => {
                this._iterateTreeNodes(treeNode.children, (treeNode) => {
                    treeNode.isContainer && (treeNode.expand = false)
                })
            })
        } else {
            this._iterateTreeNodes(this.treeNodes, (treeNode) => {
                treeNode.isContainer && (treeNode.expand = false)
            })
        }

        return this.rebuildFlattenTree()
    }

    async collapseTreeNodeRecursively(treeNode) {
        this._iterateTreeNodes([treeNode], (treeNode) => {
            treeNode.isContainer && (treeNode.expand = false)
        })

        return this.buildFlattenTree()
    }

    async collapseTreeNode(treeNode) {
        treeNode.expand = false

        return this.rebuildFlattenTree()
    }

    getParent(node) {
        return this.childToParentMap.get(node)
    }

    getAllParents(node) {
        let parents = []

        let parent = this.getParent(node)

        while (parent) {
            parents.push(parent)

            parent = this.getParent(parent)
        }

        return parents.reverse()
    }

    // Private API

    _buildFlattenTreeRecursively(treeNodes, layer = 0) {
        if (_.isEmpty(treeNodes)) {
            return []
        }

        let array = []

        for (let i = 0; i < treeNodes.length; i++) {
            let treeNode = treeNodes[i]

            treeNode.layer = layer

            array.push(treeNode)

            treeNode.expand && array.push(...this._buildFlattenTreeRecursively(treeNode.children, layer + 1))
        }

        return array
    }

    _buildNodesRelationshipRecursively(treeNodes) {
        if (_.isEmpty(treeNodes)) {
            return
        }

        treeNodes.forEach(treeNode => {
            treeNode.children.forEach(child => {
                this.childToParentMap.set(child, treeNode) // child -> parent mapping
            })

            this._buildNodesRelationshipRecursively(treeNode.children)
        })
    }

    checkHasDuplicateKeyRecursively(treeNodes) {
        if (_.isEmpty(treeNodes)) {
            return
        }

        let map = new Map()

        treeNodes.forEach(treeNode => {
            if (_.isEmpty(treeNode.key)) {
                return
            }

            let key = treeNode.key

            map.has(key) ? map.set(key, map.get(key) + 1) : map.set(key, 1)
        })

        treeNodes.forEach(treeNode => {
            if (_.isEmpty(treeNode.key)) {
                return
            }

            treeNode.isDuplicateKey = map.get(treeNode.key) > 1
        })

        treeNodes.forEach(treeNode => {
            this.checkHasDuplicateKeyRecursively(treeNode.children)
        })
    }

    _iterateTreeNodes(treeNodes, callback = () => {
    }) {
        treeNodes.forEach(node => {
            callback(node)

            if (node.isContainer) {
                this._iterateTreeNodes(node.children, callback)
            }
        })
    }

    _filterTreeNodes(treeNodes) {
        let filteredTreeNodes = []

        treeNodes.forEach(treeNode => {
            let parent = this.childToParentMap.get(treeNode)

            if (treeNodes.includes(parent)) {
                return
            }

            filteredTreeNodes.push(treeNode)
        })


        return filteredTreeNodes
    }

    _removeNodeFromParent(node) {
        let parent = this.childToParentMap.get(node)

        if (parent) {
            parent.children.splice(parent.children.indexOf(node), 1)

            this.childToParentMap.delete(node)
        } else {
            this.treeNodes.splice(this.treeNodes.indexOf(node), 1)
        }
    }

    _removeNodesFromParent(nodes) {
        nodes && nodes.forEach(node => {
            this._removeNodeFromParent(node)
        })
    }

    _addNodeAsSibling(sn, tn) {
        let parent = this.childToParentMap.get(tn)

        if (parent) {
            let index = parent.children.indexOf(tn)

            parent.children.splice(index + 1, 0, sn)

            this.childToParentMap.set(sn, parent)
        } else {
            let index = this.treeNodes.indexOf(tn)

            this.treeNodes.splice(index + 1, 0, sn)

            this.childToParentMap.delete(sn)
        }
    }

    _addNodesAsSibling(sns, tn) {
        let parent = this.childToParentMap.get(tn)

        if (parent) {
            let index = parent.children.indexOf(tn)

            parent.children.splice(index + 1, 0, ...sns)

            sns.forEach(sn => {
                this.childToParentMap.set(sn, parent)
            })
        } else {
            let index = this.treeNodes.indexOf(tn)

            this.treeNodes.splice(index + 1, 0, ...sns)
        }
    }

    _addNodeAsChild(sn, tn, head = false) {
        if (!tn.isContainer) {
            return
        }

        if (head) {
            tn.children.unshift(sn)
        } else {
            tn.children.push(sn)
        }

        this.childToParentMap.set(sn, tn)
    }

    _addNodesAsChildren(sns, tn, head = false) {
        if (!tn.isContainer) {
            return
        }

        if (head) {
            tn.children.unshift(...sns)
        } else {
            tn.children.push(...sns)
        }

        sns.forEach(sn => {
            this.childToParentMap.set(sn, tn)
        })
    }
}

export default GHCFlattenTree