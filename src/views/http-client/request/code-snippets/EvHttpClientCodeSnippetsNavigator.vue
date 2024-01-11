<template>
    <div class="ev-http-client-code-snippets-navigator">
        <ev-circle-close-button @click.native="$emit('close')" style="position: absolute; left: 12px"></ev-circle-close-button>

        <ev-label size="11" secondary bold>{{ $t('codeSnippets') }}</ev-label>
    </div>
</template>

<script>
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvHttpClientCodeSnippetsNavigator",

        components: {
            EvLabel,
            EvCircleCloseButton
        },

        i18n: {
            messages: {
                en: {
                    codeSnippets: "Code Snippets",
                },
                zh: {
                    codeSnippets: "导出代码",
                },
                zh_TW: {
                    codeSnippets: "导出代码",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-code-snippets-navigator {
        position: relative;

        display: flex;

        align-items: center;

        justify-content: center;

        width: 100%;

        height: 40px;

        border-bottom: 1px solid $MODAL_DIVIDER_COLOR;

        background-color: $MODAL_TITLE_COLOR;
    }
</style>
