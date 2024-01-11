<template>
    <div class="ev-json-schema-manager-content-placeholder">
        <ev-label size="16" bold secondary>{{ $t('label') }}</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvJsonSchemaManagerContentPlaceholder",

        components: {
            EvLabel
        },

        i18n: {
            messages: {
                en: {
                    label: "Select Json Schema",
                },
                zh: {
                    label: "请选择数据模型",
                },
                zh_TW: {
                    label: "請選擇數據模型",
                },
                jp: {
                    label: "データモデルを選択してください",
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-json-schema-manager-content-placeholder {
        @include full-center;

        flex: 1;

        height: 100%;

        background-color: #FCFCFC;
    }
</style>
