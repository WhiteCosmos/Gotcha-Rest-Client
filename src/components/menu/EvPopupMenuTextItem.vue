<template>
    <div class="ev-popup-menu-item">
        <ev-label size="10" bold secondary>{{ label }}:</ev-label>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <div class="ev-popup-menu-item__input-container">
            <input v-model="value_" class="ev-popup-menu-item__input" :disabled="disable">
        </div>
    </div>
</template>

<script>
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvDbLeftArrowIcon from '@/views/http-client/icon/ev-db-left-arrow-icon'
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvPopupMenuTextItem",

        components: {
            EvVerticalGutter,
            EvLabel,
            EvDbLeftArrowIcon,
            EvBorderlessInput
        },

        created() {
            this.value_ = this.value
        },

        model: {
            prop: 'value',
            event: 'change'
        },

        props: {
            label: String,

            value: String,

            disable: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                value_: ','
            }
        },

        watch: {
            value() {
                this.value_ = this.value
            },

            value_() {
                this.$emit('change', this.value_)
            },
        },
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

        &__input-container {
            display: flex;

            flex: 1;

            //width: 100%;

            height: 20px;

            border: 1px solid #CCC;

            border-radius: 3px;

            &--disabled {

            }
        }

        &__input {
            width: 100%;

            font-size: 11px;

            color: $PRIMARY_FONT_COLOR;

            //outline: none;

            text-indent: 4px;
        }
    }
</style>
