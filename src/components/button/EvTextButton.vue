<template>
    <div class="ev-text-button" :class="buttonStyle">
        <div class="ev-text-button__label">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EvTextButton",

        props: {
            noBorder: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            buttonStyle() {
                if (!this.noBorder) {
                    return ['ev-text-button--border']
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-text-button {
        display: flex;

        align-items: center;

        height: 20px;

        width: fit-content;

        padding-left: 8px;

        padding-right: 8px;

        border-radius: 3px;

        user-select: none;

        padding-top: 2px;

        &--border {
            border: 1px solid $PLACEHOLDER_FONT_COLOR;
        }

        &:hover {
            //border: 1px solid $SECONDARY_FONT_COLOR;
        }

        &__label {
            font-size: 11px;

            font-weight: bold;

            color: $PLACEHOLDER_FONT_COLOR;

            &:hover {
                color: $SECONDARY_FONT_COLOR;
            }
        }
    }
</style>
