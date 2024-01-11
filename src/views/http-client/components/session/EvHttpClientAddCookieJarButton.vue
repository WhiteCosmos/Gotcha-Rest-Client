<template>
    <div class="ev-http-client-add-cookie-jar-button">
        <ev-http-client-add-variable-icon></ev-http-client-add-variable-icon>
    </div>
</template>

<script>
    import EvHttpClientAddVariableIcon from '@/views/http-client/components/environment/modal/EvHttpClientAddVariableIcon'
    import EvPopupMenu from '@/components/menu/EvPopupMenu'
    import EvMenuTopIndicator from '@/components/json-editor-vsl/icons/ev-menu-top-indicator'
    import EvPopupMenuItem from '@/components/menu/EvPopupMenuItem'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'

    export default {
        name: "EvHttpClientAddCookieJarButton",

        components: {
            EvContextMenuItem,
            EvPopupMenuDivider,
            EvPopupMenuItem,
            EvMenuTopIndicator,
            EvPopupMenu,
            EvHttpClientAddVariableIcon
        },

        i18n: {
            messages: {
                en: {
                    addCookieJar: "New Cookie Jar",

                    addCookie: "New Cookie",
                },
                zh: {
                    addCookieJar: "添加 Cookie 罐",

                    addCookie: "添加 Cookie",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-add-cookie-jar-button {
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
