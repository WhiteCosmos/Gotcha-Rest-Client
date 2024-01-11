<template>
    <div class="ev-http-block">
        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="ev-http-block__title">
            <span class="ev-http-block__title__label">{{ $t('EvHttpRequestUrlParams.label') }}</span>
        </div>

        <java-viewer :json-structs="urlParameters"></java-viewer>
    </div>
</template>

<script>
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import JavaViewer from '@/components/java-viewer/java-viewer'

    export default {
        name: "EvHttpRequestUrlParams",

        components: {
            JavaViewer,
            EvHorizonGutter,
            EvVerticalGutter,
            EvHttpEmptyPlaceholder
        },

        mixins: [],

        props: {
            urlParameters: Array // List<JsonStruct>
        }
    }
</script>

<style lang="scss" scoped>
    @import "../EvHttpBlock";
</style>
