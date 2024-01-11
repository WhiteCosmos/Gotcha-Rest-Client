<template>
    <div class="ev-popup-menu-item">
        <ev-checkbox v-model="status_"></ev-checkbox>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <span class="ev-popup-menu-item__label"
              @click="toggleCheckedStatus"
              :class="labelStyles"><slot></slot></span>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <v-spacer></v-spacer>

        <div class="ev-popup-menu-item__input-container">
            <input type="number" class="ev-popup-menu-item__input-container__input" v-model="compose.value" :disabled="!compose.enable">
        </div>

        <ev-vertical-gutter :gutter="2" v-if="suffix"></ev-vertical-gutter>

        <ev-label size="10" blue v-if="suffix">{{ suffix }}</ev-label>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCheckbox from '@/components/button/EvCheckbox'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvPopupMenuComposeItem",

        components: {
            EvLabel,
            EvBorderlessInput,
            EvCheckbox,
            EvVerticalGutter
        },

        created() {
            this.status_ = this.compose.enable ? 'CHECKED' : "UNCHECKED"
        },

        props: {
            suffix: String,

            compose: {
                type: Object,
                default: () => {
                    return {
                        enable: false,
                        value: 0,
                    }
                }
            }
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
            'compose.enable'(newVal) {
                this.status_ = newVal ? 'CHECKED' : "UNCHECKED"
            },

            status_(newVal) {
                this.compose.enable = (newVal === "CHECKED")
            }
        },

        methods: {
            toggleCheckedStatus() {
                if (this.status_ === 'CHECKED') {
                    this.status_ = 'UNCHECKED'
                } else {
                    this.status_ = 'CHECKED'
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

        width: 160px;

        height: 28px;

        padding-left: 4px;

        border-radius: 3px;

        user-select: none;

        &__icon-container {
            width: 16px;

            height: 16px;

            @include full-center;
        }

        &__input-container {
            display: flex;

            align-items: center;

            width: 40px;

            height: 20px;

            border-radius: 3px;

            border: 1px solid #D8D8D8;

            &__input {
                width: 100%;

                font-size: 11px;

                border: none;

                outline: none;

                text-indent: 4px;
            }
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

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        opacity: 1;
    }
</style>
