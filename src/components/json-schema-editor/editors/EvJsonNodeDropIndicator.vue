<template>
    <div class="ev-json-node-drop-indicator" :style="indicatorStyle">
        <ev-json-node-drop-indicator-header></ev-json-node-drop-indicator-header>

        <div class="ev-json-node-drop-indicator__line"></div>
    </div>
</template>

<script>
    import EvJsonNodeDropIndicatorHeader from '@/components/json-editor-vsl/editors/EvJsonNodeDropIndicatorHeader'

    export default {
        name: "EvJsonNodeDropIndicator",

        components: {
            EvJsonNodeDropIndicatorHeader
        },

        props: {
            node: Object,

            availableLayer: String,
        },

        computed: {
            indicatorStyle() {
                if (this.node.isContainer) {
                    return this.containerLayerStyle[this.availableLayer]
                } else {
                    return this.layerStyle[this.availableLayer]
                }
            },
        },

        data() {
            return {
                containerLayerStyle: {
                    'LOW': {
                        'padding-left': this.node.layer * 16 + 44 + 'px'
                    },

                    'MIDDLE': {
                        'padding-left': this.node.layer * 16 + 32 + 'px'
                    },

                    'HIGH': {
                        'padding-left': this.node.layer * 16 + 16 + 'px'
                    },
                },

                layerStyle: {
                    'MIDDLE': {
                        'padding-left': this.node.layer * 16 + 32 + 'px'
                    },

                    'HIGH': {
                        'padding-left': this.node.layer * 16 + 16 + 'px'
                    },
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-json-node-drop-indicator {
        position: absolute;

        display: flex;

        align-items: center;

        align-self: center;

        width: 100%;

        pointer-events: none;

        z-index: 1;

        &__circle {
            display: flex;

            width: 6px;

            height: 6px;

            border-radius: 6px;

            background-color: #007aff;
        }

        &__line {
            display: flex;

            flex: 1;

            height: 2px;

            border-radius: 0px 2px 2px 0px;

            background-color: #007aff;
        }
    }
</style>
