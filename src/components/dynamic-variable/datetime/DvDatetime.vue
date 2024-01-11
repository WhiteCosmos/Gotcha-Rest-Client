<template>
    <v-menu v-model="showPopupMenu" v-bind="menuConfig">
        <template v-slot:activator="{ on }">
            <div class="dv-wrapper" v-on='on'>
                <div class="dv-header">
                    <ev-label size="11" bold secondary>{{ $t('datetime') }}</ev-label>
                </div>

                <div class="dv-divider"></div>

                <!--                <v-menu v-model="showPopupMenu" v-bind="menuConfig">-->
                <!--                    <template v-slot:activator="{ on }">-->
                <div class="dv-container">
                    <ev-label size="11" secondary bold>{{ value_.format }}</ev-label>

                    <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                    <ev-label size="11" v-bind="color(offset['YYYY'])" v-if="offset['YYYY'] !== 0">{{ `${addSymbol(offset['YYYY'])}Y` }}</ev-label>

                    <ev-vertical-gutter :gutter="4" v-if="offset['YYYY'] !== 0"></ev-vertical-gutter>

                    <ev-label size="11" v-bind="color(offset['MM'])" v-if="offset['MM'] !== 0">{{ `${addSymbol(offset['MM'])}M` }}</ev-label>

                    <ev-vertical-gutter :gutter="4" v-if="offset['MM'] !== 0"></ev-vertical-gutter>

                    <ev-label size="11" v-bind="color(offset['DD'])" v-if="offset['DD'] !== 0">{{ `${addSymbol(offset['DD'])}D` }}</ev-label>

                    <ev-vertical-gutter :gutter="4" v-if="offset['DD'] !== 0"></ev-vertical-gutter>

                    <ev-label size="11" v-bind="color(offset['hh'])" v-if="offset['hh'] !== 0">{{ `${addSymbol(offset['hh'])}h` }}</ev-label>

                    <ev-vertical-gutter :gutter="4" v-if="offset['hh'] !== 0"></ev-vertical-gutter>

                    <ev-label size="11" v-bind="color(offset['mm'])" v-if="offset['mm'] !== 0">{{ `${addSymbol(offset['mm'])}m` }}</ev-label>

                    <ev-vertical-gutter :gutter="4" v-if="offset['mm'] !== 0"></ev-vertical-gutter>

                    <ev-label size="11" v-bind="color(offset['ss'])" v-if="offset['ss'] !== 0">{{ `${addSymbol(offset['ss'])}s` }}</ev-label>
                </div>
            </div>
        </template>

        <ev-datetime-menu :value="value_"></ev-datetime-menu>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvCheckbox from '@/components/button/EvCheckbox'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvDatetimeMenu from '@/components/dynamic-variable/datetime/EvDatetimeMenu'
    import GHCDynamicVariableDatetime from '@/components/dynamic-variable/datetime/GHCDynamicVariableDatetime'
    import EvDynamicVariablePreview from '@/components/dynamic-variable/components/EvDynamicVariablePreview'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'

    export default {
        name: "DvDatetime",

        components: {
            EvDynamicVariablePreview,
            EvDatetimeMenu,
            EvVerticalGutter,
            EvCheckbox,
            EvLabel
        },

        mixins: [
            EvDataBindMixin,
        ],

        created() {

        },

        props: {},

        data() {
            return {
                showPopupMenu: false,

                now: "CHECKED",
            }
        },

        i18n: {
            messages: {
                en: {
                    datetime: "DateTime"
                },

                zh: {
                    datetime: "日期时间"
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

            offset() {
                return this.value.offset
            },
        },

        methods: {
            addSymbol(value) {
                return value > 0 ? `+${value}` : value
            },

            color(value) {
                return {
                    red: value < 0,
                    green: value > 0,
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../DynamicVariable";

</style>
