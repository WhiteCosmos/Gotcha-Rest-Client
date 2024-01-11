<template>
    <div class="d-flex flex-column">
        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <ev-api-description-block-title>{{ $t('EvRpcRequestBlock.label') }}</ev-api-description-block-title>

        <!--        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>-->

        <div style="padding-left: 6px">
            <java-viewer :json-structs="parameters"></java-viewer>
        </div>

        <div v-if="!hasParameters">
            <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

            <ev-http-empty-placeholder text="没有请求参数"></ev-http-empty-placeholder>
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
        name: "EvRpcRequestBlock",

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
