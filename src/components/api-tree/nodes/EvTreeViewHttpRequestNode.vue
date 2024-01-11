<template>
    <div class="tree-view-request-node"
         @click.stop="doClick"
         @contextmenu.stop="emitShowContextMenu">

        <ev-vertical-gutter :gutter="16 * layer"></ev-vertical-gutter>

        <div class="tree-view-request-node__wrapper"
             :class="treeViewOperationNodeStyle"
             draggable="true"
             @dragstart="onDragStart"
             @dragend="onDragEnd"
             @drag="handleDrag">
            <div class="tree-view-request-node__row">
                <div class="tree-view-request-node__icon-container" style="padding-top: 2px" v-if="isHttpRequestNode">
                    <ev-lighting-icon color="#FFB900"></ev-lighting-icon>
                </div>

                <div class="tree-view-request-node__icon-container" style="padding-top: 2px" v-if="isWebsocketRequestNode">
                    <ev-socket-icon></ev-socket-icon>
                </div>

                <div class="tree-view-request-node__label-container">
                    <ev-editable-label ref="ev-editable-label"
                                       size="12"
                                       v-model="node.name"
                                       :selected="isNodeSelected"
                                       :highlight="highlight"
                                       :focused="false"
                                       bold></ev-editable-label>
                </div>
            </div>

            <div class="tree-view-request-node__row">
                <div class="tree-view-request-node__icon-container">
                    <!--                    <ev-tree-node-status-indicator></ev-tree-node-status-indicator>-->
                </div>

                <ev-tree-view-http-method-tag :request-method="requestMethod" :selected="isNodeSelected"></ev-tree-view-http-method-tag>

                <span class="tree-view-request-node__path-label text-truncate" :class="pathLabelStyle">{{ requestPath }}</span>
            </div>

            <div class="tree-view-request-node__status">
                <ev-tree-node-status-indicator :status="status"></ev-tree-node-status-indicator>
            </div>
        </div>

        <div class="tree-view-request-node__drag-image" ref="drag-image">
            <div class="tree-view-request-node__icon-container">
                <ev-lighting-icon color="#FFB900"></ev-lighting-icon>
            </div>

            <div class="tree-view-request-node__label-container">
                <ev-label size="12" bold secondary>{{ dragImageName }}</ev-label>
            </div>
        </div>

        <ev-tree-view-node-mask v-if="isNodeCopied || isNodeMoved"></ev-tree-view-node-mask>
    </div>
</template>

<script>
    import EvLightIcon from '@/components/icon/ev-light-icon'
    import EvHttpMethodTag from '@/components/typography/EvHttpMethodTag'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvContentSwitchButtonApiIcon from '@/views/content/components/content-switch-button/EvContentSwitchButtonApiIcon'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvTreeViewNodeMixin from '@/components/api-tree/mixins/EvTreeViewNodeMixin'
    import EvTreeViewNodeDragMixin from '@/components/api-tree/mixins/EvTreeViewNodeDragMixin'
    import EvTreeViewHttpMethodTag from '@/components/api-tree/components/EvTreeViewHttpMethodTag'
    import EvTreeViewNodeMask from '@/components/api-tree/components/EvTreeViewNodeMask'

    import _ from 'lodash'
    import EvLabel from '@/components/typography/EvLabel'
    import RabiHttpOperationDao from '@/core/dao/RabiHttpOperationDao'
    import {EvApiTreeViewEventBus, EvApiTreeViewEvents} from '@/components/api-tree/EvApiTreeViewEventBus'
    import RabiApiTreeNodeType from '@/components/api-tree/data/RabiApiTreeNodeType'
    import EvLittleSpinner from '@/components/icon/EvLittleSpinner'
    import EvTreeNodeStatusIndicator from '@/components/api-tree/nodes/EvTreeNodeStatusIndicator'
    import GHCTreeNodeStatus from '@/components/api-tree/data/GHCTreeNodeStatus'
    import EvLightingIcon from '@/components/api-tree/icons/ev-lighting-icon'
    import EvSocketIcon from '@/components/api-tree/icons/EvSocketIcon'
    import RabiTreeViewNodeType from '@/components/api-tree/data/RabiTreeViewNodeType'

    export default {
        name: "EvTreeViewHttpRequestNode",

        components: {
            EvSocketIcon,
            EvLightingIcon,
            EvTreeNodeStatusIndicator,
            EvLittleSpinner,
            EvLabel,
            EvTreeViewNodeMask,
            EvTreeViewHttpMethodTag,
            EvEditableLabel,
            EvContextMenuItem,
            EvContextMenu,
            EvContextMenuDivider,
            EvContentSwitchButtonApiIcon,
            EvVerticalGutter,
            EvHttpMethodTag,
            EvLightIcon
        },

        mixins: [
            EvTreeViewNodeMixin,
            EvTreeViewNodeDragMixin,
        ],

        computed: {
            treeViewOperationNodeStyle() {
                return {
                    'tree-view-request-node__wrapper--selected': this.isNodeSelected && !this.isNodeFocused,
                    'tree-view-request-node__wrapper--focused': this.isNodeFocused && !this.isNodeSelected,
                    'tree-view-request-node__wrapper--selected-and-focused': this.isNodeFocused && this.isNodeSelected,
                }
            },

            labelStyle() {
                return {
                    'tree-view-request-node__label--selected': this.isNodeSelected
                }
            },

            pathLabelStyle() {
                return {
                    'tree-view-request-node__path-label--selected': this.isNodeSelected
                }
            },

            name() {
                return this.node.name
            },

            status() {
                if (!this.node.status) {
                    this.$set(this.node, 'status', GHCTreeNodeStatus.NONE)
                }

                return this.node.status
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

            requestMethod() {
                return this.node ? this.node.requestMethod : "GET"
            },

            requestPath() {
                return this.node ? this.node.requestPath : "/"
            },

            isHttpRequestNode() {
                return this.node.type === RabiTreeViewNodeType.HTTP_REQUEST
            },

            isWebsocketRequestNode() {
                return this.node.type === RabiTreeViewNodeType.WEBSOCKET_REQUEST
            },
        },

        methods: {
            doRename() {
                this.$refs['ev-editable-label'].enableEditing()
            },

            doClick() {
                if (this.command || this.shift) {
                    this.emitFocusTreeViewNode()
                } else {
                    this.emitSelectTreeViewNode()
                }
            },

            onDragStart(event) {
                let dragElement = this.$refs['drag-image']

                // let target = this.getCurrentTarget(event)

                // target.style.cursor = 'move'

                this.handleDragStart(event, this.emitDragTreeViewNode, dragElement)
            },

            onDragEnd(event) {
                let target = this.getCurrentTarget(event)

                // target.style.cursor = 'default'

                this.handleDragEnd(event)
            },

            // onDragOver(event) {
            //     event.preventDefault()
            // },

            handleModifyHttpOperationName(newVal) {
                if (this.node.type !== RabiApiTreeNodeType.HTTP_REQUEST) {
                    return
                }

                new RabiHttpOperationDao().query({id: this.node.httpRequestId}).then(operation => {
                    operation.name = newVal

                    new RabiHttpOperationDao().save(operation)

                    EvApiTreeViewEventBus.$emit(EvApiTreeViewEvents.UPDATE_HTTP_OPERATION_NAME, this.node)
                })
            },

            getCurrentTarget: function (e) {
                if (e.toElement) {
                    return e.toElement
                } else if (e.currentTarget) {
                    return e.currentTarget
                } else if (e.srcElement) {
                    return e.srcElement
                } else {
                    return null
                }
            },
        },

        watch: {
            'node.name'(newVal) {
                this.handleModifyHttpOperationName(newVal)

                this.emitUpdateTreeViewNode()
            },
            'node.requestMethod'() {
                this.emitUpdateTreeViewNode()
            },
            'node.requestPath'() {
                this.emitUpdateTreeViewNode()
            },
            draggedNode(newVal) {
                !newVal && this.resetDrag()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../EvApiTreeView";

    .ev-tree-view-http-request-node {

    }

    .tree-view-request-node {
        position: relative;

        width: 100%;

        height: 48px;

        display: flex;

        align-items: flex-start;

        &__wrapper {
            position: relative;

            display: flex;

            flex-direction: column;

            overflow: hidden; // 修复缩进时的截断问题

            width: 100%;

            height: 48px;

            border-radius: 6px;

            &--selected {
                background-color: $SECONDARY_COLOR;

                box-shadow: 0 2px 4px -2px $SHADOW_COLOR;
            }

            &--focused {
                background-color: #EAEAEA;
            }

            &--selected-and-focused {
                background-color: $PRIMARY_COLOR;

                box-shadow: 0 2px 4px -2px $SHADOW_COLOR;
            }
        }

        &__status {
            position: absolute;

            height: 56px;

            width: 16px;

            display: flex;

            align-items: center;

            justify-content: center;

            right: 8px;

            padding-bottom: 4px;

            //background-color: red;

            //background-color: green;
        }

        &__icon-container {
            @include full-center;

            height: 20px;

            width: 20px;
        }

        &__label-container {
            display: flex;

            align-items: center;

            height: 20px;

            width: 196px;

            padding-top: 1px;
        }

        &__label {
            font-size: 11px;

            line-height: 16px;

            color: $SECONDARY_FONT_COLOR;

            font-weight: bolder;

            &--selected {
                color: white;
            }
        }

        &__path-label {
            font-size: 11px;

            line-height: 16px;

            color: $PRIMARY_FONT_COLOR;

            font-weight: 500;

            width: 70%;

            &--selected {
                color: white;
            }
        }

        &__row {
            display: flex;

            align-items: center;

            height: 24px;
        }

        &__drag-image {
            position: absolute;

            left: -999px;

            display: flex;

            align-items: center;

            height: 24px;

            cursor: grabbing;
        }
    }

    .node-indicator {
        position: absolute;

        width: 16px;

        height: 100%;

        border-left: 1px solid #E0E0E0;

        &--mouse-enter {
            border-left: 1px solid #007AFF;
        }

        &--mouse-leave {
            border-left: 1px dotted #E0E0E0;
        }
    }

    //*[draggable=true] {
    //    -moz-user-select: none;
    //    -khtml-user-drag: element;
    //    -webkit-user-drag: element;
    //    -khtml-user-select: none;
    //    -webkit-user-select: none;
    //    //cursor: grabbing;
    //}

    [draggable="true"] {
        /*
       To prevent user selecting inside the drag source
      */
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    //*[draggable=true]:active {
    //    cursor: copy;
    //}

    //#Dragme {
    //    background-color: #90ee90;
    //    border: solid 2px #006400;
    //    cursor: pointer;
    //    display: block;
    //    height: 70px;
    //    width: 70px;
    //}

    //#Dropzone {
    //    background-color: #add8e6;
    //    border: solid 2px darkblue;
    //    height: 200px;
    //    margin-bottom: 14px;
    //    padding: 7px;
    //    width: 300px;
    //}
</style>
