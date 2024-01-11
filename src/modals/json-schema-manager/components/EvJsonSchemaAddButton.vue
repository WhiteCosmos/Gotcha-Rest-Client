<template>
    <v-menu v-bind="config">
        <template v-slot:activator="{ on }">
            <div class="ev-http-client-environment-add-button" v-on="on">
                <ev-http-client-add-variable-icon></ev-http-client-add-variable-icon>
            </div>
        </template>

        <div class="ev-http-client-environment-add-button__menu">
            <!--            <ev-context-menu-item @click.native="emitAddVariable">New Variable</ev-context-menu-item>-->

            <ev-context-menu-item @click.native="emitAddJsonSchemaGroup">{{ $t('newGroup') }}</ev-context-menu-item>

            <!--            <ev-popup-menu-divider></ev-popup-menu-divider>-->

            <!--            <ev-context-menu-item @click.native="emitAddEnvironment">{{ $t('newEnvironment') }}</ev-context-menu-item>-->

            <!--            <ev-popup-menu-divider></ev-popup-menu-divider>-->

            <!--            <ev-context-menu-item @click.native="emitAddEnvironment">{{ $t('importEnvironments') }}</ev-context-menu-item>-->
        </div>
    </v-menu>
</template>

<script>
    import EvHttpClientAddVariableIcon from '@/views/http-client/components/environment/modal/EvHttpClientAddVariableIcon'
    import EvPopupMenu from '@/components/menu/EvPopupMenu'
    import EvMenuTopIndicator from '@/components/json-editor-vsl/icons/ev-menu-top-indicator'
    import EvPopupMenuItem from '@/components/menu/EvPopupMenuItem'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvJsonSchemaManagerEventMixin from '@/modals/json-schema-manager/mixins/EvJsonSchemaManagerEventMixin'

    export default {
        name: "EvJsonSchemaAddButton",

        components: {
            EvContextMenuItem,
            EvPopupMenuDivider,
            EvPopupMenuItem,
            EvMenuTopIndicator,
            EvPopupMenu,
            EvHttpClientAddVariableIcon
        },

        mixins: [
            EvJsonSchemaManagerEventMixin
        ],

        data() {
            return {
                config: {
                    'offset-y': true,

                    'close-on-content-click': true,

                    'open-on-hover': false,
                }
            }
        },

        i18n: {
            messages: {
                en: {
                    newGroup: "New Group",

                    newEnvironment: "New Schema",

                    importEnvironments: "Import Schemas"
                },

                zh: {
                    newGroup: "添加分组",

                    newEnvironment: "添加数据模型",

                    importEnvironments: "导入数据模型"
                },
                zh_TW: {
                    newGroup: "新增分組",

                    newEnvironment: "新增資料模型",

                    importEnvironments: "匯入資料模型"
                },
                jp: {
                    newGroup: "グループを追加",

                    newEnvironment: "データモデルを追加",

                    importEnvironments: "データモデルをインポート",
                },
            }
        },

        methods: {
            emitAddVariable() {
                this.$emit('add-variable')
            },

            emitAddVariableGroup() {
                this.$emit('add-group')
            },

            emitAddEnvironment() {
                this.$emit('add-environment')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-environment-add-button {
        @include full-center;

        width: 20px;

        height: 20px;

        border-radius: 3px;

        transition: 0.1s;

        &__menu {
            display: flex;

            flex-direction: column;

            //width: 96px;
            width: fit-content;

            padding: 4px;

            border-radius: 3px;

            background-color: #F1F1F1;
        }

        &:hover {
            background-color: #EAEAEA;
        }
    }
</style>
