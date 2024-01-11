<template>
    <div class="editable-input-container">
        <input type="text" class="editable-input" v-model="value_" @blur="checkDefaultValue" ref="editable-input">
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: "EvEditableInput",

        model: {
            prop: 'value',

            event: 'change',
        },

        mounted() {
            this.value_ = this.value

            let input = this.$refs['editable-input']

            input.disabled = true
        },

        watch: {
            value(newVal) {
                this.value_ = newVal
            },

            value_(newVal) {
                this.$emit('change', newVal)
            },

            editable(newVal) {
                let input = this.$refs['editable-input']

                if (newVal) {
                    input.disabled = false

                    input.focus()

                    input.select()
                } else {
                    input.disabled = true
                }
            }
        },

        props: {
            editable: false,

            defaultValue: "",

            placeholder: "",

            value: "",

            textAlign: 'left' // left center right
        },

        data() {
            return {
                value_: "",

                disabled: false,
            }
        },

        computed: {
            inputStyle() {

            }
        },

        methods: {
            handleEditComplete() {

            },

            checkDefaultValue() {
                if (_.isEmpty(this.value_)) {
                    this.value_ = this.defaultValue

                    this.$emit('change', this.value_)
                }

                this.$emit('blur')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .editable-input-container {
        display: flex;
    }

    .editable-input {
        font-size: 10px;

        font-weight: bold;

        color: $SECONDARY_FONT_COLOR;

        border: none;

        outline: none;

        width: 100%;

        text-overflow: ellipsis;

        height: 24px;

        &::placeholder {
            font-size: 10px;

            color: #AABBCC;
        }
    }
</style>
