<template>
    <div class="dv-datetime-fractional-number" :style="style">
        <!--        <ev-label size="10" primary>{{ value }}</ev-label>-->
        <input type="text" class="dv-datetime-fractional-number__input" v-model="value_">
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "DvDatetimeFractionalNumber",

        components: {
            EvLabel
        },

        created() {
            this.value_ = this.value
        },

        model: {
            prop: 'value',

            event: 'change'
        },

        props: {
            min: {
                type: Number,
                default: -1,
            },

            max: {
                type: Number,
                default: -1,
            },

            value: [String, Number],

            digits: {
                type: Number,
                default: 2
            }
        },

        data() {
            return {
                value_: 0
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

        computed: {
            label() {
                return {}
            },

            style() {
                return {
                    width: this.digits * 10 + 'px'
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .dv-datetime-fractional-number {
        display: flex;

        align-items: center;

        justify-content: center;

        width: 32px;

        height: 18px;

        border-radius: 3px;

        border: 1px solid #e0e0e0;

        background-color: #FFF;

        &__input {
            width: 100%;

            height: 18px;

            font-size: 11px;

            text-align: center;

            color: $PRIMARY_FONT_COLOR;

            border: none;

            outline: none;
        }
    }
</style>
