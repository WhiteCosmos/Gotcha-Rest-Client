<template>
    <div class="ev-http-client-code-snippets-content">
        <div class="content-header">
            <span class="content-header__label">{{ selectedTarget.name }} / {{ selectedClient.name }}</span>

            <v-spacer></v-spacer>

            <div class="c2c-btn" @click="doCopy">
                <ev-label size="11" secondary bold>{{ $t('copyToClipboard') }}</ev-label>
            </div>
        </div>

        <div class="content-body">
            <ev-codemirror-wrapper :text="snippet" mode="text" read-only ref="ev-codemirror-wrapper"></ev-codemirror-wrapper>
        </div>
    </div>
</template>

<script>
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'
    import EvLabel from '@/components/typography/EvLabel'
    import {clipboard} from 'electron'

    export default {
        name: "EvHttpClientCodeSnippetsContent",

        components: {
            EvLabel,
            EvCodemirrorWrapper
        },

        mounted() {
            this.$nextTick(() => {
                this.$refs['ev-codemirror-wrapper'].refresh()
            })
        },

        props: {
            snippet: String,

            selectedTarget: {
                type: Object,
                default: () => {
                    return {
                        name: ''
                    }
                }
            },

            selectedClient: {
                type: Object,
                default: () => {
                    return {
                        name: ''
                    }
                }
            },
        },

        methods: {
            doCopy() {
                clipboard.writeText(this.snippet)
            },
        },

        i18n: {
            messages: {
                en: {
                    copyToClipboard: "Copy to Clipboard"
                },
                zh: {
                    copyToClipboard: "复制到剪贴板"
                },
                zh_TW: {
                    copyToClipboard: "复制到剪贴板"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-code-snippets-content {
        display: flex;

        flex-direction: column;

        width: 720px;

        height: 600px;

        .content-header {
            display: flex;

            align-items: center;

            width: 100%;

            height: 32px;

            background-color: #F5F5F5;

            border-bottom: 1px solid #E0E0E0;

            padding-left: 8px;

            padding-right: 16px;

            &__label {
                font-size: 11px;

                font-weight: bold;

                color: $SECONDARY_FONT_COLOR;
            }
        }

        .content-body {
            display: flex;

            width: 100%;

            height: calc(600px - 32px);
        }
    }

    .c2c-btn {
        display: flex;

        align-items: center;

        justify-content: center;

        width: fit-content;

        padding-left: 6px;

        padding-right: 6px;

        border-radius: 3px;

        //border: 1px solid #999;

        background-color: #D8D8D8;

        &:hover {
            //border: 1px solid #333;
        }
    }
</style>
