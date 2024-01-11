<template>
    <div class="ev-request-parameter-description-editor-title"
         :class="styles">
        <ev-label size="11" bold secondary>{{ options.title }}</ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-counter-label :value="count"></ev-counter-label>

        <v-spacer></v-spacer>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-json-add-button @click.native="emitAddItem"></ev-json-add-button>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvCounterLabel from '@/components/label/EvCounterLabel'

    export default {
        name: "EvRequestParameterDescriptionEditorTitle",

        components: {
            EvCounterLabel,
            EvJsonAddButton,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            count: {
                type: Number,
                default: 0,
            },

            options: Object
        },

        computed: {
            styles() {
                return {
                    'ev-request-parameter-description-editor-title--page-mode': this.options.pageMode
                }
            },
        },

        methods: {
            emitAddItem() {
                this.$emit('add-item')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-request-parameter-description-editor-title {
        display: flex;

        align-items: center;

        height: 28px;

        border-bottom: 1px solid #EAEAEA;

        border-radius: 5px 5px 0 0;

        user-select: none;

        background-color: #FAFAFA;

        padding-left: 16px;

        //background-color: #FF8282;

        &--page-mode {
            background-color: #FFF;

            border-top: 1px solid #F1F1F1;

            border-radius: 0;
        }

        &__icon-container {
            @include full-center;

            height: 28px;

            width: 32px;
        }
    }

</style>
