<template>
    <div class="dv-wrapper">
        <div class="dv-header">
            <ev-label size="11" bold secondary>JSON</ev-label>
        </div>

        <div class="dv-divider"></div>

        <div class="dv-container" @click="show">
            <ev-label size="11" bold secondary>{{ $t('label') }}</ev-label>
        </div>

        <v-dialog v-bind="dialog_config" v-model="showJsonEditorModal">
            <dv-json-editor-modal @close="hide" :value="value_"></dv-json-editor-modal>
        </v-dialog>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import DvJsonEditorModal from '@/components/dynamic-variable/json/DvJsonEditorModal'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'

    export default {
        name: "DvJson",

        components: {
            DvJsonEditorModal,
            EvLabel
        },

        mixins: [
            EvDialogMixin,
            EvDataBindMixin
        ],

        data() {
            return {
                showJsonEditorModal: false
            }
        },

        methods: {
            show() {
                this.showJsonEditorModal = true
            },

            hide() {
                this.showJsonEditorModal = false
            },
        },

        i18n: {
            messages: {
                en: {
                    label: "Click to Edit",
                },
                zh: {
                    label: "点击编辑Json",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../DynamicVariable";

</style>
