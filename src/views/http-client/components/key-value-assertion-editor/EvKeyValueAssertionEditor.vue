<template>
    <div class="ev-key-value-assertion-editor">
        <ev-key-value-assertion-editor-title :options="options" @add-item="handleAddItem"></ev-key-value-assertion-editor-title>

        <ev-key-value-assertion-editor-header :options="options" v-model="checkedStatus_"></ev-key-value-assertion-editor-header>

        <div class="ev-key-value-assertion-editor__wrapper">
            <draggable v-model="items_"
                       @change="emitUpdateItems"
                       handle=".ev-key-value-assertion-editor-item__drag-container"
                       v-bind="dragOptions">
                <ev-key-value-assertion-editor-item v-for="(item, idx) in items_"
                                                    :ref="'ev-key-value-assertion-editor-item-' + idx"
                                                    :key="item.uid"
                                                    :idx="idx"
                                                    :item="item"
                                                    :options="options"
                                                    @insert-item="handleInsertItem"
                                                    @update-item="handleUpdateItem"
                                                    @remove-item="handleRemoveItem"></ev-key-value-assertion-editor-item>
            </draggable>

            <ev-key-value-assertion-editor-ghost-item :options="options"
                                                      :idx="items_.length"
                                                      @ghost-key-input="handleGhostKeyInput"
                                                      @ghost-value-input="handleGhostValueInput"></ev-key-value-assertion-editor-ghost-item>
        </div>
    </div>
</template>

<script>
    import EvKeyValueAssertionEditorTitle from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueAssertionEditorTitle'
    import EvKeyValueAssertionEditorHeader from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueAssertionEditorHeader'
    import EvCheckedStatusMixin from '@/mixins/EvCheckedStatusMixin'
    import draggable from 'vuedraggable'
    import EvKeyValueAssertionEditorItem from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueAssertionEditorItem'
    import EvKeyValueAssertionEditorGhostItem from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueAssertionEditorGhostItem'
    import GHCKeyValueAssertionItem from '@/views/http-client/components/key-value-assertion-editor/GHCKeyValueAssertionItem'
    import GHCRequestParameterItem from '@/views/http-client/components/request-parameter-editor/GHCRequestParameterItem'

    export default {
        name: "EvKeyValueAssertionEditor",

        components: {
            EvKeyValueAssertionEditorGhostItem,
            EvKeyValueAssertionEditorItem,
            EvKeyValueAssertionEditorHeader,
            EvKeyValueAssertionEditorTitle,
            draggable,
        },

        mixins: [
            EvCheckedStatusMixin
        ],

        created() {
            this.items_ = this.items
        },

        model: {
            prop: "items",
            event: "update"
        },

        props: {
            options: Object,

            items: Array
        },

        data() {
            return {
                checkedStatus_: "CHECKED",

                items_: []
            }
        },

        computed: {
            dragOptions() {
                return {
                    animation: 200,
                }
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

        methods: {
            handleAddItem(key, value) {
                let item = new GHCKeyValueAssertionItem()

                item.key = key || ""

                item.value = value || ""

                this.items_.push(item)

                this.emitUpdateItems()
            },

            handleInsertItem(previousItem) {
                let item = new GHCKeyValueAssertionItem()

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
            },

            handleRemoveItem(item) {
                let index = this.items_.indexOf(item)

                this.items_.splice(index, 1)
            },

            handleGhostKeyInput(ghostKey) {
                this.handleAddItem(ghostKey, "")

                this.$nextTick(() => {
                    let item = this.$refs['ev-key-value-assertion-editor-item-' + (this.items_.length - 1)][0]

                    item.focusOnKey()
                })
            },

            handleGhostValueInput(ghostValue) {
                this.handleAddItem("", ghostValue)

                this.$nextTick(() => {
                    let item = this.$refs['ev-key-value-assertion-editor-item-' + (this.items_.length - 1)][0]

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
    @import "EvKeyValueAssertionEditor";

    .ev-key-value-assertion-editor {
        display: flex;

        flex-direction: column;

        width: 100%;

        &__wrapper {
            display: flex;

            flex-direction: column;
        }
    }
</style>
