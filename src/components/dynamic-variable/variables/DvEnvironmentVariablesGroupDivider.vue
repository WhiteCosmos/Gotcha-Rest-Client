<template>
    <div class="dv-environment-variables-group-divider">
        <ev-label size="10" grey>{{ label }}</ev-label>

        <div class="dv-environment-variables-group-divider__line"></div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "DvEnvironmentVariablesGroupDivider",

        components: {
            EvLabel
        },

        props: {
            label: String
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .dv-environment-variables-group-divider {
        display: flex;

        align-items: center;

        height: 20px;

        width: 100%;

        padding-left: 3px;

        padding-right: 3px;

        &__line {
            display: flex;

            flex: 1;

            height: 1px;

            border-top: 1px solid #CCC;

            margin-left: 4px;

            margin-right: 4px;
        }
    }
</style>
