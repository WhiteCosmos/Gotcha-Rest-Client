<template>
    <div class="struct-fields-block">
        <ev-horizon-gutter :gutter="32"></ev-horizon-gutter>

        <ev-api-subtitle>{{ $t('EvStructFieldsBlock.label') }}</ev-api-subtitle>

        <java-viewer :json-structs="[jsonStruct]"></java-viewer>


    </div>
</template>

<script>
    import JavaViewer from '@/components/java-viewer/java-viewer'
    import EvApiSubtitle from '@/components/typography/EvApiSubtitle'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvStructFieldsBlock",

        components: {
            EvHorizonGutter,
            EvApiSubtitle,
            JavaViewer
        },

        props: {
            jsonStruct: Object,
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .struct-fields-block {
        display: flex;

        flex-direction: column;
    }
</style>
