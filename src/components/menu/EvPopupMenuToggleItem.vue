<template>
    <div class="ev-popup-menu-item">
        <ev-checkbox v-model="status_"></ev-checkbox>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <span class="ev-popup-menu-item__label"
              @click="toggleCheckedStatus"
              :class="labelStyles"><slot></slot></span>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCheckbox from '@/components/button/EvCheckbox'

    export default {
        name: "EvPopupMenuToggleItem",

        components: {
            EvCheckbox,
            EvVerticalGutter
        },

        created() {
            this.status_ = this.flag ? 'CHECKED' : "UNCHECKED"
        },

        model: {
            prop: "flag",
            event: "toggle"
        },

        props: {
            flag: Boolean,

            light: Boolean,

            dark: Boolean,
        },

        computed: {
            labelStyles() {
                if (this.flag) {
                    return ['ev-popup-menu-item__label--checked']
                } else {
                    return ['ev-popup-menu-item__label--unchecked']
                }
            }
        },

        data() {
            return {
                status_: "CHECKED",
            }
        },

        watch: {
            flag(newVal) {
                this.status_ = newVal ? 'CHECKED' : "UNCHECKED"
            },
            status_(newVal) {
                if (newVal === "CHECKED") {
                    this.$emit('toggle', true)
                } else {
                    this.$emit('toggle', false)
                }
            }
        },

        methods: {
            toggleCheckedStatus() {
                if (this.status_ === 'CHECKED') {
                    this.status_ = 'UNCHECKED'
                } else {
                    this.status_ = 'CHECKED'
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-popup-menu-item {
        display: flex;

        align-items: center;

        width: fit-content;

        height: 28px;

        padding-left: 4px;

        border-radius: 3px;

        user-select: none;

        &__icon-container {
            width: 16px;

            height: 16px;

            @include full-center;
        }

        &__label {
            font-size: 11px;

            line-height: 16px;

            font-weight: bold;

            padding-top: 2px;

            &--checked {
                color: $PRIMARY_FONT_COLOR;
            }

            &--unchecked {
                color: $SECONDARY_FONT_COLOR;
            }
        }
    }
</style>
