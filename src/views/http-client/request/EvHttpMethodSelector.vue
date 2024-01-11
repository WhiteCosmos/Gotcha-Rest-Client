<template>
    <v-menu v-bind="selectorMenuConfig" v-model="showHttpMethodSelectorMenu">
        <template v-slot:activator="{ on }">
            <div class="http-method-selector" v-on="on">
                <ev-label size="12" bold :color="color" style="margin-bottom: 1px">{{ httpMethod }}</ev-label>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <select-icon></select-icon>
            </div>
        </template>

        <ev-menu>
            <div v-for="httpMethod in httpMethodsPartA">
                <div class="http-method-item" @click="toggleHttpMethod(httpMethod)">
                    <span class="http-method-selector__label">{{ httpMethod }}</span>
                </div>
            </div>

            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

            <ev-horizon-divider color="#E0E0E0"></ev-horizon-divider>

            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

            <div v-for="httpMethod in httpMethodsPartB">
                <div class="http-method-item" @click="toggleHttpMethod(httpMethod)">
                    <span class="http-method-selector__label">{{ httpMethod }}</span>
                </div>
            </div>

            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

            <ev-horizon-divider color="#E0E0E0"></ev-horizon-divider>

            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

            <div v-for="httpMethod in httpMethodsPartC">
                <div class="http-method-item" @click="toggleHttpMethod(httpMethod)">
                    <span class="http-method-selector__label">{{ httpMethod }}</span>
                </div>
            </div>

            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

            <ev-horizon-divider color="#E0E0E0"></ev-horizon-divider>

            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

            <div v-for="httpMethod in httpMethodsPartD">
                <div class="http-method-item" @click="toggleHttpMethod(httpMethod)">
                    <span class="http-method-selector__label">{{ httpMethod }}</span>
                </div>
            </div>

            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

            <div class="d-flex align-center" style="height: 16px;">
                <span class="xxx-font">{{ $t('customMethod') }}</span>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-horizon-divider color="#E0E0E0"></ev-horizon-divider>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-circle-plus-icon @click.native="doAddCustomHttpMethod"></ev-circle-plus-icon>

                <ev-vertical-gutter :gutter="5"></ev-vertical-gutter>
            </div>

            <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

            <div v-for="(httpMethod, index) in customHttpMethods"
                 class="http-method-item"
                 @click="toggleHttpMethod(httpMethod.name)">
                <ev-editable-label :ref="'custom-http-method-' + index" :size="12" bold v-model="httpMethod.name"
                                   @complete="doUpdateCustomHttpMethods"></ev-editable-label>

                <v-spacer></v-spacer>

                <ev-small-remove-icon @click.native.stop="doRemoveCustomHttpMethod(index)"></ev-small-remove-icon>
            </div>
        </ev-menu>
    </v-menu>

</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import SelectIcon from '@/components/icon/select-icon'
    import EvMenu from '@/components/menu/EvMenu'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvRow from '@/components/layout/EvRow'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvCirclePlusIcon from '@/views/http-client/icon/ev-circle-plus-icon'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvLabel from '@/components/typography/EvLabel'
    import EvDeleteIcon from '@/views/http-client/components/multipart-form-editor/ev-delete-icon'
    import EvSmallRemoveIcon from '@/views/http-client/icon/ev-small-remove-icon'
    import GHCJson from '@/core/json/GHCJson'

    export default {
        name: "EvHttpMethodSelector",

        components: {
            EvSmallRemoveIcon,
            EvDeleteIcon,
            EvLabel,
            EvEditableLabel,
            EvCirclePlusIcon,
            EvRow,
            EvHorizonDivider,
            EvHorizonGutter,
            EvMenu,
            SelectIcon,
            EvVerticalGutter
        },

        mixins: [
            EvContextMenuMixin,
        ],

        model: {
            prop: 'httpMethod',

            event: 'change'
        },

        props: {
            httpMethod: {
                type: String,

                default: 'GET',
            },
        },

        mounted() {
            this.httpMethod_ = this.httpMethod

            this.initializeCustomHttpMethods()
        },

        watch: {
            httpMethod() {
                this.httpMethod_ = this.httpMethod
            }
        },

        data() {
            return {
                httpMethod_: "GET",

                httpMethods: [
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE",
                    "HEAD",
                    "OPTIONS",
                    "TRACE",
                    "PATCH"
                ],

                httpMethodParts: [
                    this.httpMethodsPartA,
                    this.httpMethodsPartB,
                    this.httpMethodsPartC,
                    this.httpMethodsPartD,
                ],

                httpMethodsPartA: [
                    "GET",
                    "HEAD",
                ],

                httpMethodsPartB: [
                    "POST",
                    "PUT",
                    "PATCH",
                ],

                httpMethodsPartC: [
                    "DELETE",
                ],

                httpMethodsPartD: [
                    "OPTIONS",
                    "TRACE",
                ],

                selectorMenuConfig: {
                    'offset-y': true,

                    'close-on-content-click': false,

                    'allow-overflow': true,

                    'content-class': "http-method-selector__menu",

                    'nudge-left': 0,

                    'transition': 'dummy'
                },

                showHttpMethodSelectorMenu: false,

                customHttpMethods: [],
            }
        },

        methods: {
            toggleHttpMethod(httpMethod) {
                this.showHttpMethodSelectorMenu = false

                this.$emit('change', httpMethod)
            },

            async initializeCustomHttpMethods() {
                let text = localStorage.getItem("CustomHttpMethods")

                if (text) {
                    this.customHttpMethods = GHCJson.parse(text)
                }
            },

            doAddCustomHttpMethod() {
                let method = {
                    name: "CUSTOM"
                }

                this.customHttpMethods.push(method)

                this.$nextTick(() => {
                    let label = this.$refs['custom-http-method-' + (this.customHttpMethods.length - 1)][0]

                    label && label.enableEditing()
                })
            },

            doRemoveCustomHttpMethod(index) {
                this.customHttpMethods.splice(index, 1)

                localStorage.setItem("CustomHttpMethods", JSON.stringify(this.customHttpMethods))
            },

            doUpdateCustomHttpMethods() {
                this.showHttpMethodSelectorMenu = false

                let method = this.customHttpMethods[this.customHttpMethods.length - 1]

                method.name = method.name.toUpperCase()

                this.$emit('change', method.name)

                localStorage.setItem("CustomHttpMethods", JSON.stringify(this.customHttpMethods))
            }
        },

        computed: {
            color() {
                if (['GET', 'HEAD'].includes(this.httpMethod)) {
                    return '#32d74b'
                }

                if (['PUT', 'POST', 'PATCH'].includes(this.httpMethod)) {
                    return '#ffb442'
                }

                if (['OPTIONS', 'TRACE'].includes(this.httpMethod)) {
                    return '#8f70cc'
                }

                if (['DELETE'].includes(this.httpMethod)) {
                    return '#FF8282'
                }

                return '#635dff'
            },
        },

        i18n: {
            messages: {
                en: {
                    customMethod: "Custom Method"
                },
                zh: {
                    customMethod: "自定义方法"
                },
                zh_TW: {
                    customMethod: "自定义方法"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-method-selector {
        display: flex;

        align-items: center;

        height: 28px;

        width: fit-content;

        padding-left: 12px;

        padding-right: 12px;

        user-select: none;

        &__label {
            font-size: 11px;

            line-height: 12px;

            height: 16px;

            padding-top: 3px;

            font-weight: bold;

            color: $SECONDARY_FONT_COLOR;
        }
    }

    .http-method-selector__menu {
        width: 160px;

        contain: initial;

        overflow: visible;

        align-self: center;
    }

    .http-method-item {
        display: flex;

        align-items: center;

        height: 24px;

        border-radius: 4px;

        padding-left: 8px;

        padding-right: 8px;

        user-select: none;

        &:hover {
            background-color: #E0E0E0;
        }

        &--hover {
            background-color: #E0E0E0;
        }
    }

    .xxx-font {
        font-size: 9px;

        line-height: 11px;

        color: $SECONDARY_FONT_COLOR;
    }
</style>
