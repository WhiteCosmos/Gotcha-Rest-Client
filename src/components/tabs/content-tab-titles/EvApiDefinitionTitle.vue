<template>
    <div class="api-definition-title">
        <ev-label grey bold :size="11">{{ serviceName }}</ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-label grey> ></ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-label grey bold :size="11">{{ methodName }}</ev-label>

        <v-spacer></v-spacer>
    </div>
</template>

<script>
    import GHCContentTab from '@/components/tabs/GHCContentTab'
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvApiDefinitionTitle",

        components: {
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

        //padding-left: 72px;

        height: 40px;
    }
</style>
