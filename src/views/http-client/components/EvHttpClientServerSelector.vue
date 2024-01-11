<template>
    <v-menu v-bind="menu_config">
        <template v-slot:activator="{ on }">
            <div class="ev-http-client-server-selector" v-on="on">
                <div class="ev-http-client-server-selector__environment-container">
                    <ev-label size="11" bold secondary v-if="!server">-</ev-label>

                    <ev-dot-tag v-if="server && server.isBindEnvironment === 'CHECKED'" green></ev-dot-tag>

                    <ev-dot-tag v-if="server && server.isBindEnvironment === 'UNCHECKED'" grey></ev-dot-tag>
                </div>

                <div class="ev-http-client-server-selector__server-container">
                    <ev-label size="11" secondary bold>{{ server ? serverName : $t('hint') }}</ev-label>
                </div>

                <select-icon></select-icon>
            </div>
        </template>

        <div class="ev-http-client-server-selector__menu">
            <div class="ev-http-client-server-selector__menu-item" v-for="server in servers" @click="doSelectServer(server)">
                <div class="ev-http-client-server-selector__environment-container">
                    <ev-dot-tag v-if="server.isBindEnvironment === 'CHECKED'" green></ev-dot-tag>

                    <ev-dot-tag v-if="server.isBindEnvironment === 'UNCHECKED'" grey></ev-dot-tag>
                </div>

                <div class="ev-http-client-server-selector__server-container">
                    <ev-label size="11" secondary bold>{{ getServerName(server) }}</ev-label>
                </div>
            </div>

            <div style="display: flex; align-items: center; height: 28px;" v-if="servers.length === 0">
                <div class="ev-label-wrapper">
                    <ev-label size="11" bold grey>{{ $t('noServer') }}</ev-label>
                </div>
            </div>

            <div class="ev-http-client-server-selector__option-item">
                <div class="ev-label-wrapper" @click="doEditServer">
                    <ev-label size="11" bold secondary>{{ $t('editServer') }}</ev-label>
                </div>

                <ev-horizon-divider></ev-horizon-divider>

                <div class="ev-label-wrapper" @click="doRemoveServer">
                    <ev-label size="11" bold secondary>{{ $t('clearServer') }}</ev-label>
                </div>
            </div>
        </div>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvSelector from '@/components/selector/EvSelector.vue'
    import EvDialogMixin from '@/mixins/EvDialogMixin.vue'
    import EvVerticalDivider from '@/components/layout/EvVerticalDivider.vue'
    import EvStoreMixin from '@/mixins/EvStoreMixin.vue'
    import EvDotTag from '@/components/tag/EvDotTag.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvIconWrapper from '@/components/layout/EvIconWrapper.vue'
    import EvEditIcon from '@/components/icon/ev-edit-icon.vue'
    import SelectIcon from '@/components/icon/select-icon.vue'
    import {EvAppManagerPanelEventBus, EvAppManagerPanelEvents} from '@/views/titlebar/EvAppManagerPanelEventBus'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider.vue'

    export default {
        name: "EvHttpClientServerSelector",

        components: {
            EvHorizonDivider,
            SelectIcon,
            EvEditIcon,
            EvIconWrapper,
            EvVerticalGutter,
            EvDotTag,
            EvVerticalDivider,
            EvSelector,
            EvLabel
        },

        mixins: [
            EvDialogMixin,
            EvStoreMixin,
        ],

        props: {
            httpRequest: Object
        },

        data() {
            return {}
        },

        computed: {
            servers() {
                let project = this.currentProject

                if (project) {
                    return project.servers
                } else {
                    return []
                }
            },

            hasServer() {
                if (!this.servers) {
                    return false
                }

                let server = this.servers.find(it => {
                    return it.uid === this.httpRequest.serverId
                })

                if (server) {
                    return true
                } else {
                    this.httpRequest.serverId = undefined

                    return false
                }
            },

            server() {
                if (this.hasServer) {
                    return this.servers.find(it => {
                        return it.uid === this.httpRequest.serverId
                    })
                } else {
                    return undefined
                }
            },

            serverName() {
                return this.getServerName(this.server)
            },
        },

        methods: {
            doSelectServer(server) {
                this.httpRequest.serverId = server.uid
            },

            doRemoveServer() {
                this.httpRequest.serverId = undefined
            },

            doEditServer() {
                EvAppManagerPanelEventBus.$emit(EvAppManagerPanelEvents.OPEN_SERVER_MANAGER)
            },

            getServerName(server) {
                if (!server) {
                    return '-'
                }

                if (!_.isEmpty(server.name)) {
                    return server.name
                } else {
                    return "Noname"
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    hint: "Click to select a server",

                    noServer: "No Server",

                    clearServer: "Clear",

                    editServer: "Manage",
                },
                zh: {
                    hint: "点击选择服务器",

                    noServer: "没有服务器",

                    clearServer: "清除选择",

                    editServer: "管理服务",
                },
                jp: {
                    hint: "クリックしてサーバーを選択",

                    noServer: "サーバーがありません",

                    clearServer: "選択をクリア",
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-server-selector {
        display: flex;

        align-items: center;

        height: 20px;

        width: 240px;

        //@include white-background-gradient;

        background-color: #F5F5F5;

        border-radius: 2px;

        padding-right: 8px;

        &__environment-container {
            display: flex;

            align-items: center;

            justify-content: center;

            width: 20px;

            padding-left: 8px;

            //padding-right: 8px;

            //border-right: 1px solid #E0E0E0;
        }

        &__server-container {
            display: flex;

            align-items: center;

            flex: 1;

            padding-left: 8px;

            //background-color: #FF8282;
        }

        &__menu {
            background-color: #FAFAFA;
        }

        &__menu-item {
            display: flex;

            align-items: center;

            height: 28px;

            &:hover {
                background-color: #F1F1F1;
            }
        }

        &__option-item {
            display: flex;

            flex-direction: column;

            align-items: center;
        }
    }

    .ev-label-wrapper {
        display: flex;

        align-items: center;

        justify-content: center;

        width: 100%;

        height: 28px;

        border-top: 1px solid #EAEAEA;

        &:hover {
            background-color: #F1F1F1;
        }
    }
</style>
