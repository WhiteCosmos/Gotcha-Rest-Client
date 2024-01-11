<template>
    <div class="ev-http-client-environment-variable-tree-view-group">
        <div class="d-flex align-center ev-http-client-environment-variable-tree-view-group__wrapper"
             style="width: 100%; height: 32px" @contextmenu="handleShowContextMenu">
            <div class="ev-http-client-environment-variable-tree-view-group__arrow-container" @click="toggleExpand">
                <ev-arrow-down color="#AABBCC" v-if="expand"></ev-arrow-down>

                <ev-arrow-right color="#AABBCC" v-else></ev-arrow-right>
            </div>

            <ev-label size="11" secondary bold v-if="group.default">{{ $t('defaultGroup') }}</ev-label>

            <ev-editable-label ref="ev-editable-label" size="11" secondary bold v-else v-model="group.name"></ev-editable-label>

            <div class="ev-http-client-environment-variable-tree-view-group__divider"></div>

            <div class="ev-http-client-environment-variable-tree-view-group__arrow-container"
                 @click="emitAddVariable">
                <ev-circle-plus-icon></ev-circle-plus-icon>
            </div>
        </div>

        <draggable v-model="variables"
                   handle=".ev-http-client-environment-variable-tree-view-group-item"
                   animation="200"
                   group="variables"
                   style="width: 100%">
            <ev-http-client-environment-variable-tree-view-group-item
                v-if="expand"
                v-for="variable in variables"
                :ref="variable.uid"
                :group="group"
                :variable="variable"
                @show-context-menu="handleShowContextMenu"
                @add-variable="emitAddVariable(variable)"></ev-http-client-environment-variable-tree-view-group-item>
        </draggable>

        <v-menu v-model="showContextMenu"
                transition="v-fade-transition"
                :position-x="coordinate.x"
                :position-y="coordinate.y" absolute offset-y>
            <ev-context-menu>
                <ev-context-menu-item @click.native="handleRenameGroupOrVariable">{{ $t('rename') }}</ev-context-menu-item>

                <ev-context-menu-item @click.native="handleDuplicateGroupOrVariable">{{ $t('duplicate') }}</ev-context-menu-item>

                <ev-context-menu-divider></ev-context-menu-divider>

                <ev-context-menu-item warn @click.native="handleRemoveGroupOrVariable">{{ $t('remove') }}</ev-context-menu-item>
            </ev-context-menu>
        </v-menu>
    </div>
</template>

<script>
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvArrowDown from '@/components/icon/ev-arrow-down'
    import EvArrowRight from '@/components/icon/ev-arrow-right'
    import EvLabel from '@/components/typography/EvLabel'
    import EvCirclePlusIcon from '@/views/http-client/icon/ev-circle-plus-icon'
    import EvHttpClientEnvironmentVariableTreeViewGroupItem from '@/views/http-client/components/environment/EvHttpClientEnvironmentVariableTreeViewGroupItem'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import {
        EvHttpClientEnvironmentManagerEventBus,
        EvHttpClientEnvironmentManagerEvents
    } from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentManagerEventBus'
    import draggable from 'vuedraggable'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import {v4} from 'node-uuid'

    export default {
        name: "EvHttpClientEnvironmentVariableTreeViewGroup",

        components: {
            EvBorderlessInput,
            EvEditableLabel,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
            EvHttpClientEnvironmentVariableTreeViewGroupItem,
            EvCirclePlusIcon,
            EvLabel,
            EvArrowRight,
            EvArrowDown,
            EvVerticalGutter,
            EvDragIcon,
            draggable,
        },

        mixins: [
            EvContextMenuMixin,
        ],

        created() {
            if (!this.group.hasOwnProperty('expand')) {
                this.$set(this.group, 'expand', true)
            }
        },

        props: {
            group: Object,

            name: {
                type: String,

                default: "Default Group"
            },

            keyword: String,
        },

        data() {
            return {
                focusedVariable: undefined,
            }
        },

        i18n: {
            messages: {
                en: {
                    defaultGroup: "Default Group",

                    rename: "Rename",

                    duplicate: "Clone",

                    remove: "Remove",
                },
                zh: {
                    defaultGroup: "默认分组",

                    rename: "重命名",

                    duplicate: "克隆",

                    remove: "删除",
                },
                jp: {
                    defaultGroup: "デフォルトグループ",

                    rename: "名前を変更する",

                    duplicate: "グループを複製する",

                    remove: "グループを削除する",
                },
            }
        },

        computed: {
            variables: {
                get: function () {
                    return this.group ? this.group.variables : []
                },
                set: function (variables) {
                    this.group && (this.group.variables = variables)
                },
            },

            expand() {
                return this.group.expand
            },
        },

        methods: {
            handleShowContextMenu(event, variable) {
                if (variable) {
                    this.focusedVariable = variable
                } else {
                    this.focusedVariable = undefined

                    if (this.group.default) {
                        return
                    }
                }

                this.doShowContextMenu(event)
            },

            handleRenameGroupOrVariable() {
                if (this.focusedVariable) {
                    let ref = this.$refs[this.focusedVariable.uid][0]

                    ref && ref.rename()
                } else {
                    this.$refs['ev-editable-label'].enableEditing()
                }
            },

            handleDuplicateGroupOrVariable() {
                if (this.focusedVariable) {
                    let duplicatedVariable = _.cloneDeep(this.focusedVariable)

                    duplicatedVariable.uid = v4()

                    this.emitAddVariable(this.focusedVariable, duplicatedVariable)
                } else {
                    this.emitDuplicateGroup()
                }
            },

            handleRemoveGroupOrVariable() {
                if (this.focusedVariable) {
                    EvHttpClientEnvironmentManagerEventBus.$emit(EvHttpClientEnvironmentManagerEvents.REMOVE_VARIABLE, this.group, this.focusedVariable)
                } else {
                    this.emitRemoveGroup()
                }
            },

            emitAddVariable(previousVariable, duplicatedVariable) {
                !this.group.expand && (this.group.expand = true)

                this.$emit('add-variable', this.group, previousVariable, duplicatedVariable)
            },

            emitDuplicateGroup() {
                EvHttpClientEnvironmentManagerEventBus.$emit(EvHttpClientEnvironmentManagerEvents.DUPLICATE_GROUP, this.group)
            },

            emitRemoveGroup() {
                EvHttpClientEnvironmentManagerEventBus.$emit(EvHttpClientEnvironmentManagerEvents.REMOVE_GROUP, this.group)
            },

            toggleExpand() {
                this.group.expand = !this.group.expand
            },

            isMatch(variable) {
                if (!this.keyword) {
                    return true
                }

                return variable.name.includes(this.keyword)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-environment-variable-tree-view-group {
        display: flex;

        flex-direction: column;

        align-items: center;

        width: 100%;

        padding-left: 4px;

        padding-right: 4px;

        background-color: #FAFAFA;

        &__wrapper {


        }

        &__arrow-container {
            @include full-center;

            width: 20px;

            height: 32px;
        }

        &__divider {
            display: flex;

            flex: 1;

            height: 1px;

            border-top: 1px solid #E0E0E0;

            margin-left: 4px;

            margin-right: 4px;
        }
    }
</style>
