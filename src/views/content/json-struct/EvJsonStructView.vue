<template>
    <div class="document-container d-flex flex-column" id="document-container">
        <ev-json-struct-view-title :json-struct="jsonStructContent"></ev-json-struct-view-title>

        <EvApiSubtitle v-model="showFieldsExample" :show-json-example-button="true">字段列表</EvApiSubtitle>

        <JavaViewer :json-structs="jsonStructContent.children" v-if="!showFieldsExample"></JavaViewer>

        <JsonViewer :java-fields="jsonStructContent.children" v-if="showFieldsExample"></JsonViewer>
    </div>
</template>

<script>
    import EvApiSubtitle from '@/components/typography/EvApiSubtitle'
    import JavaViewer from '@/components/java-viewer/java-viewer'
    import JsonViewer from '@/components/json-viewer/JsonViewer'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvJsonStructViewTitle from '@/views/content/json-struct/EvJsonStructViewTitle'

    export default {
        name: "EvJsonStructView",

        components: {
            EvJsonStructViewTitle,
            EvHorizonGutter,
            JsonViewer,
            JavaViewer,
            EvApiSubtitle,
        },

        mixins: [
            EvStoreMixin
        ],

        data() {
            return {
                showFieldsExample: false,
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "src/views/content/document-content";
</style>
