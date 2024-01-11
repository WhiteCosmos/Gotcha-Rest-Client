<template>
    <div class="ev-http-client-request-body-menu">
        <ev-radio name="None" value="none" v-model="menu_"></ev-radio>

        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <ev-radio name="Text" value="text" v-model="menu_"></ev-radio>

        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <ev-radio name="Json" value="json" v-model="menu_"></ev-radio>

        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <ev-radio name="Form" value="form" v-model="menu_"></ev-radio>

        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <ev-radio name="Multipart" value="multipart" v-model="menu_"></ev-radio>

        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <ev-radio name="Binary" value="file" v-model="menu_"></ev-radio>

        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <ev-radio name="GraphQL" value="graphql" v-model="menu_"></ev-radio>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvRadio from '@/components/form/EvRadio'
    import EvHttpClientMenuMixin from '@/views/http-client/mixins/EvHttpClientMenuMixin'
    import EvLabel from '@/components/typography/EvLabel'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'

    export default {
        name: "EvHttpClientRequestBodyMenu",

        components: {
            EvLabel,
            EvRadio,
            EvVerticalGutter
        },

        mixins: [
            EvHttpClientMenuMixin
        ],

        created() {
            this.menu_ = this.menu
        },

        model: {
            prop: 'menu',

            event: 'change',
        },

        props: {
            menu: String,
        },

        data() {
            return {
                menu_: 'none',
            }
        },

        watch: {
            menu() {
                this.menu_ = this.menu
            },

            menu_() {
                this.emitChangeMenu()
            }
        },

        methods: {
            emitChangeMenu() {
                this.$emit('change', this.menu_)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-body-menu {
        display: flex;

        align-items: center;

        height: 28px;

        width: 100%;

        padding-left: 8px;

        background-color: #FAFAFA;

        border-bottom: 1px solid #F1F1F1;
    }
</style>
