<template>
    <div class="d-flex flex-column" v-if="visible_"
         @mouseenter="toggleHover"
         @mouseleave="toggleHover"
         @click="doSelectJsonMethod">
        <div class="json-method-view" @contextmenu="doShowContextMenu($event, showContextMenuCallback)">
            <div class="json-method-indicator">
                <div class="indicator-icon" v-if="isSelected"></div>
            </div>

            <div class="d-flex flex-column" v-if="jsonMethod.isHttpService">
                <span :class="jsonMethodSubtitleStyle" v-html="methodSubtitle"></span>

                <div class="d-flex align-center">
                    <ev-http-method-tag :request-method="requestMethod"></ev-http-method-tag>

                    <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>

                    <span :class="jsonMethodTitleStyle" v-html="methodTitle" style="max-width: 192px"></span>
                </div>
            </div>

            <div class="d-flex flex-column" v-if="jsonMethod.isJavaService">
                <span :class="jsonMethodSubtitleStyle" v-html="methodSubtitle"></span>

                <span :class="jsonMethodTitleStyle" v-html="methodTitle"></span>
            </div>

            <v-spacer></v-spacer>

            <!--            <v-icon color="#AABBCC" x-small v-show="isSelected || hover_">fa-ellipsis-v</v-icon>-->

            <!--            <ev-dot-button v-if="isSelected || hover_"></ev-dot-button>-->

            <!--            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>-->

            <div class="http-operation-expand" @click.stop="toggleExpand" v-if="hasHttpOperation">
                <v-icon x-small color="#007AFF" v-if="expand_">fa-caret-down</v-icon>

                <v-icon x-small color="#D8D8D8" v-else>fa-caret-left</v-icon>
            </div>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>
        </div>

        <ev-http-operation-view
            v-if="expand_"
            v-for="httpOperation in httpOperations"
            :json-service="jsonService"
            :json-method="jsonMethod"
            :http-operation="httpOperation"
            :selected-http-operation="selectedHttpOperation"></ev-http-operation-view>

        <v-menu v-model="showContextMenu" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
            <!--            <ev-json-method-context-menu @create-http-operation="doCreateHttpOperation"></ev-json-method-context-menu>-->
            <ev-context-menu>
                <ev-context-menu-item @click.native="doCreateHttpOperation">New Request</ev-context-menu-item>

<!--                <ev-context-menu-item>New Mock</ev-context-menu-item>-->

                <!--                <ev-context-menu-divider></ev-context-menu-divider>-->

                <!--                <ev-context-menu-item>Export As Markdown</ev-context-menu-item>-->

                <!--                <ev-context-menu-item>Export As HTML</ev-context-menu-item>-->
            </ev-context-menu>
        </v-menu>
    </div>
</template>

<script>
    import EvHttpMethodTag from '@/components/typography/EvHttpMethodTag'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvJsonTreeViewMixin from '@/components/java-tree/EvJsonTreeViewMixin'
    import EvHttpOperationView from '@/components/java-tree/EvHttpOperationView'
    import EvJsonMethodContextMenu from '@/components/java-tree/EvJsonMethodContextMenu'
    import EvHttpOperationMixin from '@/mixins/EvHttpOperationMixin'
    import JsonMethod from '@/data/evalon/JsonMethod'
    import EvDotButton from '@/components/button/EvDotButton'
    import _ from 'lodash'
    import {EvJsonTreeViewEventBus, EvJsonTreeViewEvents} from '@/components/java-tree/EvJsonTreeViewEventBus'
    import {EvContentTabsEventBus, EvContentTabsEvents} from '@/components/tabs/EvContentTabsEventBus'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'

    export default {
        name: "EvJsonMethodView",

        components: {
            EvContextMenuDivider,
            EvHorizonDivider,
            EvContextMenuItem,
            EvContextMenu,
            EvDotButton,
            EvJsonMethodContextMenu,
            EvHttpOperationView,
            EvVerticalGutter,
            EvHttpMethodTag
        },

        mixins: [
            EvJsonTreeViewMixin,
            EvHttpOperationMixin,
            EvContextMenuMixin,
        ],

        created() {
            this.queryHttpOperations(this.jsonMethod).then(httpOperations => {
                this.httpOperations = httpOperations
            })

            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents.COLLAPSE_ALL, () => {
                this.handleCollapseAll()
            })

            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents.EXPAND_ALL, () => {
                this.handleExpandAll()
            })

            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents.COLLAPSE_ALL, () => {
                this.handleCollapseAll()
            })

            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents._SHOW_CONTEXT_MENU, (jsonMethod, httpOperation) => {
                this.handleShowContextMenu(jsonMethod, httpOperation)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.SWITCH_TO_API_DEFINITION, (selectedContentTab) => {
                this.handleSwitchToApiDefinition(selectedContentTab)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.SWITCH_TO_HTTP_OPERATION, (selectedContentTab) => {
                this.handleSwitchToHttpOperation(selectedContentTab)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.SWITCH_TO_MOCK_OPERATION, (selectedContentTab) => {
                this.handleSwitchToMockOperation(selectedContentTab)
            })

            // Http Operation

            EvJsonTreeViewEventBus.$on([
                EvJsonTreeViewEvents._DUPLICATE_HTTP_OPERATION,
                EvJsonTreeViewEvents.DUPLICATE_HTTP_OPERATION
            ], (jsonMethod, httpOperation) => {
                this.handleDuplicateHttpOperation(jsonMethod, httpOperation)
            })

            EvJsonTreeViewEventBus.$on([
                EvJsonTreeViewEvents._DELETE_HTTP_OPERATION,
                EvJsonTreeViewEvents.DELETE_HTTP_OPERATION
            ], (jsonMethod, httpOperation) => {
                this.handleDeleteHttpOperation(jsonMethod, httpOperation)
            })
        },

        props: {
            jsonService: Object,

            jsonMethod: Object,

            selectedJsonMethod: Object,

            selectedHttpOperation: Object, // 用于判断是否有HttpOperation被选中

            selectedMockOperation: Object,

            keyword: String,
        },

        data() {
            return {
                visible_: true,

                hover_: false,

                expand_: false,

                httpOperations: [],

                mockOperations: [],
            }
        },

        computed: {
            hasHttpOperation() {
                return !_.isEmpty(this.httpOperations)
            },

            isSelected() {
                return this.selectedJsonMethod && this.jsonMethod.id === this.selectedJsonMethod.id
            },

            requestMethod() {
                return this.jsonMethod.requestMethod || 'GET'
            },

            methodTitle() {
                if (this.jsonMethod) {
                    let highlight

                    if (this.jsonMethod.isHttpService) {
                        highlight = this.jsonMethod.requestPath

                        return this.replaceWithHighlight(highlight, this.keyword)
                    }

                    if (this.jsonMethod.isJavaService) {
                        highlight = this.jsonMethod.methodName

                        return this.replaceWithHighlight(highlight, this.keyword)
                    }
                }
            },

            methodSubtitle() {
                if (this.jsonMethod) {
                    let highlight

                    if (this.jsonMethod.isHttpService) {
                        highlight = this.jsonMethod.summary || this.jsonMethod.methodName

                        return this.replaceWithHighlight(highlight, this.keyword)
                    }

                    if (this.jsonMethod.isJavaService) {
                        highlight = this.jsonMethod.summary || "/"

                        return this.replaceWithHighlight(highlight, this.keyword)
                    }
                }
            },

            jsonMethodTitleStyle() {
                return [
                    'json-method-title',
                    'text-truncate',
                    (this.isSelected || this.hover_) ? 'json-method-title--selected' : '',
                ]
            },

            jsonMethodSubtitleStyle() {
                return [
                    'json-method-subtitle',
                    'text-truncate',
                    (this.isSelected || this.hover_) ? 'json-method-subtitle--selected' : '',
                ]
            },
        },

        methods: {
            toggleHover() {
                this.hover_ = !this.hover_
            },

            toggleExpand() {
                this.expand_ = !this.expand_
            },

            expandHttpOperationsIfNot() {
                !this.expand_ && (this.expand_ = true)
            },

            showContextMenuCallback() {
                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SHOW_CONTEXT_MENU, this.jsonMethod)
            },

            doSelectJsonMethod() {
                this.expandHttpOperationsIfNot()

                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SELECT_JSON_METHOD, this.jsonService, this.jsonMethod)
            },

            async doCreateHttpOperation() {
                let httpOperation = await this.createHttpOperation(this.jsonMethod)

                this.httpOperations.push(httpOperation)

                this.expandHttpOperationsIfNot()

                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SELECT_HTTP_OPERATION, this.jsonService, this.jsonMethod, httpOperation)
            },

            async handleDuplicateHttpOperation(jsonMethod, httpOperation) {
                if (!this.isCurrentJsonMethod(jsonMethod)) {
                    return
                }

                let duplicatedHttpOperation = await this.duplicateHttpOperation(httpOperation)

                let index = this.httpOperations.indexOf(httpOperation)

                this.httpOperations.splice(index + 1, 0, duplicatedHttpOperation)

                this.expandHttpOperationsIfNot()

                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SELECT_HTTP_OPERATION, this.jsonService, this.jsonMethod, duplicatedHttpOperation)
            },

            async handleDeleteHttpOperation(jsonMethod, httpOperation) {
                if (!this.isCurrentJsonMethod(jsonMethod)) {
                    return
                }

                let index = this.httpOperations.indexOf(httpOperation)

                this.httpOperations.splice(index, 1)

                if (_.isEmpty(this.httpOperations)) {
                    EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SELECT_JSON_METHOD, this.jsonService, this.jsonMethod)
                }

                if (this.selectedHttpOperation && this.selectedHttpOperation === httpOperation) {
                    let previousHttpOperation = this.httpOperations[index < this.httpOperations.length ? index : (index - 1)]

                    EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SELECT_HTTP_OPERATION, this.jsonService, this.jsonMethod, previousHttpOperation)
                }

                await this.deleteHttpOperation(httpOperation)
            },

            doCreateMockOperation() {

            },

            doDuplicateMockOperation(mockOperation) {

            },

            doDeleteMockOperation(mockOperation) {

            },

            handleCollapseAll() {
                this.expand_ = false
            },

            handleExpandALl() {
                this.expand_ = true
            },

            handleShowContextMenu(jsonMethod, httpOperation) {
                if (!this.isCurrentJsonMethod(jsonMethod)) {
                    this.showContextMenu = false
                }

                if (httpOperation) {
                    this.showContextMenu = false
                }
            },

            handleSwitchToApiDefinition(targetContentTab) {
                if (!this.isCurrentJsonMethod(targetContentTab.jsonMethod)) {
                    return
                }

                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SELECT_JSON_METHOD, this.jsonService, this.jsonMethod)
            },

            /**
             * @param {GHCContentTab} targetContentTab
             */
            handleSwitchToHttpOperation(targetContentTab) {
                if (!this.isCurrentJsonMethod(targetContentTab.jsonMethod)) {
                    return
                }

                if (_.isEmpty(this.httpOperations)) {
                    this.doCreateHttpOperation()

                    return
                }

                if (targetContentTab.httpOperation) {
                    EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SELECT_HTTP_OPERATION, this.jsonService, this.jsonMethod, targetContentTab.httpOperation)
                } else {
                    EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SELECT_HTTP_OPERATION, this.jsonService, this.jsonMethod, this.httpOperations[0])
                }
            },

            /**
             * TODO v1.4.x
             * @param {GHCContentTab} targetContentTab
             */
            handleSwitchToMockOperation(targetContentTab) {
                if (!this.isCurrentJsonMethod(targetContentTab.jsonMethod)) {
                    return
                }

                if (_.isEmpty(this.mockOperations)) {
                    this.doCreateMockOperation()

                    return
                }

                if (targetContentTab.mockOperation) {
                    EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SELECT_MOCK_OPERATION, this.jsonMethod, targetContentTab.mockOperation)
                } else {
                    EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SELECT_MOCK_OPERATION, this.jsonMethod, this.mockOperations[0])
                }
            },

            isCurrentJsonMethod(jsonMethod) {
                return this.jsonMethod.id === jsonMethod.id
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .json-method-view {
        @include horizon-center;

        height: 56px;

        .json-method-indicator {
            @include square(40px, 0);

            padding-left: 6px; // 为了与其它图标对齐

            .indicator-icon {
                width: 4px;

                height: 12px;

                border-radius: 4px;

                background-color: $PRIMARY_COLOR;

                transform: scale(.8);

                box-shadow: 0px 1px 4px -2px #C2C7CC;
            }
        }
    }

    .json-method-title {
        font-size: 11px;

        line-height: 24px;

        font-weight: normal;

        max-width: 240px;

        transition: 80ms;

        & {
            color: $SECONDARY_FONT_COLOR;
        }

        &--hovered {
            color: $PRIMARY_COLOR
        }

        &--selected {
            color: $PRIMARY_COLOR
        }
    }

    .json-method-subtitle {
        font-size: 11px;

        line-height: 24px;

        max-width: 240px;

        transition: 80ms;

        font-weight: bold;

        & {
            color: $SECONDARY_FONT_COLOR;
        }

        &--hovered {
            //color: $SECONDARY_COLOR;
            background-color: #9acc68;
        }

        &--selected {
            color: $PRIMARY_COLOR;
        }
    }

    ::v-deep .highlight {
        background-color: #f3d23e;

        color: black;
    }

    .http-operation-container {

    }

    .http-operation-expand {
        width: 16px;

        height: 16px;

        @include full-center;

        //background-color: #EAEAEA;

        border-radius: 3px;
    }
</style>
