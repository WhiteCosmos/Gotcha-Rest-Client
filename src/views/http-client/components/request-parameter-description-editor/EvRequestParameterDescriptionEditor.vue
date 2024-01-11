<template>
    <div class="ev-request-parameter-description-editor">
        <ev-request-parameter-description-editor-title :options="options"
                                                       :count="items_.length"
                                                       v-if="!options.noTitle"
                                                       @add-item="handleAddItem"></ev-request-parameter-description-editor-title>

        <ev-request-parameter-description-editor-header :options="options"></ev-request-parameter-description-editor-header>

        <div class="ev-request-parameter-description-editor__wrapper">
            <draggable v-model="items_"
                       @change="emitUpdateItems"
                       handle=".ev-request-parameter-description-editor-item__drag-container"
                       v-bind="dragOptions">
                <ev-request-parameter-description-editor-item v-for="(item, idx) in items_"
                                                              :ref="'ev-request-parameter-description-editor-item-' + idx"
                                                              :key="item.uid"
                                                              :idx="idx"
                                                              :item="item"
                                                              :options="options"
                                                              @insert-item="handleInsertItem"
                                                              @update-item="handleUpdateItem"
                                                              @remove-item="handleRemoveItem"></ev-request-parameter-description-editor-item>
            </draggable>
        </div>

        <ev-request-parameter-description-editor-ghost-item :options="options"
                                                            :idx="items_.length"
                                                            @ghost-key-input="handleGhostKeyInput"
                                                            @ghost-value-input="handleGhostValueInput"></ev-request-parameter-description-editor-ghost-item>
    </div>
</template>

<script>
    import EvRequestParameterDescriptionEditorTitle
        from '@/views/http-client/components/request-parameter-description-editor/EvRequestParameterDescriptionEditorTitle'
    import EvRequestParameterDescriptionEditorHeader
        from '@/views/http-client/components/request-parameter-description-editor/EvRequestParameterDescriptionEditorHeader'
    import EvRequestParameterDescriptionEditorItem
        from '@/views/http-client/components/request-parameter-description-editor/EvRequestParameterDescriptionEditorItem'
    import EvRequestParameterDescriptionEditorPlaceholder
        from '@/views/http-client/components/request-parameter-description-editor/EvRequestParameterDescriptionEditorPlaceholder'
    import EvHttpClientDocsPayloadTitle from '@/views/http-client/request/request-docs/EvHttpClientDocsRequestPayloadTitle'
    import GHCRequestParameterItem from '@/views/http-client/components/request-parameter-editor/GHCRequestParameterItem'

    import draggable from 'vuedraggable'
    import EvRequestParameterEditorGhostItem from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorGhostItem'
    import EvRequestParameterDescriptionEditorGhostItem
        from '@/views/http-client/components/request-parameter-description-editor/EvRequestParameterDescriptionEditorGhostItem'

    export default {
        name: "EvRequestParameterDescriptionEditor",

        components: {
            EvRequestParameterDescriptionEditorGhostItem,
            EvRequestParameterEditorGhostItem,
            EvHttpClientDocsPayloadTitle,
            EvRequestParameterDescriptionEditorPlaceholder,
            EvRequestParameterDescriptionEditorItem,
            EvRequestParameterDescriptionEditorHeader,
            EvRequestParameterDescriptionEditorTitle,
            draggable,
        },

        created() {
            this.items_ = this.items
        },

        model: {
            prop: "items",
            event: "update"
        },

        props: {
            items: Array, // KeyValueItem

            options: Object,
        },

        data() {
            return {
                items_: [],
            }
        },

        watch: {
            items() {
                this.items_ = this.items
            },
        },

        computed: {
            dragOptions() {
                return {
                    animation: 200
                }
            },
        },

        methods: {
            handleAddItem(key, value) {
                let item = new GHCRequestParameterItem()

                if (this.options.mode === 'path') {
                    item.requiredStatus = 'UNCHECKED'
                }

                item.key = key || ''

                item.value = value || ''

                this.items_.push(item)

                this.emitUpdateItems()
            },

            handleInsertItem(previousItem) {
                let item = new GHCRequestParameterItem()

                if (this.options.mode === 'path') {
                    item.requiredStatus = 'UNCHECKED'
                }

                let index = this.items_.indexOf(previousItem)

                this.items_.splice(index + 1, 0, item)

                this.emitUpdateItems()
            },

            handleUpdateItem() {
                this.emitUpdateItems()
            },

            handleRemoveItem(item) {
                let index = this.items_.indexOf(item)

                this.items_.splice(index, 1)

                this.emitUpdateItems()
            },

            handleGhostKeyInput(ghostKey) {
                if (this.options.mode === 'path') {
                    this.handleAddItem('', ghostKey)
                } else {
                    this.handleAddItem(ghostKey, '')
                }

                this.$nextTick(() => {
                    let item = this.$refs['ev-request-parameter-description-editor-item-' + (this.items_.length - 1)][0]

                    item.focusOnKey()
                })
            },

            handleGhostValueInput(ghostValue) {
                this.handleAddItem("", ghostValue)

                this.$nextTick(() => {
                    let item = this.$refs['ev-request-parameter-description-editor-item-' + (this.items_.length - 1)][0]

                    item.focusOnValue()
                })
            },

            emitUpdateItems() {
                this.$emit('update', this.items_)

                this.$emit('update-items')
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-request-parameter-description-editor {
        display: flex;

        flex-direction: column;

        min-width: 1px;

        min-height: 1px;

        width: 100%;

        &__wrapper {
            display: flex;

            flex-direction: column;
        }
    }
</style>
