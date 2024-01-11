<template>
    <div class="ev-key-value-viewer">
        <ev-key-value-viewer-title :items='items' :options="options" v-if="!options.withoutTitle"></ev-key-value-viewer-title>

        <div v-if="options.withoutTitle" style="border-bottom: 1px solid #F5F5F5"></div>

        <ev-key-value-viewer-item
            v-for="(item, index) in items"
            :item="item"
            :index="index"
            :key="index"
            :diffColor="diffColor"
            @contextmenu.native="handleShowContextMenu($event, item)"></ev-key-value-viewer-item>

        <ev-key-value-viewer-context-menu ref="ev-key-value-viewer-context-menu"
                                          @copy-key-value="handleCopyKeyValue"
                                          @add-assertion="emitAddAssertion"
                                          v-if="options.contextMenu"></ev-key-value-viewer-context-menu>
    </div>
</template>

<script>
    import EvKeyValueViewerTitle from '@/views/http-client/components/key-value-viewer/EvKeyValueViewerTitle'
    import EvKeyValueViewerItem from '@/views/http-client/components/key-value-viewer/EvKeyValueViewerItem'
    import KeyValueViewerOptions from '@/views/http-client/components/key-value-viewer/KeyValueViewerOptions'
    import EvKeyValueViewerContextMenu from '@/views/http-client/components/key-value-viewer/EvKeyValueViewerContextMenu'
    import {clipboard} from 'electron'

    export default {
        name: "EvKeyValueViewer",

        components: {
            EvKeyValueViewerContextMenu,
            EvKeyValueViewerItem,
            EvKeyValueViewerTitle
        },

        props: {
            options: {
                type: Object,
                default: () => {
                    return new KeyValueViewerOptions()
                }
            },

            items: Array,

            diffColor: Boolean
        },

        data() {
            return {
                focusedItem: undefined
            }
        },

        methods: {
            handleShowContextMenu(event, item) {
                this.focusedItem = item

                this.$refs['ev-key-value-viewer-context-menu'].show(event)
            },

            handleCopyKeyValue() {
                let item = this.focusedItem

                clipboard.writeText(`${item.key} : ${item.value}`)

                this.focusedItem = undefined
            },

            emitAddAssertion() {
                this.$emit('add-assertion', this.focusedItem)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-key-value-viewer {
        @include flex-column;

        flex-shrink: 0;

        width: 100%;
    }
</style>
