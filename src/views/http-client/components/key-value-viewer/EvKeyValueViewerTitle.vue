<template>
    <div class="key-value-editor-title">
        <div class="key-value-viewer-key-column" v-if="options.keyTitle">
            <span class="key-value-editor-title__label">{{ options.keyTitle }}</span>
        </div>

        <div class="key-value-viewer-value-column" v-if="options.valueTitle">
            <span class="key-value-editor-title__label">{{ options.valueTitle }}</span>

            <v-spacer></v-spacer>

            <ev-label v-if="options.copyable" size="11" blue secondary @click.native="copyToClipboard">{{ $t('copyToClipboard') }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvKeyValueViewerTitle",

        components: {
            EvLabel
        },

        props: {
            options: Object,

            items: Array,
        },

        methods: {
            copyToClipboard() {
                let text = this.options.copyToClipboard(this.items)

                const {clipboard} = require('electron')

                clipboard.writeText(text)
            }
        },

        i18n: {
            messages: {
                en: {
                    copyToClipboard: "Copy to Clipboard"
                },
                zh: {
                    copyToClipboard: "复制到剪切板"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "KeyValueViewer";

    .key-value-editor-title {
        display: flex;

        min-width: 1px;

        min-height: 1px;

        flex-shrink: 0;

        height: 28px;

        padding-left: 16px;

        padding-right: 16px;

        align-items: center;

        border-bottom: 1px solid #EAEAEA;

        user-select: none;

        &__label {
            font-size: 11px;

            font-weight: bold;

            line-height: 16px;

            color: $SECONDARY_FONT_COLOR;
        }
    }

    .key-value-viewer-key-column {
        display: flex;

        align-items: center;

        width: 160px;

        margin-right: 8px;
    }

    .key-value-viewer-value-column {
        display: flex;

        align-items: center;

        flex: 1;
    }
</style>
