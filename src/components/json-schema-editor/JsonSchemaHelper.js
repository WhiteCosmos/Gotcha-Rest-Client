import JsonSchemaNode
    from '@/components/json-schema-editor/JsonSchemaNode'

/**
 * @created_at 2023/3/9
 * @app_version 1.6.3
 */
class JsonSchemaHelper {
    constructor() {

    }

    parse(json) {
        let toJsonSchema = require('to-json-schema')

        let jsonSchema = toJsonSchema(json)

        return this._toGHCJsonSchema(jsonSchema)
    }

    merge(sNode, tNode) {
        if (!this._isMergeable(sNode, tNode)) {
            return
        }

        this._mergeGHCJsonSchema(sNode, tNode)
    }

    _isMergeable(sNode, tNode) {
        return sNode && (sNode['type'] === 'object') && tNode && (tNode['type'] === 'object')
    }

    _toGHCJsonSchema(schema) {
        let gSchema = JsonSchemaNode.newRootNode()

        let properties = schema['properties']

        for (const key in properties) {
            gSchema.children.push(this._toGHCJsonSchemaRecursively(key, properties[key]))
        }

        return gSchema
    }

    _toGHCJsonSchemaRecursively(key, property) {
        let gSchema

        let type = property['type']

        if (type === 'object') {
            gSchema = JsonSchemaNode.newContainerNode(key, 'object')

            let properties = property['properties']

            for (const key_ in properties) {
                let childNode = this._toGHCJsonSchemaRecursively(key_, properties[key_])

                childNode.isObjectProperty = true

                gSchema.children.push(childNode)
            }
        } else if (type === 'array') {
            gSchema = JsonSchemaNode.newContainerNode(key, 'array')

            let items = property['items']

            let childNode

            if (items) {
                childNode = this._toGHCJsonSchemaRecursively('', items)

                childNode.isArrayItem = true
            } else {
                childNode = JsonSchemaNode.newPrimitiveNode('', 'string')

                childNode.isArrayItem = true
            }

            gSchema.children.push(childNode)
        } else {
            gSchema = JsonSchemaNode.newPrimitiveNode(key, type)
        }

        return gSchema
    }

    _mergeGHCJsonSchema(source, target) {
        // 仅合并，不删除

        let childrenA = source.children

        let childrenB = target.children

        // 查找childrenB中多出来的属性

        childrenB.forEach(pb => {
            let pa = childrenA.find(it => {
                return it.key === pb.key
            })

            if (pa) { // 存在相同的属性，进一步比对
                if (pa.type === 'object' && pb.type === 'object') {
                    this._mergeGHCJsonSchemaRecursively(pa, pb)
                }

                if (pa.type === 'array' && pb.type === 'array') {
                    this._mergeGHCJsonSchemaRecursively(pa, pb)
                }
            } else {
                source.children.push(pb)
            }
        })
    }

    _mergeGHCJsonSchemaRecursively(sNode, tNode) {
        if (sNode.type === 'object' && tNode.type === 'object') {
            tNode.children.forEach(tcNode => {
                let scNode = sNode.children.find(it => {
                    return it.key === tcNode.key
                })

                if (scNode) {
                    this._mergeGHCJsonSchemaRecursively(scNode, tcNode)
                } else {
                    sNode.children.push(tcNode)
                }
            })
        }

        if (sNode.type === 'array' && tNode.type === 'array') {
            let scNode = sNode.children[0]

            let tcNode = tNode.children[0]

            this._mergeGHCJsonSchemaRecursively(scNode, tcNode)
        }

        // 忽略非对象类型
    }
}

export default JsonSchemaHelper