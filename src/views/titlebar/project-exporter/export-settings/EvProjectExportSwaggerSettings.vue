<template>
    <div class="d-flex flex-column">
        <ev-popup-menu-divider label="Info"></ev-popup-menu-divider>

        <div class="ev-property-wrapper">
            <div class="ev-property-wrapper__key">
                <ev-label size="11" bold secondary>{{ $t('title') }} :</ev-label>
            </div>

            <div class="ev-property-wrapper__value">
                <ev-basic-input placeholder="Playground" v-model="settings.title"></ev-basic-input>
            </div>
        </div>

        <div class="ev-property-wrapper">
            <div class="ev-property-wrapper__key">
                <ev-label size="11" bold secondary>{{ $t('version') }} :</ev-label>
            </div>

            <div class="ev-property-wrapper__value">
                <ev-basic-input placeholder="1.0.0" v-model="settings.version"></ev-basic-input>
            </div>
        </div>

        <div class="ev-property-wrapper">
            <div class="ev-property-wrapper__key">
                <ev-label size="11" bold secondary>{{ $t('termsOfService') }} :</ev-label>
            </div>

            <div class="ev-property-wrapper__value">
                <ev-basic-input placeholder="http://swagger.io/terms" v-model="settings.termsOfService"></ev-basic-input>
            </div>
        </div>

        <div class="ev-property-wrapper">
            <div class="ev-property-wrapper__key">
                <ev-label size="11" bold secondary>{{ $t('contact') }} :</ev-label>
            </div>

            <div class="ev-property-wrapper__value">
                <ev-basic-input placeholder="Name" v-model="settings.contact.name"></ev-basic-input>
            </div>
        </div>

        <div class="ev-property-wrapper">
            <div class="ev-property-wrapper__key">
                <ev-label size="11" bold secondary></ev-label>
            </div>

            <div class="ev-property-wrapper__value">
                <ev-basic-input placeholder="Url" v-model="settings.contact.url"></ev-basic-input>
            </div>
        </div>

        <div class="ev-property-wrapper">
            <div class="ev-property-wrapper__key">
                <ev-label size="11" bold secondary></ev-label>
            </div>

            <div class="ev-property-wrapper__value">
                <ev-basic-input placeholder="apiteam@swagger.io" v-model="settings.contact.email"></ev-basic-input>
            </div>
        </div>


        <div class="ev-property-wrapper">
            <div class="ev-property-wrapper__key">
                <ev-label size="11" bold secondary>{{ $t('license') }} :</ev-label>
            </div>

            <div class="ev-property-wrapper__value">
                <ev-basic-input placeholder="Apache 2.0" v-model="settings.license.name"></ev-basic-input>
            </div>
        </div>

        <div class="ev-property-wrapper">
            <div class="ev-property-wrapper__key">
                <ev-label size="11" bold secondary></ev-label>
            </div>

            <div class="ev-property-wrapper__value">
                <ev-basic-input placeholder="http://www.apache.org/licenses/LICENSE-2.0.html" v-model="settings.license.url"></ev-basic-input>
            </div>
        </div>

        <ev-popup-menu-divider label="Description"></ev-popup-menu-divider>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <ev-auto-resize-textarea v-model="settings.description"></ev-auto-resize-textarea>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <ev-popup-menu-divider label="Host"></ev-popup-menu-divider>

        <div class="ev-property-wrapper">
            <div class="ev-property-wrapper__key">
                <ev-label size="11" bold secondary>{{ $t('host') }} :</ev-label>
            </div>

            <div class="ev-property-wrapper__value">
                <ev-basic-input placeholder="hostname" v-model="settings.host"></ev-basic-input>
            </div>
        </div>

        <div class="ev-property-wrapper">
            <div class="ev-property-wrapper__key">
                <ev-label size="11" bold secondary>{{ $t('basePath') }} :</ev-label>
            </div>

            <div class="ev-property-wrapper__value">
                <ev-basic-input placeholder="/foo .e.g" v-model="settings.basePath"></ev-basic-input>
            </div>
        </div>
    </div>
</template>

<script>
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvLabel from '@/components/typography/EvLabel'
    import EvBasicInput from '@/components/input/EvBasicInput'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvAutoResizeTextarea from '@/components/input/EvAutoResizeTextarea'

    export default {
        name: "EvProjectExportSwaggerSettings",

        components: {
            EvAutoResizeTextarea,
            EvHorizonGutter,
            EvBasicInput,
            EvLabel,
            EvPopupMenuDivider
        },

        props: {
            settings: Object
        },

        i18n: {
            messages: {
                en: {
                    title: "Title",

                    version: "Version",

                    termsOfService: "Terms of Service",

                    contact: "Contact",

                    license: "License",

                    host: "Host",

                    basePath: "Base Path",
                },
                zh: {
                    title: "项目名称",

                    version: "版本号",

                    termsOfService: "服务条款",

                    contact: "联系方式",

                    license: "文档协议",

                    host: "域名",

                    basePath: "根路径",
                },
                zh_TW: {
                    title: "專案名稱",
                    version: "版本號",
                    termsOfService: "服務條款",
                    contact: "聯絡方式",
                    license: "文件協議",
                    host: "域名",
                    basePath: "根路徑",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-property-wrapper {
        display: flex;

        align-items: center;

        height: 28px;

        width: 100%;

        &__key {
            display: flex;

            width: 160px;

            padding-left: 8px;
        }

        &__value {
            display: flex;

            flex: 1;

            padding-right: 8px;
        }
    }
</style>
