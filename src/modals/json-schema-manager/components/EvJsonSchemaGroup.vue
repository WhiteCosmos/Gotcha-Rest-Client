<template>
    <div class="ev-json-schema-group-wrapper">
        <div class="ev-json-schema-group" @contextmenu="emitShowJsonSchemaGroupContextMenu">
            <div class="ev-json-schema-group__icon-container" @click="expand = !expand">
                <ev-arrow-down v-if="expand"></ev-arrow-down>

                <ev-arrow-right v-else></ev-arrow-right>
            </div>

            <ev-label size="11" secondary bold v-if="jsonSchemaGroup.default">{{ $t('defaultGroup') }}</ev-label>

            <ev-editable-label ref="ev-editable-label" size="11" secondary bold v-else v-model="jsonSchemaGroup.name"></ev-editable-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-counter-label :value="jsonSchemaGroup.items.length"></ev-counter-label>

            <div class="ev-json-schema-group__divider"></div>

            <div class="ev-json-schema-group__icon-container" @click="handleAddJsonSchemaItem">
                <ev-circle-plus-icon></ev-circle-plus-icon>
            </div>
        </div>

        <draggable v-model="jsonSchemaGroup.items"
                   handle=".ev-json-schema-item"
                   animation="200"
                   group="variables"
                   style="width: 100%">
            <ev-json-schema-item v-for="jsonSchema in jsonSchemaGroup.items"
                                 v-if="expand"

                                 :json-schema-group="jsonSchemaGroup"
                                 :json-schema="jsonSchema"

                                 :selected-json-schema="selectedJsonSchema"

                                 @select-json-schema="handleSelectJsonSchemaItem(jsonSchema)"
                                 @contextmenu.native="emitShowJsonSchemaContextMenu($event, jsonSchemaGroup, jsonSchema)"></ev-json-schema-item>
        </draggable>
    </div>
</template>

<script>
    import EvArrowRight from '@/components/icon/ev-arrow-right'
    import EvArrowDown from '@/components/icon/ev-arrow-down'
    import EvLabel from '@/components/typography/EvLabel'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvCirclePlusIcon from '@/views/http-client/icon/ev-circle-plus-icon'
    import draggable from 'vuedraggable'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvJsonSchemaItem from '@/modals/json-schema-manager/components/EvJsonSchemaItem'
    import EvJsonSchemaManagerEventMixin from '@/modals/json-schema-manager/mixins/EvJsonSchemaManagerEventMixin'
    import {EvJsonSchemaManagerEventBus, EvJsonSchemaManagerEvents} from '@/modals/json-schema-manager/EvJsonSchemaManagerEventBus'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCounterLabel from '@/components/label/EvCounterLabel'

    export default {
        name: "EvJsonSchemaGroup",

        components: {
            EvCounterLabel,
            EvVerticalGutter,
            EvJsonSchemaItem,
            EvCirclePlusIcon,
            EvEditableLabel,
            EvLabel,
            EvArrowDown,
            EvArrowRight,
            draggable,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
        },

        mixins: [
            EvJsonSchemaManagerEventMixin,
        ],

        created() {
            EvJsonSchemaManagerEventBus.$on(EvJsonSchemaManagerEvents.RENAME_JSON_SCHEMA_GROUP, this.handleRenameJsonSchemaGroup)
        },

        beforeDestroy() {
            EvJsonSchemaManagerEventBus.$off(EvJsonSchemaManagerEvents.RENAME_JSON_SCHEMA_GROUP, this.handleRenameJsonSchemaGroup)
        },

        props: {
            jsonSchemaGroup: Object,

            selectedJsonSchemaGroup: Object,

            selectedJsonSchema: Object
        },

        data() {
            return {
                expand: true,
            }
        },

        methods: {
            handleSelectJsonSchemaItem(jsonSchema) {
                EvJsonSchemaManagerEventBus.$emit(EvJsonSchemaManagerEvents.SELECT_JSON_SCHEMA, this.jsonSchemaGroup, jsonSchema)
            },

            handleAddJsonSchemaItem() {
                this.expand = true

                this.emitAddJsonSchemaItem(this.jsonSchemaGroup)
            },

            handleRenameJsonSchemaGroup(jsonSchemaGroup) {
                if (this.jsonSchemaGroup !== jsonSchemaGroup) {
                    return
                }

                this.$refs['ev-editable-label'].enableEditing()
            },

            emitShowJsonSchemaGroupContextMenu(event) {
                this.$emit('show-json-schema-group-context-menu', event, this.jsonSchemaGroup)
            },

            emitShowJsonSchemaContextMenu(event, jsonSchemaGroup, jsonSchema) {
                this.$emit('show-json-schema-context-menu', event, jsonSchemaGroup, jsonSchema)
            },
        },

        i18n: {
            messages: {
                en: {
                    defaultGroup: "Default Group",

                    rename: "Rename",

                    duplicate: "duplicate",

                    remove: "Remove",
                },
                zh: {
                    defaultGroup: "默认分组",

                    rename: "重命名",

                    duplicate: "复制分组",

                    remove: "删除分组",
                },
                zh_TW: {
                    defaultGroup: "預設分組",

                    rename: "重命名",

                    duplicate: "複製分組",

                    remove: "刪除分組",
                },
                jp: {
                    defaultGroup: "デフォルトグループ",

                    rename: "名前を変更",

                    duplicate: "グループを複製",

                    remove: "グループを削除",
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-json-schema-group-wrapper {
        display: flex;

        flex-direction: column;
    }

    .ev-json-schema-group {
        display: flex;

        align-items: center;

        width: 100%;

        height: 28px;

        &__icon-container {
            @include full-center;

            width: 20px;

            height: 20px;
        }

        &__divider {
            display: flex;

            flex: 1;

            height: 1px;

            border-top: 1px solid #E0E0E0;

            margin-left: 4px;

            margin-right: 4px;
        }
    }
</style>
