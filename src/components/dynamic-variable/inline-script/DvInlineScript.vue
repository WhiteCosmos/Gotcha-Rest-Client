<template>
    <div class="dv-wrapper">
        <div class="dv-header">
            <ev-label size="11" bold secondary>{{ $t('script') }}</ev-label>
        </div>

        <div class="dv-divider"></div>

        <div class="d-flex align-center flex-grow-1" style="padding-left: 4px">
            <ev-borderless-input :dense='true' v-model="value_.value" placeholder="Param Value"></ev-borderless-input>
        </div>

        <div class="dv-divider"></div>

        <v-dialog v-model="showInlineScriptEditor" width="720" v-bind="modalConfig">
            <template v-slot:activator="{ on, attrs }">
                <div class="d-flex align-center justify-center" style="width: 20px" v-bind="attrs" v-on="on">
                    <ev-edit-icon></ev-edit-icon>
                </div>
            </template>

            <dv-inline-script-editor @close="handleCloseInlineScriptEditor" :payload="value_"></dv-inline-script-editor>
        </v-dialog>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import EvEditIcon from '@/components/icon/ev-edit-icon'
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import DvInlineScriptEditor from '@/components/dynamic-variable/inline-script/DvInlineScriptEditor'

    export default {
        name: "DvInlineScript",

        components: {
            DvInlineScriptEditor,
            EvEditIcon,
            EvBorderlessInput,
            EvLabel,
        },

        mixins: [
            EvDataBindMixin,
            EvDialogMixin,
        ],

        data() {
            return {
                showInlineScriptEditor: false
            }
        },

        methods: {
            handleCloseInlineScriptEditor(script) {
                this.showInlineScriptEditor = false

                this.value_.script = script
            },
        },

        i18n: {
            messages: {
                en: {
                    script: "Script"
                },
                zh: {
                    script: "内联脚本"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "../DynamicVariable";

    .dv-content {

    }
</style>
