<template>
    <div class="struct-definition">
        <ev-struct-title-block :json-struct="contentTab.jsonStruct"></ev-struct-title-block>

        <ev-struct-fields-block :json-struct="contentTab.jsonStruct"></ev-struct-fields-block>

        <api-placeholder-block></api-placeholder-block>
    </div>
</template>

<script>
    import EvStructTitleBlock from '@/views/content/components/struct-definition/EvStructTitleBlock'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvStructFieldsBlock from '@/views/content/components/struct-definition/EvStructFieldsBlock'
    import ApiPlaceholderBlock from '@/views/content/definition-block/ApiPlaceholderBlock'

    export default {
        name: "EvStructDefinition",

        components: {
            ApiPlaceholderBlock,
            EvStructFieldsBlock,
            EvHorizonGutter,
            EvStructTitleBlock
        },

        props: {
            contentTab: Object,
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .struct-definition {
        display: flex;

        flex-direction: column;

        padding-left: 72px;

        padding-right: 72px;
    }
</style>
