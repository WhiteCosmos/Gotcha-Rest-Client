<template>
    <v-menu v-model="showPopupMenu" v-bind="menuConfig">
        <template v-slot:activator="{ on }">
            <div class="dv-wrapper" v-on="on">
                <div class="dv-header">
                    <ev-label size="11" bold secondary>{{ $t('label') }}</ev-label>
                </div>

                <div class="dv-divider"></div>

                <div class="dv-container">
                    <ev-label size="11" bold primary>{{ value_.target }}</ev-label>
                </div>
            </div>
        </template>

        <dv-encoding-menu :value="value_"></dv-encoding-menu>
    </v-menu>
</template>

<script>
    import DvEncodingMenu from '@/components/dynamic-variable/encoding/DvEncodingMenu'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import SelectIcon from '@/components/icon/select-icon'
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "DvEncoding",

        components: {
            EvLabel,
            SelectIcon,
            DvEncodingMenu
        },

        mixins: [
            EvDataBindMixin,
            EvDialogMixin,
        ],

        props: {},

        data() {
            return {
                showPopupMenu: false
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
        },

        i18n: {
            messages: {
                en: {
                    label: "Encoding"
                },

                zh: {
                    label: "编码解码"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../DynamicVariable";

</style>
