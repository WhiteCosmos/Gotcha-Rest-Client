<template>
    <v-menu v-model="visible" offset-y :disabled="disabled">
        <template v-slot:activator="{ on }">
            <div class="ev-selector" v-on="on">
                <span class="ev-selector__label text-truncate" v-if="disabled">{{ disabledMessage }}</span>

                <span class="ev-selector__label ev-selector__label--disabled" v-else>{{ valueKey ? value_[valueKey] : value_ }}</span>

                <v-spacer></v-spacer>

                <select-icon></select-icon>
            </div>
        </template>

        <div class="ev-selector__menu">
            <div class="ev-selector__menu-item" v-for="value in values" @click="doSelect(value)">
                <ev-label size="11" secondary bold>{{ valueKey ? value[valueKey] : value }}</ev-label>
            </div>
        </div>
    </v-menu>

</template>

<script>
    import SelectIcon from '@/components/icon/select-icon'
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvSelector",

        components: {
            EvLabel,
            SelectIcon
        },

        mounted() {
            this.value_ = this.value
        },

        model: {
            prop: "value",
            event: "change"
        },

        props: {
            values: Array,

            value: {
                type: [String, Object],
                default: () => {
                    return ""
                }
            },

            valueKey: String,

            disabled: {
                type: Boolean,
                default: false
            },

            disabledMessage: {
                type: String,
                default: ""
            }
        },

        data() {
            return {
                value_: String,

                visible: false,
            }
        },

        methods: {
            doSelect(val) {
                this.value_ = val

                this.$emit('change', val)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-selector {
        position: relative;

        @include horizon-center;

        @include mac-shadow;

        @include white-background-gradient;

        height: 20px;

        width: 100%;

        border-radius: 2px;

        user-select: none;

        padding-left: 8px;

        padding-right: 8px;

        &__label {
            max-width: 80%;

            font-size: 11px;

            font-weight: bold;

            padding-top: 2px;

            color: $SECONDARY_FONT_COLOR;

            &--disabled {
                color: $PLACEHOLDER_FONT_COLOR;
            }
        }

        &__menu {
            background-color: #FAFAFA;
        }

        &__menu-item {
            display: flex;

            align-items: center;

            height: 24px;

            padding-left: 4px;

            padding-right: 4px;

            &:hover {
                background-color: #F1F1F1;
            }
        }
    }
</style>
