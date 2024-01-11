<template>
    <div class="d-flex flex-column" v-if="hasExceptions">
        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <ev-api-description-block-title>{{ $t('EvRpcExceptionBlock.label') }}</ev-api-description-block-title>

        <div style="padding-left: 6px">
            <java-viewer :json-structs="exceptions"></java-viewer>
        </div>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvApiDescriptionBlockTitle from '@/views/content/components/EvApiDefinitionBlockTitle'
    import JavaViewer from '@/components/java-viewer/java-viewer'
    import EvRpcBlockMixin from '@/components/rpc/EvRpcBlockMixin'

    export default {
        name: "EvRpcExceptionBlock",

        components: {
            JavaViewer,
            EvApiDescriptionBlockTitle,
            EvHorizonGutter
        },

        mixins: [
            EvRpcBlockMixin,
        ]
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>
