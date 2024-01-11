<template>
    <div class="ev-choose-file-button">
        <ev-label size="11" secondary bold>{{ $t('chooseFile') }}</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvChooseFileButton",

        components: {
            EvLabel
        },

        i18n: {
            messages: {
                en: {
                    chooseFile: "Choose File"
                },
                zh: {
                    chooseFile: "选择文件"
                },
                zh_TW: {
                    chooseFile: "選擇檔案"
                },
                jp: {
                    chooseFile: "ファイルを選択",
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-choose-file-button {
        @include rectangle(96px, 20px, 20px);

        background-color: #F1F1F1;
    }
</style>
