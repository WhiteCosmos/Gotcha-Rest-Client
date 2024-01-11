<template>
    <div class="ev-http-block">
        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="ev-http-block__title">
            <span class="ev-http-block__title__label">{{ $t('EvHttpResponseHeaders.label') }}</span>
        </div>

        <java-viewer :json-structs="responseHeaders"></java-viewer>
    </div>
</template>

<script>
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import JavaViewer from '@/components/java-viewer/java-viewer'
    import EvLocaleMixin from '@/mixins/EvLocaleMixin'

    export default {
        name: "EvHttpResponseHeaders",

        components: {
            JavaViewer,
            EvHorizonGutter,
            EvVerticalGutter,
            EvHttpEmptyPlaceholder
        },

        props: {
            responseHeaders: Array // List<JsonStruct>
        },
    }
</script>

<style lang="scss" scoped>
    @import "../EvHttpBlock";
</style>
