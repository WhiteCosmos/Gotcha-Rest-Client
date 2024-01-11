<template>
    <div class="ev-content-tab-navigation">
        <div class="d-flex align-center" style="flex: 1">
            <ev-breadcrumbs :items="items"></ev-breadcrumbs>
        </div>

        <div class="d-flex align-center justify-end" style="flex: 1">
            <ev-http-client-request-template :content-tab="contentTab"></ev-http-client-request-template>

            <ev-http-client-code-snippets :content-tab="contentTab"></ev-http-client-code-snippets>

            <ev-http-client-view-switcher :content-tab="contentTab"></ev-http-client-view-switcher>
        </div>
    </div>
</template>

<script>
    import EvBreadcrumbs from '@/components/EvBreadcrumbs.vue'
    import EvHttpClientRequestTemplate from '@/components/tabs/content-tab-titles/http-client/EvHttpClientRequestTemplate.vue'
    import EvHttpClientCodeSnippets from '@/components/tabs/content-tab-titles/http-client/EvHttpClientCodeSnippets.vue'
    import EvHttpClientViewSwitcher from '@/components/tabs/content-tab-titles/EvHttpClientViewSwitcher.vue'

    export default {
        name: "EvContentTabNavigation",
        components: {EvHttpClientViewSwitcher, EvHttpClientCodeSnippets, EvHttpClientRequestTemplate, EvBreadcrumbs},

        props: {
            contentTab: Object
        },

        computed: {
            treeNode() {
                return this.contentTab ? this.contentTab.treeNodes[0] : {}
            },

            treeNodes() {
                return this.contentTab ? this.contentTab.treeNodes : []
            },

            items() {
                let items = []

                this.treeNodes.forEach(it => {
                    items.push(it.name)
                })

                return items
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-content-tab-navigation {
        display: flex;

        align-items: center;

        height: 40px;

        padding-left: 16px;

        padding-right: 16px;

        border-bottom: 1px solid #F1F1F1;
    }

    .ev-export-button {
        display: flex;

        align-items: center;

        width: fit-content;

        height: 24px;

        padding-left: 8px;

        padding-right: 8px;

        background-color: #F1F1F1;

        border-radius: 3px;

        margin-right: 8px;

        &:hover {
            background-color: #EAEAEA;
        }
    }
</style>
