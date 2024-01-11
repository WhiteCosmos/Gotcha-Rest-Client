<template>
    <div class="ev-request-parameter-description-editor-header">
        <div class="ev-request-parameter-description-editor__name-column">
            <ev-label size="12" bold grey>{{ isPathMode ? $t('EvKeyValueEditor.indexAndName') : $t('EvKeyValueEditor.name') }}</ev-label>

            <v-spacer></v-spacer>

            <ev-label size="12" bold grey v-if="isPathMode">{{ $t('pathParameter') }}</ev-label>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
        </div>

        <div class="ev-request-parameter-description-editor__optional-column">
            <ev-label size="12" bold grey>{{ isPathMode ? $t('EvKeyValueEditor.type') : $t('EvKeyValueEditor.type') }}</ev-label>
        </div>

        <div class="ev-request-parameter-description-editor__value-column">
            <ev-label size="12" bold grey>{{ $t('EvKeyValueEditor.description') }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvRequestParameterDescriptionEditorHeader",

        components: {
            EvVerticalGutter,
            EvLabel
        },

        props: {
            options: Object
        },

        computed: {
            isPathMode() {
                return this.options && this.options.mode === 'path'
            },
        },

        i18n: {
            messages: {
                en: {
                    pathParameter: "Param"
                },
                zh: {
                    pathParameter: "参数"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./EvRequestParameterDescriptionEditor";

    .ev-request-parameter-description-editor-header {
        display: flex;

        align-items: center;

        height: 28px;

        border-bottom: 1px solid #EAEAEA;

        padding-left: 16px;

        padding-right: 4px;

        user-select: none;
    }
</style>
