<template>
    <div class="http-client__response">
        <ev-http-client-response-container v-if="hasHttpResponse" :http-operation="httpOperation"></ev-http-client-response-container>

        <ev-http-client-response-placeholder v-else></ev-http-client-response-placeholder>
    </div>
</template>

<script>
    import EvHttpClientUrlViewer from '@/views/http-client/response/EvHttpClientUrlViewer'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import HttpResponseBuilder from '@/views/http-client/core/GHCHttpResponseBuilder'
    import EvHttpClientResponsePlaceholder from '@/views/http-client/EvHttpClientResponsePlaceholder'
    import EvHttpClientResponseNetworkError from '@/views/http-client/response/EvHttpClientResponseNetworkError'
    import EvHttpClientResponseContainer from '@/views/http-client/response/EvHttpClientResponseContainer'
    import EvHttpOperationMixin from '@/mixins/EvHttpOperationMixin'
    import RabiHttpOperationStatus from '@/data/gotcha/http-operation/RabiHttpOperationStatus'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'
    import {Cookie} from 'tough-cookie'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import _ from 'lodash'
    import {MaxRedirectsError} from 'got'
    import {EvHttpClientCookieJarsEventBus, EvHttpClientCookieJarsEvents} from '@/views/http-client/components/session/EvHttpClientCookieJarsEventBus'
    import GHCCookieJarDomain from '@/data/gotcha/http-operation/cookie/GHCCookieJarDomain'
    import GHCHttpRequestHistory from '@/views/http-client/core/GHCHttpRequestHistory'
    import GHCHttpResponseAssertionBuilder from '@/views/http-client/core/GHCHttpResponseAssertionBuilder'
    import GHCCachedRequestUrlDao from '@/data/gotcha/http-operation/cache/GHCCachedRequestUrlDao'
    import GHCCachedRequestUrl from '@/data/gotcha/http-operation/cache/GHCCachedRequestUrl'
    import GHCHttpClientUrlHelper from '@/views/http-client/core/GHCHttpClientUrlHelper'

    const MAX_REQUEST_HISTORY_COUNT = 10

    export default {
        name: "EvHttpClientResponse",

        components: {
            EvHttpClientResponseContainer,
            EvHttpClientResponseNetworkError,
            EvHttpClientResponsePlaceholder,
            EvHorizonGutter,
            EvHttpClientUrlViewer
        },

        mixins: [
            EvHttpOperationMixin,
            EvStoreMixin,
        ],

        created() {
            EvHttpClientEventBus.$on(EvHttpClientEvents.SEND_REQUEST_SUCCESS, this.handleSendRequestSuccess)

            EvHttpClientEventBus.$on(EvHttpClientEvents.SEND_REQUEST_FAILED, this.handleSendRequestFailed)
        },

        beforeDestroy() {
            EvHttpClientEventBus.$off(EvHttpClientEvents.SEND_REQUEST_SUCCESS, this.handleSendRequestSuccess)

            EvHttpClientEventBus.$off(EvHttpClientEvents.SEND_REQUEST_FAILED, this.handleSendRequestFailed)
        },

        props: {
            httpOperation: Object,
        },

        computed: {
            httpError() {
                return this.httpOperation.httpError
            },

            httpResponse() {
                return this.httpOperation.httpResponse
            },

            hasHttpResponse() {
                return this.httpOperation && (this.httpResponse || this.httpError)
            }
        },

        methods: {
            handleSendRequestSuccess(httpRequest, response) {
                if (!this.isCurrentHttpRequest(httpRequest)) {
                    return
                }

                this.httpOperation.status = RabiHttpOperationStatus.SUCCESS

                let jsonp = this._checkIsJsonpRequest(httpRequest)

                this.httpOperation.httpResponse = HttpResponseBuilder.buildHttpResponseFromResponseStream(response, jsonp)

                if (this._enableStoreReceivedCookies(httpRequest)) {
                    this._storeReceivedCookies(this.httpOperation.httpResponse)

                    EvHttpClientCookieJarsEventBus.$emit(EvHttpClientCookieJarsEvents.UPDATE_COOKIE_JAR)
                }

                this.httpOperation.httpError = undefined // clean up

                this.appendHttpOperationStatus(this.httpOperation)

                this.appendHttpResponseAssertion(this.httpOperation)

                this.addToRequestHistory(this.httpOperation)

                this.addToCachedRequestUrls(httpRequest)

                EvHttpClientEventBus.$emit(EvHttpClientEvents.SEND_REQUEST_COMPLETE, httpRequest)
            },

            handleSendRequestFailed(httpRequest, error) {
                if (!this.isCurrentHttpRequest(httpRequest)) {
                    return
                }

                this.httpOperation.status = RabiHttpOperationStatus.FAILED

                this.httpOperation.httpError = HttpResponseBuilder.buildHttpErrorFromResponseError(error)

                this.httpOperation.httpError.requestMethod = httpRequest.requestMethod

                if (error.response && !(error instanceof MaxRedirectsError)) {
                    this.httpOperation.httpResponse = HttpResponseBuilder.buildHttpResponseFromResponseStream(error.response)
                } else {
                    this.httpOperation.httpResponse = undefined
                }

                this.appendHttpOperationStatus(this.httpOperation)

                this.appendHttpResponseAssertion(this.httpOperation)

                this.addToRequestHistory(this.httpOperation)

                this.addToCachedRequestUrls(httpRequest)

                EvHttpClientEventBus.$emit(EvHttpClientEvents.SEND_REQUEST_COMPLETE, httpRequest)
            },

            _checkIsJsonpRequest(httpRequest) {
                let callback = httpRequest.queryParameters.find(item => {
                    return item.key === 'callback'
                })

                if (callback) {
                    return {
                        callback: callback.value
                    }
                }
            },

            _enableStoreReceivedCookies(httpRequest) {
                let settings = httpRequest.settings

                return settings.storeCookies
            },

            _storeReceivedCookies(httpResponse) {
                let cookies = []

                if (!httpResponse.headers['set-cookie']) {
                    return
                }

                if (httpResponse.headers['set-cookie'] instanceof Array)
                    cookies = httpResponse.headers['set-cookie'].map(Cookie.parse)
                else {
                    cookies = [Cookie.parse(httpResponse.headers['set-cookie'])]
                }

                let summary = httpResponse.summary

                let domains = _(cookies)
                    .uniqBy(cookie => {
                        return cookie.key
                    })
                    .map(cookie => {
                        let json = cookie.toJSON()

                        json.checkedStatus = "CHECKED"

                        json.setCookie = true

                        json.value = decodeURI(json.value) // Auto decode

                        if (_.isEmpty(json.domain)) {
                            json.domain = summary.requestHost
                        }

                        return json
                    })
                    .groupBy(cookie => cookie.domain).value()

                let cookieJar = this.currentCookieJar

                for (let name in domains) {
                    let domain = cookieJar.domains.find(it => {
                        return it.name === name
                    })

                    if (!domain) {
                        domain = new GHCCookieJarDomain()

                        domain.name = name

                        cookieJar.domains.push(domain)
                    }

                    let oldCookies = domain.cookies

                    let newCookies = domains[name]

                    domain.cookies = this._mergeReceivedCookies(newCookies, oldCookies)
                }
            },

            _mergeReceivedCookies(newCookies, oldCookies) {
                let mergeCookies = []

                if (!oldCookies) {
                    return newCookies
                }

                for (let oldCookie of oldCookies) {
                    let newCookie = newCookies.find(cookie => {
                        return cookie.key === oldCookie.key
                    })

                    if (newCookie) {
                        mergeCookies.push(newCookie) // replace with new cookie
                    } else {
                        mergeCookies.push(oldCookie)
                    }
                }

                for (let newCookie of newCookies) {
                    let oldCookie = oldCookies.find(cookie => {
                        return cookie.key === newCookie.key
                    })

                    !oldCookie && (mergeCookies.push(newCookie))
                }

                return mergeCookies
            },

            isCurrentHttpRequest(httpRequest) {
                return this.httpOperation.httpRequest.uid === httpRequest.uid
            },

            appendHttpOperationStatus(httpOperation) {
                if (httpOperation.httpError) {
                    httpOperation.status = RabiHttpOperationStatus.FAILED
                } else {
                    httpOperation.status = RabiHttpOperationStatus.SUCCESS
                }
            },

            appendHttpResponseAssertion(httpOperation) {
                let httpResponse = httpOperation.httpResponse

                this.dynamicVariableRender.setHttpRequest(httpOperation.httpRequest)

                httpResponse && (httpResponse.assertion = new GHCHttpResponseAssertionBuilder(httpOperation, this.dynamicVariableRender).build())
            },

            async addToRequestHistory(httpOperation) {
                let history = new GHCHttpRequestHistory(httpOperation)

                let histories = httpOperation.histories || []

                if (histories.length === MAX_REQUEST_HISTORY_COUNT) {
                    histories.pop()
                }

                histories.splice(0, 0, history)

                httpOperation.histories = histories
            },

            async addToCachedRequestUrls(httpRequest) {
                let cachedRequestUrls = this.cachedRequestUrls

                let url = new GHCHttpClientUrlHelper(httpRequest, this.dynamicVariableRender).buildUrlStrFromRequestUrl({
                    withoutQueryParameters: true
                })

                if (cachedRequestUrls.has(url)) {
                    return
                }

                cachedRequestUrls.add(url)

                new GHCCachedRequestUrlDao().save(new GHCCachedRequestUrl(url))
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client__response {
        position: relative;

        display: flex;

        flex: 1;

        min-width: 496px;

        min-height: 1px;

        height: 100%;

        width: 100%;

        flex-direction: column;

        background-color: white;
    }

    .http-client__response__title {
        width: 100%;

        height: 80px;

        padding: 6px 72px 6px 32px;

        background-color: #FCFCFC;

        border-bottom: 1px solid #EAEAEA;
    }

    .http-client-response {
        &__response-body {
            display: flex;

            height: calc(100vh - 208px);
        }
    }

    .json-viewer-container {
        height: 100%;

        overflow-y: overlay;
    }
</style>
