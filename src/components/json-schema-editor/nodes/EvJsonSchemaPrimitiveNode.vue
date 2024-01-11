<template>
    <div class="ev-json-schema-editor__json-node"
         @click.stop="emitFocusJsonNode"
         @contextmenu.prevent="emitShowContextMenu"
         ref="drag-image">

        <div class="ev-json-schema-editor__json-node__drag-handler"
             @dragstart="handleDragStart"
             :draggable="showDragHandler"
             v-if="showDragHandler">
            <ev-json-drag-icon></ev-json-drag-icon>
        </div>

        <div class="ev-json-schema-editor__json-node__key" v-if="isDictionaryLabel">
            <!-- gutter 16 * layer -->

            <div class="d-flex" style="height:28px;">
                <ev-vertical-gutter :gutter="16 * (node.layer + 1)"></ev-vertical-gutter>
            </div>

            <!-- expand 16px -->

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <!-- checkbox 16px-->

            <div class="ev-json-schema-editor__json-node__widget">
                <ev-json-schema-properties
                    mode="schema"
                    :type="node.type"
                    :properties="node.properties"
                    :disabled="isReadOnlyTreeNode"></ev-json-schema-properties>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <!-- key editor flex 1-->

            <ev-label size="11" bold red v-if="node.isDictionaryKey">Key</ev-label>

            <ev-label size="11" bold blue v-if="node.isDictionaryValue">Value</ev-label>
        </div>

        <div class="ev-json-schema-editor__json-node__key" v-else>
            <!-- gutter 16 * layer -->

            <div class="d-flex" :draggable="showDragHandler" @dragstart="handleDragStart" style="height:28px;">
                <ev-vertical-gutter :gutter="16 * (node.layer + 1)"></ev-vertical-gutter>
            </div>

            <!-- expand 16px -->

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <!-- checkbox 16px-->

            <div class="ev-json-schema-editor__json-node__widget">
                <ev-json-schema-properties
                    mode="schema"
                    :type="node.type"
                    :properties="node.properties"
                    :disabled="isReadOnlyTreeNode"></ev-json-schema-properties>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <!-- key editor flex 1-->

            <div class="d-flex" v-if="isRootNode">
                <ev-label size="10" primary bold>Root</ev-label>
            </div>

            <div class="d-flex" v-else-if="node.isArrayItem">
                <ev-label size="11" bold secondary>Items</ev-label>
            </div>

            <ev-borderless-input v-else v-model="node.key" placeholder="Param Name" @contextmenu.native.stop="" :disabled="isReadOnlyTreeNode"></ev-borderless-input>
        </div>

        <!-- type 因为发生了样式错乱问题，故用Div包起来 -->
        <div class="ev-json-schema-editor__json-node__type">
            <ev-json-schema-type-selector :node="node"
                                          :disabled="isReadOnlyTreeNode"
                                          @change-json-node-type="emitChangeJsonNodeType"></ev-json-schema-type-selector>
        </div>

        <!-- value editor flex 1-->

        <div class="ev-json-schema-editor__json-node__value">
            <div class="d-flex" style="flex: 1">
                <ev-borderless-input v-model="node.description" :placeholder="isReadOnlyTreeNode ? '/' : 'Description'" @contextmenu.native.stop="" :disabled="isReadOnlyTreeNode"></ev-borderless-input>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
            </div>

            <!-- button 16px -->

            <ev-vertical-gutter :gutter="32" v-if="!showRemoveNodeBtn  && !showAddSiblingBtn"></ev-vertical-gutter>

            <div class="ev-json-schema-editor__json-node__widget" v-if="showRemoveNodeBtn">
                <ev-json-remove-button @remove="emitRemoveJsonNode" :is-empty="isEmptyNode"></ev-json-remove-button>
            </div>

            <div class="ev-json-schema-editor__json-node__widget" v-if="showAddSiblingBtn">
                <ev-json-plus-icon @click.native="emitAddJsonNode" color="#87b35b" v-if="!isReadOnlyTreeNode"></ev-json-plus-icon>
            </div>
        </div>

        <ev-json-node-mask v-if="isNodeCopied || isNodeMoved"></ev-json-node-mask>

        <!--        <ev-json-node-mask focused v-else-if="isNodeFocused"></ev-json-node-mask>-->
    </div>
</template>

<script>
    import EvJsonDragIcon from '@/components/json-editor-vsl/icons/ev-json-drag-icon'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvJsonRemoveButton from '@/components/json-editor-vsl/components/EvJsonRemoveButton'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvJsonExpandButton from '@/components/json-editor-vsl/components/EvJsonExpandButton'
    import EvJsonPlusIcon from '@/components/json-editor-vsl/icons/ev-json-plus-icon'
    import EvLabel from '@/components/typography/EvLabel'
    import EvSwitch from '@/components/button/EvSwitch'
    import EvJsonNodeMask from '@/components/json-editor-vsl/nodes/EvJsonNodeMask'
    import EvNewSiblingNodeIcon from '@/components/json-editor-vsl/icons/ev-new-sibling-node-icon'
    import EvBulkEditor from '@/components/input/EvBulkEditor'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput'
    import EvRequiredIcon from '@/components/json-editor-vsl/icons/ev-required-icon'
    import EvJsonSchemaTypeSelector from '@/components/json-schema-editor/components/EvJsonSchemaTypeSelector'
    import EvJsonSchemaNodeMixin from '@/components/json-schema-editor/mixins/EvJsonSchemaNodeMixin'
    import EvBasicInput from '@/components/input/EvBasicInput'
    import EvJsonSchemaProperties from '@/components/json-schema-editor/constraints/EvJsonSchemaProperties'

    export default {
        name: "EvJsonSchemaPrimitiveNode",

        components: {
            EvJsonSchemaProperties,
            EvBasicInput,
            EvJsonSchemaTypeSelector,
            EvRequiredIcon,
            EvDynamicVariableInput,
            EvBulkEditor,
            EvNewSiblingNodeIcon,
            EvJsonNodeMask,
            EvSwitch,
            EvLabel,
            EvJsonPlusIcon,
            EvJsonExpandButton,
            EvExportCheckBox,
            EvJsonRemoveButton,
            EvVerticalGutter,
            EvBorderlessInput,
            EvJsonDragIcon
        },

        mixins: [
            EvJsonSchemaNodeMixin
        ],

        created() {

        },

        props: {
            flattenTree: Object
        },

        methods: {
            handleDragStart(event) {
                let element = this.$refs['drag-image']

                if (element) {
                    event.dataTransfer.setDragImage(element, -16, 8)
                }

                this.emitDragJsonNode()
            },
        },

        data() {
            return {
                value_: ""
            }
        },

        computed: {
            isReadOnlyTreeNode() {
                return this.node.isReadOnly
            },

            showRemoveNodeBtn() {
                if (this.isReadOnlyTreeNode) {
                    return false
                }

                if (this.isArrayItem) {
                    return false
                }

                // noinspection RedundantIfStatementJS
                if (this.node.isDictionaryKey || this.node.isDictionaryValue) {
                    return false
                }

                return true
            },

            showAddSiblingBtn() {
                if (this.isReadOnlyTreeNode) {
                    return false
                }

                if (this.isArrayItem) {
                    return false
                }

                // noinspection RedundantIfStatementJS
                if (this.node.isDictionaryKey || this.node.isDictionaryValue) {
                    return false
                }

                return true
            },

            showDragHandler() {
                if (this.isRootNode) {
                    return false
                } else if (this.isReadOnlyTreeNode) {
                    return false
                } else if (this.isArrayItem) {
                    return false
                } else if (this.node.isDictionaryKey || this.node.isDictionaryValue) {
                    return false
                } else {
                    return true
                }
            },

            isDictionaryLabel() {
                return this.node.isDictionaryKey || this.node.isDictionaryValue
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonSchemaEditor";

    .ev-label-wrapper {
        display: flex;

        align-items: center;

        height: 14px;

        width: fit-content;

        padding-left: 4px;

        padding-right: 4px;

        border-radius: 3px;

        &--blue {
            background-color: #e6f2ff;
        }

        &--red {
            background-color: #ffe6e6;
        }
    }
</style>
