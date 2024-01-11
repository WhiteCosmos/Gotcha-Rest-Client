<template>
    <div class="ev-project-export-settings-placeholder">
        <ev-label size="12" bold secondary>{{ $t('text') }}</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel.vue'

    export default {
        name: "EvProjectExportSettingsPlaceholder",

        components: {
            EvLabel
        },

        i18n: {
            messages: {
                en: {
                    text: "No Export Configs Available"
                },
                zh: {
                    text: "没有可用的导出设置"
                },
                zh_TW: {
                    text: "沒有可用的匯出設定"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-export-settings-placeholder {
        display: flex;

        align-items: center;

        justify-content: center;

        width: 100%;

        height: 100%;
    }
</style>
