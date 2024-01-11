<template>
    <div class="ev-app-manager-panel">
        <v-dialog v-model="showServerManager"
                  v-bind="modal_config_960">
            <template v-slot:activator="{ on, attrs }">
                <div class="ev-icon-wrapper" v-bind="attrs" v-on="on">
                    <ev-server-icon></ev-server-icon>
                </div>
            </template>
            <ev-server-manager
                v-hotkey="hotkeys"
                @close="closeDialog(managers.showServerManager)"></ev-server-manager>
        </v-dialog>

        <ev-vertical-divider></ev-vertical-divider>

        <v-dialog v-model="showEnvironmentManager"
                  v-bind="modal_config_960">
            <template v-slot:activator="{ on, attrs }">
                <div class="ev-icon-wrapper" v-bind="attrs" v-on="on">
                    <ev-environment-variable-icon color="#555"></ev-environment-variable-icon>
                </div>
            </template>

            <ev-http-client-environment-manager v-hotkey="hotkeys"
                                                :current-environments="currentEnvironments"
                                                :global-variables="globalVariables"
                                                :options="{panelType: 'ENVIRONMENT_VARIABLES'}"
                                                :show="showEnvironmentManager"
                                                @close="closeDialog(managers.showEnvironmentManager)"></ev-http-client-environment-manager>
        </v-dialog>

        <ev-vertical-divider></ev-vertical-divider>

        <v-dialog v-model="showCookieJarManager"
                  v-bind="modal_config_960">
            <template v-slot:activator="{ on, attrs }">
                <div class="ev-icon-wrapper" v-bind="attrs" v-on="on">
                    <ev-jar-icon color="#555"></ev-jar-icon>
                </div>
            </template>

            <ev-http-client-cookie-jar-manager :cookie-jars='cookieJars'
                                               v-hotkey="hotkeys"
                                               @close="closeDialog(managers.showCookieJarManager)"></ev-http-client-cookie-jar-manager>
        </v-dialog>
    </div>
</template>

<script>
import EvEnvironmentVariableIcon from '@/views/http-client/icon/ev-environment-variable-icon'
import EvJarIcon from '@/views/http-client/icon/ev-jar-icon'
import EvCookieIcon from '@/views/http-client/icon/ev-cookie-icon'
import EvEnvironmentIcon from '@/views/http-client/icon/ev-environment-icon'
import EvVerticalDivider from '@/components/layout/EvVerticalDivider'
import EvLabel from '@/components/typography/EvLabel'
import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
import EvHttpClientEnvironmentManager
    from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentManager'
import EvStoreMixin from '@/mixins/EvStoreMixin'
import EvDialogMixin from '@/mixins/EvDialogMixin'
import EvHttpClientCookieJarManager from '@/views/http-client/components/session/EvHttpClientCookieJarManager'
import EvSchemaIcon from '@/assets/icon/ev-schema-icon'
import EvJsonSchemaManager from '@/modals/json-schema-manager/EvJsonSchemaManager'
import EvServerIcon from '@/views/http-client/icon/ev-server-icon.vue'
import EvServerManager from '@/views/http-client/components/server/EvServerManager.vue'
import {EvAppManagerPanelEventBus, EvAppManagerPanelEvents} from '@/views/titlebar/EvAppManagerPanelEventBus'

export default {
    name: "EvAppManagerPanel",

    components: {
        EvServerManager,
        EvServerIcon,
        EvJsonSchemaManager,
        EvSchemaIcon,
        EvHttpClientCookieJarManager,
        EvHttpClientEnvironmentManager,
        EvEnvironmentVariableIcon,
            EvJarIcon,
            EvCookieIcon,
            EvEnvironmentIcon,
            EvVerticalDivider,
            EvLabel,
            EvVerticalGutter,
        },

        mixins: [
            EvStoreMixin,
            EvDialogMixin,
        ],

        created() {
            EvAppManagerPanelEventBus.$on(EvAppManagerPanelEvents.OPEN_SERVER_MANAGER, this.handleOpenServerManager)
        },

        beforeDestroy() {
            EvAppManagerPanelEventBus.$off(EvAppManagerPanelEvents.OPEN_SERVER_MANAGER, this.handleOpenServerManager)
        },

        computed: {
            globalVariables: {
                get: function () {
                    if (!this.currentProject) {
                        return []
                    }

                    if (!this.currentProject.globalVariables) {
                        this.$set(this.currentProject, 'globalVariables', []) // TODO 新增属性统一初始化位置
                    }

                    return this.currentProject.globalVariables
                },
                set: function (variables) {
                    this.currentProject && (this.currentProject.globalVariables = variables)
                },
            },

            cookieJars() {
                if (this.currentCookieJars) {
                    return this.currentCookieJars.cookieJars
                } else {
                    return []
                }
            },

            hotkeys() {
                return {
                    'esc': this.closeAllDialogs
                }
            },
        },

        data() {
            return {
                showFirstModal: false,

                showSecondModal: false,

                showThirdModal: false,

                showJsonSchemaManager: false,

                showServerManager: false,

                showEnvironmentManager: false,

                showCookieJarManager: false,

                managers: {
                    showJsonSchemaManager: "showJsonSchemaManager",

                    showServerManager: "showServerManager",

                    showEnvironmentManager: "showEnvironmentManager",

                    showCookieJarManager: "showCookieJarManager",
                }
            }
        },

        methods: {
            openDialog(dialog) {
                this[dialog] = true
            },

            closeDialog(dialog) {
                this[dialog] = false
            },

            closeAllDialogs() {
                for (const dialog in this.managers) {
                    this[dialog] = false
                }
            },

            handleOpenServerManager() {
                this.showServerManager = true
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-app-manager-panel {
        display: flex;

        align-items: center;

        width: fit-content;

        height: 28px;

        user-select: none;

        @include component-shadow;

        @include white-background-gradient;

        border-radius: 5px;
    }

    .ev-icon-wrapper {
        @include full-center;

        width: 32px;

        height: 28px;

        cursor: default; // 避免出现光标闪烁
    }
</style>
