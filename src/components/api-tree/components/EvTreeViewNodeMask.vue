<template>
    <div class="ev-tree-view-node-mask" :class="maskStyle">

    </div>
</template>

<script>
    export default {
        name: "EvTreeViewNodeMask",

        props: {
            group: Boolean, // if group node, change height
        },

        computed: {
            maskStyle() {
                return {
                    'ev-tree-view-node-mask--group': this.group,
                    'ev-tree-view-node-mask--primitive': !this.group,
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-tree-view-node-mask {
        position: absolute;

        display: flex;

        flex-shrink: 0;

        width: 100%;

        background-color: white;

        opacity: 0.5;

        pointer-events: none;

        //bottom: -12px;

        &--group {
            height: 28px;
        }

        &--primitive {
            height: 48px;
        }
    }
</style>
