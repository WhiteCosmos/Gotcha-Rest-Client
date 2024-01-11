<template>
    <div class="dv-json-editor-modal">
        <div class="dv-json-editor-modal__header">
            <ev-circle-close-button @click.native="doClose" style="position: absolute; left: 12px"></ev-circle-close-button>

            <ev-label size="11" bold secondary>JSON 编辑器</ev-label>

            <div class="ev-switch-wrapper">
                <div class="d-flex align-center">
                    <ev-label size="11" bold secondary>{{ $t('isEscape') }}</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <ev-switch v-model="value.stringify"></ev-switch>
                </div>
            </div>
        </div>

        <div class="dv-json-editor-modal__content">
            <ev-json-editor-vsl :root="value.root"></ev-json-editor-vsl>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import EvJsonEditorVsl from '@/components/json-editor-vsl/EvJsonEditor'
    import EvSwitch from '@/components/button/EvSwitch'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "DvJsonEditorModal",

        components: {
            EvVerticalGutter,
            EvSwitch,
            EvJsonEditorVsl,
            EvCircleCloseButton,
            EvLabel
        },

        props: {
            value: Object
        },

        methods: {
            doClose() {
                this.$emit('close')
            },
        },

        i18n: {
            messages: {
                en: {
                    isEscape: "Escape"
                },
                zh: {
                    isEscape: "是否转义"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    $PADDING: 12px;

    .dv-json-editor-modal {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        height: calc(100vh - 240px);

        width: 720px;

        &__header {
            position: relative;

            display: flex;

            align-items: center;

            justify-content: center;

            height: 40px;

            padding-left: $PADDING;

            padding-right: 16px;

            border-bottom: 1px solid #EAEAEA;

            background-color: #F1F1F1;
        }

        &__content {
            position: relative;

            display: flex;

            flex-direction: column;

            min-height: 1px;

            min-width: 1px;

            flex: 1;

            background-color: white;
        }
    }

    .ev-switch-wrapper {
        position: absolute;

        right: 16px
    }
</style>
