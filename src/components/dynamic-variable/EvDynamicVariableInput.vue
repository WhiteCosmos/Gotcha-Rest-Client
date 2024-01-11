<template>
    <div class="ev-dynamic-variable" @contextmenu="showContextMenu">
        <ev-borderless-input
            ref="ev-borderless-input"
            :placeholder="placeholder"
            @paste="handlePasteDynamicVariable"
            v-if="checkIsDynamicVariable('TEXT')" v-model="value_"></ev-borderless-input>

        <ev-bulk-editor v-model="value_" v-if="checkIsDynamicVariable('TEXT') && bulkEdit"></ev-bulk-editor>

        <dv-enumeration v-if="checkIsDynamicVariable('ENUM')" v-model="value_"></dv-enumeration>

        <dv-datetime v-if="checkIsDynamicVariable('DATETIME')" v-model="value_"></dv-datetime>

        <dv-inline-script v-if="checkIsDynamicVariable('INLINE_SCRIPT')" v-model="value_"></dv-inline-script>

        <dv-environment-variables v-if="checkIsDynamicVariable('ENVIRONMENT_VARIABLE')" v-model="value_"></dv-environment-variables>

        <dv-global-variables v-if="checkIsDynamicVariable('GLOBAL_VARIABLE')" v-model="value_"></dv-global-variables>

        <dv-parameter-reference v-if="checkIsDynamicVariable('PARAMETER_REFERENCE')" v-model="value_"></dv-parameter-reference>

        <dv-request-chain v-if="checkIsDynamicVariable('REQUEST_CHAIN')" v-model="value_"></dv-request-chain>

        <dv-faker-js v-if="checkIsDynamicVariable('FAKERJS')" v-model="value_"></dv-faker-js>

        <dv-uuid v-if="checkIsDynamicVariable('UUID')" v-model="value_"></dv-uuid>

        <dv-json v-if="checkIsDynamicVariable('JSON')" v-model="value_"></dv-json>

        <dv-file-content v-if="checkIsDynamicVariable('FILE_CONTENT')" v-model="value_"></dv-file-content>

        <dv-crypto v-if="checkIsDynamicVariable('CRYPTO')" v-model="value_"></dv-crypto>

        <dv-encoding v-if="checkIsDynamicVariable('ENCODING')" v-model="value_"></dv-encoding>

        <ev-dynamic-variable-context-menu ref="ev-dynamic-variable-context-menu"
                                          @select-dynamic-variable="handleSelectDynamicVariable"
                                          @cut-dynamic-variable="handleCutDynamicVariable"
                                          @copy-dynamic-variable="handleCopyDynamicVariable"
                                          @paste-dynamic-variable="handlePasteDynamicVariable"></ev-dynamic-variable-context-menu>
    </div>
</template>

<script>
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvDynamicVariableContextMenu from '@/components/dynamic-variable/EvDynamicVariableContextMenu'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import DvDatetime from '@/components/dynamic-variable/datetime/DvDatetime'
    import DvEnumeration from '@/components/dynamic-variable/enumeration/DvEnumeration'
    import DvEnvironmentVariables from '@/components/dynamic-variable/variables/DvEnvironmentVariables'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import GHCDynamicVariableType from '@/components/dynamic-variable/GHCDynamicVariableType'
    import GHCDynamicVariableBuilder from '@/components/dynamic-variable/GHCDynamicVariableBuilder'
    import DvGlobalVariables from '@/components/dynamic-variable/variables/DvGlobalVariables'
    import EvBulkEditor from '@/components/input/EvBulkEditor'
    import DvInlineScript from '@/components/dynamic-variable/inline-script/DvInlineScript'
    import DvParameterReference from '@/components/dynamic-variable/parameter-ref/DvParameterReference'
    import DvCrypto from '@/components/dynamic-variable/crypto/DvCrypto'
    import {clipboard} from 'electron'
    import DvRequestChain from '@/components/dynamic-variable/request-chain/DvRequestChain'
    import DvUuid from '@/components/dynamic-variable/uuid/DvUuid'
    import DvFileContent from '@/components/dynamic-variable/file-content/DvFileContent'
    import DvEncoding from '@/components/dynamic-variable/encoding/DvEncoding'
    import DvFakerJs from '@/components/dynamic-variable/faker-js/DvFakerJs'
    import DvJson from '@/components/dynamic-variable/json/DvJson'
    import GHCJson from '@/core/json/GHCJson'

    const DYNAMIC_VARIABLE_ID = "308c7ab807dd4e969eef90c6ce3a0f29" // for cut / copy / paste dynamic variable

    export default {
        name: "EvDynamicVariableInput",

        components: {
            DvJson,
            DvFakerJs,
            DvEncoding,
            DvFileContent,
            DvUuid,
            DvRequestChain,
            DvCrypto,
            DvParameterReference,
            DvInlineScript,
            EvBulkEditor,
            DvGlobalVariables,
            DvEnvironmentVariables,
            DvEnumeration,
            DvDatetime,
            EvDynamicVariableContextMenu,
            EvBorderlessInput
        },

        mixins: [
            EvDataBindMixin,
        ],

        created() {
            this.init()

            AppEventBus.$on(AppEvents.SHOW_CONTEXT_MENU, this.hideContextMenu)
        },

        beforeDestroy() {
            AppEventBus.$off(AppEvents.SHOW_CONTEXT_MENU, this.hideContextMenu)
        },

        props: {
            placeholder: {
                type: String,
                default: "Param Value"
            },

            bulkEdit: {
                type: Boolean,
                default: true,
            },

            dense: {
                type: Boolean,
                default: false,
            }
        },

        data() {
            return {
                type: "TEXT", // dv type INPUT ENUM ...
            }
        },

        watch: {
            value() {
                this.init()
            },
        },

        methods: {
            init() {
                if (this.value_ === undefined || this.value_ === null) {
                    this.value_ = ''

                    this.type = GHCDynamicVariableType.TEXT
                }

                if ((typeof this.value_) === 'object') {
                    this.type = this.value_.type
                } else {
                    this.value_ = String(this.value_)

                    this.type = GHCDynamicVariableType.TEXT
                }
            },

            showContextMenu(event) {
                let ref = this.$refs['ev-dynamic-variable-context-menu']

                if (ref) {
                    ref.show(event)

                    AppEventBus.$emit(AppEvents.SHOW_CONTEXT_MENU, event)
                }
            },

            hideContextMenu() {
                let ref = this.$refs['ev-dynamic-variable-context-menu']

                ref && ref.hide()
            },

            handleSelectDynamicVariable(dv, param) {
                this.value_ = new GHCDynamicVariableBuilder().build(dv, param)
            },

            handleCutDynamicVariable() {

            },

            handleCopyDynamicVariable() {
                if (typeof this.value_ === 'string') {
                    clipboard.writeText(this.value_)
                } else {
                    this.value_.id = DYNAMIC_VARIABLE_ID

                    clipboard.writeText(JSON.stringify(this.value_))
                }
            },

            handlePasteDynamicVariable() {
                let text = clipboard.readText()

                if (!text) {
                    return
                }

                try {
                    let value = GHCJson.parse(text)

                    if (value.id && value.id === DYNAMIC_VARIABLE_ID) {
                        this.value_ = value
                    }
                } catch (e) {
                    // ignore
                }
            },

            checkIsDynamicVariable(dv) {
                if ((typeof this.value_) === 'string' && dv === GHCDynamicVariableType.TEXT) {
                    return true
                } else {
                    return this.value && this.value.type === dv
                }
            },

            focus() {
                let input = this.$refs['ev-borderless-input']

                input && input.focus()
            },

            onPaste() {

            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-dynamic-variable {
        display: flex;

        align-items: center;

        height: 20px;

        width: 100%;

        &--focus {
            border: 1px solid #D8D8D8;
        }

        &--blur {
            border: 1px solid transparent;
        }
    }
</style>
