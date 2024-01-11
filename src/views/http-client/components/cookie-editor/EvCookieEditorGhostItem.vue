<template>
    <div class="ev-cookie-editor-item">
        <div class="ev-cookie-editor__name-column">
            <ev-borderless-input :placeholder="$t('cookieName')" v-model="ghostKey_"></ev-borderless-input>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
        </div>

        <div class="ev-cookie-editor__value-column">
            <div class="d-flex flex-grow-1">
                <ev-dynamic-variable-input :placeholder="$t('cookieValue')" v-model="ghostValue_"></ev-dynamic-variable-input>
            </div>
        </div>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import _ from 'lodash'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import DelayTrigger from '@/core/utils/DelayTrigger'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput.vue'

    export default {
        name: "EvCookieEditorGhostItem",

        components: {
            EvDynamicVariableInput,
            EvBorderlessInput,
            EvVerticalGutter,
        },

        mixins: [],

        props: {},

        data() {
            return {
                ghostKey_: "",

                ghostValue_: "",

                triggered: false,
            }
        },

        watch: {
            ghostKey_() {
                if (this.triggered || _.isEmpty(this.ghostKey_)) {
                    return
                }

                this.triggered = true

                new DelayTrigger(100, () => {
                    this.$emit('ghost-key-input', this.ghostKey_.trim())

                    this.ghostKey_ = ""

                    this.triggered = false
                }).trigger()
            },

            ghostValue_() {
                if (this.triggered || _.isEmpty(this.ghostValue_)) {
                    return
                }

                this.triggered = true

                new DelayTrigger(100, () => {
                    this.$emit('ghost-value-input', this.ghostValue_)

                    this.ghostValue_ = ""

                    this.triggered = false
                }).trigger()
            }
        },

        i18n: {
            messages: {
                en: {
                    cookieName: "Cookie Name",

                    cookieValue: "Cookie Value",
                },
                zh: {
                    cookieName: "Cookie Name",

                    cookieValue: "Cookie Value",
                },
                zh_TW: {
                    cookieName: "Cookie Name",

                    cookieValue: "Cookie Value",
                },
                jp: {
                    cookieName: "Cookie Name",

                    cookieValue: "Cookie Value",
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvCookieEditor";

    .ev-cookie-editor-item {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 46px;

        padding-right: 8px;

        border-bottom: 1px solid #F1F1F1;
    }
</style>