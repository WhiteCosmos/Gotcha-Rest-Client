<template>
    <div class="ev-server-manager">
        <div class="ev-server-manager__navigator">
            <div style="position:absolute; left: 12px">
                <ev-circle-close-button @click.native="doClose"></ev-circle-close-button>
            </div>

            <ev-label size="13" bold primary>{{ $t('title') }}</ev-label>
        </div>

        <div class="ev-server-manager__content">
            <draggable v-model="servers"
                       handle=".ev-server-item-drag-handler"
                       v-bind="dragOptions"
                       class="ev-server-manager__draggable-wrapper">
                <ev-server-item v-for="server in servers"
                                :server="server"
                                @remove="doRemoveServer(server)"></ev-server-item>

                <ev-server-item-placeholder @click.native="doAddServer"></ev-server-item-placeholder>
            </draggable>
        </div>
    </div>
</template>

<script>
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton.vue'
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvServerItem from '@/views/http-client/components/server/EvServerItem.vue'
    import EvServerItemPlaceholder from '@/views/http-client/components/server/EvServerItemPlaceholder.vue'
    import EvStoreMixin from '@/mixins/EvStoreMixin.vue'
    import GHCServer from '@/data/gotcha/GHCServer'
    import draggable from 'vuedraggable'

    export default {
        name: "EvServerManager",

        components: {
            EvServerItemPlaceholder,
            EvServerItem,
            EvLabel,
            EvCircleCloseButton,
            draggable,
        },

        mixins: [
            EvStoreMixin,
        ],

        computed: {
            servers: {
                get() {
                    return this.currentProject.servers
                },

                set(servers) {
                    this.currentProject.servers = servers
                },
            },

            dragOptions() {
                return {
                    animation: 200,
                    direction: 'horizontal',
                    swapThreshold: 1.5,
                    draggable: '.ev-server-item',
                }
            },
        },

        methods: {
            doClose() {
                this.$emit('close')
            },

            doAddServer() {
                this.servers.push(new GHCServer())
            },

            doRemoveServer(server) {
                this.servers.splice(this.servers.indexOf(server), 1)
            },
        },

        i18n: {
            messages: {
                en: {
                    title: "Server Manager"
                },
                zh: {
                    title: "服务器管理"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-server-manager {
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

        &__content {
            display: flex;

            align-content: start;

            height: calc(100% - 40px);

            padding-top: 12px;

            padding-left: 10px;

            flex-wrap: wrap;

            overflow-y: scroll;
        }

        &__draggable-wrapper {
            display: flex;

            align-content: start;

            flex-wrap: wrap;
        }
    }
</style>
