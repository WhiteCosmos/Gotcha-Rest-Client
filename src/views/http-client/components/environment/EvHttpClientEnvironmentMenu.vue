<template>
    <div class="ev-http-client-environment-menu">
        <div class="ev-http-client-environment-menu__title">
            <ev-popup-menu-divider :label="$t('EvHttpClientEnvironmentSelector.environments')"></ev-popup-menu-divider>
        </div>

        <ev-popup-menu-radio-item v-for="env in environments"
                                  name="name"
                                  item-key="uid"
                                  :item="env"
                                  v-model="currentEnvironments.selectedEnvironmentUID"
                                  @click.native="handleSelectEnvironment(env)">{{ env.name }}
        </ev-popup-menu-radio-item>

        <div class="d-flex align-center justify-center" style="height: 28px" v-if="!this.currentEnvironments || environments.length === 0">
            <ev-label size="10" grey>{{ $t('EvHttpClientEnvironmentSelector.empty') }}</ev-label>
        </div>

        <ev-popup-menu-divider></ev-popup-menu-divider>

        <v-dialog v-model="showDialog" width="960" v-bind="modalConfig">
            <template v-slot:activator="{ on, attrs }">
                <div class="ev-http-client-environment-menu__button" v-bind="attrs" v-on="on">
                    <ev-label size="11" secondary bold>{{ $t('EvHttpClientEnvironmentSelector.manage') }}</ev-label>
                </div>
            </template>

            <ev-http-client-environment-manager @close="closeDialog"
                                                v-hotkey="hotkey"
                                                :current-environments="currentEnvironments"
                                                :global-variables="globalVariables"></ev-http-client-environment-manager>
        </v-dialog>
    </div>
</template>

<script>
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCirclePlusIcon from '@/views/http-client/icon/ev-circle-plus-icon'
    import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'
    import EvLabel from '@/components/typography/EvLabel'
    import EvHttpClientEnvironmentManager from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentManager'
    import {GHCEnvironmentsEventBus, GHCEnvironmentsEvents} from '@/data/gotcha/http-operation/environment/GHCEnvironmentsEventBus'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvHttpClientGlobalVariableItem from '@/views/http-client/components/environment/EvHttpClientGlobalVariableItem'
    import EvDialogMixin from '@/mixins/EvDialogMixin'

    export default {
        name: "EvHttpClientEnvironmentMenu",

        components: {
            EvHttpClientGlobalVariableItem,
            EvHttpClientEnvironmentManager,
            EvLabel,
            EvPopupMenuRadioItem,
            EvCirclePlusIcon,
            EvVerticalGutter,
            EvPopupMenuDivider
        },

        mixins: [
            EvStoreMixin,
            EvDialogMixin,
        ],

        computed: {
            environments() {
                if (this.currentEnvironments) {
                    return this.currentEnvironments.environments
                } else {
                    return []
                }
            },
            globalVariables: {
                get: function () {
                    if (!this.currentProject.globalVariables) {
                        this.$set(this.currentProject, 'globalVariables', []) // TODO 新增属性统一初始化位置
                    }

                    return this.currentProject.globalVariables
                },
                set: function (variables) {
                    this.currentProject && (this.currentProject.globalVariables = variables)
                },
            },
        },

        watch: {
            showDialog(newVal) { // Saving on close
                if (newVal) {
                    this.$emit('close')
                } else {
                    GHCEnvironmentsEventBus.$emit(GHCEnvironmentsEvents.SAVE_ENVIRONMENTS)
                }
            },
        },

        methods: {
            handleSelectEnvironment(environment) {
                this.setCurrentEnvironment(environment)

                this.currentEnvironments.selectedEnvironmentUID = environment.uid

                GHCEnvironmentsEventBus.$emit(GHCEnvironmentsEvents.CHANGE_ENVIRONMENT, environment)

                GHCEnvironmentsEventBus.$emit(GHCEnvironmentsEvents.SAVE_ENVIRONMENTS)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-environment-menu {
        display: flex;

        flex-direction: column;

        background-color: #F1F1F1;

        border-radius: 3px;

        max-height: 320px;

        width: 160px;

        &__title {
            display: flex;

            align-items: center;

            width: 100%;

            height: 24px;

            padding: 4px;
        }

        &__button {
            display: flex;

            justify-content: center;

            height: 20px;

            cursor: default;
        }
    }
</style>
