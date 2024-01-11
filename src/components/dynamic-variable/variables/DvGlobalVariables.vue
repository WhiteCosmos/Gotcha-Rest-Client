<template>
    <v-menu v-model="showPopupMenu" v-bind="menuConfig">
        <template v-slot:activator="{ on }">
            <div class="dv-wrapper">
                <div class="dv-header">
                    <ev-label size="11" bold secondary>{{ $t('globalVariables') }}</ev-label>
                </div>

                <div class="dv-divider"></div>

                <div class="dv-container" v-on="on">
                    <ev-label size="11" bold primary>{{ variable ? variable.key : '' }}</ev-label>

                    <v-spacer></v-spacer>

                    <select-icon></select-icon>
                </div>
            </div>
        </template>

        <dv-global-variables-menu
            :selected-variable="variable"
            @select-variable="handleSelectVariable"></dv-global-variables-menu>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import SelectIcon from '@/components/icon/select-icon'
    import DvGlobalVariablesMenu from '@/components/dynamic-variable/variables/DvGlobalVariablesMenu'
    import {AppEventBus, AppEvents} from '@/AppEventBus'

    export default {
        name: "DvGlobalVariables",

        mixins: [
            EvDataBindMixin,
        ],

        components: {
            DvGlobalVariablesMenu,
            SelectIcon,
            EvLabel
        },

        created() {
            AppEventBus.$on(AppEvents.SHOW_CONTEXT_MENU, this.hide)
        },

        beforeDestroy() {
            AppEventBus.$off(AppEvents.SHOW_CONTEXT_MENU, this.hide)
        },

        data() {
            return {
                showPopupMenu: false
            }
        },

        computed: {
            variable() {
                return this.value_.variable
            },

            menuConfig() {
                return {
                    'offset-y': true,

                    'close-on-content-click': true,

                    'nudge-bottom': 2,

                    'transition': 'dummy',
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    globalVariables: "Global"
                },
                zh: {
                    globalVariables: "全局变量"
                }
            }
        },

        methods: {
            handleSelectVariable(variable) {
                this.value_.variable = variable
            },

            hide() {
                this.showPopupMenu = false
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../DynamicVariable";

</style>
