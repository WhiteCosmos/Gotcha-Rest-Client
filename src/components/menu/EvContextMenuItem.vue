<template>
    <v-hover v-slot="{ hover }">
        <div class="ev-context-menu-item" :class="{'ev-context-menu-item--hover': hover && !disabled }">
            <span class="ev-context-menu-item__label" :class="{'ev-context-menu-item__label--hover': hover && !disabled, 'ev-context-menu-item__label--disabled': disabled }"><slot></slot></span>

            <v-spacer></v-spacer>

            <span v-for="key in hotkeys" class="ev-context-menu-item__hotkey" :class="{'ev-context-menu-item__hotkey--hover': hover}">{{ key }}</span>

            <slot name="tag"></slot>
        </div>
    </v-hover>
</template>

<script>
    export default {
        name: "EvContextMenuItem",

        props: {
            warn: {
                type: Boolean,
                default: false
            },

            duplicate: {
                type: Boolean,
                default: false
            },

            rename: {
                type: Boolean,
                default: false
            },

            delete: {
                type: Boolean,
                default: false
            },

            hotkeys: {
                type: Array,
                default: () => {
                    return []
                }
            },

            disabled: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            labelStyles() {
                if (this.warn) {
                    return ['ev-context-menu-item__label--warn']
                } else {
                    return ['ev-context-menu-item__label--default']
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-context-menu-item {
        @include horizon-center;

        min-width: 96px;

        height: 24px;

        padding-left: 8px;

        padding-right: 8px;

        border-radius: 4px;

        user-select: none;

        padding-top: 1px;

        &--hover {
            background-color: $PRIMARY_COLOR;
        }

        &__hotkey {
            font-size: 10px;

            line-height: 16px;

            color: $PLACEHOLDER_FONT_COLOR;

            &--hover {
                color: white;
            }
        }

        &__label {
            font-family: "SF Pro", sans-serif;

            font-size: 11px;

            line-height: 16px;

            font-weight: 600;

            &--hover {
                color: white;
            }

            &--disabled {
                color: $PLACEHOLDER_FONT_COLOR;
            }

            &--default {
                color: $PRIMARY_FONT_COLOR;
            }

            &--warn {
                color: darken($RED_COLOR, 5%);
            }
        }
    }
</style>
