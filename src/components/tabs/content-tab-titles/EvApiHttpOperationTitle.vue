<template>
    <div class="api-http-operation-title">
        <ev-breadcrumbs :items="items"></ev-breadcrumbs>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvBreadcrumbs from '@/components/EvBreadcrumbs'
    import EvHttpClientViewSwitcher from '@/components/tabs/content-tab-titles/EvHttpClientViewSwitcher'

    export default {
        name: "EvApiHttpOperationTitle",

        components: {
            EvHttpClientViewSwitcher,
            EvBreadcrumbs,
            EvVerticalGutter
        },

        props: {
            contentTab: Object
        },

        data() {
            return {}
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

    .api-http-operation-title {
        @include horizon-center;

        height: 40px;

        user-select: none;

        &__label-container {
            display: flex;
        }

        &__label {
            font-size: 11px;

            font-weight: bolder;

            color: #AABBCC;
        }
    }
</style>
