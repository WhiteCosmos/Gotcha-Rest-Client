<template>
    <div class="ev-json-viewer-node-wrapper" :class="coloredStyle" @contextmenu="emitShowContextMenu">
        <ev-json-viewer-container-node v-if="isContainerNode"
                                       @toggle-json-node="emitToggleJsonNode"
                                       :node="node"
                                       :index="index"></ev-json-viewer-container-node>

        <ev-json-viewer-primitive-node v-if="isPrimitiveNode"
                                       :node="node"
                                       :index="index"></ev-json-viewer-primitive-node>
    </div>
</template>

<script>
    import EvJsonViewerContainerNode from '@/components/json-viewer/nodes/EvJsonViewerContainerNode'
    import EvJsonViewerPrimitiveNode from '@/components/json-viewer/nodes/EvJsonViewerPrimitiveNode'
    import EvJsonNodeMixin from '@/components/json-editor-vsl/editors/EvJsonNodeMixin'

    export default {
        name: "EvJsonViewerNodeWrapper",

        components: {
            EvJsonViewerPrimitiveNode,
            EvJsonViewerContainerNode
        },

        mixins: [
            EvJsonNodeMixin,
        ],

        props: {
            position: Number
        },

        computed: {
            isContainerNode() {
                return this.node.isContainer
            },

            isPrimitiveNode() {
                return !this.node.isContainer
            },

            coloredStyle() {
                if (this.position % 2 !== 0) {
                    return ['ev-json-viewer-node-wrapper--colored']
                }
            },
        },

        methods: {
            emitShowContextMenu(event) {
                this.$emit('show-context-menu', event, this.node)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-json-viewer-node-wrapper {
        display: flex;

        &--colored {
            background-color: #FAFAFA;
        }
    }
</style>
