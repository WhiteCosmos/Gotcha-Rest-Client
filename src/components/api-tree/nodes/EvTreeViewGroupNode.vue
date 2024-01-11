<template>
    <div class="ev-tree-view-group-node"
         @click.stop="emitFocusTreeViewNode"
         @contextmenu.stop="emitShowContextMenu">

        <ev-vertical-gutter :gutter="16 * layer"></ev-vertical-gutter>

        <div class="ev-tree-view-group-node__wrapper"
             :class="apiGroupNodeStyle"
             draggable="true"
             @dragstart="onDragStart"
             @dragend="handleDragEnd($event)">
            <div class="ev-tree-view-group-node__icon-container" @click="emitToggleTreeViewNode">
                <ev-arrow-down color="#AABBCC" v-if="expand"></ev-arrow-down>

                <ev-arrow-right color="#AABBCC" v-else></ev-arrow-right>
            </div>

            <div class="ev-tree-view-group-node__folder-container">
                <ev-folder-open-icon v-if="expand"></ev-folder-open-icon>

                <ev-folder-close-icon v-else></ev-folder-close-icon>
            </div>

            <div class="ev-tree-view-group-node__label-container">
                <ev-editable-label ref="ev-editable-label"
                                   v-model="node.name"
                                   size="12"
                                   :selected="isNodeSelected"
                                   :highlight="highlight"
                                   :focused="isNodeFocused"
                                   bold></ev-editable-label>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-counter-label :value="nodeLength"></ev-counter-label>
        </div>

        <div class="ev-tree-view-group-node__drag-image" ref="drag-image">
            <div class="ev-tree-view-group-node__folder-container">
                <ev-folder-close-icon></ev-folder-close-icon>
            </div>

            <div class="ev-tree-view-group-node__label-container">
                <ev-label size="11" secondary bold>{{ dragImageName }}</ev-label>
            </div>
        </div>

        <ev-tree-view-node-mask v-if="isNodeCopied || isNodeMoved"></ev-tree-view-node-mask>
    </div>
</template>

<script>
    import ProjectIcon from '@/components/icon/project-icon'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvTreeViewNodeMixin from '@/components/api-tree/mixins/EvTreeViewNodeMixin'
    import EvTreeViewNodeDragMixin from '@/components/api-tree/mixins/EvTreeViewNodeDragMixin'
    import EvTreeViewNodeMask from '@/components/api-tree/components/EvTreeViewNodeMask'
    import EvLeftArrowIcon from '@/views/http-client/icon/ev-left-arrow-icon'
    import EvArrowDown from '@/components/icon/ev-arrow-down'
    import EvArrowRight from '@/components/icon/ev-arrow-right'
    import EvFolderOpenIcon from '@/components/api-tree/icons/ev-folder-open-icon'
    import EvFolderCloseIcon from '@/components/api-tree/icons/ev-folder-close-icon'
    import _ from 'lodash'
    import EvLabel from '@/components/typography/EvLabel'
    import EvCounterLabel from '@/components/label/EvCounterLabel'

    export default {
        name: "EvTreeViewGroupNode",

        components: {
            EvCounterLabel,
            EvLabel,
            EvFolderCloseIcon,
            EvFolderOpenIcon,
            EvArrowRight,
            EvArrowDown,
            EvLeftArrowIcon,
            EvTreeViewNodeMask,
            EvEditableLabel,
            EvVerticalGutter,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
            ProjectIcon
        },

        mixins: [
            EvTreeViewNodeMixin,
            EvTreeViewNodeDragMixin
        ],

        data() {
            return {}
        },

        computed: {
            name() {
                return this.node.name
                // return `${this.node.layer} - ${this.node.children.length}`
            },

            dragImageName() {
                if (!_.isEmpty(this.focusedNodes) && this.focusedNodes.includes(this.node)) {
                    return `${this.focusedNodes.length} Items`
                }

                return this.node.name
            },

            layer() {
                return this.node ? this.node.layer : 0
            },

            expand() {
                return this.node ? this.node.expand : false
            },

            // Style

            apiGroupNodeStyle() {
                return {
                    'ev-tree-view-group-node__wrapper--focused': this.isNodeFocused
                }
            },
        },

        methods: {
            doRename() {
                this.$refs['ev-editable-label'].enableEditing()
            },

            onDragStart(event) {
                let dragElement = this.$refs['drag-image']

                this.handleDragStart(event, this.emitDragTreeViewNode, dragElement)
            }
        },

        watch: {
            'node.name'() {
                this.emitUpdateTreeViewNode()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../EvApiTreeView";

    $HEIGHT: 20px;

    .ev-tree-view-group-node {
        position: relative;

        display: flex;

        align-items: center;

        width: 100%;

        height: $HEIGHT;

        &__wrapper {
            display: flex;

            align-items: center;

            width: 100%;

            height: $HEIGHT;

            border-radius: 3px;

            &--selected {
                @include blue-background-gradient--horizontal;

                @include component-shadow;
            }

            &--focused {
                background-color: #F1F1F1;
            }

            &:hover {
                //background-color: #F1F1F1;
            }
        }

        &--selected {
            @include blue-background-gradient--horizontal;

            @include component-shadow;

            border-radius: 5px;
        }

        &__icon-container {
            @include full-center;

            height: $HEIGHT;

            width: 20px;
        }

        &__folder-container {
            display: flex;

            justify-content: flex-start;

            align-items: center;

            height: $HEIGHT;

            width: 18px;
        }

        &__label-container {
            display: flex;

            align-items: center;

            height: $HEIGHT;

            padding-top: 2px;

            max-width: 188px;
        }

        &__label {
            font-size: 11px;

            line-height: $HEIGHT;

            color: $SECONDARY_FONT_COLOR;

            font-weight: bolder;
        }

        &__drag-image {
            position: absolute;

            left: -999px;

            display: flex;

            align-items: center;

            height: 24px;
        }
    }

    .operation-indicator {
        position: absolute;

        width: 16px;

        height: 28px;

        border-left: 1px solid #E0E0E0;

        &--mouse-enter {
            border-left: 1px solid #007AFF;
        }

        &--mouse-leave {
            border-left: 1px dotted #E0E0E0;
        }
    }
</style>
