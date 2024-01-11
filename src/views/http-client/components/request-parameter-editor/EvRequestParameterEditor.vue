<template>
    <div class="ev-request-parameter-editor" :class="{'ev-request-parameter-editor--page-mode' : pageMode}">
        <ev-request-parameter-editor-query-parameters-title v-if="isQueryMode"
                                                            :page-mode='pageMode'
                                                            :options="options"
                                                            :config="config"
                                                            @export-parameters="emitExportParameters"
                                                            @import-parameters="emitImportParameters"
                                                            @add-item="handleAddItem"></ev-request-parameter-editor-query-parameters-title>

        <ev-request-parameter-editor-title v-else
                                           :page-mode='pageMode'
                                           :options="options"
                                           @export-parameters="emitExportParameters"
                                           @import-parameters="emitImportParameters"
                                           @add-item="handleAddItem"></ev-request-parameter-editor-title>

        <ev-request-parameter-editor-header :options="options"
                                            :page-mode="pageMode"
                                            v-model="checkedStatus_"></ev-request-parameter-editor-header>

        <div class="ev-request-parameter-editor__wrapper"
             :class="{'ev-request-parameter-editor__wrapper--page-mode': pageMode}">
            <draggable v-model="items_"
                       @change="emitUpdateItems"
                       handle=".ev-request-parameter-editor-item__drag-container"
                       v-bind="dragOptions">
                <div class="ev-request-parameter-editor__item-wrapper" style="width: 100%"
                     v-for="(item, idx) in items_">
                    <ev-request-parameter-editor-array-item
                        v-if="item.dataType === 'array'"
                        :ref="'ev-request-parameter-editor-item-' + idx"
                        :key="item.uid"
                        :idx="idx"
                        :item="item"
                        :options="options"
                        @insert-item="handleInsertItem"
                        @update-item="handleUpdateItem"
                        @remove-item="handleRemoveItem"></ev-request-parameter-editor-array-item>

                    <ev-request-parameter-editor-item
                        v-else
                        :ref="'ev-request-parameter-editor-item-' + idx"
                        :key="item.uid"
                        :idx="idx"
                        :item="item"
                        :options="options"
                        @insert-item="handleInsertItem"
                        @update-item="handleUpdateItem"
                        @remove-item="handleRemoveItem"></ev-request-parameter-editor-item>
                </div>
            </draggable>

            <ev-request-parameter-editor-ghost-item :options="options"
                                                    :idx="items_.length"
                                                    @ghost-key-input="handleGhostKeyInput"
                                                    @ghost-value-input="handleGhostValueInput"></ev-request-parameter-editor-ghost-item>

            <div class="d-flex flex-shrink-0" style="height: 96px" v-if="pageMode"></div>
        </div>
    </div>
</template>

<script>
    import EvRequestParameterEditorTitle from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorTitle'
    import EvRequestParameterEditorHeader from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorHeader'
    import EvRequestParameterEditorGhostItem from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorGhostItem'
    import EvRequestParameterEditorItem from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorItem'
    import GHCRequestParameterItem from '@/views/http-client/components/request-parameter-editor/GHCRequestParameterItem'
    import EvCheckedStatusMixin from '@/mixins/EvCheckedStatusMixin'
    import draggable from 'vuedraggable'
    import EvRequestParameterEditorArrayItem from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorArrayItem'
    import EvRequestParameterEditorQueryParametersTitle
        from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorQueryParametersTitle'
    import EvRequestParameterEditorMixin from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorMixin'
    import EvRequestParameterEditorEventsMixin from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorEventsMixin'
    import JsonSchemaNodeProperties from '@/components/json-schema-editor/JsonSchemaNodeProperties'

    export default {
        name: "EvRequestParameterEditor",

        components: {
            EvRequestParameterEditorQueryParametersTitle,
            EvRequestParameterEditorArrayItem,
            EvRequestParameterEditorItem,
            EvRequestParameterEditorGhostItem,
            EvRequestParameterEditorHeader,
            EvRequestParameterEditorTitle,
            draggable,
        },

        mixins: [
            EvRequestParameterEditorEventsMixin,
            EvCheckedStatusMixin,
            EvRequestParameterEditorMixin,
        ],

        created() {
            this.initialize()
        },

        model: {
            prop: "items",
            event: "update"
        },

        props: {
            items: Array,

            config: Object,

            pageMode: Boolean,
        },

        data() {
            return {
                items_: [],

                checkedStatus_: "CHECKED",
            }
        },

        computed: {
            dragOptions() {
                return {
                    animation: 200,
                }
            },
        },

        watch: {
            items() {
                this.items_ = this.items
            },

            checkedStatus_(newVal) {
                if (newVal === "CHECKED") {
                    this.toEveryChecked(this.items_)

                    this.emitUpdateItems()
                }

                if (newVal === "UNCHECKED") {
                    this.toEveryUnchecked(this.items_)

                    this.emitUpdateItems()
                }
            },

            config: {
                deep: true,
                handler() {
                    this.emitUpdateItems()
                },
            }
        },

        methods: {
            initialize() {
                this.items_ = this.items

                this.items_.forEach(item => {
                    this.initializeProperties(item)
                })
            },

            initializeProperties(item) {
                // since 1.4.6

                if (!item.hasOwnProperty('children')) {
                    this.$set(item, 'children', [])
                }

                if (!this.hasOwnProperty('separator')) {
                    this.$set(item, 'separator', '')
                }

                // since 1.6.0

                if (!item.hasOwnProperty('dataType')) {
                    this.$set(item, 'dataType', 'text')
                }

                if (!item.hasOwnProperty('format')) {
                    this.$set(item, 'format', '')
                }

                if (!item.hasOwnProperty('properties')) {
                    this.$set(item, 'properties', new JsonSchemaNodeProperties())
                }
            },

            handleAddItem(key, value) {
                let item = new GHCRequestParameterItem()

                if (this.options.required) {
                    item.requiredStatus = 'CHECKED'
                } else {
                    item.requiredStatus = 'UNCHECKED'
                }

                item.key = key || ""

                item.value = value || ""

                this.items_.push(item)

                this.emitUpdateItems()
            },

            handleInsertItem(previousItem) {
                let item = new GHCRequestParameterItem() // TODO !!! 数据结构和Url那边不一样 KeyValueItem

                if (this.options.required) {
                    item.requiredStatus = 'CHECKED'
                } else {
                    item.requiredStatus = 'UNCHECKED'
                }

                let index = this.items_.indexOf(previousItem)

                this.items_.splice(index + 1, 0, item)

                this.emitUpdateItems()
            },

            handleUpdateItem() {
                if (this.isEveryChecked(this.items_)) {
                    this.checkedStatus_ = "CHECKED"
                } else if (this.isAnyChecked(this.items_)) {
                    this.checkedStatus_ = "HALF_CHECKED"
                } else if (this.isNullChecked(this.items_)) {
                    this.checkedStatus_ = "UNCHECKED"
                }

                this.emitUpdateItems()
            },

            handleRemoveItem(item) {
                let index = this.items_.indexOf(item)

                this.items_.splice(index, 1)

                this.emitUpdateItems()
            },

            handleGhostKeyInput(ghostKey) {
                this.handleAddItem(ghostKey, "")

                this.$nextTick(() => {
                    let item = this.$refs['ev-request-parameter-editor-item-' + (this.items_.length - 1)][0]

                    item.focusOnKey()
                })
            },

            handleGhostValueInput(ghostValue) {
                this.handleAddItem("", ghostValue)

                this.$nextTick(() => {
                    let item = this.$refs['ev-request-parameter-editor-item-' + (this.items_.length - 1)][0]

                    item.focusOnValue()
                })
            },

            emitUpdateItems() {
                this.$emit('update', this.items_)

                this.$emit('update-items')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvRequestParameterEditor";

    @import "~@/styles/scrollbar.scss";

    .ev-request-parameter-editor {
        display: flex;

        flex-direction: column;

        flex-shrink: 0;

        min-width: 1px;

        min-height: 1px;

        &--page-mode {
            height: 100%;
        }

        &__wrapper {
            display: flex;

            flex-direction: column;

            &--page-mode {
                height: calc(100% - 56px);

                overflow-y: scroll;
            }
        }

        &__item-wrapper {
            display: flex;

            flex: 1;

            min-width: 1px;

            min-height: 1px;

            width: 100%;
        }
    }
</style>
