<template>
    <div class="ev-multipart-form-editor-header">
        <ev-export-check-box v-model="checkedStatus_"></ev-export-check-box>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <div class="ev-multipart-form-editor__name-column">
            <ev-label size="11" bold secondary>{{ $t('name') }}</ev-label>

            <v-spacer></v-spacer>

            <div class="ev-multipart-form-editor__status-column"></div>
        </div>

        <div class="ev-multipart-form-editor__value-column" style="padding-right: 14px">
            <ev-label size="11" bold secondary>{{ $t('value') }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'

    export default {
        name: "EvMultipartFormEditorHeader",

        components: {
            EvExportCheckBox,
            EvVerticalGutter,
            EvLabel
        },

        created() {
            this.checkedStatus_ = this.checkedStatus
        },

        model: {
            prop: "checkedStatus",
            event: "change"
        },

        props: {
            options: Object,

            checkedStatus: String,
        },

        data() {
            return {
                checkedStatus_: "CHECKED"
            }
        },

        watch: {
            checkedStatus(newVal) {
                this.checkedStatus_ = newVal
            },

            checkedStatus_(newVal) {
                this.$emit('change', newVal)
            }
        },

        i18n: {
            messages: {
                en: {
                    name: "Name",

                    value: "Value",
                },
                zh: {
                    name: "参数名",

                    value: "参数值",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvMultipartFormEditor";

    .ev-multipart-form-editor-header {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 24px;

        padding-right: 8px;

        border-bottom: 1px solid #EAEAEA;

        user-select: none;
    }
</style>
