<template>
    <div class="ev-http-client-environment-variable-tree-view">
        <div class="ev-http-client-environment-variable-tree-view__header">
            <div class="ev-http-client-environment-variable-tree-view__search">
                <input type="text"
                       :placeholder="$t('search')"
                       v-model="keyword"
                       class="ev-http-client-environment-variable-tree-view__search__input">

                <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>

                <div class="ev-http-client-environment-variable-tree-view__search__cancel"
                     @click="keyword = ''">
                    <ev-cancel-icon></ev-cancel-icon>
                </div>
            </div>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-http-client-environment-add-button @add-group="handleAddGroup"
                                                   @add-environment="emitAddEnvironment"></ev-http-client-environment-add-button>
        </div>

        <div class="ev-http-client-environment-variable-tree-view__scroll-wrapper" @scroll="emitScrollEvent">
            <draggable v-model="groups"
                       handle=".ev-http-client-environment-variable-tree-view-group__wrapper"
                       animation="200"
                       style="width: 100%">
                <ev-http-client-environment-variable-tree-view-group v-for="group in groups"
                                                                     :group="group"
                                                                     @add-variable="emitAddVariable"></ev-http-client-environment-variable-tree-view-group>
            </draggable>
        </div>
    </div>
</template>

<script>
    import EvHttpClientEnvironmentAddButton from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentAddButton'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHttpClientEnvironmentVariableTreeViewGroup from '@/views/http-client/components/environment/EvHttpClientEnvironmentVariableTreeViewGroup'
    import GHCEnvironmentVariableGroup from '@/data/gotcha/http-operation/environment/GHCEnvironmentVariableGroup'
    import draggable from 'vuedraggable'
    import EvCancelIcon from '@/views/http-client/components/multipart-form-editor/ev-cancel-icon'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin.vue'
    import EvContextMenu from '@/components/menu/EvContextMenu.vue'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem.vue'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider.vue'

    export default {
        name: "EvHttpClientEnvironmentVariableTreeView",

        components: {
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
            EvCancelIcon,
            EvHttpClientEnvironmentVariableTreeViewGroup,
            EvVerticalGutter,
            EvHttpClientEnvironmentAddButton,
            draggable,
        },

        mixins: [
            EvContextMenuMixin
        ],

        created() {
            this.initializeSearch()
        },

        props: {
            currentEnvironments: Object,
        },

        data() {
            return {
                keyword: ''
            }
        },

        watch: {
            keyword(newVal) {
                if (newVal) {
                    this.processSearch(newVal)
                } else {
                    this.initializeSearch()
                }
            },
        },

        computed: {
            groups: {
                get: function () {
                    return this.currentEnvironments.groups
                },
                set: function (groups) {
                    this.currentEnvironments.groups = groups
                },
            },
        },

        methods: {
            processSearch(newVal) {
                this.groups.forEach(group => {
                    group.variables.forEach(variable => {
                        variable.match = variable.name.includes(newVal)
                    })
                })
            },

            initializeSearch() {
                this.groups.forEach(group => {
                    group.variables.forEach(variable => {
                        this.$set(variable, 'match', true)
                    })
                })
            },

            handleAddGroup() {
                let group = new GHCEnvironmentVariableGroup({name: 'New Group'})

                group.expand = true

                this.groups.push(group)
            },

            emitAddEnvironment() {
                this.$emit('add-environment')
            },

            emitAddVariable(group, previousVariable, duplicatedVariable) {
                this.$emit('add-variable', group, previousVariable, duplicatedVariable)
            },

            emitScrollEvent(event) {
                this.$emit('scroll', event)
            },
        },

        i18n: {
            messages: {
                en: {
                    search: "Search"
                },

                zh: {
                    search: "搜索"
                },
                jp: {
                    search: "検索",
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-http-client-environment-variable-tree-view {
        display: flex;

        flex-direction: column;

        height: 100%;

        width: 240px;

        min-height: 1px;

        min-width: 1px;

        background-color: #FAFAFA;

        &__scroll-wrapper {
            height: calc(100% - 32px);

            width: 100%;

            display: flex;

            flex-direction: column;

            min-height: 1px;

            min-width: 1px;

            overflow-y: scroll;
        }

        &__header {
            display: flex;

            align-items: center;

            height: 32px;

            border-bottom: 1px solid #E0E0E0;

            padding-left: 8px;

            padding-right: 18px;
        }

        &__search {
            display: flex;

            align-items: center;

            flex: 1;

            height: 22px;

            background-color: #EAEAEA;

            padding-right: 6px;

            border-radius: 3px;

            &__input {
                display: flex;

                flex: 1;

                height: 22px;

                font-family: "SF Pro", sans-serif;

                font-weight: 500;

                font-size: 11px;

                text-indent: 4px;

                color: $PRIMARY_FONT_COLOR;
            }

            &__cancel {
                @include square(14px, 3px);

                &:hover {
                    background-color: #D8D8D8;
                }
            }
        }

        border-right: 1px solid #E0E0E0;
    }
</style>
