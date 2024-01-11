<template>
    <div class="ev-project-export-button" @click="doExport">
        <ev-export-icon></ev-export-icon>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-label size="11" bold secondary>{{ $t('exportLabel') }}</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvExportIcon from '@/views/http-client/icon/ev-export-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvProTag from '@/components/tag/EvProTag.vue'
    export default {
        name: "EvProjectExportButton",

        components: {
            EvProTag,
            EvVerticalGutter,
            EvExportIcon,
            EvLabel
        },

        methods: {
            doExport() {
                this.$emit('export')
            },
        },

        i18n: {
            messages: {
                en: {
                    exportLabel: "Export API"
                },
                zh: {
                    exportLabel: "导出接口"
                },
                zh_TW: {
                    exportLabel: "匯出接口"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-export-button {
        display: flex;

        align-items: center;

        width: fit-content;

        height: 28px;

        padding-left: 8px;

        padding-right: 8px;

        user-select: none;

        @include component-shadow;

        @include white-background-gradient;

        border-radius: 5px;

        padding-top: 1px;
    }
</style>
