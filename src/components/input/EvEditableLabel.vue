<template>
    <div class="ev-editable-label" @dblclick="enableEditing">
        <input v-if="editing"
               ref="input"
               type="text"
               class="ev-editable-label__input"
               :class="inputStyle"
               :style="fontStyle"
               @keydown.enter="disableEditing"
               @keydown.esc="discardEditing"
               @blur="disableEditing"
               v-model="value_"
               spellcheck="false">

        <span class="ev-editable-label__label"
              :class="labelStyle"
              :style="fontStyle"
              v-html="html"
              v-else></span>
    </div>
</template>

<script>
    export default {
        name: "EvEditableLabel",

        created() {
            this.initialize()
        },

        model: {
            prop: "value",

            event: "change",
        },

        props: {
            value: [String, Number],

            highlight: String,

            selected: Boolean,

            focused: Boolean,

            medium: Boolean,

            bold: Boolean,

            size: {
                type: [String, Number],

                default: 11,
            },

            textAlign: {
                type: String,

                default: 'left'
            }
        },

        data() {
            return {
                editing: false,

                value_: undefined,

                originValue_: undefined,
            }
        },

        computed: {
            html() {
                return this.value_.replace(this.highlight, '<span class="highlight">' + this.highlight + '</span>')
            },

            inputStyle() {
                return {
                    'ev-editable-label__input--selected': this.selected,
                }
            },

            labelStyle() {
                return {
                    'ev-editable-label__label--selected': this.selected,
                    'ev-editable-label__label--focused': this.focused,
                    'font-weight-bold': this.bold,
                    'font-weight-medium': this.medium,
                    'font-weight-normal': !this.bold && !this.medium,
                }
            },

            fontStyle() {
                return {
                    'font-size': this.size + 'px',
                    'font-weight': this.getFontWeight(),
                    'text-align': this.textAlign
                }
            },

            inputSize() {
                if (this.value_) {
                    return this.value_.length
                } else {
                    return 8
                }
            },
        },

        watch: {
            value() {
                this.initialize()
            }
        },

        methods: {
            initialize() {
                this.value_ = this.value

                this.originValue_ = this.value
            },

            getFontWeight() {
                if (this.medium) {
                    return '500'
                }

                if (this.bold) {
                    return 'bold'
                }

                return 'normal'
            },

            enableEditing() {
                this.editing = true

                this.$nextTick(() => {
                    let input = this.$refs.input

                    input.focus()

                    input.select()
                })
            },

            disableEditing() {
                this.editing = false

                if (this.value_.trim() === '') {
                    this.value_ = this.originValue_
                }

                this.$emit('change', this.value_.trim())

                this.$emit('complete', this.value_.trim())
            },

            discardEditing() {
                this.editing = false

                this.value_ = this.originValue_

                this.$emit('change', this.value_.trim())
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-editable-label {
        display: flex;

        width: fit-content;

        height: 16px;

        align-items: flex-end;

        user-select: none;

        cursor: default;

        overflow: hidden; // 这里要有

        &__label {
            width: 100%;

            font-family: "SF Pro", sans-serif;

            font-size: 12px;

            line-height: 16px;

            font-weight: 500;

            padding-top: 1px;

            color: $PRIMARY_FONT_COLOR;

            word-break: break-all;

            white-space: nowrap;

            text-overflow: ellipsis;

            overflow: hidden; // 这里也要有

            &--selected {
                color: white;
            }

            &--focused {
                color: $PRIMARY_COLOR;
            }

            &--center {
                text-align: center;
            }
        }

        &__input {
            font-family: "SF Pro", sans-serif;

            font-size: 12px;

            line-height: 16px;

            font-weight: 500;

            color: $PRIMARY_FONT_COLOR;

            padding-top: 1px;

            &--selected {
                color: white;
            }

            &--center {
                text-align: center;
            }
        }
    }

    ::v-deep .highlight {
        background-color: #f3d23e;

        color: black;
    }
</style>
