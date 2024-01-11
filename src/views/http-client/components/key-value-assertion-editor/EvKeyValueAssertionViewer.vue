<template>
    <div class="ev-key-value-assertion-editor">
        <ev-key-value-assertion-viewer-title :options="options"></ev-key-value-assertion-viewer-title>

        <ev-key-value-assertion-viewer-header :options="options"></ev-key-value-assertion-viewer-header>

        <ev-key-value-assertion-viewer-placeholder :options="options" v-if="noItems"></ev-key-value-assertion-viewer-placeholder>

        <ev-key-value-assertion-viewer-item v-for="item in items"
                                            :options="options"
                                            :key="item.uid"
                                            :item="item"></ev-key-value-assertion-viewer-item>
    </div>
</template>

<script>
    import EvKeyValueAssertionViewerTitle from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueAssertionViewerTitle'
    import EvKeyValueAssertionViewerHeader from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueAssertionViewerHeader'
    import EvKeyValueAssertionViewerItem from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueAssertionViewerItem'
    import EvKeyValueAssertionViewerPlaceholder from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueAssertionViewerPlaceholder'

    export default {
        name: "EvKeyValueAssertionViewer",

        components: {
            EvKeyValueAssertionViewerPlaceholder,
            EvKeyValueAssertionViewerItem,
            EvKeyValueAssertionViewerHeader,
            EvKeyValueAssertionViewerTitle
        },

        props: {
            options: Object,

            items: Array
        },

        computed: {
            noItems() {
                return !this.items || this.items.length === 0
            },
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
