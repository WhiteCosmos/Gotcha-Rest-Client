<template>
    <div class="ev-http-client-label-divider">
        <div class="ev-http-client-label-divider__wrapper">
            <ev-label size="11" bold secondary>{{ label }}</ev-label>
        </div>

        <v-spacer></v-spacer>

        <slot name="widget"></slot>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvHttpClientLabelDivider",

        components: {
            EvLabel
        },

        props: {
            label: String,

            superscript: String,

            count: String,
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-label-divider {
        display: flex;

        align-items: center;

        padding-left: 16px;

        height: 27px; // OHHHHHHHHHH!!!

        flex-shrink: 0;

        background-color: #FAFAFA;

        //box-shadow: inset 0px 8px 8px -12px #C8C8C8, inset 0px -8px 8px -12px #C8C8C8;

        &__wrapper {
            display: flex;

            align-items: flex-end;

            height: 28px;

            padding-bottom: 2px;
        }

        &__superscript {

        }
    }
</style>
