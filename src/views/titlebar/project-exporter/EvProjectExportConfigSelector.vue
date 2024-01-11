<template>
    <v-menu v-model="showPopupMenu" v-bind="menuConfig">
        <template v-slot:activator="{ on }">
            <div class="ev-project-export-config-selector" v-on="on">
                <ev-label size="11" bold secondary>{{ configName }}</ev-label>

                <v-spacer></v-spacer>

                <select-icon></select-icon>
            </div>
        </template>

        <ev-project-export-config-selector-menu @select-item="handelSelectItem"></ev-project-export-config-selector-menu>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import SelectIcon from '@/components/icon/select-icon'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvProjectExportConfigSelectorMenu from '@/views/titlebar/project-exporter/EvProjectExportConfigSelectorMenu'
    import EvExportTreeViewMixin from '@/views/titlebar/project-exporter/export-tree-view/EvExportTreeViewMixin'

    export default {
        name: "EvProjectExportConfigSelector",

        components: {
            EvProjectExportConfigSelectorMenu,
            SelectIcon,
            EvLabel
        },

        mixins: [
            EvStoreMixin,
            EvExportTreeViewMixin,
        ],

        data() {
            return {
                showPopupMenu: false
            }
        },

        computed: {
            menuConfig() {
                return {
                    'offset-y': true,

                    'close-on-content-click': false,

                    'nudge-bottom': 1,

                    'transition': 'dummy',
                }
            },

            configName() {
                let config = this.selectedExportConfig

                if (config.isDefault) {
                    return this.$t('defaultExportConfig')
                } else {
                    return config.name
                }
            },
        },

        methods: {
            handelSelectItem() {
                this.showPopupMenu = false

                this.$emit('select')
            },
        },

        i18n: {
            messages: {
                en: {
                    defaultExportConfig: "Default Export Config"
                },
                zh: {
                    defaultExportConfig: "默认导出配置"
                },
                zh_TW: {
                    defaultExportConfig: "預設導出配置"
                },
                jp: {
                    defaultExportConfig: "デフォルトエクスポート設定"
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-export-config-selector {
        display: flex;

        align-items: center;

        height: 24px;

        width: 240px;

        border-radius: 5px;

        padding-left: 8px;

        padding-right: 8px;

        @include component-shadow;

        @include white-background-gradient;
    }
</style>
