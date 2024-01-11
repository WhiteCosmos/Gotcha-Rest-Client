<template>
    <div class="ev-json-viewer-header">
        <div class="ev-json-viewer-node__key-part">
            <div class="ev-json-viewer-node__widget" @click="doToggleExpandAll">
                <ev-expand-all-icon v-if="expand_"></ev-expand-all-icon>

                <ev-collapse-all-icon v-else></ev-collapse-all-icon>
            </div>

            <ev-label size="11" secondary bold>{{ $t('keyOrIndex') }}</ev-label>
        </div>

        <div class="ev-json-viewer-node__type-part">
            <ev-label size="11" secondary bold>{{ $t('type') }}</ev-label>
        </div>

        <div class="ev-json-viewer-node__value-part">
            <ev-label size="11" secondary bold>{{ $t('value') }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvExpandAllIcon from '@/components/json-editor-vsl/icons/ev-expand-all-icon'
    import EvCollapseAllIcon from '@/components/json-editor-vsl/icons/ev-collapse-all-icon'
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvJsonViewerHeader",

        components: {
            EvLabel,
            EvCollapseAllIcon,
            EvExpandAllIcon
        },

        data() {
            return {
                expand_: false
            }
        },

        methods: {
            doToggleExpandAll() {
                this.expand_ = !this.expand_

                this.$emit('toggle-all', this.expand_)
            },

            resetToggleExpandAll() {
                this.expand_ = false
            },
        },

        i18n: {
            messages: {
                en: {
                    keyOrIndex: "Key & Index",

                    type: "Type",

                    value: "Value",
                },
                zh: {
                    keyOrIndex: "字段名 & 序号",

                    type: "类型",

                    value: "字段值",
                },
                zh_TW: {
                    keyOrIndex: "欄位名稱 & 序號",

                    type: "類型",

                    value: "欄位值",
                },
                jp: {
                    keyOrIndex: "フィールド名＆番号",

                    type: "タイプ",

                    value: "フィールド値",
                },
            }
        },

    }
</script>

<style lang="scss" scoped>
    @import "EvJsonViewer";

    .ev-json-viewer-header {
        display: flex;

        height: 28px;

        align-items: center;

        border-bottom: 1px solid #EAEAEA;

        user-select: none;

        padding-left: 16px;

        padding-right: 18px; // 4 + 16 算上Scroll宽度
    }
</style>
