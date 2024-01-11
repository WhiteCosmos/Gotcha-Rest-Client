<template>
    <div class="dv-datetime-counter-number">
        <div class="dv-datetime-counter-number__operation" @click="minus">
            <ev-label size="10" primary>-</ev-label>
        </div>

        <div class="dv-datetime-counter-number__input-area">
            <ev-label size="10" primary>{{ label }}</ev-label>
        </div>

        <div class="dv-datetime-counter-number__operation" @click="plus">
            <ev-label size="10" primary>+</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "DvDatetimeCounterNumber",

        components: {
            EvLabel
        },

        created() {
            this.value_ = this.value
        },

        model: {
            prop: "value",

            event: "change"
        },

        props: {
            value: Number,
        },

        data() {
            return {
                value_: 0,
            }
        },

        watch: {
            'value'() {
                this.value_ = this.value
            },
            'value_'() {
                this.$emit('change', this.value_)
            },
        },

        computed: {
            label() {
                if (this.value_ < 0) {
                    return this.value_
                }

                if (this.value_ === 0) {
                    return this.value_
                }

                if (this.value_ > 0) {
                    return `+${this.value_}`
                }
            },
        },

        methods: {
            minus() {
                this.value_--
            },

            plus() {
                this.value_++
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .dv-datetime-counter-number {
        display: flex;

        align-items: center;

        justify-content: center;

        width: fit-content;

        height: 18px;

        border-radius: 3px;

        border: 1px solid #e0e0e0;

        background-color: #FFF;

        &__input-area {
            display: flex;

            align-items: center;

            justify-content: center;

            width: 20px;

            //background-color: #FFF;
        }

        &__operation {
            @include full-center;

            width: 18px;

            height: 18px;

            //background-color: #FAFAFA;

            &--minus {

            }

            &--plus {

            }
        }
    }
</style>
