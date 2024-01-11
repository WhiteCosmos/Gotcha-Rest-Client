<template>
    <v-menu v-model="showPopupMenu" v-bind="menuConfig">
        <template v-slot:activator="{ on }">
            <div class="dv-wrapper" v-on="on">
                <div class="dv-header">
                    <ev-label size="11" bold secondary>{{ label }}</ev-label>
                </div>

                <div class="dv-divider"></div>

                <div class="dv-container">
                    <ev-label size="11" bold primary v-if="item">{{ item.key }}</ev-label>

                    <ev-label size="11" bold grey v-else>{{ $t('empty') }}</ev-label>

                    <v-spacer></v-spacer>

                    <select-icon></select-icon>
                </div>
            </div>
        </template>

        <dv-menu :items="items" name="key" @select="handleSelectItem"></dv-menu>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import SelectIcon from '@/components/icon/select-icon'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvHttpClientRequestMixin from '@/views/http-client/request/EvHttpClientRequestMixin'
    import DvMenu from '@/components/dynamic-variable/components/DvMenu'

    export default {
        name: "DvParameterReference",

        components: {
            DvMenu,
            SelectIcon,
            EvLabel
        },

        mixins: [
            EvHttpClientRequestMixin,
            EvDataBindMixin,
        ],

        created() {
            AppEventBus.$on(AppEvents.SHOW_CONTEXT_MENU, this.hide)
        },

        beforeDestroy() {
            AppEventBus.$off(AppEvents.SHOW_CONTEXT_MENU, this.hide)
        },

        computed: {
            label() {
                return this.$t(this.value_.position)
            },

            menuConfig() {
                return {
                    'offset-y': true,

                    'close-on-content-click': false,

                    'nudge-bottom': 2,

                    'transition': 'dummy',
                }
            },

            items() {
                if (this.value_.position === 'header') {
                    return this.headers
                }

                if (this.value_.position === 'path') {
                    return this.pathParameters
                }

                if (this.value_.position === 'query') {
                    return this.queryParameters
                }
            },

            item() {
                let items = []

                if (this.value_.position === 'header') {
                    items = this.headers
                }

                if (this.value_.position === 'path') {
                    items = this.pathParameters
                }

                if (this.value_.position === 'query') {
                    items = this.queryParameters
                }

                return this.items.find(it => {
                    if (it.uid) {
                        return it.uid === this.value_.uid
                    } else {
                        return it.key === this.value_.key
                    }
                })
            },
        },

        data() {
            return {
                showPopupMenu: false
            }
        },

        methods: {
            handleSelectItem(item) {
                this.showPopupMenu = false

                this.value_.uid = item.uid

                this.value_.key = item.key
            },

            hide() {
                this.showPopupMenu = false
            },
        },

        i18n: {
            messages: {
                en: {
                    header: "Header",

                    path: "Path",

                    query: "Query",
                },
                zh: {
                    header: "请求头部",

                    path: "路径参数",

                    query: "查询参数",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../DynamicVariable";

</style>
