<template>
    <div class="dv-wrapper">
        <div class="dv-header">
            <ev-label size="11" bold secondary>{{ $t('requestChain') }}</ev-label>
        </div>

        <div class="dv-divider"></div>

        <div class="dv-container" @click="show">
            <ev-label size="11" bold secondary text-truncate>{{ treeNodeName || $t('selectRequest') }}</ev-label>
        </div>

        <v-dialog v-bind="export_dialog_config" v-model="showRequestChainModal">
            <dv-request-chain-modal @close="hide" :value="value_"></dv-request-chain-modal>
        </v-dialog>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import DvRequestChainModal from '@/components/dynamic-variable/request-chain/DvRequestChainModal'
    import AppCache from '@/AppCache'
    import RabiHttpOperationDao from '@/core/dao/RabiHttpOperationDao'

    export default {
        name: "DvRequestChain",

        components: {
            DvRequestChainModal,
            EvVerticalGutter,
            EvLabel
        },

        mixins: [
            EvDataBindMixin,
            EvDialogMixin,
        ],

        created() {
            this.fetchHttpOperation()
        },

        computed: {
            treeNodeName() {
                return this.value.requestName
            },
        },

        data() {
            return {
                showRequestChainModal: false
            }
        },

        methods: {
            show() {
                this.showRequestChainModal = true
            },

            hide() {
                this.showRequestChainModal = false
            },

            fetchHttpOperation() {
                let requestId = this.value.requestId

                if (requestId === -1) {
                    return
                }

                new RabiHttpOperationDao().query({id: requestId}).then(result => {
                    if (result) {
                        AppCache.httpOperations.set(requestId, result)

                        this.value.requestName = result.name
                    }
                })
            },
        },

        i18n: {
            messages: {
                en: {
                    requestChain: "Chain",

                    selectRequest: "Select Request",
                },
                zh: {
                    requestChain: "链式引用",

                    selectRequest: "请选择接口",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../DynamicVariable";

</style>
