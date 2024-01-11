<template>
    <div class="ev-api-tree-view-placeholder">
        <div class="d-flex" style="width: 128px; justify-content: space-between">
            <ev-label size="11" grey>{{ $t('newRequest') }}</ev-label>

            <ev-label size="11" secondary>⌃⌘N</ev-label>
        </div>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="d-flex" style="width: 128px; justify-content: space-between">
            <ev-label size="11" grey>{{ $t('newGroup') }}</ev-label>

            <ev-label size="11" secondary>⇧⌘N</ev-label>
        </div>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="d-flex" style="width: 128px; justify-content: space-between">
            <ev-label size="11" grey>{{ $t('importFromFile') }}</ev-label>

            <ev-label size="11" secondary>⇧⌘O</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvApiTreeViewPlaceholder",

        components: {
            EvHorizonGutter,
            EvLabel
        },

        i18n: {
            messages: {
                en: {
                    newRequest: "New Request",

                    newGroup: "New Group",

                    importFromFile: "Import from File",
                },
                zh: {
                    newRequest: "创建请求",

                    newGroup: "创建分组",

                    importFromFile: "导入文件",
                },
                zh_TW: {
                    newRequest: "新增請求",

                    newGroup: "新增分組",

                    importFromFile: "從檔案匯入",
                },
                jp: {
                    newRequest: "リクエストの作成",

                    newGroup: "グループの作成",

                    importFromFile: "ファイルからのインポート",
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
