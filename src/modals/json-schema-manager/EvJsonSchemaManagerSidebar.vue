<template>
    <div class="ev-json-schema-manager-sidebar">
        <div class="ev-json-schema-manager-sidebar__title">
            <ev-circle-close-button @click.native="$emit('close')"></ev-circle-close-button>

            <v-spacer></v-spacer>

            <ev-label size="12" bold primary>{{ $t('title') }}</ev-label>

            <v-spacer></v-spacer>

            <ev-json-schema-add-button></ev-json-schema-add-button>
        </div>

        <div class="ev-json-schema-manager-sidebar__scroll-wrapper">
            <draggable v-model="groups"
                       handle=".ev-json-schema-group"
                       animation="200">
                <ev-json-schema-group v-for="group in groups"
                                      :json-schema-group="group"
                                      :selected-json-schema-group="selectedJsonSchemaGroup"
                                      :selected-json-schema="selectedJsonSchema"
                                      @show-json-schema-group-context-menu="handleShowJsonSchemaGroupContextMenu"
                                      @show-json-schema-context-menu="handleShowJsonSchemaContextMenu"></ev-json-schema-group>
            </draggable>
        </div>

        <ev-json-schema-manager-context-menu ref="ev-json-schema-manager-context-menu__group"
                                             context-menu-type="jsonSchemaGroup"

                                             :focused-json-schema-group="focusedJsonSchemaGroup"
                                             :focused-json-schema="focusedJsonSchema"

                                             @rename-json-schema-group="emitRenameJsonSchemaGroup"
                                             @remove-json-schema-group="emitRemoveJsonSchemaGroup"></ev-json-schema-manager-context-menu>

        <ev-json-schema-manager-context-menu ref="ev-json-schema-manager-context-menu__schema"
                                             context-menu-type="jsonSchema"

                                             :focused-json-schema-group="focusedJsonSchemaGroup"
                                             :focused-json-schema="focusedJsonSchema"

                                             @rename-json-schema="emitRenameJsonSchema"
                                             @clone-json-schema="emitCloneJsonSchema"
                                             @remove-json-schema="emitRemoveJsonSchema"></ev-json-schema-manager-context-menu>
    </div>
</template>

<script>
    import EvHttpClientCookieJarContextMenu from '@/views/http-client/components/session/EvHttpClientCookieJarContextMenu'
    import EvHttpClientAddCookieJarButton from '@/views/http-client/components/session/EvHttpClientAddCookieJarButton'
    import EvHttpClientAddVariableIcon from '@/views/http-client/components/environment/modal/EvHttpClientAddVariableIcon'
    import EvHttpClientEnvironmentAddButton from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentAddButton'
    import EvHttpClientCookieJarItem from '@/views/http-client/components/session/EvHttpClientCookieJarItem'
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import draggable from 'vuedraggable'
    import EvJsonSchemaAddButton from '@/modals/json-schema-manager/components/EvJsonSchemaAddButton'
    import EvJsonSchemaGroup from '@/modals/json-schema-manager/components/EvJsonSchemaGroup'
    import EvJsonSchemaManagerEventMixin from '@/modals/json-schema-manager/mixins/EvJsonSchemaManagerEventMixin'
    import EvJsonSchemaManagerContextMenu from '@/modals/json-schema-manager/EvJsonSchemaManagerContextMenu'
    import {EvJsonSchemaManagerEventBus, EvJsonSchemaManagerEvents} from '@/modals/json-schema-manager/EvJsonSchemaManagerEventBus'

    export default {
        name: "EvJsonSchemaManagerSidebar",

        components: {
            EvJsonSchemaManagerContextMenu,
            EvJsonSchemaGroup,
            EvJsonSchemaAddButton,
            EvHttpClientCookieJarContextMenu,
            EvHttpClientAddCookieJarButton,
            EvHttpClientAddVariableIcon,
            EvHttpClientEnvironmentAddButton,
            EvHttpClientCookieJarItem,
            EvLabel,
            EvVerticalGutter,
            EvCircleCloseButton,
            draggable
        },

        mixins: [
            EvJsonSchemaManagerEventMixin
        ],

        props: {
            groups: Array,

            selectedJsonSchemaGroup: Object,

            selectedJsonSchema: Object,
        },

        data() {
            return {
                contextMenuType: "jsonSchema", // jsonSchemaGroup jsonSchema

                focusedJsonSchemaGroup: undefined,

                focusedJsonSchema: undefined,
            }
        },

        methods: {
            handleShowJsonSchemaGroupContextMenu(event, focusedJsonSchemaGroup) {
                this.focusedJsonSchemaGroup = focusedJsonSchemaGroup

                this.focusedJsonSchema = undefined

                this.$refs['ev-json-schema-manager-context-menu__group'].show(event)
            },

            handleShowJsonSchemaContextMenu(event, focusedJsonSchemaGroup, focusedJsonSchema) {
                this.focusedJsonSchemaGroup = focusedJsonSchemaGroup

                this.focusedJsonSchema = focusedJsonSchema

                this.$refs['ev-json-schema-manager-context-menu__schema'].show(event)
            },

            emitRenameJsonSchemaGroup(jsonSchemaGroup) {
                EvJsonSchemaManagerEventBus.$emit(EvJsonSchemaManagerEvents.RENAME_JSON_SCHEMA_GROUP, jsonSchemaGroup)
            },

            emitRemoveJsonSchemaGroup(jsonSchemaGroup) {
                EvJsonSchemaManagerEventBus.$emit(EvJsonSchemaManagerEvents.REMOVE_JSON_SCHEMA_GROUP, jsonSchemaGroup)
            },

            emitRenameJsonSchema(jsonSchema) {
                EvJsonSchemaManagerEventBus.$emit(EvJsonSchemaManagerEvents.RENAME_JSON_SCHEMA, jsonSchema)
            },

            emitCloneJsonSchema(jsonSchema) {
                EvJsonSchemaManagerEventBus.$emit(EvJsonSchemaManagerEvents.CLONE_JSON_SCHEMA, this.focusedJsonSchemaGroup, jsonSchema)
            },

            emitRemoveJsonSchema(jsonSchema) {
                EvJsonSchemaManagerEventBus.$emit(EvJsonSchemaManagerEvents.REMOVE_JSON_SCHEMA, this.focusedJsonSchemaGroup, jsonSchema)
            },
        },

        i18n: {
            messages: {
                en: {
                    title: "Json Schema"
                },
                zh: {
                    title: "数据模型"
                },
                zh_TW: {
                    title: "資料模型"
                },
                jp: {
                    title: "データモデル"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-json-schema-manager-sidebar {
        display: flex;

        flex-direction: column;

        width: 240px;

        height: 100%;

        border-right: 1px solid #E0E0E0;

        background-color: #F5F5F5;

        &__title {
            display: flex;

            align-items: center;

            width: 100%;

            height: 40px;

            padding-left: 12px;

            padding-right: 14px;

            border-bottom: 1px solid #E0E0E0;
        }

        &__scroll-wrapper {
            display: flex;

            flex-direction: column;

            overflow-y: scroll;

            height: calc(100% - 40px);

            min-height: 1px;

            min-width: 1px;
        }
    }
</style>
