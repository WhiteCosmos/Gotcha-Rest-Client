<template>
    <div class="ev-borderless-input">
        <input ref="input"
               class="ev-borderless-input__input"
               :class="inputStyle"
               @focus="handleInputFocus"
               @blur="handleInputBlur"
               @keydown.enter="handleKeydownEnter"
               @keydown="handleKeydown"
               @keydown.up="handleKeypressUp"
               @keydown.down="handleKeypressDown"
               @paste="onPaste"
               v-model="value_"
               :placeholder="placeholder"
               :disabled="disabled"
               spellcheck="false"
               :type="password ? 'password' : 'text'">

        <div class="ev-autocomplete" v-if="showAutocomplete && hasMatchedAvailableValue">
            <span class="ev-autocomplete__label"
                  :class="{'ev-autocomplete__label--selected': selectedAwesomeValue === value}"
                  v-for="value in matchedAvailableValues">{{ value }}</span>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: "EvBorderlessInput",

        model: {
            prop: "value",
            event: "change"
        },

        props: {
            value: [String, Number],

            defaultValue: String,

            placeholder: String,

            disabled: Boolean,

            availableValues: {
                type: Array,
                default: () => {
                    return []
                }
            },

            dense: Boolean,

            bulkEdit: {
                type: Boolean,
                default: true
            },

            password: {
                type: Boolean,
                default: false
            }
        },

        mounted() {
            this.value_ = this.value
        },

        data() {
            return {
                value_: "",

                delayTrigger: undefined,

                focus_: false,

                selectedAwesomeValue: undefined,

                counter: 3,

                showAutocomplete: false,
            }
        },

        computed: {
            inputStyle() {
                return {
                    'ev-borderless-input__input--focus': this.focus_ && !this.dense
                }
            },

            hasMatchedAvailableValue() {
                return !_.isEmpty(this.matchedAvailableValues)
            },

            matchedAvailableValues() {
                if (!this.value_ || _.isEmpty(this.availableValues)) {
                    return []
                }

                let results = this.availableValues.filter(s => {
                    return s.toLowerCase().startsWith(this.value_.toLowerCase())
                })

                this.counter = results.length

                if (_.isEmpty(results)) {
                    this.showAutocomplete = false
                }

                return results
            },
        },

        watch: {
            value(newVal) {
                this.value_ = newVal
            },

            value_(newVal) {
                if (this.defaultValue) {
                    //TODO
                }

                if (!_.isEmpty(newVal)) {
                    newVal = newVal.trim()
                }

                this.$emit('change', newVal)
            }
        },

        methods: {
            handleInputFocus() {
                this.focus_ = true
            },

            handleInputBlur() {
                this.selectedAwesomeValue = undefined

                this.showAutocomplete = false

                this.focus_ = false

                this.$emit('blur', this.value_)
            },

            handleKeydownEnter() {
                if (this.selectedAwesomeValue) {
                    this.value_ = this.selectedAwesomeValue
                }

                let input = this.$refs['input']

                input.blur()

                this.handleInputBlur()

                this.$emit('enter', this.value_)
            },

            handleKeydown(event) {
                if (event && event.keyCode === 13) {
                    return
                }

                this.showAutocomplete = true
            },

            handleKeypressUp() {
                this.selectedAwesomeValue = this.matchedAvailableValues[Math.abs(this.counter % this.matchedAvailableValues.length)]

                this.counter--
            },

            handleKeypressDown() {
                this.selectedAwesomeValue = this.matchedAvailableValues[Math.abs(this.counter % this.matchedAvailableValues.length)]

                this.counter++
            },

            focus() {
                let input = this.$refs['input']

                input.focus()

                this.handleInputFocus()
            },

            onPaste(event) {
                this.$emit('paste', event)
            },

            clear() {
                this.value_ = ''
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-borderless-input {
        position: relative;

        display: flex;

        align-items: center;

        height: 20px;

        width: 100%;

        user-select: none;

        &__input {
            border: 1px solid transparent;

            height: 20px;

            color: $PRIMARY_FONT_COLOR;

            font-family: "SF Pro", sans-serif;

            font-size: 12px;

            font-weight: 500;

            width: 100%;

            border-radius: 3px;

            transition: 80ms;

            padding-top: 1px; // Make text center

            &--focus {
                background-color: #FAFAFA;

                border: 1px solid #F1F1F1;
            }

            &--dense {
                background-color: #FAFAFA;

                border: 1px solid #F1F1F1;
            }
        }
    }

    input::placeholder {
        font-size: 12px;

        color: $PLACEHOLDER_FONT_COLOR;
    }

    .ev-autocomplete {
        position: absolute;

        top: 22px;

        display: flex;

        flex-direction: column;

        max-height: 320px;

        width: 100%;

        overflow-y: overlay;

        background-color: #FAFAFA;

        border: 1px solid #F1F1F1;

        border-radius: 3px;

        left: -4px;

        z-index: 800;

        @include component-shadow;

        &__label {
            text-indent: 4px;

            font-family: "SF Pro", sans-serif;

            font-size: 11px;

            font-weight: 500;

            line-height: 20px;

            color: $SECONDARY_FONT_COLOR;

            &--selected {
                background-color: #F1F1F1;

                color: #007AFF;
            }
        }
    }
</style>
