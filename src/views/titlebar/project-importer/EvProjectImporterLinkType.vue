<template>
    <div class="project-importer-link-type d-flex flex-column">
        <div class="project-importer-link-type__text-area">
            <textarea placeholder="e.g. https://swagger.io/v2/swagger.json" v-model="url"></textarea>
        </div>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="d-flex">
            <div class="d-flex align-center" v-if="formatError || fetchError">
                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <v-icon size="12" color="#FF8282">fa-exclamation-circle</v-icon>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <span style="font-size: 10px; font-weight: bolder; color: #FF8282" v-if="formatError">URL Format Error</span>

                <span style="font-size: 10px; font-weight: bolder; color: #FF8282" v-if="fetchError">URL Fetch Error</span>
            </div>

            <v-spacer></v-spacer>

            <v-btn text color="#007AFF" small style="align-self: flex-end" :disabled="formatError" :loading="loading" @click="doContinue">Continue</v-btn>
        </div>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import {EvProjectImporterEventBus, EvProjectImporterEvents} from '@/views/titlebar/project-importer/EvProjectImporterEventBus'
    import EvalonUrlHelper from '@/core/EvalonUrlHelper'
    import AppConfig from '@/AppConfig'

    export default {
        name: "EvProjectImporterLinkType",

        components: {
            EvVerticalGutter,
            EvHorizonGutter
        },

        data() {
            return {
                url: "",

                formatError: false,

                fetchError: false,

                loading: false,
            }
        },

        methods: {
            doContinue() {
                if (!EvalonUrlHelper.verifyUrl(this.url)) {
                    this.formatError = true

                    return
                }

                this.loading = true

                let filename = EvalonUrlHelper.getFileNameFromUrl(this.url)

                const path = require('path')

                const fs = require('fs')

                let dirname = ""

                if (AppConfig.isDevelopment()) {
                    dirname = path.resolve(__dirname, '..', '..')
                } else {
                    let {app} = require('electron').remote

                    dirname = app.getPath("appData")
                }

                const got = require('got')

                got(this.url, {timeout: {response: 60000}}).then(response => {
                    let tempFilepath = path.join(dirname, filename)

                    fs.writeFileSync(tempFilepath, response.body)

                    this.loading = false

                    EvProjectImporterEventBus.$emit(EvProjectImporterEvents.CHOOSE_LINK, this.url, tempFilepath)
                }).catch(error => {
                    console.error("URL Fetch Error", error)

                    this.fetchError = true

                    this.loading = false
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .project-importer-link-type {
        width: 100%;

        height: 160px;

        &__text-area {
            border: 1px dashed #F1F1F1;

            border-radius: 3px;

            width: 100%;

            height: 120px;

            background-color: #FAFAFA;

            padding: 16px;

            textarea {
                width: 100%;

                height: 100%;

                font-size: 11px;

                color: $SECONDARY_FONT_COLOR;

                resize: none;

                outline: none;

                border: none;

                &::placeholder {
                    color: #AABBCC;
                }
            }
        }
    }
</style>
