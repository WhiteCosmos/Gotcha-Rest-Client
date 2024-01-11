<template>
    <div class="ev-tree-view-node-divider">
        <div class="ev-tree-view-node-divider__outer-container"
             @dragenter='handleDragEnter("HIGH")'
             @dragleave='handleDragLeave("HIGH")'
             @dragover.prevent
             @drop="handleDrop"
             :style="outerContainerStyle">
        </div>

        <div v-if="node.isContainer"
             class="ev-tree-view-node-divider__middle-container"
             @dragenter='handleDragEnter("MIDDLE")'
             @dragleave='handleDragLeave("MIDDLE")'
             @dragover.prevent
             @drop="handleDrop">
        </div>

        <div v-if="!node.isContainer"
             class="ev-tree-view-node-divider__inner-container"
             @dragenter='handleDragEnter("MIDDLE")'
             @dragleave='handleDragLeave("MIDDLE")'
             @dragover.prevent
             @drop="handleDrop">
        </div>

        <div v-if="node.isContainer"
             class="ev-tree-view-node-divider__inner-container"
             @dragenter='handleDragEnter("LOW")'
             @dragleave='handleDragLeave("LOW")'
             @dragover.prevent
             @drop="handleDrop">
        </div>

        <ev-tree-view-node-drop-indicator v-if="showIndicator"
                                          :node="node"
                                          :available-layer="availableLayer"></ev-tree-view-node-drop-indicator>
    </div>
</template>

<script>
    import EvTreeViewNodeMixin from '@/components/api-tree/mixins/EvTreeViewNodeMixin'
    import EvJsonNodeDropIndicator from '@/components/json-editor-vsl/editors/EvJsonNodeDropIndicator'
    import EvTreeViewNodeDropIndicator from '@/components/api-tree/components/EvTreeViewNodeDropIndicator'
    import GHCFlattenTree from '@/components/mixins/GHCFlattenTree'

    export default {
        name: "EvTreeViewNodeDivider",

        components: {
            EvTreeViewNodeDropIndicator,
            EvJsonNodeDropIndicator
        },

        mixins: [
            EvTreeViewNodeMixin
        ],

        props: {
            flattenTree: GHCFlattenTree,
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
                    return {'width': this.node.layer * 16 + 'px'}
                } else {
                    return {'width': this.node.layer * 16 + 4 + 'px'}
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

                // console.log("handleDragEnter", this.node.name, layer, this.availableLayer)

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

            /**
             * 不要去思考这个为什么成立，它就是能用(笑
             *
             * @param layer
             */
            handleDragLeave(layer) {
                if (!this.draggedNode) {
                    return
                }

                // console.log(`handleDragLeave ${this.node.name} layer ${layer} actualLayer ${this.actualLayer} availableLayer ${this.availableLayer}`)

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
                this.emitDropTreeViewNode(this.node, this.availableLayer)

                this.isLowLayerAvailable = false

                this.isMiddleLayerAvailable = false

                this.isHighLayerAvailable = false

                this.availableLayers = []

                this.availableLayer = undefined

                this.actualLayer = undefined
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-tree-view-node-divider {
        position: relative;

        display: flex;

        align-items: center;

        flex-shrink: 0;

        width: 100%;

        height: 8px;

        &__outer-container {
            display: flex;

            align-items: center;

            height: 8px;

            //background-color: #9acc68;
        }

        &__middle-container {
            display: flex;

            align-items: center;

            height: 8px;

            width: 20px;

            //background-color: blue;
        }

        &__inner-container {
            display: flex;

            align-items: center;

            flex: 1;

            height: 8px;

            //background-color: #FF8282;
        }
    }
</style>
