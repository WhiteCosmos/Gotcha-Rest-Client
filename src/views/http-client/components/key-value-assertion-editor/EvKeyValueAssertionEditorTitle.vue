<template>
    <div class="ev-key-value-assertion-editor-title">
        <ev-label size="11" bold secondary>{{ options.title }}</ev-label>

        <!--        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>-->

        <!--        <ev-label size="10" grey>Text</ev-label>-->

        <!--        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>-->

        <!--        <ev-label size="10" grey>Json</ev-label>-->

        <!--        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>-->

        <!--        <ev-label size="10" grey>Xml</ev-label>-->

        <!--        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>-->

        <!--        <ev-label size="10" grey>Image</ev-label>-->

        <v-spacer></v-spacer>

        <ev-json-add-button @click.native="emitAddItem"></ev-json-add-button>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvKeyValueAssertionEditorTitle",

        components: {
            EvVerticalGutter,
            EvJsonAddButton,
            EvLabel
        },

        props: {
            options: Object
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

    .ev-key-value-assertion-editor-title {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 24px;

        padding-right: 8px;

        border-bottom: 1px solid #EAEAEA;

        user-select: none;
    }
</style>
