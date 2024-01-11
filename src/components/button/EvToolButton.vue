<template>
    <div class="ev-tool-button"
         :class="buttonStyle"
         @mousedown="click = true"
         @mouseup="click = false"
         @mouseleave="click= false">
        <div class="ev-center" style="user-select: none" :class="slotStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EvToolButton",

        props: {
            border: Boolean,

            large: String,

            small: Boolean,
        },

        data() {
            return {
                click: false,
            }
        },

        computed: {
            buttonStyle() {
                return {
                    'ev-tool-button--click': this.click,
                    'ev-tool-button--border': this.border,
                    'ev-tool-button--large': this.large,
                    'ev-tool-button--normal': !this.small && !this.large,
                    'ev-tool-button--small': this.small,
                }
            },

            slotStyle() {
                return {
                    'a-little-small': this.click
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../style/common";

    .a-little-small {
        transform: translateY(1px);
    }

    .ev-tool-button--border {
        border: 1px solid $SECONDARY_COLOR;
    }

    .ev-tool-button--large {
        min-width: 30px;

        height: 30px;
    }

    .ev-tool-button--normal {
        width: 28px;

        height: 28px;
    }

    .ev-tool-button--small {
        width: 20px;

        height: 20px;
    }

</style>
