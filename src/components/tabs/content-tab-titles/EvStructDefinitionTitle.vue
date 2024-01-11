<template>
    <div class="struct-definition-title">
        <ev-label grey>{{ contentTab.jsonStructContent.fieldName }}</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import GHCContentTab from '@/components/tabs/GHCContentTab'

    export default {
        name: "EvStructDefinitionTitle",

        components: {
            EvLabel
        },

        props: {
            contentTab: GHCContentTab
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .struct-definition-title {
        @include horizon-center;

        padding-left: 72px;

        height: 40px;
    }
</style>
