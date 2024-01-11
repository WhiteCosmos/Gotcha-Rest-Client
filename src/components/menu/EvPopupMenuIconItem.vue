<template>
    <div class="ev-popup-menu-item">
        <div class="ev-popup-menu-item__icon-container">
            <slot name="icon">
                <v-icon size="10" color="#FF8282">fa-trash-alt</v-icon>
            </slot>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <span class="ev-popup-menu-item__label" :class="labelStyles"><slot name="label"></slot></span>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvPopupMenuIconItem",

        components: {
            EvVerticalGutter
        },

        props: {
            warn: {
                type: Boolean,
                default: false
            },

            delete: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            labelStyles() {
                if (this.warn) {
                    return ['ev-popup-menu-item__label--warn']
                } else {
                    return ['ev-popup-menu-item__label--default']
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-popup-menu-item {
        display: flex;

        align-items: center;

        flex-shrink: 0;

        height: 28px;

        width: 100%;

        padding-left: 8px;

        padding-right: 8px;

        border-radius: 3px;

        user-select: none;

        &__icon-container {
            width: 16px;

            height: 16px;

            @include full-center;
        }

        &__label {
            font-size: 10px;

            line-height: 16px;

            font-weight: bold;

            padding-top: 2px;

            color: $PRIMARY_FONT_COLOR;

            &--default {
                color: $PRIMARY_FONT_COLOR;
            }

            &--warn {
                color: darken($RED_COLOR, 5%);
            }
        }

        &:hover {
            background-color: #E0E0E0;
        }
    }
</style>
