<template>
    <div class="ev-http-block">
        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="ev-http-block__title">
            <span class="ev-http-block__title__label">{{ $t('EvHttpRequestHeaders.label') }}</span>
        </div>

        <java-viewer :json-structs="requestHeaders"></java-viewer>
    </div>
</template>

<script>
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import JavaViewer from '@/components/java-viewer/java-viewer'
    import EvLocaleMixin from '@/mixins/EvLocaleMixin'

    export default {
        name: "EvHttpRequestHeaders",

        components: {
            JavaViewer,
            EvHorizonGutter,
            EvVerticalGutter,
            EvHttpEmptyPlaceholder
        },

        mixins: [
            EvLocaleMixin
        ],

        props: {
            requestHeaders: Array // List<JsonStruct>
        },

        computed: {
            label() {
                if (this.isLocale_EN) {
                    return "Headers"
                }

                if (this.isLocale_ZH) {
                    return "请求头部"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../EvHttpBlock";
</style>
