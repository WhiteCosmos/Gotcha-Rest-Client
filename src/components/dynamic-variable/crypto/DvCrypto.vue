<template>
    <v-menu v-model="showPopupMenu" v-bind="menuConfig">
        <template v-slot:activator="{ on }">
            <div class="dv-wrapper" v-on="on">
                <div class="dv-header">
                    <ev-label size="11" bold secondary>{{ $t('name') }}</ev-label>
                </div>

                <div class="dv-divider"></div>

                <div class="dv-container">
                    <ev-label size="11" bold primary>{{ algorithm }}</ev-label>
                </div>
            </div>
        </template>

        <dv-crypto-menu :value="value_"></dv-crypto-menu>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import SelectIcon from '@/components/icon/select-icon'
    import DvCryptoMenu from '@/components/dynamic-variable/crypto/DvCryptoMenu'

    export default {
        name: "DvCrypto",

        components: {
            DvCryptoMenu,
            SelectIcon,
            EvLabel
        },

        mixins: [
            EvDataBindMixin,
            EvDialogMixin,
        ],

        created() {
            // AppEventBus.$on(AppEvents.SHOW_CONTEXT_MENU, () => {
            //     this.showPopupMenu = false
            // })
        },

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

            algorithm() {
                if (this.value_.algorithm === 'md5') {
                    return 'MD5'
                }

                if (this.value_.algorithm === 'sha128') {
                    return 'SHA-128'
                }

                if (this.value_.algorithm === 'sha256') {
                    return 'SHA-256'
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    name: "Hash"
                },
                zh: {
                    name: "哈希"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../DynamicVariable";
</style>
