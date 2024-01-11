<template>
    <div class="ev-json-editor__json-node"
         @click.stop="emitFocusJsonNode"
         @contextmenu="emitShowContextMenu"
         ref="drag-image">

        <!-- drag 16px -->

        <div class="ev-json-editor__json-node__drag-handler" draggable="true" @dragstart="handleDragStart" v-if="!isRootNode">
            <ev-json-drag-icon></ev-json-drag-icon>
        </div>

        <div class="ev-json-editor__json-node__key" ref="drag-image">

            <!-- gutter 8 * layer -->

            <div class="d-flex" draggable="true" @dragstart="handleDragStart" style="height:28px;">
                <ev-vertical-gutter :gutter="16 * node.layer"></ev-vertical-gutter>
            </div>

            <!-- expand 16px -->

            <div class="ev-json-editor__json-node__widget">
                <ev-json-expand-button :node="node" @toggle-json-node="emitToggleJsonNode"></ev-json-expand-button>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <!-- checkbox 16px-->

            <div class="ev-json-editor__json-node__widget">
                <ev-export-check-box :status="node.checkedStatus" @click.native="emitToggleJsonNodeChecked"></ev-export-check-box>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <!-- key editor flex 1-->

            <div class="d-flex flex-grow-1" v-if="isRootNode">
                <ev-label size="11" primary bold>Root</ev-label>
            </div>

            <div class="d-flex flex-grow-1" v-else-if="node.isArrayItem">
                <ev-label size="11" secondary>Idx {{ index }}</ev-label>
            </div>

            <ev-borderless-input v-else v-model="node.key" :placeholder="node.keyPlaceholder" @contextmenu.native.stop=""></ev-borderless-input>
        </div>

        <!-- type -->

        <div class="ev-json-editor__json-node__type">
            <ev-json-type-selector :node="node" @change-json-node-type="emitChangeJsonNodeType"></ev-json-type-selector>
        </div>

        <!-- value editor flex 1-->

        <div class="ev-json-editor__json-node__value">
            <ev-label size="11" grey v-if="isObjectNode">{{ nodeLength + (nodeLength > 1 ? ' Properties' : ' Property') }}</ev-label>

            <ev-label size="11" grey v-if="isArrayNode">{{ nodeLength + (nodeLength > 1 ? ' Items' : ' Item') }}</ev-label>

            <v-spacer></v-spacer>

            <!-- options 16px -->

            <!--            <div class="ev-json-editor__json-node__widget" v-if="!isRootNode">-->
            <!--                <ev-http-client-json-request-body-importer></ev-http-client-json-request-body-importer>-->
            <!--            </div>-->

            <!--            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>-->

            <div class="ev-json-editor__json-node__widget">
                <ev-json-remove-button @remove="emitRemoveJsonNode" v-if="!isRootNode"></ev-json-remove-button>
            </div>

            <ev-vertical-gutter :gutter="2"></ev-vertical-gutter>

            <div class="ev-json-editor__json-node__widget">
                <ev-new-json-node-icon></ev-new-json-node-icon>
            </div>

            <div class="ev-json-editor__json-node__widget">
                <ev-json-add-button @click.native="emitAddJsonNode"></ev-json-add-button>
            </div>

            <div class="ev-json-editor__json-node__widget" v-if="!isRootNode">
                <ev-new-sibling-node-icon></ev-new-sibling-node-icon>
            </div>

            <div class="ev-json-editor__json-node__widget" v-if="!isRootNode">
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
    import EvJsonNodeMixin from '@/components/json-editor-vsl/editors/EvJsonNodeMixin'
    import EvLabel from '@/components/typography/EvLabel'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvJsonPlusIcon from '@/components/json-editor-vsl/icons/ev-json-plus-icon'
    import EvJsonNodeMask from '@/components/json-editor-vsl/nodes/EvJsonNodeMask'
    import EvNewSiblingNodeIcon from '@/components/json-editor-vsl/icons/ev-new-sibling-node-icon'
    import EvNewJsonNodeIcon from '@/components/json-editor-vsl/icons/ev-new-json-node-icon'
    import EvHttpClientJsonRequestBodyImporter from '@/views/http-client/request/request-body/EvHttpClientJsonRequestBodyImporter.vue'

    export default {
        name: "EvJsonContainerNode",

        components: {
            EvHttpClientJsonRequestBodyImporter,
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
            EvJsonNodeMixin,
        ],

        methods: {
            handleDragStart(event) {
                let element = this.$refs['drag-image']

                if (element) {
                    event.dataTransfer.setDragImage(element, -16, 8)
                }

                this.emitDragJsonNode()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonEditor";
</style>
