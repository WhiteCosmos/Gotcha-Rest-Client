<template>
    <div class="ev-project-export-config-selector-menu">
        <div class="ev-project-export-config-selector-menu__item" @click="doSelectItem(defaultExportConfig)">
            <ev-label size="11" bold secondary>{{ $t('defaultExportConfig') }}</ev-label>
        </div>

        <dv-enumeration-menu-title :label="$t('exportConfig')" @add-item="doAddItem"></dv-enumeration-menu-title>

        <div class="d-flex align-center justify-center" style="height: 28px" v-if="exportConfigs.length === 1">
            <ev-label size="11" grey>{{ $t('noConfigs') }}</ev-label>
        </div>

        <div class="ev-project-export-config-selector-menu__item"
             @click="doSelectItem(item)"
             v-for="(item, idx) in exportConfigs"
             v-if="!item.isDefault">
            <ev-editable-label v-model="item.name" :size="11" secondary bold :ref="`ev-editable-label-${idx}`"></ev-editable-label>

            <v-spacer></v-spacer>

            <div class="dv-enumeration-menu__options">
                <div class="dv-enumeration-menu__icon" @click.stop="doEditItem(item)">
                    <ev-edit-icon></ev-edit-icon>
                </div>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <div class="dv-enumeration-menu__icon" @click.stop="doRemoveItem(item)">
                    <ev-remove-icon></ev-remove-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import DvEnumerationMenuTitle from '@/components/dynamic-variable/enumeration/DvEnumerationMenuTitle'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvEditIcon from '@/components/icon/ev-edit-icon'
    import EvDeleteIcon from '@/views/http-client/components/multipart-form-editor/ev-delete-icon'
    import EvRemoveIcon from '@/components/icon/ev-remove-icon'
    import GHCProjectExportConfig from '@/data/gotcha/GHCProjectExportConfig'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvExportTreeViewMixin from '@/views/titlebar/project-exporter/export-tree-view/EvExportTreeViewMixin'

    export default {
        name: "EvProjectExportConfigSelectorMenu",

        components: {
            EvRemoveIcon,
            EvDeleteIcon,
            EvEditIcon,
            EvVerticalGutter,
            EvEditableLabel,
            DvEnumerationMenuTitle,
            EvLabel
        },

        mixins: [
            EvExportTreeViewMixin,
        ],

        computed: {},

        methods: {
            doSelectItem(item) {
                let wrapper = this.exportConfigWrapper

                wrapper && (wrapper.selectedConfigId = item.uid)

                this.$emit('select-item', item)
            },

            doAddItem() {
                let item = new GHCProjectExportConfig()

                item.name = 'New Config'

                this.exportConfigs.push(item)
            },

            doEditItem(item) {
                let ref = this.$refs[`ev-editable-label-${this.exportConfigs.indexOf(item)}`][0]

                ref && (ref.enableEditing())
            },

            doRemoveItem(item) {
                this.exportConfigs.splice(this.exportConfigs.indexOf(item), 1)

                if (this.selectedExportConfig && (this.selectedExportConfig.uid === item.uid)) {
                    if (this.exportConfigs.length === 0) {
                        this.doSelectItem(this.defaultExportConfig)
                    } else {
                        this.doSelectItem(this.exportConfigs[0])
                    }
                }
            }
        },

        i18n: {
            messages: {
                en: {
                    exportConfig: "Configs",

                    defaultExportConfig: "Default Export Config",

                    noConfigs: "No Configs"
                },
                zh: {
                    exportConfig: "导出配置",

                    defaultExportConfig: "默认导出配置",

                    noConfigs: "没有配置"
                },
                zh_TW: {
                    exportConfig: "匯出設定",

                    defaultExportConfig: "預設匯出設定",

                    noConfigs: "沒有設定可用"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-export-config-selector-menu {
        display: flex;

        flex-direction: column;

        //max-height: 320px;

        min-height: 1px;

        min-width: 1px;

        background-color: #F1F1F1;

        border: 1px solid #D8D8D8;

        border-radius: 5px;

        //overflow-y: auto;

        &__item {
            display: flex;

            align-items: center;

            height: 24px;

            padding-left: 6px;

            padding-right: 2px;

            &:hover {
                background-color: #E0E0E0;
            }
        }
    }

    .dv-enumeration-menu {
        display: flex;

        flex-direction: column;

        max-height: 320px;

        min-height: 1px;

        min-width: 1px;

        background-color: #F1F1F1;

        border: 1px solid #D8D8D8;

        border-radius: 5px;

        overflow-y: auto;

        &__placeholder {
            @include full-center;

            height: 32px;
        }

        &__icon {
            @include full-center;

            width: 14px;

            height: 14px;
        }

        &__options {
            display: flex;
        }
    }
</style>
