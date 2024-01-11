<template>
    <div ref="ev-auto-resize-textarea-wrapper"
         :style="{'height': height + 'px'}"
         class="ev-auto-resize-textarea">
        <textarea ref="ev-auto-resize-textarea"
                  class="ev-auto-resize-textarea__textarea"
                  :placeholder="$t('placeholder')"
                  v-model="value_"></textarea>
    </div>
</template>

<script>
    export default {
        name: "EvAutoResizeTextarea",

        created() {
            this.value_ = this.value

            let count = this.value_.split(/\r\n|\r|\n/).length

            let calcHeight = count * 18 + 16 // Line Height + Padding

            if (calcHeight > 96) {
                this.height = calcHeight
            }
        },

        mounted() {
            const tx = this.$refs['ev-auto-resize-textarea']

            tx.addEventListener("input", this.onInput)
        },

        beforeDestroy() {
            const tx = this.$refs['ev-auto-resize-textarea']

            tx.removeEventListener('input', this.onInput)
        },

        props: {
            value: String,
        },

        model: {
            prop: 'value',
            event: 'change'
        },

        watch: {
            value(newVal) {
                this.value_ = newVal
            },

            value_(newVal) {
                this.$emit('change', newVal)
            },
        },

        data() {
            return {
                value_: '',

                height: 96,

                DEFAULT_TEXTAREA_LINE_HEIGHT: 20,

                MIN_HEIGHT: 96
            }
        },

        methods: {
            onInput() {
                const tx = this.$refs['ev-auto-resize-textarea']

                let line = tx.value.split('\n').length

                let actualHeight = line * this.DEFAULT_TEXTAREA_LINE_HEIGHT

                if (actualHeight < this.MIN_HEIGHT) {
                    tx.style.height = this.MIN_HEIGHT + 'px'

                    this.height = this.MIN_HEIGHT

                    return
                }

                if (actualHeight > tx.scrollHeight) {
                    tx.style.height = (tx.scrollHeight) + "px"

                    this.height = tx.scrollHeight
                } else {
                    tx.style.height = actualHeight + 'px'

                    this.height = actualHeight
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    placeholder: "Write description here..."
                },
                zh: {
                    placeholder: "在这里填写描述..."
                },
                zh_TW: {
                    placeholder: "在此輸入描述..."
                },
                jp: {
                    placeholder: "ここに説明を入力してください...",
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-auto-resize-textarea {
        display: flex;

        width: 100%;

        //background-color: #FF8282;

        &__textarea {
            border: 1px solid #F1F1F1;

            padding: 8px;

            width: 100%;

            min-height: 96px;

            outline: none;

            resize: none;

            background-color: #FAFAFA;

            font-size: 12px;

            color: $PRIMARY_FONT_COLOR;

            border-radius: 5px;

            overflow-y: hidden;
        }
    }
</style>
