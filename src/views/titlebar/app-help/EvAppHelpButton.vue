<template>
    <v-menu v-model="showPopupMenu" v-bind="menuConfig" offset-y>
        <template v-slot:activator="{ on, attrs }">
            <ev-tool-button>
                <div class="ev-label-wrapper" v-on="on">
                    <ev-label size="13" medium primary>?</ev-label>
                </div>
            </ev-tool-button>
        </template>

        <ev-context-menu>
            <ev-context-menu-item @click.native="doVisitTutorial">{{ $t('visitTutorial') }}</ev-context-menu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.native="doSendFeedback">{{ $t('sendFeedback') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="">发送邮件</ev-context-menu-item>

            <ev-context-menu-item @click.native="">{{ $t('contactAuthor') }}</ev-context-menu-item>
        </ev-context-menu>
    </v-menu>
</template>

<script>
    import EvContextMenu from '@/components/menu/EvContextMenu.vue'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem.vue'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider.vue'
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvToolButton from '@/components/button/EvToolButton.vue'


    let shell = require('electron').shell

    export default {
        name: "EvAppHelpButton",
        components: {EvToolButton, EvLabel, EvContextMenuDivider, EvContextMenuItem, EvContextMenu},

        data() {
            return {
                showPopupMenu: false
            }
        },

        computed: {
            menuConfig() {
                return {
                    'nudge-bottom': 3,

                    transition: "dummy"
                }
            },
        },

        methods: {
            doSendFeedback() {
                shell.openExternal('https://github.com/WhiteCosmos/Gotcha-HTTP-Client-Support/issues')
            },

            doVisitTutorial() {
                shell.openExternal('https://github.com/WhiteCosmos/Gotcha-HTTP-Client-Support')
            },

            doContactAuthor() {

            },
        },

        i18n: {
            messages: {
                en: {
                    sendFeedback: "Bug Report",

                    visitTutorial: "See Tutorial",

                    contactAuthor: "Contact Author"
                },
                zh: {
                    sendFeedback: "反馈问题",

                    visitTutorial: "查看教程",

                    contactAuthor: "联系作者"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";


    .ev-label-wrapper {
        @include full-center;

        width: 18px;

        height: 18px;

        border-radius: 14px;

        border: 1px solid #555;

        padding-bottom: 0px;
    }
</style>
