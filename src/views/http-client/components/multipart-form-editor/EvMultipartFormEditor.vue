<template>
    <div class="ev-multipart-form-editor">
        <ev-multipart-form-editor-title :options="options" @add-item="handleAddItem"></ev-multipart-form-editor-title>

        <ev-multipart-form-editor-header :options="options" v-model="checkedStatus_"></ev-multipart-form-editor-header>

        <div class="ev-multipart-form-editor__wrapper">
            <draggable v-model="items_" handle=".ev-multipart-form-editor-item__drag-container" :animation="200">
                <ev-multipart-form-editor-item v-for="(item, idx) in items_"
                                               :ref="'ev-multipart-form-editor-item-' + idx"
                                               :key="item.uid"
                                               :idx="idx"
                                               :item="item"
                                               :options="options"
                                               @insert-item="handleInsertItem"
                                               @update-item="handleUpdateItem"
                                               @remove-item="handleRemoveItem"></ev-multipart-form-editor-item>
            </draggable>


            <ev-multipart-form-editor-ghost-item :options="options"
                                                 :idx="items_.length"
                                                 @ghost-key-input="handleGhostKeyInput"
                                                 @ghost-value-input="handleGhostValueInput"></ev-multipart-form-editor-ghost-item>

            <div class="d-flex flex-shrink-0" style="height: 96px"></div>
        </div>
    </div>
</template>

<script>
    import EvCheckedStatusMixin from '@/mixins/EvCheckedStatusMixin'
    import draggable from 'vuedraggable'
    import _ from 'lodash'
    import EvMultipartFormEditorTitle from '@/views/http-client/components/multipart-form-editor/EvMultipartFormEditorTitle'
    import EvMultipartFormEditorHeader from '@/views/http-client/components/multipart-form-editor/EvMultipartFormEditorHeader'
    import EvMultipartFormEditorItem from '@/views/http-client/components/multipart-form-editor/EvMultipartFormEditorItem'
    import EvMultipartFormEditorGhostItem from '@/views/http-client/components/multipart-form-editor/EvMultipartFormEditorGhostItem'
    import MultipartFormItem from '@/views/http-client/components/multipart-form-editor/MultipartFormItem'
    import JsonSchemaNodeProperties from '@/components/json-schema-editor/JsonSchemaNodeProperties'

    export default {
        name: "EvMultipartFormEditor",

        components: {
            EvMultipartFormEditorGhostItem,
            EvMultipartFormEditorHeader,
            EvMultipartFormEditorItem,
            EvMultipartFormEditorTitle,
            draggable,
        },

        mixins: [
            EvCheckedStatusMixin,
        ],

        created() {
            this.initialize()
        },

        model: {
            prop: 'items',
            event: 'update',
        },

        props: {
            items: Array,

            options: {
                type: Object,
                default: () => {
                    return {
                        title: "Query Parameters",

                        keyPlaceholder: "Parameter Name",

                        valuePlaceholder: "Parameter Value",

                        availableKeys: [], // Available keys for auto complete

                        availableValues: [], // Available values for auto complete

                        indexMode: false, // Index mode for path parameter
                    }
                }
            }
        },

        data() {
            return {
                items_: [],

                checkedStatus_: "CHECKED",
            }
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
            }
        },

        computed: {
            isEditorEmpty() {
                return _.isEmpty(this.items)
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
                item.type === 'text' && (item.type = 'string')

                if (!item.hasOwnProperty('dataType')) {
                    this.$set(item, 'dataType', 'text')
                }

                if (!item.hasOwnProperty('format')) {
                    this.$set(item, 'format', '')
                }

                if (!item.hasOwnProperty('description')) {
                    this.$set(item, 'description', '')
                }

                if (!item.hasOwnProperty('properties')) {
                    this.$set(item, 'properties', new JsonSchemaNodeProperties())
                }
            },

            handleAddItem(key, value) {
                let item = new MultipartFormItem()

                item.key = key || ""

                item.value = value || ""

                this.items_.push(item)

                this.emitUpdateItems()
            },

            handleInsertItem(previousItem) {
                let item = new MultipartFormItem()

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
                    let item = this.$refs['ev-multipart-form-editor-item-' + (this.items_.length - 1)][0]

                    item.focusOnKey()
                })
            },

            handleGhostValueInput(ghostValue) {
                this.handleAddItem("", ghostValue)

                this.$nextTick(() => {
                    let item = this.$refs['ev-multipart-form-editor-item-' + (this.items_.length - 1)][0]

                    item.focusOnValue()
                })
            },

            emitUpdateItems() {
                this.$emit('update', this.items_)

                this.$emit('update-items')
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "EvMultipartFormEditor";
</style>
