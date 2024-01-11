<template>
    <v-menu v-model="show" v-bind="config" offset-y>
        <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" style="cursor: default">
                <ev-tool-button>
                    <ev-plus-icon></ev-plus-icon>
                </ev-tool-button>
            </div>
        </template>

        <ev-context-menu>
            <ev-context-menu-item @click.native="emitAddNewRequest">{{ $t('EvApiTreeViewContextMenu.newRequest') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="emitAddNewGroup">{{ $t('EvApiTreeViewContextMenu.newGroup') }}</ev-context-menu-item>

            <ev-context-menu-divider label=""></ev-context-menu-divider>

            <ev-context-menu-item @click.native="emitImportFromFile">{{ $t('EvApiTreeViewContextMenu.importFromFile') }}</ev-context-menu-item>

            <!--            <ev-context-menu-item @click.native="emitImportFromFile">导入 Java 项目</ev-context-menu-item>-->

            <!--            <ev-context-menu-item @click.native="">Url</ev-context-menu-item>-->

            <!--            <ev-context-menu-item @click.native="">Text</ev-context-menu-item>-->

            <!--            <ev-context-menu-item @click.native="">Insomnia Collection</ev-context-menu-item>-->

            <!--            <ev-context-menu-item @click.native="">Swagger 2.0</ev-context-menu-item>-->

            <!--            <ev-context-menu-item @click.native="">OpenAPI 3.0</ev-context-menu-item>-->
        </ev-context-menu>
    </v-menu>
</template>

<script>
    import EvPlusIcon from '@/components/icon/ev-plus-icon'
    import EvToolButton from '@/components/button/EvToolButton'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvHttpClientLabelDivider from '@/views/http-client/components/EvHttpClientLabelDivider'
    import {EvAppSidebarEventBus, EvAppSidebarEvents} from '@/views/sidebar/EvAppSidebarEventBus'

    export default {
        name: "EvAppSidebarCreateButton",

        components: {
            EvHttpClientLabelDivider,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
            EvToolButton,
            EvPlusIcon
        },

        computed: {
            config() {
                return {
                    'nudge-bottom': 1,

                    transition: 'dummy',
                }
            },
        },

        data() {
            return {
                show: false,
            }
        },

        methods: {
            emitAddNewRequest() {
                this.$emit('new-request')
            },

            emitAddNewGroup() {
                this.$emit('new-group')
            },

            emitImportPostmanCollection() {
                this.$emit('import-postman-collection')
            },

            emitImportFromFile() {
                this.$emit('import-from-file')
                // EvAppSidebarEventBus.$emit(EvAppSidebarEvents.IMPORT_FROM_FILE)
            },

            emitImportFromUrl() {
                this.$emit('import-from-url')
                // EvAppSidebarEventBus.$emit(EvAppSidebarEvents.IMPORT_FROM_URL)
            },

            emitImportFromText() {
                this.$emit('import-from-text')
                // EvAppSidebarEventBus.$emit(EvAppSidebarEvents.IMPORT_FROM_TEXT)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>
