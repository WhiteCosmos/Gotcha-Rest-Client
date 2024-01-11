<template>
    <div class="ev-http-client-cookie-jar-table">
        <div class="ev-http-client-cookie-jar-table__wrapper">
            <table>
                <thead>
                    <tr>
                        <th v-for="header in headers" :style="{'width': header.width}">
                            <ev-label size="11" primary bold>{{ header.text }}</ev-label>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="cookie in cookies" @click="doSelectCookie(cookie)">
                        <!--                        <td>-->
                        <!--                            <div class="d-flex align-center" style="width: 100%">-->
                        <!--                                <ev-drag-icon></ev-drag-icon>-->
                        <!--                            </div>-->
                        <!--                        </td>-->

                        <td>
                            <div class="d-flex align-center" style="width: 100%">
                                <ev-borderless-input v-model="cookie.key" placeholder="Cookie Name"></ev-borderless-input>
                            </div>
                        </td>

                        <td>
                            <div class="d-flex align-center" style="width: 100%">
                                <ev-dynamic-variable-input v-model="cookie.value" placeholder="Cookie Value"></ev-dynamic-variable-input>
                            </div>
                        </td>

                        <td>
                            <ev-label size="11" secondary>{{ cookie.domain }}</ev-label>
                        </td>

                        <td>
                            <ev-label size="11" secondary>{{ formatDate(cookie.expires) }}</ev-label>
                        </td>

                        <td>
                            <ev-cookie-editor-item-property :cookie="cookie"></ev-cookie-editor-item-property>
                        </td>

                        <td>
                            <ev-icon-wrapper @click.native="handleRemoveCookie(cookie)">
                                <ev-remove-icon></ev-remove-icon>
                            </ev-icon-wrapper>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="ev-http-client-cookie-jar-table__placeholder" v-if="noCookies">
                <ev-label size="10" grey>{{ $t('noCookies') }}</ev-label>
            </div>
        </div>

        <ev-http-client-cookie-jar-table-detail :cookie="selectedCookie"></ev-http-client-cookie-jar-table-detail>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import moment from 'moment'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvBulkEditor from '@/components/input/EvBulkEditor'
    import EvCheckbox from '@/components/button/EvCheckbox'
    import StopIcon from '@/components/icon/stop-icon'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvSortIcon from '@/assets/icon/EvSortIcon'
    import EvSortButton from '@/components/button/EvSortButton'
    import EvHttpClientCookieJarTableDetail from '@/views/http-client/components/session/EvHttpClientCookieJarTableDetail'
    import EvHttpClientCookieJarCheckBox from '@/views/http-client/components/session/EvHttpClientCookieJarCheckBox'

    import _ from 'lodash'
    import EvRemoveIcon from '@/components/icon/ev-remove-icon.vue'
    import EvIconWrapper from '@/components/layout/EvIconWrapper.vue'
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon.vue'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput.vue'
    import EvCookieEditorItemProperty from '@/views/http-client/components/cookie-editor/EvCookieEditorItemProperty.vue'

    export default {
        name: "EvHttpClientCookieJarTable",

        components: {
            EvCookieEditorItemProperty,
            EvDynamicVariableInput,
            EvDragIcon,
            EvIconWrapper,
            EvRemoveIcon,
            EvHttpClientCookieJarCheckBox,
            EvHttpClientCookieJarTableDetail,
            EvSortButton,
            EvSortIcon,
            EvHorizonGutter,
            StopIcon,
            EvCheckbox,
            EvBulkEditor,
            EvVerticalGutter,
            EvBorderlessInput,
            EvLabel
        },

        created() {
            this.doClearSelectedCookie()
        },

        props: {
            selectedCookieJar: undefined,

            selectedCookieJarDomain: undefined,
        },

        watch: {
            selectedCookieJar() {
                this.doClearSelectedCookie()
            },
            selectedCookieJarDomain() {
                this.doClearSelectedCookie()
            },
        },

        computed: {
            cookies() {
                this.cookie2Domain.clear()

                if (this.selectedCookieJarDomain) {
                    this.selectedCookieJarDomain.cookies.forEach(cookie => {
                        this.cookie2Domain.set(cookie, this.selectedCookieJarDomain)
                    })

                    return this.selectedCookieJarDomain.cookies
                }

                if (this.selectedCookieJar) {
                    let cookies = []

                    let domains = this.selectedCookieJar.domains

                    domains.forEach(domain => {
                        domain.cookies.forEach(cookie => {
                            this.cookie2Domain.set(cookie, domain)
                        })

                        cookies.push(...domain.cookies)
                    })

                    return cookies
                }

                return []
            },

            noCookies() {
                return _.isEmpty(this.cookies)
            },

            headers() {
                return [
                    // {
                    //     text: '',
                    //     value: 'drag',
                    //     width: '16px',
                    //     sortable: true,
                    // },
                    {
                        text: this.$t('header.name'),
                        value: 'key',
                        width: '128px',
                        sortable: true,
                    },
                    {
                        text: this.$t('header.value'),
                        value: 'value',
                        // width: '178px',
                        sortable: true,
                    },
                    {
                        text: this.$t('header.domain'),
                        value: 'domain',
                        width: '128px',
                        sortable: true,
                    },
                    // {
                    //     text: this.$t('header.path'),
                    //     value: 'path',
                    //     width: '56px',
                    // },
                    {
                        text: this.$t('header.expires'),
                        value: 'expires',
                        width: '128px',
                    },
                    // {
                    //     text: 'HTTP',
                    //     value: 'httpOnlyCheckedStatus',
                    //     width: '48px',
                    //     align: 'center',
                    // },
                    // {
                    //     text: 'HTTPS',
                    //     value: 'httpsOnlyCheckedStatus',
                    //     width: '48px',
                    //     align: 'center',
                    // },
                    // {
                    //     text: this.$t('header.sameSite'),
                    //     value: 'sameSite',
                    //     width: '64px',
                    // },
                    {
                        text: '',
                        value: 'property',
                        width: '28px',
                    },
                    {
                        text: '',
                        value: 'remove',
                        width: '40px',
                    }
                ]
            },
        },

        data() {
            return {
                selectedCookie: undefined,

                cookie2Domain: new Map(),
            }
        },

        methods: {
            formatDate(str) {
                return moment(new Date(str)).format('YYYY-MM-DD HH:mm')
            },

            doSelectCookie(cookie) {
                this.selectedCookie = cookie
            },

            doClearSelectedCookie() {
                this.selectedCookie = undefined
            },

            onCookieHttpOnlyChange(cookie) {
                cookie.httpOnly && (cookie.secure = false)
            },

            onCookieSecureChange(cookie) {
                cookie.secure && (cookie.httpOnly = false)
            },

            emitRemoveCookie(cookie) {
                this.$emit('remove-cookie', cookie)
            },

            handleRemoveCookie(cookie) {
                let domain = this.cookie2Domain.get(cookie)

                if (!domain) {
                    return
                }

                domain.cookies.splice(domain.cookies.indexOf(cookie), 1)
            },
        },

        i18n: {
            messages: {
                en: {
                    noCookies: "No Cookies",

                    removeCookie: "DEL",

                    header: {
                        name: "Name",

                        value: "Value",

                        domain: "Domain",

                        path: "Path",

                        expires: "Expires",

                        http: "HTTP",

                        https: "HTTPS",

                        sameSite: "Same Site",
                    }
                },
                zh: {
                    noCookies: "没有 Cookie",

                    removeCookie: "删除",

                    header: {
                        name: "Cookie 名称",

                        value: "Cookie 值",

                        domain: "域名",

                        path: "路径",

                        expires: "过期时限",

                        http: "HTTP",

                        https: "HTTPS",

                        sameSite: "同域策略",
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-http-client-cookie-jar-table {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        width: 100%;

        height: 100%;

        user-select: none;

        background-color: #FFF;

        flex-shrink: 0;

        &__placeholder {
            @include full-center;

            width: 100%;

            height: 28px;

            border-bottom: 1px solid #F1F1F1;
        }

        &__wrapper {
            display: flex;

            flex-direction: column;

            overflow-y: scroll;

            height: calc(100% - 28px);
        }

        &__title {
            display: flex;

            align-items: center;

            height: 32px;

            border-bottom: 1px solid #F1F1F1;

            padding-left: 16px;
        }

        &__row {
            display: flex;

            height: 28px;

            border-bottom: 1px solid #F1F1F1 !important;

            &:hover {

            }
        }

        &__column {
            display: flex;

            align-items: center;

            justify-content: flex-start;

            padding-right: 8px;

            height: 28px;

            border: none;

            &:hover {

            }
        }

        table {
            border-collapse: collapse;

            thead {
                tr {
                    height: 28px;

                    border-bottom: 1px solid #EAEAEA;

                    th {
                        text-align: left;

                        padding-left: 8px;

                        //padding-right: 8px;
                    }
                }
            }

            tbody {
                tr {
                    height: 28px;

                    border-bottom: 1px solid #F1F1F1;

                    td {
                        text-align: left;

                        padding-left: 8px;

                        //padding-right: 8px;
                    }
                }

                tr:nth-child(even) {
                    background-color: #FCFCFC;
                }
            }
        }
    }
</style>
