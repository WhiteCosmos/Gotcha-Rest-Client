<template>
    <div class="ev-breadcrumbs">
        <div class="ev-breadcrumbs__item" v-for="(item, index) in items">
            <ev-label size="12" medium grey v-if="index !== 0">/</ev-label>

            <ev-vertical-gutter :gutter="4" v-if="index !== 0"></ev-vertical-gutter>

            <ev-label size="12" medium primary>{{ item }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLightIcon from '@/components/icon/ev-light-icon'

    export default {
        name: "EvBreadcrumbs",

        components: {
            EvLightIcon,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            items: Array
        },

        methods: {
            value(item) {

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-breadcrumbs {
        display: flex;

        align-items: center;

        padding-top: 1px;

        overflow: hidden;

        &__item {
            display: flex;

            align-items: center;

            padding-left: 4px;

            white-space: nowrap;
        }
    }
</style>
