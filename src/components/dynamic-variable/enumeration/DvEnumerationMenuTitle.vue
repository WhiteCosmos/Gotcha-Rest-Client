<template>
    <div class="dv-enumeration-menu-title">
        <ev-label size="10" grey>{{ label }}</ev-label>

        <div class="dv-enumeration-menu-title__divider"></div>

        <ev-circle-plus-icon @click.native="emitAddItem"></ev-circle-plus-icon>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvCirclePlusIcon from '@/views/http-client/icon/ev-circle-plus-icon'
    import DvEnumerationMixin from '@/components/dynamic-variable/enumeration/DvEnumerationMixin'

    export default {
        name: "DvEnumerationMenuTitle",

        components: {
            EvCirclePlusIcon,
            EvLabel
        },

        mixins: [
            DvEnumerationMixin
        ],

        props: {
            label: String,
        },

        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .dv-enumeration-menu-title {
        display: flex;

        align-items: center;

        height: 20px;

        padding-left: 3px;

        padding-right: 2px;

        &__divider {
            display: flex;

            flex: 1;

            height: 1px;

            border-top: 1px solid #CCC;

            margin-left: 4px;

            margin-right: 4px;
        }
    }
</style>
