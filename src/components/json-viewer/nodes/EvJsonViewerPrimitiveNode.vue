<template>
    <div class="ev-json-viewer-node" @contextmenu="">
        <div class="ev-json-viewer-node__key-part">
            <div class="ev-json-viewer-node__widget">

            </div>

            <ev-vertical-gutter :gutter="16 * (node.layer)"></ev-vertical-gutter>

            <ev-label size="12" secondary v-if="node.isArrayItem">Idx {{ index }}</ev-label>

            <ev-label size="12" selectable v-else>{{ node.key }}</ev-label>
        </div>

        <div class="ev-json-viewer-node__type-part">
            <ev-json-viewer-node-type :type="node.type"></ev-json-viewer-node-type>
        </div>

        <div class="ev-json-viewer-node__value-part">
            <div class="d-flex" v-if="isNullType">
                <ev-label size="11" grey bold>null</ev-label>
            </div>

            <div class="ev-json-viewer-node__value-part--text" v-else>
                <div class="d-flex" v-if="isStringType">
                    <ev-label size="12" selectable text-truncate primary v-if="node.value">{{ node.value }}</ev-label>

                    <ev-label size="12" grey v-else>{{ '\" \"' }}</ev-label>
                </div>

                <div class="d-flex" v-if="isNumberType">
                    <ev-label size="12" selectable text-truncate orange>{{ node.value }}</ev-label>
                </div>

                <div class="d-flex" v-if="isBooleanType">
                    <ev-label size="12" selectable text-truncate color="#32d74b" v-if="node.value">true</ev-label>

                    <ev-label size="12" selectable text-truncate color="#ff453a" v-else>false</ev-label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvDataTypeStringIcon from '@/assets/icons/EvDataTypeStringIcon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvJsonViewerNodeType from '@/components/json-viewer/nodes/EvJsonViewerNodeType'

    export default {
        name: "EvJsonViewerPrimitiveNode",

        components: {
            EvJsonViewerNodeType,
            EvVerticalGutter,
            EvDataTypeStringIcon,
            EvLabel
        },

        props: {
            node: Object,

            index: Number,
        },

        computed: {
            isNumberType() {
                return this.node && this.node.type === 'number'
            },

            isStringType() {
                return this.node && this.node.type === 'string'
            },

            isBooleanType() {
                return this.node && this.node.type === 'boolean'
            },

            isNullType() {
                return this.node && this.node.type === 'null'
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonViewer.scss";

</style>
