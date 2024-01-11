<template>
    <div class="ev-json-editor__json-node"
         @click.stop="emitFocusJsonNode"
         @contextmenu.prevent="emitShowContextMenu"
         ref="drag-image">

        <div class="ev-json-editor__json-node__drag-handler" draggable="true" @dragstart="handleDragStart">
            <ev-json-drag-icon></ev-json-drag-icon>
        </div>

        <div class="ev-json-editor__json-node__key">
            <!-- gutter 16 * layer -->

            <div class="d-flex" draggable="true" @dragstart="handleDragStart" style="height:28px;">
                <ev-vertical-gutter :gutter="16 * (node.layer + 1)"></ev-vertical-gutter>
            </div>

            <!-- expand 16px -->

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <!-- checkbox 16px-->

            <div class="ev-json-editor__json-node__widget">
                <ev-export-check-box :status="node.checkedStatus" @click.native="emitToggleJsonNodeChecked"></ev-export-check-box>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <!-- key editor flex 1-->

            <div class="d-flex flex-grow-1" v-if="node.isArrayItem">
                <ev-label size="11" secondary>Idx {{ index }}</ev-label>
            </div>

            <ev-borderless-input v-else v-model="node.key"
                                 :placeholder="node.keyPlaceholder"
                                 @blur="handleInputBlur"
                                 @contextmenu.native.stop=""></ev-borderless-input>

            <ev-vertical-gutter :gutter="6" v-if="node.isDuplicateKey"></ev-vertical-gutter>

            <v-icon size="12" color="#FF8282" v-if="node.isDuplicateKey">fa-triangle-exclamation</v-icon>
        </div>

        <!-- type -->

        <div class="ev-json-editor__json-node__type">
            <ev-json-type-selector :node="node"></ev-json-type-selector>
        </div>

        <!-- value editor flex 1-->

        <div class="ev-json-editor__json-node__value">
            <div class="d-flex flex-grow-1" v-if="isStringNode || isNumberNode">
                <ev-dynamic-variable-input v-model="node.value" :placeholder="node.valuePlaceholder" @contextmenu.native.stop=""></ev-dynamic-variable-input>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
            </div>

            <div class="d-flex flex-grow-1 align-center" v-if="isBooleanNode">
                <ev-switch v-model="node.value"></ev-switch>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="11" v-bind="{'red': !node.value, 'green': node.value}">{{ node.value ? 'True' : 'False' }}</ev-label>
            </div>

            <div class="d-flex flex-grow-1" v-if="isNullNode">
                <ev-label size="12" grey bold>null</ev-label>
            </div>

            <!-- button 16px -->

            <div class="ev-json-editor__json-node__widget">
                <ev-json-remove-button @remove="emitRemoveJsonNode" :is-empty="isEmptyNode"></ev-json-remove-button>
            </div>

            <div class="ev-json-editor__json-node__widget">
                <ev-json-plus-icon @click.native="emitAddJsonNode" color="#87b35b"></ev-json-plus-icon>
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
    import EvJsonTypeSelector from '@/components/json-editor-vsl/components/EvJsonTypeSelector'
    import EvJsonRemoveButton from '@/components/json-editor-vsl/components/EvJsonRemoveButton'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvJsonExpandButton from '@/components/json-editor-vsl/components/EvJsonExpandButton'
    import EvJsonNodeMixin from '@/components/json-editor-vsl/editors/EvJsonNodeMixin'
    import EvJsonPlusIcon from '@/components/json-editor-vsl/icons/ev-json-plus-icon'
    import EvLabel from '@/components/typography/EvLabel'
    import EvSwitch from '@/components/button/EvSwitch'
    import EvJsonNodeMask from '@/components/json-editor-vsl/nodes/EvJsonNodeMask'
    import EvNewSiblingNodeIcon from '@/components/json-editor-vsl/icons/ev-new-sibling-node-icon'
    import EvBulkEditor from '@/components/input/EvBulkEditor'
    import {EvJsonEditorEventBus, EvJsonEditorEvents} from '@/components/json-editor-vsl/EvJsonEditorEventBus'

    export default {
        name: "EvJsonPrimitiveNode",

        components: {
            EvDynamicVariableInput: () => import('@/components/dynamic-variable/EvDynamicVariableInput'),
            EvBulkEditor,
            EvNewSiblingNodeIcon,
            EvJsonNodeMask,
            EvSwitch,
            EvLabel,
            EvJsonPlusIcon,
            EvJsonExpandButton,
            EvExportCheckBox,
            EvJsonRemoveButton,
            EvJsonTypeSelector,
            EvVerticalGutter,
            EvBorderlessInput,
            EvJsonDragIcon
        },

        mixins: [
            EvJsonNodeMixin,
        ],

        data() {
            return {
                value_: ""
            }
        },

        methods: {
            handleDragStart(event) {
                let element = this.$refs['drag-image']

                if (element) {
                    event.dataTransfer.setDragImage(element, -16, 8)
                }

                this.emitDragJsonNode()
            },

            handleInputBlur() {
                EvJsonEditorEventBus.$emit(EvJsonEditorEvents.EDIT_COMPLETE)
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonEditor";
</style>
