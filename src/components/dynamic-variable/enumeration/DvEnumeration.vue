<template>
    <v-menu v-model="showPopupMenu" v-bind="menuConfig">
        <template v-slot:activator="{ on }">
            <div class="dv-wrapper" v-on="on">
                <div class="dv-header">
                    <ev-label size="11" bold secondary>{{ $t('enum') }}</ev-label>
                </div>

                <div class="dv-divider"></div>

                <div class="dv-container">
                    <ev-label size="11" bold primary v-if="item">{{ item.value }}</ev-label>

                    <ev-label size="11" bold grey v-else>{{ $t('empty') }}</ev-label>

                    <v-spacer></v-spacer>

                    <select-icon></select-icon>
                </div>
            </div>
        </template>

        <dv-enumeration-menu :items="items" @select-item="handleSelectItem"></dv-enumeration-menu>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvSmallSelectIcon from '@/views/http-client/icon/ev-small-select-icon'
    import SelectIcon from '@/components/icon/select-icon'
    import DvEnumerationMenu from '@/components/dynamic-variable/enumeration/DvEnumerationMenu'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import GHCDynamicVariableEnumeration from '@/components/dynamic-variable/enumeration/GHCDynamicVariableEnumeration'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvDialogMixin from '@/mixins/EvDialogMixin.vue'

    export default {
        name: "DvEnumeration",

        components: {
            EvVerticalGutter,
            DvEnumerationMenu,
            SelectIcon,
            EvSmallSelectIcon,
            EvLabel
        },

        mixins: [
            EvDataBindMixin,
            EvDialogMixin,
        ],

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

        i18n: {
            messages: {
                en: {
                    enum: "Enum",

                    empty: "No Value"
                },

                zh: {
                    enum: "枚举",

                    empty: "无"
                }
            }
        },

        computed: {
            menuConfig() {
                return {
                    'offset-y': true,

                    'close-on-content-click': false,

                    'nudge-bottom': 2,

                    'transition': 'dummy',
                }
            },

            item() {
                return this.value_.item
            },

            items() {
                return this.value_.items
            },
        },

        methods: {
            handleSelectItem(item) {
                this.showPopupMenu = false

                this.value_.item = item
            },

            hide() {
                this.showPopupMenu = false
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../DynamicVariable";

    .dv-enumeration {
        display: flex;

        align-items: center;
    }
</style>
