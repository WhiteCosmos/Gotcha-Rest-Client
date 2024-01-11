<template>
    <div class="ev-http-client-environment-manager">
        <div class="ev-http-client-environment-manager__navigator">
            <div style="position:absolute; left: 12px">
                <ev-circle-close-button @click.native="doClose"></ev-circle-close-button>
            </div>

            <ev-slide-switcher @select="handleSelectItem"
                               class="ev-http-client-environment-manager__switcher"
                               :options="options"></ev-slide-switcher>
        </div>

        <div class="ev-http-client-environment-manager__content" v-show="showGlobalVariables">
            <ev-http-client-global-variable-manager :global-variables="globalVariables"></ev-http-client-global-variable-manager>
        </div>

        <div class="ev-http-client-environment-manager__content" v-show="showEnvironmentVariables">
            <!-- Groups -->

            <ev-http-client-environment-variable-tree-view :current-environments="currentEnvironments"
                                                           @add-variable="handleAddVariable"
                                                           @add-environment="handleAddEnvironment"
                                                           @scroll="handleScrollOnVariables"></ev-http-client-environment-variable-tree-view>

            <ev-http-client-environment-container ref="ev-http-client-environment-container"
                                                  :environments="environments"
                                                  :groups="groups"
                                                  @update-environments="handleUpdateEnvironments"
                                                  @show-context-menu="handleShowContextMenu"></ev-http-client-environment-container>

            <v-menu v-model="showContextMenu" transition="dummy" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
                <ev-context-menu>
                    <ev-context-menu-item @click.native="handleRenameEnvironment">{{ $t('EvContextMenu.rename') }}</ev-context-menu-item>

                    <ev-context-menu-item @click.native="handleDuplicateEnvironment">{{ $t('duplicate') }}</ev-context-menu-item>

                    <ev-context-menu-divider></ev-context-menu-divider>

                    <ev-context-menu-item @click.native="handleRemoveEnvironment">{{ $t('remove') }}</ev-context-menu-item>
                </ev-context-menu>
            </v-menu>
        </div>
    </div>
</template>

<script>
    import EvHttpClientEnvironmentCell from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentCell'
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvPlusIcon from '@/components/icon/ev-plus-icon'
    import EvHttpClientEnvironmentHeaderItem from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentHeaderItem'
    import EvHttpClientAddVariableIcon from '@/views/http-client/components/environment/modal/EvHttpClientAddVariableIcon'
    import EvHttpClientEnvironmentAddButton from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentAddButton'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvHttpClientEnvironmentContainer from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentContainer'
    import EvHttpClientEnvironmentVariableGroupItem from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentVariableGroupItem'
    import EvHttpClientEnvironmentVariableItem from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentVariableItem'
    import draggable from 'vuedraggable'
    import GHCEnvironmentVariableGroup from '@/data/gotcha/http-operation/environment/GHCEnvironmentVariableGroup'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import GHCEnvironmentsHelper from '@/data/gotcha/http-operation/environment/GHCEnvironmentsHelper'

    import _ from 'lodash'
    import GHCEnvironment from '@/data/gotcha/http-operation/environment/GHCEnvironment'
    import GHCEnvironmentVariable from '@/data/gotcha/http-operation/environment/GHCEnvironmentVariable'
    import EvHttpClientGlobalVariableManager from '@/views/http-client/components/environment/modal/EvHttpClientGlobalVariableManager'
    import EvSlideSwitcher from '@/components/form/EvSlideSwitcher'
    import EvHttpClientEnvironmentVariableTreeView from '@/views/http-client/components/environment/EvHttpClientEnvironmentVariableTreeView'
    import {
        EvHttpClientEnvironmentManagerEventBus,
        EvHttpClientEnvironmentManagerEvents
    } from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentManagerEventBus'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import {GHCEnvironmentsEventBus, GHCEnvironmentsEvents} from '@/data/gotcha/http-operation/environment/GHCEnvironmentsEventBus'

    export default {
        name: "EvHttpClientEnvironmentManager",

        components: {
            EvHttpClientEnvironmentVariableTreeView,
            EvSlideSwitcher,
            EvHttpClientGlobalVariableManager,
            EvHttpClientEnvironmentVariableItem,
            EvHttpClientEnvironmentVariableGroupItem,
            EvHttpClientEnvironmentContainer,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
            EvHttpClientEnvironmentAddButton,
            EvHttpClientAddVariableIcon,
            EvHttpClientEnvironmentHeaderItem,
            EvPlusIcon,
            EvVerticalGutter,
            EvLabel,
            EvCircleCloseButton,
            EvHttpClientEnvironmentCell,
            draggable
        },

        mixins: [
            EvContextMenuMixin,
            EvStoreMixin,
        ],

        created() {
            AppEventBus.$on(AppEvents.SHOW_CONTEXT_MENU, (event) => {
                this.showContextMenu = false
            })

            EvHttpClientEnvironmentManagerEventBus.$on(EvHttpClientEnvironmentManagerEvents.ADD_VARIABLE, () => {
                // Done
            })

            EvHttpClientEnvironmentManagerEventBus.$on(EvHttpClientEnvironmentManagerEvents.REMOVE_VARIABLE, (group, variable) => {
                this.handleRemoveVariable(group, variable)
            })

            EvHttpClientEnvironmentManagerEventBus.$on(EvHttpClientEnvironmentManagerEvents.ADD_GROUP, () => {
                // Done
            })

            EvHttpClientEnvironmentManagerEventBus.$on(EvHttpClientEnvironmentManagerEvents.DUPLICATE_GROUP, (group) => {
                this.handleDuplicateGroup(group)
            })

            EvHttpClientEnvironmentManagerEventBus.$on(EvHttpClientEnvironmentManagerEvents.REMOVE_GROUP, (group) => {
                this.handleRemoveGroup(group)
            })

            EvHttpClientEnvironmentManagerEventBus.$on(EvHttpClientEnvironmentManagerEvents.ADD_ENVIRONMENT, () => {

            })

            if (this.options) {
                this.selectedPanel = this.options.panelType
            }
        },

        props: {
            globalVariables: Array,

            options: Object,

            show: Boolean
        },

        computed: {
            showGlobalVariables() {
                return this.selectedPanel === 'GLOBAL_VARIABLES'
            },

            showEnvironmentVariables() {
                return this.selectedPanel === 'ENVIRONMENT_VARIABLES'
            },

            defaultGroup() {
                return this.groups.find(it => {
                    return it.default === true
                })
            },
            groups: {
                get: function () {
                    return this.currentEnvironments.groups
                },
                set: function (groups) {
                    this.currentEnvironments.groups = groups
                },
            },
            environments: {
                get: function () {
                    return this.currentEnvironments.environments
                },
                set: function (environments) {
                    this.currentEnvironments.environments = environments
                },
            },
        },

        data() {
            return {
                focusedVariable: undefined,

                focusedEnvironment: undefined,

                selectedPanel: "ENVIRONMENT_VARIABLES",
            }
        },

        i18n: {
            messages: {
                en: {
                    duplicate: "Duplicate",

                    remove: "Remove",

                },
                zh: {
                    duplicate: "复制环境",

                    remove: "删除环境",
                },
                jp: {
                    duplicate: "環境を複製する",

                    remove: "環境を削除する",
                }
            }
        },

        methods: {
            // Variable Group Operation

            handleSelectItem(item) {
                this.selectedPanel = item.code
            },

            doClose() {
                if (GHCEnvironmentsHelper.checkIsNoEnvironmentSelected(this.currentEnvironments)) {
                    let environment = this.currentEnvironments.environments[0]

                    GHCEnvironmentsHelper.setSelectedEnvironment(this.currentEnvironments, environment)

                    this.setCurrentEnvironment(environment)
                }

                GHCEnvironmentsEventBus.$emit(GHCEnvironmentsEvents.SAVE_ENVIRONMENTS)

                this.$emit('close')
            },

            handleUpdateEnvironments(environments) {
                this.environments = environments
            },

            handleAddEnvironment() {
                let environment = new GHCEnvironment({name: 'New Environment'})

                // Add variables to new environment with same UID

                this.groups.forEach(group => {
                    group.variables.forEach(v => {
                        let variable = new GHCEnvironmentVariable({uid: v.uid, name: v.name})

                        environment.variables.push(variable)
                    })
                })

                this.environments.push(environment)
            },

            handleAddGroup() {
                let group = new GHCEnvironmentVariableGroup({name: 'New Group'})

                this.groups.push(group)
            },

            handleAddVariable(group, previousVariable, duplicatedVariable) {
                let variables = group.variables

                if (duplicatedVariable) {
                    this.environments.forEach(env => {
                        let result = env.variables.find(it => {
                            return it.uid === previousVariable.uid
                        })

                        let clonedVariable = _.cloneDeep(result)

                        clonedVariable.uid = duplicatedVariable.uid

                        let index = variables.indexOf(previousVariable)

                        env.variables.splice(index + 1, 0, clonedVariable)
                    })

                    let index = variables.indexOf(previousVariable)

                    variables.splice(index + 1, 0, duplicatedVariable)

                    return
                }

                let variable = new GHCEnvironmentVariable()

                variable.name = "VARIABLE_" + (variables.length + 1)

                if (previousVariable) {
                    let index = variables.indexOf(previousVariable)

                    variables.splice(index + 1, 0, variable)

                    this.environments.forEach(env => {
                        env.variables.splice(index + 1, 0, new GHCEnvironmentVariable({uid: variable.uid}))
                    })
                } else {
                    variables.push(variable)

                    this.environments.forEach(env => {
                        env.variables.push(new GHCEnvironmentVariable({uid: variable.uid}))
                    })
                }
            },

            handleRenameEnvironment() {
                this.$refs['ev-http-client-environment-container'].rename(this.focusedEnvironment)
            },

            handleDuplicateEnvironment() {
                let sourceEnvironment = this.focusedEnvironment

                let targetEnvironment = new GHCEnvironment({name: sourceEnvironment.name + ' Copy'})

                sourceEnvironment.variables.forEach(variable => {
                    targetEnvironment.variables.push(
                        new GHCEnvironmentVariable({uid: variable.uid, value: _.cloneDeep(variable.value)}))
                })

                this.environments.splice(this.environments.indexOf(sourceEnvironment) + 1, 0, targetEnvironment)
            },

            handleRemoveEnvironment() {
                let environment = this.focusedEnvironment

                if (!environment) {
                    return
                }

                this.environments.splice(this.environments.indexOf(environment), 1)

                if (_.isEmpty(this.environments)) {
                    GHCEnvironmentsHelper.setSelectedEnvironment(this.currentEnvironments, undefined)

                    this.setCurrentEnvironment(undefined)
                } else {
                    if (GHCEnvironmentsHelper.checkIsSelectedEnvironment(this.currentEnvironments, environment)) {
                        let selectedEnvironment = this.environments[this.environments.length - 1]

                        GHCEnvironmentsHelper.setSelectedEnvironment(this.currentEnvironments, selectedEnvironment)

                        this.setCurrentEnvironment(selectedEnvironment)
                    }
                }
            },

            handleDuplicateGroup(group) {
                let clonedGroup = new GHCEnvironmentVariableGroup({
                    name: group.name
                })

                let clonedVariables = []

                group.variables.forEach(variable => {
                    let clonedVariable = new GHCEnvironmentVariable({
                        name: variable.name,
                        value: variable.value
                    })

                    this.environments.forEach(env => {
                        let sv = env.variables.find(it => {
                            return it.uid === variable.uid
                        })

                        if (sv) {
                            let tv = new GHCEnvironmentVariable({
                                uid: clonedVariable.uid,
                                name: variable.name,
                                value: sv.value
                            })

                            env.variables.push(tv)
                        }
                    })

                    clonedVariables.push(clonedVariable)
                })

                clonedGroup.variables.push(...clonedVariables)

                this.groups.splice(this.groups.indexOf(group) + 1, 0, clonedGroup)
            },

            handleRemoveGroup(group) {
                if (group.default) {
                    return
                }

                // Move all variables to default group
                this.defaultGroup.variables.push(...group.variables)

                this.groups.splice(this.groups.indexOf(group), 1)
            },

            handleRemoveVariable(group, variable) {
                let index = group.variables.indexOf(variable)

                group.variables.splice(index, 1)

                this.environments.forEach(env => {
                    let v_ = env.variables.find(v => {
                        return v.uid === variable.uid
                    })

                    v_ && env.variables.splice(env.variables.indexOf(v_), 1)
                })
            },

            handleShowContextMenu(environment, event) {
                this.focusedEnvironment = environment

                this.doShowContextMenu(event)
            },

            handleScrollOnVariables(event) {
                let container = this.$refs['ev-http-client-environment-container']

                container.scrollTo(event.target.scrollTop)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-http-client-environment-manager {
        display: flex;

        flex-direction: column;

        overflow: hidden;

        background-color: #FCFCFC;

        width: 960px;

        height: 640px;

        user-select: none;

        &__navigator {
            position: relative;

            display: flex;

            align-items: center;

            justify-content: center;

            width: 100%;

            height: 40px;

            border-bottom: 1px solid $MODAL_DIVIDER_COLOR;

            background-color: $MODAL_TITLE_COLOR;
        }

        &__switcher {
            @include component-shadow;
        }

        &__content {
            display: flex;

            height: calc(100% - 40px);
        }

        &__sidebar {
            display: flex;

            flex-direction: column;

            width: 200px;

            height: 100%;

            border-right: 1px solid #E0E0E0;

            background-color: #F5F5F5;

            // Scroll Bar

            ::-webkit-scrollbar {
                width: 14px;

                border-left: 1px solid #E0E0E0;

                background-color: #F1F1F1;
            }

            ::-webkit-scrollbar-thumb {
                border-left: 4px solid transparent;
                border-top: 3px solid transparent;
                border-bottom: 3px solid transparent;
                border-right: 3px solid transparent;
                //border: 4px solid rgba(0, 0, 0, 0);
                background-clip: padding-box;
                -webkit-border-radius: 16px;
                background-color: rgba(0, 0, 0, 0.15);
                //-webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
            }

            ::-webkit-scrollbar-button {
                width: 0;
                height: 0;
                display: none;
            }

            ::-webkit-scrollbar-corner {
                background-color: transparent;
            }

            &__button {
                @include full-center;

                width: 20px;

                height: 20px;

                border-radius: 3px;

                transition: 0.1s;

                &:hover {
                    background-color: #EAEAEA;
                }
            }

            &__wrapper {
                display: flex;

                flex-direction: column;

                min-height: 1px;

                min-width: 1px;

                overflow-y: scroll;

                height: calc(100% - 40px);
            }

            &__panel {
                display: flex;

                align-items: center;

                width: 100%;

                height: 32px;

                padding-left: 12px;

                border-bottom: 1px solid #E0E0E0;
            }
        }
    }

    .ev-http-client-environment-add-button {
        @include full-center;

        width: 20px;

        height: 20px;

        border-radius: 3px;

        transition: 0.1s;

        &:hover {
            background-color: #EAEAEA;
        }
    }
</style>
