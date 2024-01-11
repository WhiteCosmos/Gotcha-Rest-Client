<script>
    import RabiTreeViewNodeType from '@/components/api-tree/data/RabiTreeViewNodeType'

    export default {
        name: "EvTreeViewNodeMixin",

        props: {
            node: Object,

            parentNode: Object,

            selectedNode: Object,

            focusedNode: Object,

            focusedNodes: Array,

            copiedNode: Object,

            copiedNodes: Array,

            movedNode: Object,

            movedNodes: Array,

            draggedNode: Object,

            draggedNodes: Array,

            shift: Boolean,

            command: Boolean,

            // Display

            highlight: String,
        },

        computed: {
            nodeLength() {
                return this.node.children.length
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
            checkIsHttpDefinition(node) {
                return node && node.type === RabiTreeViewNodeType.HTTP_DEFINITION
            },

            checkIsHttpRequest(node) {
                return node && (node.type === RabiTreeViewNodeType.HTTP_REQUEST || node.type === RabiTreeViewNodeType.WEBSOCKET_REQUEST)
            },

            checkIsHttpMock(node) {
                return node && node.type === RabiTreeViewNodeType.HTTP_MOCK
            },

            checkIsGroup(node) {
                return node && node.type === RabiTreeViewNodeType.GROUP
            },

            // Events

            emitUpdateTreeViewNode() {
                this.$emit('update-tree-view-node', this.node)
            },

            emitFocusTreeViewNode() {
                this.$emit('focus-tree-view-node', this.node)
            },

            emitSelectTreeViewNode() {
                this.$emit('select-tree-view-node', this.node)
            },

            emitToggleTreeViewNode() {
                this.$emit('toggle-tree-view-node', this.node)
            },

            emitToggleTreeViewNodeChecked() {
                this.$emit('toggle-tree-view-node-checked', this.node)
            },

            emitAddTreeViewNode() {
                this.$emit('add-tree-view-node', this.node)
            },

            emitAddSiblingTreeViewNode() {
                this.$emit('add-sibling-tree-view-node', this.node)
            },

            emitGroupTreeViewNodes() {
                this.$emit('group-tree-view-nodes')
            },

            emitUngroupTreeViewNodes() {
                this.$emit('ungroup-tree-view-nodes')
            },

            emitRenameTreeViewNode() {
                this.$emit('rename-tree-view-node', this.node)
            },

            emitCopyTreeViewNode() {
                this.$emit('copy-tree-view-node', this.node)
            },

            emitMoveTreeViewNode() {
                this.$emit('move-tree-view-node', this.node)
            },

            emitDuplicateTreeViewNode() {
                this.$emit('duplicate-tree-view-node', this.node)
            },

            emitPasteTreeViewNode() {
                this.$emit('paste-tree-view-node', this.node)
            },

            emitRemoveTreeViewNode() {
                this.$emit('remove-tree-view-node', this.node)
            },

            emitDragTreeViewNode() {
                this.$emit('drag-tree-view-node', this.node)
            },

            emitDropTreeViewNode(node, location) {
                this.$emit('drop-tree-view-node', node, location)
            },

            emitShowContextMenu($event) {
                this.$emit('show-context-menu', $event, this.node)
            },

            emitImportFrom(target) {
                this.$emit('import-from', this.node, target)
            },

            emitOpenImportFromFileDialog() {
                this.$emit('open-import-from-file-dialog')
            },

            emitExportTo(target) {
                this.$emit('export-to', this.node, target)
            },
        }
    }
</script>