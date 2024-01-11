<template>
    <div class="d-flex flex-column">
        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <ev-api-description-block-title>{{ $t('EvRpcResponseBlock.label') }}</ev-api-description-block-title>

        <div style="padding-left: 6px" v-if="hasResponses">
            <java-viewer :json-structs="responses"></java-viewer>
        </div>

        <div v-else>
            <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

            <ev-http-empty-placeholder text="没有返回响应"></ev-http-empty-placeholder>
        </div>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvApiDescriptionBlockTitle from '@/views/content/components/EvApiDefinitionBlockTitle'
    import JavaViewer from '@/components/java-viewer/java-viewer'
    import EvRpcBlockMixin from '@/components/rpc/EvRpcBlockMixin'
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'

    export default {
        name: "EvRpcResponseBlock",

        components: {
            EvHttpEmptyPlaceholder,
            JavaViewer,
            EvApiDescriptionBlockTitle,
            EvHorizonGutter
        },

        mixins: [
            EvRpcBlockMixin
        ],
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>
