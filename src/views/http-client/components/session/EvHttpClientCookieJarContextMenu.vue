<template>
    <v-menu v-model="showContextMenu" transition="v-fade-transition" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
        <ev-context-menu v-if="isFocusOnCookieJar">
            <ev-context-menu-item @click.stop.native="doAddCookieJarDomain" v-if="isFocusOnCookieJar">{{ $t('newDomain') }}</ev-context-menu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.stop.native="doRenameCookieJar">{{ $t('rename') }}</ev-context-menu-item>

            <!--            <ev-context-menu-item @click.stop.native="">{{ $t('duplicate') }}</ev-context-menu-item>-->

            <ev-context-menu-item @click.stop.native="doRemoveCookieJar" v-if="!isFocusOnDefaultCookieJar">{{ $t('remove') }}</ev-context-menu-item>
        </ev-context-menu>

        <ev-context-menu v-if="isFocusOnCookieJarDomain">
            <ev-context-menu-item @click.stop.native="doAddCookie" v-if="isFocusOnCookieJarDomain">{{ $t('newCookie') }}</ev-context-menu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.stop.native="doRenameCookieJarDomain">{{ $t('rename') }}</ev-context-menu-item>

            <!--            <ev-context-menu-item @click.stop.native="">{{ $t('duplicate') }}</ev-context-menu-item>-->

            <ev-context-menu-item @click.stop.native="doClearCookieJarDomain">{{ $t('clear') }}</ev-context-menu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.stop.native="doRemoveCookieJarDomain" v-if="!isFocusOnDefaultCookieJar">{{ $t('remove') }}</ev-context-menu-item>
        </ev-context-menu>
    </v-menu>
</template>

<script>
    import EvTreeViewNodeMixin from '@/components/api-tree/mixins/EvTreeViewNodeMixin'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvHttpClientCookieJarMixin from '@/views/http-client/components/session/EvHttpClientCookieJarMixin'

    export default {
        name: "EvHttpClientCookieJarContextMenu",

        components: {
            EvContextMenuItem,
            EvContextMenu,
            EvContextMenuDivider
        },

        mixins: [
            EvTreeViewNodeMixin,
            EvContextMenuMixin,
            EvHttpClientCookieJarMixin
        ],

        props: {
            selectedCookieJar: Object,

            selectedCookieJarDomain: Object,
        },

        computed: {
            isFocusOnCookieJar() {
                return this.selectedCookieJar && !this.selectedCookieJarDomain
            },

            isFocusOnDefaultCookieJar() {
                return this.selectedCookieJar && this.selectedCookieJar.default && !this.selectedCookieJarDomain
            },

            isFocusOnCookieJarDomain() {
                return this.selectedCookieJar && this.selectedCookieJarDomain
            }
        },

        methods: {
            doAddCookie() {
                this.showContextMenu = false

                this.$emit('add-cookie', this.selectedCookieJarDomain)
            },

            doAddCookieJar() {
                this.showContextMenu = false
            },

            doAddCookieJarDomain() {
                this.showContextMenu = false

                this.$emit('add-cookie-jar-domain', this.selectedCookieJar)
            },


            doRenameCookieJar() {
                this.showContextMenu = false

                this.$emit('rename-cookie-jar', this.selectedCookieJar)
            },

            doClearCookieJar() {
                this.showContextMenu = false

                this.$emit('clear-cookie-jar', this.selectedCookieJar)
            },

            doRenameCookieJarDomain() {
                this.showContextMenu = false

                this.$emit('rename-cookie-jar-domain', this.selectedCookieJar, this.selectedCookieJarDomain)
            },

            doClearCookieJarDomain() {
                this.showContextMenu = false

                this.$emit('clear-cookie-jar-domain', this.selectedCookieJarDomain)
            },

            doRemoveCookieJar() {
                this.showContextMenu = false

                this.$emit('remove-cookie-jar', this.selectedCookieJar)
            },

            doRemoveCookieJarDomain() {
                this.showContextMenu = false

                this.$emit('remove-cookie-jar-domain', this.selectedCookieJarDomain)
            },

            doRename() {
                this.showContextMenu = false

                if (this.selectedCookieJar) {
                    this.emitRenameCookieJar(this.selectedCookieJar)
                }

                if (this.selectedCookieJarDomain) {
                    this.emitRenameCookieJarDomain(this.selectedCookieJar, this.selectedCookieJarDomain)
                }
            },

            doCopy() {
                this.showContextMenu = false

                if (this.selectedCookieJar) {
                    this.emitCopyCookieJar(this.selectedCookieJar)
                }

                if (this.selectedCookieJarDomain) {
                    this.emitCopyCookieJarDomain(this.selectedCookieJar, this.selectedCookieJarDomain)
                }
            },

            doMove() {
                this.showContextMenu = false

                if (this.selectedCookieJar) {
                    this.emitMoveCookieJar(this.selectedCookieJar)
                }

                if (this.selectedCookieJarDomain) {
                    this.emitMoveCookieJarDomain(this.selectedCookieJar, this.selectedCookieJarDomain)
                }
            },

            doPaste() {
                this.showContextMenu = false

                if (this.selectedCookieJar) {
                    this.emitRenameCookieJar(this.selectedCookieJar)
                }

                if (this.selectedCookieJarDomain) {
                    this.emitRenameCookieJarDomain(this.selectedCookieJar, this.selectedCookieJarDomain)
                }
            },

            doClear() {

            },

            doRemove() {
                this.showContextMenu = false

                if (this.selectedCookieJar) {
                    this.emitRenameCookieJar(this.selectedCookieJar)
                }

                if (this.selectedCookieJarDomain) {
                    this.emitRenameCookieJarDomain(this.selectedCookieJar, this.selectedCookieJarDomain)
                }
            },

            show(event) {
                this.doShowContextMenu(event)
            },

            hide(event) {
                this.doHideContextMenu()
            }
        },

        i18n: {
            messages: {
                en: {
                    newDomain: "New Domain",

                    newCookie: "New Cookie",

                    clear: "Clear",

                    duplicate: "Duplicate",

                    remove: "Remove",

                    rename: "Rename",
                },
                zh: {
                    newDomain: "添加域名",

                    newCookie: "添加 Cookie",

                    clear: "清空",

                    duplicate: "克隆",

                    remove: "删除",

                    rename: "重命名",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>
