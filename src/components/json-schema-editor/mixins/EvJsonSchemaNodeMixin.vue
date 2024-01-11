<script>
    import _ from 'lodash'
    import JsonSchemaNode from '@/components/json-schema-editor/JsonSchemaNode'

    export default {
        name: "EvJsonNodeMixin",

        props: {
            node: Object,

            parentNode: Object,

            selectedNode: Object,

            focusedNode: Object,

            focusedNodes: Array,

            movedNode: Object,

            movedNodes: Array,

            copiedNode: Object,

            copiedNodes: Array,

            draggedNode: Object,

            draggedNodes: Array,

            // hotkeys

            shift: Boolean,

            command: Boolean,

            // status

            index: Number, // index in container's children

            position: Number, // index in the flatten tree
        },

        data() {
            return {
                jsonTypes: {
                    object: 'object',

                    array: 'array',

                    dictionary: 'dictionary',

                    reference: 'reference',

                    string: 'string',

                    number: 'number',

                    integer: "integer",

                    boolean: 'boolean',

                    file: 'file',
                },

                containerTypes: [
                    'object',
                    'array',
                    'dictionary',
                    'reference'
                ],

                containerTypes_: [],

                primitiveTypes: [
                    'string',
                    'number',
                    'boolean',
                ],

                location: {
                    inner: 'inner',
                    outer: 'outer'
                }
            }
        },

        computed: {
            isContainerNode() {
                return this.node && this.containerTypes.includes(this.node.type)
            },

            isPrimitiveNode() {
                return this.node && this.containerTypes.includes(this.node.type)
            },

            isObjectNode() {
                return this.node && (this.node.type === this.jsonTypes.object)
            },

            isDictionaryNode() {
                return this.node && (this.node.type === this.jsonTypes.dictionary)
            },

            isReferenceNode() {
                return this.node && this.node.type === this.jsonTypes.reference
            },

            isRecursiveNode() {
                return this.node && this.node.isRecursive
            },

            isArrayNode() {
                return this.node && this.node.type === this.jsonTypes.array
            },

            isArrayItem() {
                return this.node && this.node.isArrayItem
            },

            isFileNode() {
                return this.node && this.node.type === this.jsonTypes.file
            },

            isStringNode() {
                return this.node &&
                    (this.node.type === this.jsonTypes.string || this.node.type === 'text') // 兼容旧版本
            },

            isNumberNode() {
                return this.node && this.node.type === this.jsonTypes.number
            },

            isIntegerNode() {
                return this.node && this.node.type === this.jsonTypes.integer
            },

            isBooleanNode() {
                return this.node && this.node.type === this.jsonTypes.boolean
            },

            isRootNode() {
                return this.node && this.node.isRoot
            },

            nodeLength() {
                return this.node.children.length
            },

            isEmptyNode() {
                return this.node && _.isEmpty(this.node.key) && _.isEmpty(this.node.value)
            },

            isEmptyContainer() {
                return this.node && _.isEmpty(this.node.children)
            },

            isNodeSelected() {
                return this.node
                    && this.selectedNode && (this.node === this.selectedNode)
            },

            isNodeFocused() {
                return (this.node && this.focusedNode && (this.node === this.focusedNode)) ||
                    (this.node && this.focusedNodes.includes(this.node))
            },

            isNodeCopied() {
                return this.node && (this.node === this.copiedNode || this.copiedNodes.includes(this.node))
            },

            isNodeMoved() {
                return this.node && (this.node === this.movedNode || this.movedNodes.includes(this.node))
            },

            isNodeDragged() {
                return this.node && this.draggedNode && (this.node === this.draggedNode)
            }
        },

        methods: {
            transformNodeWithType(node, type) {
                switch (type) {
                    case this.jsonTypes.object:
                        this.transformToObjectNode(node)
                        return
                    case this.jsonTypes.array:
                        this.transformToArrayNode(node)
                        return
                    case this.jsonTypes.string:
                        this.transformToStringNode(node)
                        return
                    case this.jsonTypes.number:
                        this.transformToNumberNode(node)
                        return
                    case this.jsonTypes.boolean:
                        this.transformToBooleanNode(node)
                        return
                    case this.jsonTypes.null_:
                        this.transformToNullNode(node)
                        return
                }
            },

            transformToObjectNode(node) {
                node.type = this.jsonTypes.object

                node.$ref = undefined

                node.value = undefined

                node.isContainer = true

                node.isRecursive = false

                node.expand = true

                node.children = []
            },

            transformToArrayNode(node) {
                node.type = this.jsonTypes.array

                node.$ref = undefined

                node.value = undefined

                node.isContainer = true

                node.isRecursive = false

                node.expand = true

                let item = new JsonSchemaNode()

                item.type = this.jsonTypes.string

                item.isArrayItem = true

                node.children = [item]
            },

            transformToDictionaryNode(node) {
                node.type = this.jsonTypes.dictionary

                node.$ref = undefined

                node.value = undefined

                node.isContainer = true

                node.isRecursive = false

                node.expand = true

                let keyItem = new JsonSchemaNode()

                keyItem.type = this.jsonTypes.string

                keyItem.isDictionaryKey = true

                let valueItem = new JsonSchemaNode()

                valueItem.type = this.jsonTypes.string

                valueItem.isDictionaryValue = true

                node.children = [keyItem, valueItem]
            },

            transformToStringNode(node) {
                node.type = this.jsonTypes.string

                node.$ref = undefined

                node.value = ''

                node.valuePlaceholder = '\" \"'

                node.isContainer = false

                node.isRecursive = false

                node.children = []
            },

            transformToFileNode(node) {
                node.type = this.jsonTypes.file

                node.$ref = undefined

                node.value = ''

                node.valuePlaceholder = '\" \"'

                node.isContainer = false

                node.isRecursive = false

                node.children = []
            },

            transformToNumberNode(node, type) {
                node.type = type || this.jsonTypes.number

                node.$ref = undefined

                node.value = null

                node.valuePlaceholder = '0'

                node.isContainer = false

                node.isRecursive = false

                node.children = []
            },

            transformToBooleanNode(node) {
                node.type = this.jsonTypes.boolean

                node.$ref = undefined

                node.value = false

                node.isContainer = false

                node.isRecursive = false

                node.children = []
            },

            transformToNullNode(node) {
                node.type = this.jsonTypes.null_

                node.$ref = undefined

                node.value = null

                node.isContainer = false

                node.isRecursive = false

                node.children = []
            },

            emitFocusJsonNode() {
                this.$emit('focus-json-node', this.node)
            },

            emitToggleJsonNode() {
                this.$emit('toggle-json-node', this.node)
            },

            emitToggleJsonNodeChecked() {
                this.$emit('toggle-json-node-checked', this.node)
            },

            emitAddJsonNode() {
                this.$emit('add-json-node', this.node)
            },

            emitAddSiblingJsonNode() {
                this.$emit('add-sibling-json-node', this.node)
            },

            emitCopyJsonNode() {
                this.$emit('copy-json-node', this.node)
            },

            emitCutJsonNode() {
                this.$emit('cut-json-node', this.node)
            },

            emitPasteJsonNode() {
                this.$emit('paste-json-node', this.node)
            },

            emitRemoveJsonNode() {
                this.$emit('remove-json-node', this.node)
            },

            emitDragJsonNode() {
                this.$emit('drag-json-node', this.node)
            },

            emitDropJsonNode(node, location) {
                this.$emit('drop-json-node', node, location)
            },

            emitShowContextMenu($event) {
                this.$emit('show-context-menu', $event, this.node)
            },

            emitChangeJsonNodeType() {
                this.$emit('change-json-node-type', this.node)
            },
        }
    }
</script>