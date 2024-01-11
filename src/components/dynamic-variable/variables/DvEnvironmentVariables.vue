<template>
    <v-menu v-model="showPopupMenu" v-bind="menuConfig">
        <template v-slot:activator="{ on }">
            <div class="dv-wrapper">
                <div class="dv-header">
                    <ev-label size="11" bold secondary>{{ currentEnvironmentName }}</ev-label>
                </div>

                <div class="dv-divider"></div>

                <div class="dv-container" v-on="on">
                    <ev-label size="11" bold primary>{{ variable ? variable.name : '' }}</ev-label>

                    <v-spacer></v-spacer>

                    <select-icon></select-icon>
                </div>
            </div>
        </template>

        <dv-environment-variables-menu
            :selected-variable="variable"
            @select-variable="handleSelectVariable"></dv-environment-variables-menu>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import SelectIcon from '@/components/icon/select-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import DvEnvironmentVariablesMenu from '@/components/dynamic-variable/variables/DvEnvironmentVariablesMenu'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'

    export default {
        name: "DvEnvironmentVariables",

        components: {
            DvEnvironmentVariablesMenu,
            EvVerticalGutter,
            SelectIcon,
            EvLabel
        },

        mixins: [
            EvStoreMixin,
            EvDataBindMixin,
        ],

        created() {
            AppEventBus.$on(AppEvents.SHOW_CONTEXT_MENU, this.hide)
        },

        beforeDestroy() {
            AppEventBus.$off(AppEvents.SHOW_CONTEXT_MENU, this.hide)
        },

        data() {
            return {
                showPopupMenu: false,
            }
        },

        computed: {
            variable() {
                return this.value_.variable
            },

            currentEnvironmentName() {
                if (this.currentEnvironment) {
                    return this.currentEnvironment.name
                } else {
                    return ''
                }
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
