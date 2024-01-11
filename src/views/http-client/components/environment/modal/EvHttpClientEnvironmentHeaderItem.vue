<template>
    <div class="ev-http-client-environment-header-item">
        <div class="ev-http-client-environment-header-item__wrapper">
            <ev-editable-label ref="ev-editable-label" :size="12" medium v-model="environment.name" text-align="center"></ev-editable-label>
        </div>

        <div class="ev-http-client-environment-header-item__divider"></div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'

    export default {
        name: "EvHttpClientEnvironmentHeaderItem",

        components: {
            EvEditableLabel,
            EvLabel
        },

        mixins: [
            EvContextMenuMixin,
        ],

        props: {
            environment: Object
        },

        methods: {
            rename() {
                this.$refs['ev-editable-label'].enableEditing()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-environment-header-item {
        @include full-center;

        height: 31px;

        width: 200px;

        &__wrapper {
            @include full-center;

            height: 31px;

            width: 199px; // 200px - 1

            background-color: #F1F1F1;

            border-radius: 5px;

            padding-top: 1px;
        }

        &__divider {
            height: 18px;

            width: 1px;

            border-right: 1px solid #D8D8D8;
        }
    }
</style>
