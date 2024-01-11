<template>
    <div class="dv-wrapper">
        <div class="dv-header">
            <ev-label size="11" bold secondary>文件</ev-label>
        </div>

        <div class="dv-divider"></div>

        <div class="dv-container">
            <ev-label size="11" primary>showmethemoney.jpeg</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import EvFileDialogMixin from '@/mixins/EvFileDialogMixin'

    export default {
        name: "DvFileContent",

        components: {
            EvLabel
        },

        mixins: [
            EvDataBindMixin,
            EvFileDialogMixin,
        ],

        methods: {
            chooseFile() {
                this.openFile().then(file => {
                    // this.value_.
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../DynamicVariable";


</style>
