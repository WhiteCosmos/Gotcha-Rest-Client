<template>
    <div class="ev-project-config-sidebar">
        <div class="ev-menu-item" :class="{'ev-menu-item--active': currentMenu === menus.projectInfo}"
             @click="doSelectMenu(menus.projectInfo)">
            <div class="ev-icon-wrapper">
                <v-icon size="14">fa-circle-info</v-icon>
            </div>

            <ev-label size="13" medium secondary>{{ $t('projectInfo') }}</ev-label>
        </div>

        <!--        <div class="ev-menu-item" :class="{'ev-menu-item&#45;&#45;active': currentMenu === menus.uxSettings}"-->
        <!--             @click="doSelectMenu(menus.uxSettings)">-->
        <!--            <div class="ev-icon-wrapper">-->
        <!--                <v-icon size="14">fa-ghost</v-icon>-->
        <!--            </div>-->

        <!--            <ev-label size="13" medium secondary>{{ $t('uxSettings') }}</ev-label>-->
        <!--        </div>-->

        <div class="ev-menu-item" :class="{'ev-menu-item--active': currentMenu === menus.globalTemplate}"
             @click="doSelectMenu(menus.globalTemplate)">
            <div class="ev-icon-wrapper">
                <v-icon size="14">fa-tag</v-icon>
            </div>

            <ev-label size="13" medium secondary>{{ $t('globalTemplate') }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'

    export default {
        name: "EvProjectConfigSidebar",

        components: {
            EvVerticalGutter,
            EvLabel
        },

        data() {
            return {
                currentMenu: "PROJECT_INFO",

                menus: {
                    projectInfo: "PROJECT_INFO",

                    uxSettings: "UX_SETTINGS",

                    globalTemplate: "GLOBAL_TEMPLATE"
                }
            }
        },

        computed: {
            menuStyle() {

            },
        },

        methods: {
            doSelectMenu(menu) {
                this.currentMenu = menu

                this.$emit('select', menu)
            },
        },

        i18n: {
            messages: {
                en: {
                    projectInfo: "Project Info",

                    uxSettings: "UX Settings",

                    globalTemplate: "Global Template"

                },
                zh: {
                    projectInfo: "项目信息",

                    uxSettings: "交互设置",

                    globalTemplate: "全局模板"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-config-sidebar {
        display: flex;

        flex-direction: column;

        width: 240px;

        height: 100%;

        background: #FAFAFA;

        border-right: 1px solid #F1F1F1;

        padding-top: 12px;

        //padding-left: 12px;
    }

    .ev-menu-item {
        display: flex;

        align-items: center;

        height: 32px;

        margin-left: 8px;

        margin-right: 8px;

        margin-bottom: 8px;

        &--active {
            border-radius: 3px;

            background-color: #F1F1F1;
        }
    }

    .ev-icon-wrapper {
        @include full-center;

        width: 40px;

        height: 40px;
    }
</style>
