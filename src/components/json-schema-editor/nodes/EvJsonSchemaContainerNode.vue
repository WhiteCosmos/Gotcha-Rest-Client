<!--suppress RedundantIfStatementJS -->
<template>
    <div class="ev-json-schema-editor__json-node"
         @click.stop="emitFocusJsonNode"
         @contextmenu="emitShowContextMenu"
         ref="drag-image">

        <!-- drag 16px -->

        <div class="ev-json-schema-editor__json-node__drag-handler"
             @dragstart="handleDragStart"
             :draggable="showDragHandler"
             v-if="showDragHandler">
            <ev-json-drag-icon></ev-json-drag-icon>
        </div>

        <div class="ev-json-schema-editor__json-node__key" v-if="isDictionaryLabel">

            <!-- gutter 8 * layer -->

            <div class="d-flex" style="height:28px;">
                <ev-vertical-gutter :gutter="16 * node.layer"></ev-vertical-gutter>
            </div>

            <!-- expand 16px -->

            <div class="ev-json-schema-editor__json-node__widget">
                <ev-json-expand-button v-if="showExpandBtn"
                                       :node="node"
                                       @toggle-json-node="emitToggleJsonNode"></ev-json-expand-button>
            </div>

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

            <ev-label size="11" bold blue v-if="node.isDictionaryValue">Value</ev-label>
        </div>

        <div class="ev-json-schema-editor__json-node__key" ref="drag-image" v-else>

            <!-- gutter 8 * layer -->

            <div class="d-flex" :draggable="showDragHandler" @dragstart="handleDragStart" style="height:28px;">
                <ev-vertical-gutter :gutter="16 * node.layer"></ev-vertical-gutter>
            </div>

            <!-- expand 16px -->

            <div class="ev-json-schema-editor__json-node__widget">
                <ev-json-expand-button v-if="showExpandBtn"
                                       :node="node"
                                       @toggle-json-node="emitToggleJsonNode"></ev-json-expand-button>
            </div>

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

            <div class="d-flex" v-else-if="isArrayItem">
                <ev-label size="11" bold secondary>Items</ev-label>
            </div>

            <ev-borderless-input v-else v-model="node.key" placeholder="Param Name" @contextmenu.native.stop="" :disabled="isReadOnlyTreeNode"></ev-borderless-input>
        </div>

        <!-- type 因为发生了样式错乱问题，故用Div包起来 -->
        <div class="ev-json-schema-editor__json-node__type">
            <ev-json-schema-type-selector :node="node"
                                          :disabled="isReadOnlyTreeNode || isSchemaMode"
                                          @change-json-node-type="emitChangeJsonNodeType"></ev-json-schema-type-selector>
        </div>

        <!-- value editor flex 1-->

        <div class="ev-json-schema-editor__json-node__value">
            <div class="d-flex align-center" style="flex: 1" v-if="isReferenceNode">
                <ev-label size="11" bold secondary>{{ node.refName }}</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-lock-icon></ev-lock-icon>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <div class="ev-label-wrapper" v-if="isRecursiveNode">
                    <ev-label size="11" green bold>递归引用</ev-label>
                </div>

                <div class="ev-label-wrapper ev-label-wrapper--red" v-if="!node.isRefExists">
                    <ev-label size="11" red bold>引用不存在</ev-label>
                </div>
            </div>

            <div class="d-flex align-center" style="flex: 1" v-else>
                <ev-borderless-input v-model="node.description"
                                     :placeholder="isReadOnlyTreeNode ? '/' : 'Description'"
                                     :disabled="isReadOnlyTreeNode"
                                     @contextmenu.native.stop=""></ev-borderless-input>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
            </div>

            <!-- options 16px -->

            <div class="ev-json-schema-editor__json-node__widget" v-if="showRemoveNodeBtn">
                <ev-json-remove-button @remove="emitRemoveJsonNode"></ev-json-remove-button>
            </div>


            <div class="ev-json-schema-editor__json-node__widget" v-if="showAddChildBtn">
                <ev-new-json-node-icon></ev-new-json-node-icon>
            </div>

            <div class="ev-json-schema-editor__json-node__widget" v-if="showAddChildBtn">
                <ev-json-add-button @click.native="emitAddJsonNode"></ev-json-add-button>
            </div>

            <div class="ev-json-schema-editor__json-node__widget" v-if="showAddSiblingBtn">
                <ev-new-sibling-node-icon></ev-new-sibling-node-icon>
            </div>

            <div class="ev-json-schema-editor__json-node__widget" v-if="showAddSiblingBtn">
                <ev-json-add-button @click.native="emitAddSiblingJsonNode"></ev-json-add-button>
            </div>
        </div>

        <ev-json-node-mask v-if="isNodeCopied || isNodeMoved"></ev-json-node-mask>

        <!--        <ev-json-node-mask focused v-else-if="isNodeFocused && !isRootNode"></ev-json-node-mask>-->
    </div>
</template>

<script>
    import EvJsonDragIcon from '@/components/json-editor-vsl/icons/ev-json-drag-icon'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvJsonTypeSelector from '@/components/json-editor-vsl/components/EvJsonTypeSelector'
    import EvJsonRemoveButton from '@/components/json-editor-vsl/components/EvJsonRemoveButton'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvJsonExpandButton from '@/components/json-editor-vsl/components/EvJsonExpandButton'
    import EvLabel from '@/components/typography/EvLabel'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvJsonPlusIcon from '@/components/json-editor-vsl/icons/ev-json-plus-icon'
    import EvJsonNodeMask from '@/components/json-editor-vsl/nodes/EvJsonNodeMask'
    import EvNewSiblingNodeIcon from '@/components/json-editor-vsl/icons/ev-new-sibling-node-icon'
    import EvNewJsonNodeIcon from '@/components/json-editor-vsl/icons/ev-new-json-node-icon'
    import EvRequiredIcon from '@/components/json-editor-vsl/icons/ev-required-icon'
    import EvJsonSchemaTypeSelector from '@/components/json-schema-editor/components/EvJsonSchemaTypeSelector'
    import EvJsonSchemaNodeMixin from '@/components/json-schema-editor/mixins/EvJsonSchemaNodeMixin'
    import EvLockIcon from '@/assets/icon/ev-lock-icon'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvJsonSchemaProperties from '@/components/json-schema-editor/constraints/EvJsonSchemaProperties'

    export default {
        name: "EvJsonSchemaContainerNode",

        components: {
            EvJsonSchemaProperties,
            EvLockIcon,
            EvJsonSchemaTypeSelector,
            EvRequiredIcon,
            EvNewJsonNodeIcon,
            EvNewSiblingNodeIcon,
            EvJsonNodeMask,
            EvJsonPlusIcon,
            EvJsonAddButton,
            EvLabel,
            EvJsonExpandButton,
            EvExportCheckBox,
            EvJsonRemoveButton,
            EvJsonTypeSelector,
            EvVerticalGutter,
            EvBorderlessInput,
            EvJsonDragIcon
        },

        mixins: [
            EvJsonSchemaNodeMixin,
            EvStoreMixin,
        ],

        inject: ['mode'],

        props: {
            flattenTree: Object
        },

        computed: {
            showRemoveNodeBtn() {
                return !this.isReadOnlyTreeNode && !this.isRootNode && !this.isArrayItem
            },

            showAddChildBtn() {
                if (this.isReadOnlyTreeNode) {
                    return false
                }

                if (this.isArrayNode) {
                    return false
                }

                if (this.isDictionaryNode) {
                    return false
                }

                if (this.isReferenceNode) {
                    return false
                }

                return true
            },

            showAddSiblingBtn() {
                if (this.isReadOnlyTreeNode) {
                    return false
                }

                if (this.isRootNode) {
                    return false
                }

                if (this.isArrayItem) {
                    return false
                }

                return true
            },

            showExpandBtn() {
                return !this.isRecursiveNode
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

            isSchemaMode() {
                return this.mode === 'schema' && this.isRootNode
            },

            isReadOnlyTreeNode() {
                return this.node.isReadOnly
            },

            referencedNode() {
                return this.jsonSchemaPool.get(this.node.$ref)
            },

            // Control Field

            isDictionaryLabel() {
                return this.node.isDictionaryKey || this.node.isDictionaryValue
            },
        },

        methods: {
            handleDragStart(event) {
                let element = this.$refs['drag-image']

                if (element) {
                    event.dataTransfer.setDragImage(element, -16, 8)
                }

                this.emitDragJsonNode()
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonSchemaEditor";

    .ev-label-wrapper {
        display: flex;

        align-items: center;

        width: fit-content;

        height: 18px;

        padding-left: 4px;

        padding-right: 4px;

        background-color: #f2ffeb;

        border-radius: 3px;

        margin-left: 4px;

        &--red {
            background-color: #ffebeb;;
        }
    }
</style>
