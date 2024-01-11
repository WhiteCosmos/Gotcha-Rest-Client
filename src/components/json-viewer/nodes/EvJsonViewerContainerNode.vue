<template>
    <div class="ev-json-viewer-node" @contextmenu="">
        <div class="ev-json-viewer-node__key-part">
            <ev-vertical-gutter :gutter="16 * (node.layer)"></ev-vertical-gutter>

            <div class="ev-json-viewer-node__widget">
                <ev-json-expand-button :node="node"
                                       @toggle-json-node="emitToggleJsonNode"></ev-json-expand-button>
            </div>

            <ev-label size="11" bold primary v-if="node.isRoot">Root</ev-label>

            <ev-label size="11" secondary v-if="node.isArrayItem">Idx {{ index }}</ev-label>

            <ev-label size="12" primary v-else v-bind="{ bold: node.expand }">{{ node.key }}</ev-label>
        </div>

        <div class="ev-json-viewer-node__type-part">
            <ev-json-viewer-node-type :type="node.type"></ev-json-viewer-node-type>
        </div>

        <div class="ev-json-viewer-node__value-part">
            <ev-label size="11" grey>{{ itemsCounter }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvDataTypeArrayIcon from '@/assets/icons/EvDataTypeArrayIcon'
    import EvJsonExpandButton from '@/components/json-editor-vsl/components/EvJsonExpandButton'
    import EvJsonViewerNodeType from '@/components/json-viewer/nodes/EvJsonViewerNodeType'
    import EvJsonNodeMixin from '@/components/json-editor-vsl/editors/EvJsonNodeMixin'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvJsonViewerContainerNode",

        components: {
            EvVerticalGutter,
            EvJsonViewerNodeType,
            EvJsonExpandButton,
            EvDataTypeArrayIcon,
            EvLabel
        },

        mixins: [
            EvJsonNodeMixin,
        ],

        computed: {
            itemsCounter() {
                let length = this.node.children.length

                if (this.node.type === 'object') {
                    return length > 1 ? `${length} Properties` : `${length} Property`
                }

                if (this.node.type === 'array') {
                    return length > 1 ? `${length} Items` : `${length} Item`
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonViewer.scss";

</style>
