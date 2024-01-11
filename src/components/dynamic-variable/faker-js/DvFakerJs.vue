<template>
    <div class="dv-wrapper">
        <div class="dv-header">
            <ev-label size="11" bold secondary>FakerJS</ev-label>
        </div>

        <div class="dv-divider"></div>

        <div class="d-flex align-center" style="padding-left: 4px; flex: 1" @click="showFakerJsModal = true">
            <!--            <ev-borderless-input :dense='true' :size="11" v-model="value_.expression" placeholder="faker.name.fullName"></ev-borderless-input>-->
            <ev-label size="11" bold secondary>{{ value_.expression }}</ev-label>
        </div>


        <v-dialog v-bind="export_dialog_config" v-model="showFakerJsModal">
            <dv-faker-js-modal @close="showFakerJsModal = false" :value="value"></dv-faker-js-modal>
        </v-dialog>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import EvLabel from '@/components/typography/EvLabel'
    import QuestionIcon from '@/assets/icon/question-icon'
    import EvQuestionIcon from '@/assets/icon/ev-question-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import DvFakerJsModal from '@/components/dynamic-variable/faker-js/DvFakerJsModal'

    export default {
        name: "DvFakerJs",

        components: {
            DvFakerJsModal,
            EvVerticalGutter,
            EvQuestionIcon,
            QuestionIcon,
            EvLabel,
            EvBorderlessInput
        },

        mixins: [
            EvDataBindMixin,
            EvDialogMixin,
        ],

        data() {
            return {
                showFakerJsModal: false
            }
        },

        methods: {
            openExternalLink() {
                require("electron").shell.openExternal('https://fakerjs.dev/api')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "../DynamicVariable";
</style>
