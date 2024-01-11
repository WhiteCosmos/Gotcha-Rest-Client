<template>
    <div class="ev-http-client-request-body__wrapper">
        <ev-http-client-json-request-body-title
            @import-json="handleImportJson"
            @copy-json="handleCopyJson"
            @toggle-preview="togglePreview"></ev-http-client-json-request-body-title>

        <div class="ev-http-client-request-body__wrapper" v-show="preview">
            <ev-codemirror-wrapper ref="ev-codemirror-wrapper" mode="json"
                                   :options="cmOptions" :text="jsonStr"></ev-codemirror-wrapper>
        </div>

        <div class="ev-http-client-request-body__wrapper" v-show="!preview">
            <ev-json-editor-vsl ref="ev-json-editor"
                                :root="httpRequest.payload.json.root"
                                :http-request="httpRequest"></ev-json-editor-vsl>
        </div>
    </div>
</template>

<script>
    import EvHttpClientJsonRequestBodyTitle from '@/views/http-client/request/request-body/EvHttpClientJsonRequestBodyTitle'
    import EvJsonEditorVsl from '@/components/json-editor-vsl/EvJsonEditor'
    import GHCJsonNodeBuilder from '@/components/json-editor-vsl/GHCJsonNodeBuilder'
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import GHCJsonEditorHelper from '@/components/json-editor-vsl/GHCJsonEditorHelper'

    export default {
        name: "EvHttpClientJsonRequestBody",

        components: {
            EvCodemirrorWrapper,
            EvJsonEditorVsl,
            EvHttpClientJsonRequestBodyTitle,
        },

        mixins: [
            EvStoreMixin
        ],

        props: {
            httpRequest: Object
        },

        data() {
            return {
                preview: false,

                jsonStr: "",

                cmOptions: { // TODO 在重构版本中把cursorBlinkRate和readOnly绑定
                    readOnly: true,
                    cursorBlinkRate: -1
                }
            }
        },

        watch: {
            preview(newVal) {
                if (newVal) {
                    this.$nextTick(() => {
                        let builder = new GHCJsonNodeBuilder(this.dynamicVariableRender)

                        this.jsonStr = JSON.stringify(builder.buildJsonFromJsonNode(this.httpRequest.payload.json.root), null, 4)

                        this.$refs['ev-codemirror-wrapper'].refresh(this.jsonStr)
                    })
                }
            },
        },

        methods: {
            handleResetJsonEditor() {

            },

            handleImportJson(json, mergeOption) {
                let root = new GHCJsonNodeBuilder(this.dynamicVariableRender).buildJsonNodeFromJson(json)

                if (!root) {
                    return
                }

                if (mergeOption) {
                    let source = this.httpRequest.payload.json.root

                    new GHCJsonEditorHelper().merge(source, root)

                    this.$refs['ev-json-editor'].initializeFlattenTree() // 合并后重新生成一下flattenTree
                } else {
                    this.httpRequest.payload.json.root = root
                }
            },

            handleCopyJson() {
                const {clipboard} = require('electron')

                let builder = new GHCJsonNodeBuilder(this.dynamicVariableRender)

                let jsonStr = JSON.stringify(builder.buildJsonFromJsonNode(this.httpRequest.payload.json.root), null, 4)

                clipboard.writeText(jsonStr)
            },

            togglePreview() {
                this.preview = !this.preview
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvHttpClientRequestBody";
</style>
