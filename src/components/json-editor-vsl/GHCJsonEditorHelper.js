import GHCJsonNodeBuilder
    from '@/components/json-editor-vsl/GHCJsonNodeBuilder'
import {
    clipboard
} from 'electron'

/**
 * @created_at 2023/3/9
 * @app_version 1.6.3
 */
class GHCJsonEditorHelper {
    constructor(dynamicVariableRender) {
        this.dynamicVariableRender = dynamicVariableRender
    }

    merge(sNode, tNode) {
        if (!this._isMergeable(sNode, tNode)) {
            // TODO 抛出异常
            return
        }

        if (tNode.type === 'object') {
            this._mergeRecursively(sNode, tNode)
        }

        if (tNode.type === 'array') {
            sNode.children.push(...tNode.children)
        }
    }

    stringify(node) {
        let builder = new GHCJsonNodeBuilder(this.dynamicVariableRender)

        let json = builder.buildJsonFromJsonNode(node)

        return JSON.stringify(json, null, 4)
    }

    jsonPath(flattenTree, node) {
        let parents = flattenTree.getAllParents(node)

        parents.push(node)

        let jsonpath = '$'

        for (let i = 0; i < parents.length; i++) {
            let previous = i > 0 ? parents[i - 1] : undefined

            let parent = parents[i]

            if (parent.isRoot) {
                continue
            }

            if (parent.isObjectProperty) {
                jsonpath += '.' + parent.key
            }

            if (parent.isArrayItem) {
                let index = previous.children.indexOf(parent)

                jsonpath += `[${index}]`
            }
        }

        return jsonpath
    }

    _isMergeable(sNode, tNode) {
        return sNode.type === tNode.type
    }

    _mergeRecursively(sNode, tNode) {
        sNode.isObjectProperty = tNode.isObjectProperty

        sNode.isArrayItem = tNode.isArrayItem

        if (PRIMITIVE_TYPES.includes(sNode.type)) {
            sNode.type = tNode.type

            if (PRIMITIVE_TYPES.includes(tNode.type)) {
                sNode.value = tNode.value
            } else {
                sNode.isContainer = true

                sNode.children.push(...tNode.children)
            }
        }

        if (sNode.type === 'array') {
            if (sNode.type === tNode.type) {
                sNode.children.push(...tNode.children)
            } else {
                if (PRIMITIVE_TYPES.includes(tNode.type)) {
                    sNode.value = tNode.value
                } else {
                    sNode.children = tNode.children // array -> object
                }
            }
        }

        if (sNode.type === 'object') {
            if (sNode.type === tNode.type) {
                let sChildren = sNode.children

                let tChildren = tNode.children

                let addedItems = _.differenceBy(tChildren, sChildren, 'key')

                sNode.children.push(...addedItems)

                sChildren.forEach(scNode => {
                    let tcNode = tChildren.find(it => {
                        return it.key === scNode.key
                    })

                    tcNode && this._mergeRecursively(scNode, tcNode)
                })

                // 暂时不作删除操作

                // let deletedItems = _.differenceBy(sChildren, tChildren, 'key')
            } else {
                if (PRIMITIVE_TYPES.includes(tNode.type)) {
                    sNode.isContainer = false

                    sNode.value = tNode.value
                } else {
                    sNode.children = tNode.children // object -> array
                }
            }
        }
    }
}

const PRIMITIVE_TYPES = ['string', 'number', 'boolean', 'null']

export default GHCJsonEditorHelper