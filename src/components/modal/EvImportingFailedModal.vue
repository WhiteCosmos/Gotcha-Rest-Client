<template>
    <v-dialog v-model="dialog" persistent width="400" overlay-color="#FCFCFC">
        <v-card>
            <div class="ev-importing-failed-modal">
                <div class="ev-importing-failed-modal__title">
                    <span class="ev-importing-failed-modal__title__label">IMPORTING FAILED</span>
                </div>

                <div class="ev-importing-failed-modal__description">
                    <span class="ev-importing-failed-modal__description__label">{{ errorMessage }}</span>
                </div>

                <ev-horizon-gutter :gutter="24"></ev-horizon-gutter>

                <div class="ev-importing-failed-modal__error-message">
                    <pre v-highlightjs="jsonStr"><code class="json"></code></pre>
                </div>

                <v-spacer></v-spacer>

                <v-btn text color="grey" @click="dialog = false">close</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvImportingFailedModal",

        components: {
            EvHorizonGutter,
            EvVerticalGutter
        },

        created() {
            AppEventBus.$on(AppEvents.IMPORT_PROJECT_FAILED, (evalon4JParseResult) => {
                this.dialog = true

                this.evalon4JParseResult = evalon4JParseResult
            })
        },

        data() {
            return {
                dialog: false,

                evalon4JParseResult: undefined,
            }
        },

        computed: {
            jsonStr() {
                if (!this.evalon4JParseResult) {
                    return ""
                }

                return JSON.stringify(this.evalon4JParseResult, null, 4)
            },

            errorMessage() {
                return this.evalon4JParseResult ? this.evalon4JParseResult.errorMessage : ""
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    @import "~@/styles/highlightjs.css";

    .ev-importing-failed-modal {
        display: flex;

        flex-direction: column;

        width: 400px;

        height: 320px;

        background-color: #FAFAFA;

        padding: 16px 32px;

        &__title {
            height: 56px;

            display: flex;

            align-items: center;

            &__label {
                font-size: 20px;

                font-weight: bolder;

                color: #FF8282;
            }
        }

        &__description {
            height: 32px;

            display: flex;

            align-items: center;

            &__label {
                font-size: 12px;

                font-weight: bolder;

                color: #AABBCC;
            }
        }

        &__error-message {
            border: 1px solid #AABBCC;

            max-height: 160px;
        }
    }
</style>
