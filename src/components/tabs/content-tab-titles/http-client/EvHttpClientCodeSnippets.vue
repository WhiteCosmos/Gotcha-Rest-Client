<template>
    <v-dialog v-model="showCodeSnippetsModal" width="960" v-bind="modalConfig">
        <template v-slot:activator="{ on, attrs }">
            <div class="ev-export-button" v-bind="attrs" v-on="on">
                <ev-code-icon></ev-code-icon>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="11" secondary bold>{{ $t('codeSnippets') }}</ev-label>
            </div>
        </template>

        <ev-http-client-code-snippets-manager @close="showCodeSnippetsModal = false"
                                              v-hotkey="hotkey"
                                              :show="showCodeSnippetsModal"
                                              :http-request="httpRequest"></ev-http-client-code-snippets-manager>
    </v-dialog>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCodeIcon from '@/assets/icon/ev-code-icon'
    import EvHttpClientCodeSnippetsManager from '@/views/http-client/request/code-snippets/EvHttpClientCodeSnippetsManager'
    import EvDialogMixin from '@/mixins/EvDialogMixin'

    export default {
        name: "EvHttpClientCodeSnippets",

        components: {
            EvHttpClientCodeSnippetsManager,
            EvCodeIcon,
            EvVerticalGutter,
            EvLabel
        },

        mixins: [
            EvDialogMixin
        ],

        props: {
            contentTab: Object
        },

        computed: {
            httpRequest() {
                let httpOperation = this.contentTab.httpRequest

                return httpOperation.httpRequest
            },
            hotkey() {
                return {
                    'esc': this.closeDialog,
                }
            },
        },

        data() {
            return {
                showCodeSnippetsModal: false,
            }
        },

        methods: {
            closeDialog() {
                this.showCodeSnippetsModal = false
            },
        },

        i18n: {
            messages: {
                en: {
                    codeSnippets: "Code Snippets"
                },
                zh: {
                    codeSnippets: "导出代码"
                },
                zh_TW: {
                    codeSnippets: "匯出程式碼"
                },
                jp: {
                    codeSnippets: "コードをエクスポート",
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-export-button {
        display: flex;

        align-items: center;

        width: fit-content;

        height: 24px;

        padding-left: 8px;

        padding-right: 8px;

        background-color: #F1F1F1;

        border-radius: 3px;

        margin-right: 8px;

        box-shadow: inset 0 1px 2px -1px $SHADOW_COLOR;

        &:hover {
            background-color: #EAEAEA;
        }
    }
</style>
