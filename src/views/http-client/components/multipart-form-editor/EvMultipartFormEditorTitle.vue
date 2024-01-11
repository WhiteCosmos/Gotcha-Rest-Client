<template>
    <div class="ev-multipart-form-editor-title">
        <ev-label size="11" secondary bold>{{ options.title }}</ev-label>

        <ev-label size="11" primary v-if="options.subtitle" style="margin-left: 4px;">{{ options.subtitle }}</ev-label>

        <v-spacer></v-spacer>

        <ev-json-add-button @click.native="emitAddItem"></ev-json-add-button>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'

    export default {
        name: "EvCookieEditorTitle",

        components: {
            EvJsonAddButton,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            options: Object,
        },

        computed: {},

        methods: {
            emitAddItem() {
                this.$emit('add-item')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvMultipartFormEditor";

    .ev-multipart-form-editor-title {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 24px;

        padding-right: 22px;

        border-bottom: 1px solid #EAEAEA;

        user-select: none;
    }
</style>
