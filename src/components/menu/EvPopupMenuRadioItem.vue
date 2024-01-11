<template>
    <div class="ev-popup-menu-item">
        <div class="ev-popup-menu-item__icon-container" @click="doClick">
            <div class="ev-popup-menu-item__radio" :class="radioStyle">
                <div class="ev-popup-menu-item__radio-dot" v-if="isSelected"></div>
            </div>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <span class="ev-popup-menu-item__label" :class="labelStyles" @click="doClick"><slot></slot></span>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCheckbox from '@/components/button/EvCheckbox'
    import EvRadio from '@/components/form/EvRadio'
    import EvEditableLabel from '@/components/input/EvEditableLabel'

    export default {
        name: "EvPopupMenuRadioItem",

        components: {
            EvEditableLabel,
            EvRadio,
            EvCheckbox,
            EvVerticalGutter
        },

        created() {
            this.value_ = this.value
        },

        model: {
            prop: "value",

            event: "change"
        },

        props: {
            name: String,

            item: Object,

            itemKey: String,

            value: String,

            label: String,

            editable: {
                type: Boolean,
                default: false,
            }
        },

        computed: {
            labelStyles() {
                if (this.isSelected) {
                    return ['ev-popup-menu-item__label--checked']
                } else {
                    return ['ev-popup-menu-item__label--unchecked']
                }
            },

            radioStyle() {
                if (this.isSelected) {
                    return ['ev-popup-menu-item__radio--selected']
                } else {
                    return ['ev-popup-menu-item__radio--unselected']
                }
            },

            isSelected() {
                if (this.item) {
                    return this.value === this.item[this.itemKey]
                } else {
                    return this.value === this.name
                }
            }
        },

        data() {
            return {
                value_: ""
            }
        },

        watch: {
            value() {
                this.value_ = this.value
            },

            value_() {
                this.$emit('change', this.value_)
            }
        },

        methods: {
            doClick() {
                if (this.item) {
                    this.value_ = this.item[this.itemKey]
                } else {
                    this.value_ = this.name
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

        width: fit-content;

        height: 28px;

        padding-left: 4px;

        border-radius: 3px;

        user-select: none;

        &__icon-container {
            width: 16px;

            height: 18px;

            @include full-center;
        }

        &__label {
            font-size: 10px;

            line-height: 16px;

            font-weight: bold;

            &--checked {
                color: $PRIMARY_FONT_COLOR;
            }

            &--unchecked {
                color: $PLACEHOLDER_FONT_COLOR;
            }
        }

        &__radio {
            @include full-center;

            width: 12px;

            height: 12px;

            border-radius: 8px;

            &--unselected {
                background-color: #E0E0E0;
            }

            &--selected {
                background-color: #007aff;
            }
        }

        &__radio-dot {
            display: flex;

            width: 4px;

            height: 4px;

            border-radius: 4px;

            background-color: white;
        }
    }
</style>
