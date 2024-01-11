<template>
    <div class="d-flex align-center http-request-view"
         :class="{'http-request-view--selected': isSelected}"
         @contextmenu="doShowContextMenu($event, showContextMenuCallback)"
         @click.stop="doSelectHttpOperation">

        <div class="http-request-view__status-indicator">
            <v-icon size="9" :color="isSelected ? '#ffda33' : '#ffb442'">fa-bolt</v-icon>
        </div>

        <!--        <div class="http-request-view__status-indicator">-->
        <!--            <div :class="httpOperationStatusClasses"></div>-->
        <!--        </div>-->

        <div>
            <span class="http-request-view__label" :class="{'http-request-view__label--selected': isSelected}">{{ httpOperation.name }}</span>
        </div>

        <v-spacer></v-spacer>

        <v-progress-circular size="12" width="1" indeterminate
                             :color="isSelected ? 'white' : '#AABBCC'" v-if="isPending"></v-progress-circular>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <v-menu v-model="showContextMenu" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
            <ev-context-menu>
                <!--                <ev-context-menu-item>Rename</ev-context-menu-item>-->

                <ev-context-menu-item @click.native="doDuplicateHttpOperation">Duplicate</ev-context-menu-item>

                <ev-context-menu-divider></ev-context-menu-divider>

                <ev-context-menu-item warn @click.native="doDeleteHttpOperation">Delete</ev-context-menu-item>
            </ev-context-menu>
        </v-menu>
    </div>
</template>

<script>
    import {
        EvJsonTreeViewEventBus,
        EvJsonTreeViewEvents
    } from '@/components/java-tree/EvJsonTreeViewEventBus'
    import RabiHttpOperationStatus from '@/data/gotcha/http-operation/RabiHttpOperationStatus'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvHttpRequestView",

        components: {
            EvVerticalGutter,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu
        },

        props: {
            jsonService: Object,

            jsonMethod: Object,

            httpOperation: Object,

            selectedHttpOperation: Object,
        },

        mixins: [
            EvContextMenuMixin
        ],

        created() {
            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents._SHOW_CONTEXT_MENU, (jsonMethod, httpOperation) => {
                this.handleShowContextMenu(jsonMethod, httpOperation)
            })
        },

        watch: {},

        computed: {
            isPending() {
                return this.httpOperation.status === RabiHttpOperationStatus.PENDING
            },

            isSelected() {
                return this.selectedHttpOperation
                    && this.selectedHttpOperation.uid === this.httpOperation.uid
            },

            httpOperationStatusClasses() {
                if (this.httpOperation.status === RabiHttpOperationStatus.NONE) {
                    return ['http-request-view__status-indicator--none']
                }

                if (this.httpOperation.status === RabiHttpOperationStatus.PENDING) {
                    return ['http-request-view__status-indicator--none']
                }

                if (this.httpOperation.status === RabiHttpOperationStatus.SUCCESS) {
                    return ['http-request-view__status-indicator--success']
                }

                if (this.httpOperation.status === RabiHttpOperationStatus.FAILED) {
                    return ['http-request-view__status-indicator--failed']
                }
            }
        },

        methods: {
            doSelectHttpOperation() {
                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SELECT_HTTP_OPERATION, this.jsonService, this.jsonMethod, this.httpOperation)
            },

            doDuplicateHttpOperation() {
                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._DUPLICATE_HTTP_OPERATION, this.jsonMethod, this.httpOperation)
            },

            doDeleteHttpOperation() {
                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._DELETE_HTTP_OPERATION, this.jsonMethod, this.httpOperation)
            },

            handleShowContextMenu(jsonMethod, httpOperation) {
                if (!httpOperation) {
                    this.showContextMenu = false
                }

                if (!this.isCurrentHttpOperation(httpOperation)) {
                    this.showContextMenu = false
                }
            },

            isCurrentHttpOperation(httpOperation) {
                return httpOperation && (this.httpOperation.uid === httpOperation.uid)
            },

            showContextMenuCallback() {
                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents._SHOW_CONTEXT_MENU, this.jsonMethod, this.httpOperation)
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-request-view {
        padding-left: 20px;

        margin-left: 16px;

        margin-right: 16px;

        margin-top: 4px;

        margin-bottom: 4px;

        height: 28px;

        &--selected {
            border-radius: 3px;

            transition: background-color 0.15s;

            @include component-shadow;

            background: linear-gradient(90deg, $BLUE_BACKGROUND_PRIMARY_COLOR 0%, $BLUE_BACKGROUND_SECONDARY_COLOR 100%);
        }

        &__status-indicator {
            //margin-left: 4px;

            height: 24px;

            width: 24px;

            display: flex;

            //justify-content: flex-start;

            justify-content: center;

            align-items: center;

            //@include square(40px, 0px);

            &--none {
                @include square(4px, 4px);

                background-color: #D8D8D8;
            }

            &--success {
                @include square(4px, 4px);

                background-color: #9acc68;
            }

            &--failed {
                @include square(4px, 4px);

                background-color: #FF8282;
            }
        }

        &__label {
            font-size: 11px;

            font-weight: bold;

            color: $SECONDARY_FONT_COLOR;

            &--selected {
                color: white;
            }
        }
    }
</style>
