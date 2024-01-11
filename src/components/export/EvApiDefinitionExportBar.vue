<template>
    <div class="api-definition-export-bar">
        <div class="api-definition-export-bar__icon-container">
            <v-icon size="12" color="#AABBCC">fa-share</v-icon>
        </div>

        <!--        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

        <!--        <v-divider vertical inset></v-divider>-->

        <ev-api-definition-export-bar-item @click.native="doExportMarkdown(jsonMethod)">Markdown</ev-api-definition-export-bar-item>

        <!--        <v-divider vertical inset></v-divider>-->

        <!--        <ev-api-definition-export-bar-item>HTML</ev-api-definition-export-bar-item>-->
    </div>
</template>

<script>
    import EvApiDefinitionExportBarItem from '@/components/export/EvApiDefinitionExportBarItem'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvVerticalDivider from '@/components/layout/EvVerticalDivider'
    import EvExportMixin from '@/mixins/EvExportMixin'

    export default {
        name: "EvApiDefinitionExportBar",

        components: {
            EvVerticalDivider,
            EvVerticalGutter,
            EvApiDefinitionExportBarItem
        },

        mixins: [
            EvExportMixin
        ],

        props: {
            jsonMethod: Object
        },

        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .api-definition-export-bar {
        height: 24px;

        width: 120px;

        border-radius: 3px;

        //@include white-background-gradient;

        background: linear-gradient(0deg, #FAFAFA 0%, #FCFCFC 100%);

        //background-color: #FAFAFA;

        //@include component-shadow;

        box-shadow: 0 2px 8px -6px #E0E0E0;

        border: 1px solid #F1F1F1;

        display: flex;

        align-items: center;

        user-select: none;

        &__icon-container {
            width: 24px;

            height: 24px;

            @include full-center;

            //background-color: #007AFF;

            //@include blue-background-gradient;

            border-right: 1px solid #F1F1F1;

            border-radius: 2px 0 0 2px;
        }
    }
</style>
