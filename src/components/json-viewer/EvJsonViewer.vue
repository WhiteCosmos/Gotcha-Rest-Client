<template>
    <div class="ev-json-viewer">
        <ev-json-viewer-header @toggle-all="handleToggleAll" ref="ev-json-viewer-header"></ev-json-viewer-header>

        <div class="ev-json-viewer-scroll">
            <recycle-scroller class="ev-json-viewer-scroll__scroller"
                              :items="flattenTreeNodes_"
                              key-field="uid"
                              :item-size="28"
                              v-slot="{ item, index }">
                <ev-json-viewer-node-wrapper :node="item"
                                             :position="index"
                                             :index="getJsonNodeIndex(item)"
                                             @toggle-json-node="handleToggleJsonNode"
                                             @show-context-menu="handleShowContextMenu"></ev-json-viewer-node-wrapper>
            </recycle-scroller>
        </div>

        <ev-json-viewer-context-menu
            ref="ev-json-viewer-context-menu"
            :focused-node="focusedNode"
            @copy-json="handleCopyJson"
            @copy-jsonpath="handleCopyJsonpath"
            @expand-all="handleExpandAll"
            @collapse-all="handleCollapseAll"
            @add-assertion="handleAddAssertion"></ev-json-viewer-context-menu>

    </div>
</template>

<script>
    import EvJsonViewerHeader from '@/components/json-viewer/EvJsonViewerHeader'
    import EvJsonViewerNodeWrapper from '@/components/json-viewer/nodes/EvJsonViewerNodeWrapper'
    import GHCJsonNodeBuilder from '@/components/json-editor-vsl/GHCJsonNodeBuilder'
    import GHCFlattenTree from '@/components/mixins/GHCFlattenTree'
    import EvJsonViewerContextMenu from '@/components/json-viewer/EvJsonViewerContextMenu'
    import {clipboard} from 'electron'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import GHCJsonEditorHelper from '@/components/json-editor-vsl/GHCJsonEditorHelper'
    import GHCJson from '@/core/json/GHCJson'

    export default {
        name: "EvJsonViewer",

        components: {
            EvJsonViewerContextMenu,
            EvJsonViewerNodeWrapper,
            EvJsonViewerHeader
        },

        mixins: [
            EvStoreMixin,
        ],

        created() {
            this.initialize()
        },

        watch: {
            jsonStr() {
                this.initialize()
            },
        },

        props: {
            jsonStr: String,
        },

        data() {
            return {
                flattenTree_: undefined,

                flattenTreeNodes_: [],

                focusedNode: undefined,
            }
        },

        computed: {},

        methods: {
            initialize() {
                if (!this.jsonStr) {
                    return
                }

                let builder = new GHCJsonNodeBuilder()

                let root = builder.buildJsonNodeFromJson(GHCJson.parse(this.jsonStr))

                this.flattenTree_ = new GHCFlattenTree([root])

                this.flattenTree_.buildFlattenTree().then(flattenTreeNodes => {
                    this.flattenTreeNodes_ = flattenTreeNodes
                })

                this.$refs['ev-json-viewer-header'] && this.$refs['ev-json-viewer-header'].resetToggleExpandAll()
            },

            getJsonNodeIndex(jsonNode) {
                let parent = this.flattenTree_.getParent(jsonNode)

                return parent ? parent.children.indexOf(jsonNode) : -1
            },

            handleToggleJsonNode(jsonNode) {
                jsonNode.expand = !jsonNode.expand

                if (jsonNode.expand) {
                    this.flattenTree_.expandTreeNode(jsonNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                } else {
                    this.flattenTree_.collapseTreeNode(jsonNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                }
            },

            handleShowContextMenu(event, node) {
                this.focusedNode = node

                let ref = this.$refs['ev-json-viewer-context-menu']

                ref.show(event)
            },

            handleToggleAll(flag) {
                if (flag) {
                    this.flattenTree_.expandAllTreeNodes().then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                } else {
                    this.flattenTree_.collapseAllTreeNodes({skipRoot: true}).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                }
            },

            handleCopyJson(node) {
                let helper = new GHCJsonEditorHelper(this.dynamicVariableRender)

                clipboard.writeText(helper.stringify(node))
            },

            handleCopyJsonpath(node) {
                let helper = new GHCJsonEditorHelper(this.dynamicVariableRender)

                clipboard.writeText(helper.jsonPath(this.flattenTree_, node))
            },

            handleExpandAll(node) {
                this.flattenTree_.expandTreeNodeRecursively(node).then(flattenTreeNodes => {
                    this.flattenTreeNodes_ = flattenTreeNodes
                })
            },

            handleCollapseAll(node) {
                this.flattenTree_.collapseTreeNodeRecursively(node).then(flattenTreeNodes => {
                    this.flattenTreeNodes_ = flattenTreeNodes
                })
            },

            handleAddAssertion(node) {
                let jsonpath = this._extractJsonpath(node)

                this.$emit('add-jsonpath-assertion', jsonpath, node.type, node.value)
            },

            _extractJsonpath(node) {
                let parents = this.flattenTree_.getAllParents(node)

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
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-json-viewer {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        width: 100%;

        height: 100%;
    }

    .ev-json-viewer-scroll {
        position: relative;

        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        height: calc(100% - 28px);

        &__scroller {
            overflow-y: scroll !important; // override overflow-y: auto

            height: 100%;
        }
    }
</style>
