<template>
    <div class="ev-http-client-file-request-body">
        <div class="ev-http-client-file-request-body__wrapper">
            <div class="ev-http-client-file-request-body__button" @click="doChooseFile">
                <ev-label size="11" bold secondary>{{ $t('chooseFile') }}</ev-label>
            </div>

            <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

            <div class="ev-label-wrapper" v-if="binary">
                <ev-label size="12" secondary>{{ binary.filePath }}</ev-label>
            </div>

            <!--            <div class="ev-label-wrapper">-->
            <!--                <ev-label size="12" bold secondary>1.3 MB</ev-label>-->
            <!--            </div>-->
        </div>

        <div class="ev-http-client-file-request-body__content-type">
            <ev-label size="11" bold secondary>Content-Type: application/octet-stream</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvFileDialogMixin from '@/mixins/EvFileDialogMixin.vue'

    export default {
        name: "EvHttpClientFileRequestBody",

        components: {
            EvVerticalGutter,
            EvHorizonGutter,
            EvLabel
        },

        mixins: [
            EvFileDialogMixin,
        ],

        props: {
            httpRequest: Object
        },

        computed: {
            binary() {
                return this.httpRequest?.payload?.binary
            },
        },

        methods: {
            doChooseFile() {
                this.openFile().then(result => {
                    if (this.binary) {
                        this.binary.fileName = result.filename
                        this.binary.filePath = result.filepath
                        this.binary.fileBookmark = result.bookmark
                    }
                })
            },
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
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-file-request-body {
        display: flex;

        flex-direction: column;

        width: 100%;

        height: calc(100% - 28px);

        padding: 16px 16px 0px 16px;

        &__wrapper {
            @include full-center;

            flex-direction: column;

            flex: 1;

            background-color: #FAFAFA;

            border-radius: 7px;

            border: 1px dashed #E0E0E0;

            padding: 16px;
        }

        &__button {
            @include full-center;

            width: 112px;

            height: 20px;

            border-radius: 28px;

            background-color: #F1F1F1;

            border: 1px solid #E0E0E0;
        }

        &__content-type {
            display: flex;

            align-items: center;

            height: 28px;

            padding-left: 4px;

            //background-color: #FF8282;
        }
    }

    .ev-label-wrapper {
        display: flex;

        flex-direction: column;

        align-items: center;
    }
</style>
