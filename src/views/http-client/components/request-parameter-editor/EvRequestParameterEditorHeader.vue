<template>
    <div class="ev-request-parameter-editor-header">
        <ev-export-check-box v-model="checkedStatus_"></ev-export-check-box>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <div class="ev-request-parameter-editor__name-column">
            <ev-label size="12" bold grey>{{ isPathMode ? $t('EvKeyValueEditor.indexAndName') : $t('EvKeyValueEditor.name') }}</ev-label>
        </div>

        <div class="ev-request-parameter-editor__value-column" :style="{'padding-right' : pageMode ? '14px' : '0' }">
            <ev-label size="12" bold grey>{{ $t('EvKeyValueEditor.value') }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'

    export default {
        name: "EvRequestParameterEditorHeader",

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

            pageMode: Boolean
        },

        computed: {
            isPathMode() {
                return this.options.mode === 'path'
            },

            isPageMode() {
                return this.options.mode === 'path'
            },
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
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvRequestParameterEditor";

    .ev-request-parameter-editor-header {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 24px;

        padding-right: 8px;

        border-bottom: 1px solid #EAEAEA;

        user-select: none;
    }
</style>
