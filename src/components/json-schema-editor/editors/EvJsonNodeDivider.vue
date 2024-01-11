<template>
    <div class="ev-json-node-divider"
         @click.stop="emitFocusJsonNode">
        <div class="ev-json-node-divider__outer-container"
             @dragenter='handleDragEnter("HIGH")'
             @dragleave='handleDragLeave("HIGH")'
             @dragover.prevent
             @drop="handleDrop"
             :style="outerContainerStyle">
        </div>

        <div v-if="node.isContainer"
             class="ev-json-node-divider__middle-container"
             @dragenter='handleDragEnter("MIDDLE")'
             @dragleave='handleDragLeave("MIDDLE")'
             @dragover.prevent
             @drop="handleDrop">
        </div>

        <div v-if="!node.isContainer"
             class="ev-json-node-divider__inner-container"
             @dragenter='handleDragEnter("MIDDLE")'
             @dragleave='handleDragLeave("MIDDLE")'
             @dragover.prevent
             @drop="handleDrop">
        </div>

        <div v-if="node.isContainer"
             class="ev-json-node-divider__inner-container"
             @dragenter='handleDragEnter("LOW")'
             @dragleave='handleDragLeave("LOW")'
             @dragover.prevent
             @drop="handleDrop">
        </div>

        <ev-json-node-drop-indicator v-if="showIndicator"
                                     :node="node"
                                     :available-layer="availableLayer"></ev-json-node-drop-indicator>

        <div class="ev-json-node-divider__bottom-border"></div>
    </div>
</template>

<script>
    import EvJsonNodeMixin from '@/components/json-schema-editor/mixins/EvJsonSchemaNodeMixin'
    import EvJsonNodeDropIndicator from '@/components/json-schema-editor/editors/EvJsonNodeDropIndicator'
    import _ from 'lodash'
    import EvLabel from '@/components/typography/EvLabel'
    import GHCFlattenTree from '@/components/mixins/GHCFlattenTree'

    export default {
        name: "EvJsonNodeDivider",

        components: {
            EvLabel,
            EvJsonNodeDropIndicator,
        },

        mixins: [
            EvJsonNodeMixin,
        ],

        created() {
            // this.checkUsingDoubleIndicator()
        },

        props: {
            flattenTree: GHCFlattenTree,

            node: Object,

            mousemove: Object,
        },

        data() {
            return {
                actualLayer: undefined,

                availableLayer: undefined, // 在当前节点有效的层级

                availableLayers: [],

                isLowLayerAvailable: false,

                isMiddleLayerAvailable: false,

                isHighLayerAvailable: false,
            }
        },

        computed: {
            showIndicator() {
                return this.draggedNode !== undefined &&
                    (this.isLowLayerAvailable
                        || this.isMiddleLayerAvailable
                        || this.isHighLayerAvailable)
            },

            outerContainerStyle() {
                if (this.node.isContainer) {
                    return {'width': this.node.layer * 16 + 28 + 'px'}
                } else {
                    return {'width': this.node.layer * 16 + 44 + 'px'}
                }
            },
        },

        methods: {
            handleDragEnter(layer) {
                if (!this.draggedNode) {
                    return
                }

                this.availableLayers = this.flattenTree.getAvailableLayers(this.node)

                this.availableLayer = this.flattenTree.getAvailableLayer(this.node, layer)

                this.actualLayer = layer

                switch (this.availableLayer) {
                    case 'LOW':
                        this.isLowLayerAvailable = true
                        this.isMiddleLayerAvailable = false
                        this.isHighLayerAvailable = false
                        return
                    case 'MIDDLE':
                        this.isLowLayerAvailable = false
                        this.isMiddleLayerAvailable = true
                        this.isHighLayerAvailable = false
                        return
                    case 'HIGH':
                        this.isLowLayerAvailable = false
                        this.isMiddleLayerAvailable = false
                        this.isHighLayerAvailable = true
                        return
                }
            },

            handleDragLeave(layer) {
                if (!this.draggedNode) {
                    return
                }

                if (!this.draggedNode) {
                    return
                }

                if (layer === this.actualLayer && layer === this.availableLayer) {
                    this.hideDivider(this.availableLayer)
                    return
                }

                if (layer !== this.actualLayer && layer === this.availableLayer) {
                    return
                }

                if (layer === this.actualLayer && layer !== this.availableLayer) {
                    this.hideDivider(this.availableLayer)
                }
            },

            hideDivider(layer) {
                switch (layer) {
                    case 'LOW':
                        this.isLowLayerAvailable = false
                        return
                    case 'MIDDLE':
                        this.isMiddleLayerAvailable = false
                        return
                    case 'HIGH':
                        this.isHighLayerAvailable = false
                        return
                }

                if (!this.isLowLayerAvailable &&
                    !this.isMiddleLayerAvailable &&
                    !this.isHighLayerAvailable) {
                    this.availableLayer = undefined
                }
            },

            handleDrop() {
                this.emitDropJsonNode(this.node, this.availableLayer)

                this.isLowLayerAvailable = false

                this.isMiddleLayerAvailable = false

                this.isHighLayerAvailable = false

                this.availableLayers = []

                this.availableLayer = undefined

                this.actualLayer = undefined
            },

            checkIsLastNode() {
                if (this.node.isContainer && this.node.expand && !_.isEmpty(this.node.children)) {
                    return false
                }

                return this.parentNode && _.last(this.parentNode.children) === this.node
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonSchemaEditor";

    .ev-json-node-divider {
        position: relative;

        display: flex;

        align-items: center;

        flex-shrink: 0;

        width: 100%;

        height: 12px;

        &__bottom-border {
            position: absolute;

            height: 1px;

            width: 100%;

            background-color: #F1F1F1;

            z-index: -999;
        }

        &__outer-container {
            display: flex;

            align-items: center;

            height: 12px;

            //background-color: #9acc68;
        }

        &__middle-container {
            display: flex;

            align-items: center;

            height: 12px;

            width: 24px;

            //background-color: blue;
        }

        &__inner-container {
            display: flex;

            align-items: center;

            flex: 1;

            height: 12px;

            //background-color: #FF8282;
        }
    }
</style>
