<template>
    <div class="ev-api-tree-view-placeholder">
        <ev-label size="12" medium secondary>{{ $t('label') }}</ev-label>

        <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

        <ev-label size="12" medium grey>'{{ keyword }}'</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvApiTreeViewNoSearchResults",

        components: {
            EvHorizonGutter,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            keyword: String,
        },

        i18n: {
            messages: {
                en: {
                    label: "No Search Results For"
                },
                zh: {
                    label: "没有相关搜索结果"
                },
                zh_TW: {
                    label: "沒有相關搜尋結果"
                },
                jp: {
                    label: "関連する検索結果がありません"
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-api-tree-view-placeholder {
        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: center;

        width: 100%;

        height: 100%;

        padding-bottom: 128px;
    }
</style>
