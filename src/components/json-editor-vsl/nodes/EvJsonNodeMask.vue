<template>
    <div class="ev-json-node-mask" :class="maskStyle">

    </div>
</template>

<script>
    export default {
        name: "EvJsonNodeMask",

        props: {
            focused: Boolean,
        },

        computed: {
            maskStyle() {
                if (this.focused) {
                    return ['ev-json-node-mask--focused']
                } else {
                    return ['ev-json-node-mask--opacity']
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-json-node-mask {
        position: absolute;

        display: flex;

        flex-shrink: 0;

        width: 100%;

        height: 28px;

        bottom: -6px;

        &--focused {
            background-color: #F1F1F1;

            opacity: 0.5;

            z-index: -1;
        }

        &--opacity {
            background-color: #FAFAFA;

            opacity: 0.5;
        }
    }
</style>
