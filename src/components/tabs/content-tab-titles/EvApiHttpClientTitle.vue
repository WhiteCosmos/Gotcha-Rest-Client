<template>
    <div class="api-definition-title">
        <ev-label grey bold :size="11">{{ serviceName }}</ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-label grey> ></ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-label grey bold :size="11">{{ methodName }}</ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-label grey> ></ev-label>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-http-client-navigation :json-method="contentTab.jsonMethod"
                                   :http-operation="contentTab.httpOperation"></ev-http-client-navigation>

        <v-spacer></v-spacer>
    </div>
</template>

<script>
    import GHCContentTab from '@/components/tabs/GHCContentTab'
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHttpClientNavigation from '@/components/tabs/content-tab-titles/http-client/EvHttpClientNavigation'
    import EvHttpClientVariableManager from '@/components/tabs/content-tab-titles/http-client/EvHttpClientVariableManager'

    export default {
        name: "EvApiHttpClientTitle",

        components: {
            EvHttpClientVariableManager,
            EvHttpClientNavigation,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            contentTab: GHCContentTab
        },

        computed: {
            serviceName() {
                return this.contentTab.jsonMethod.serviceName
            },

            methodName() {
                return this.contentTab.jsonMethod.methodName
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .api-definition-title {
        @include horizon-center;

        height: 40px;
    }
</style>
