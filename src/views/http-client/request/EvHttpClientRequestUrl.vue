<template>
    <div class="http-client-request-url" :class="requestUrlStyle">
        <ev-http-method-selector v-if="urlEditable" v-model="httpRequest.requestMethod"></ev-http-method-selector>

        <ev-http-method-label v-else :value="httpRequest.requestMethod"></ev-http-method-label>

        <v-divider vertical inset></v-divider>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <div class="http-client-request-url__input-container">
            <div class="d-flex" style="flex: 1">
                <input id="ev-http-client-url-input"
                       ref="input"
                       type="text"
                       class="http-client-request-url__input-container__input"
                       placeholder="http:// ; https:// ; curl "
                       v-model="urlStr"
                       @focus="handleFocusRequestUrl"
                       @blur="handleModifyRequestUrl"
                       @keydown="handleKeydown"
                       style="padding-top: 1px">
            </div>

            <div class="ev-autocomplete" v-show="showAutocomplete && hasMatchedUrl">
                <span class="ev-autocomplete__label"
                      :class="{'ev-autocomplete__label--selected': selectedRequestUrl === url}"
                      @click="doSelectCachedUrl(url)"
                      v-for="url in matchedUrls">{{ url }}</span>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <v-hover v-slot="{ hover }">
                <ev-http-client-request-url-copy-icon :hover='hover' @click.native="doCopyUrl"></ev-http-client-request-url-copy-icon>
            </v-hover>
        </div>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvHttpMethodSelector from '@/views/http-client/request/EvHttpMethodSelector'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import ReloadIcon from '@/components/icon/reload-icon'
    import HttpClientRequestIcon from '@/components/icon/http-client-request-icon'
    import HttpClientStopIcon from '@/components/icon/http-client-stop-icon'
    import EvRow from '@/components/layout/EvRow'
    import EvCheckedStatusMixin from '@/mixins/EvCheckedStatusMixin'
    import EvSessionIcon from '@/components/icon/EvSessionIcon'
    import EvHttpMethodLabel from '@/views/http-client/components/EvHttpMethodLabel'
    import EvSwitcherIcon from '@/components/icon/EvSwitcherIcon'
    import GHCHttpClientUrlHelper from '@/views/http-client/core/GHCHttpClientUrlHelper'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'
    import CurlParser from '@/core/curl/CurlParser'

    import _ from 'lodash'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import GHCObjectHelper from '@/core/helper/GHCObjectHelper'
    import EvHttpClientRequestUrlCopyIcon from '@/views/http-client/request/EvHttpClientRequestUrlCopyIcon'
    import {clipboard} from 'electron'
    import GHCDynamicVariableRender from '@/components/dynamic-variable/GHCDynamicVariableRender'
    import {GHCEnvironmentsEventBus, GHCEnvironmentsEvents} from '@/data/gotcha/http-operation/environment/GHCEnvironmentsEventBus'
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvLockIcon from '@/assets/icon/ev-lock-icon.vue'

    const ENTER_CODE = 13

    const UP_CODE = 38

    const DOWN_CODE = 40

    export default {
        name: "EvHttpClientRequestUrl",

        components: {
            EvLockIcon,
            EvLabel,
            EvHttpClientRequestUrlCopyIcon,
            EvSwitcherIcon,
            EvHttpMethodLabel,
            EvSessionIcon,
            EvRow,
            HttpClientStopIcon,
            HttpClientRequestIcon,
            ReloadIcon,
            EvVerticalGutter,
            EvHttpMethodSelector
        },

        mixins: [
            EvCheckedStatusMixin,
            EvStoreMixin,
        ],

        created() {
            this.initialize()

            EvHttpClientEventBus.$on(EvHttpClientEvents.MODIFY_URL_PARAMETERS, this.handleModifyUrlParameters)

            GHCEnvironmentsEventBus.$on(GHCEnvironmentsEvents.CHANGE_ENVIRONMENT, this.handleModifyUrlParameters)

            document.body.addEventListener('click', this.clickHandler)
        },

        beforeDestroy() {
            EvHttpClientEventBus.$off(EvHttpClientEvents.MODIFY_URL_PARAMETERS, this.handleModifyUrlParameters)

            GHCEnvironmentsEventBus.$off(GHCEnvironmentsEvents.CHANGE_ENVIRONMENT, this.handleModifyUrlParameters)

            document.body.removeEventListener('click', this.clickHandler)
        },

        props: {
            httpRequest: Object,

            configuration: Object,
        },

        data() {
            return {
                urlStr: "",

                previousUrlStr: "",

                isUrlFormatError: false,

                isRequestUrlFocused: false,

                showAutocomplete: false,

                counter: -1,

                selectedRequestUrl: undefined,
            }
        },

        computed: {
            url() {
                return new GHCHttpClientUrlHelper(this.httpRequest, this.dynamicVariableRender).buildUrlStrFromRequestUrl()
            },

            matchedUrls() {
                if (_.isEmpty(this.urlStr)) {
                    return []
                }

                let urls = Array.from(this.cachedRequestUrls)

                let matchedUrls = urls.filter(url => {
                    return url.includes(this.urlStr)
                })

                return matchedUrls.length > 10 ? matchedUrls.slice(0, 9) : matchedUrls
            },

            hasMatchedUrl() {
                return !_.isEmpty(this.matchedUrls)
            },

            urlEditable() {
                return this.configuration && this.configuration.urlEditable
            },

            requestUrlStyle() {
                return {
                    'http-client-request-url--focused': this.isRequestUrlFocused
                }
            }
        },

        methods: {
            initialize() {
                this.urlStr = new GHCHttpClientUrlHelper(this.httpRequest, this.dynamicVariableRender).buildUrlStrFromRequestUrl()
            },

            clickHandler(event) {
                if (this.checkIsTargetOnUrlInput(event)) {
                    return
                }

                if (this.showAutocomplete) {
                    this.showAutocomplete = false
                    this.handleModifyRequestUrl()
                }
            },

            handleFocusRequestUrl() {
                this.isRequestUrlFocused = true

                this.previousUrlStr = this.urlStr
            },

            handleKeydown(event) {
                if (event.keyCode === ENTER_CODE) {
                    this.resetAutocomplete()

                    if (this.selectedRequestUrl) {
                        this.urlStr = this.selectedRequestUrl

                        this.selectedRequestUrl = undefined

                        this.$refs['input'].focus()
                    } else {
                        this.$refs['input'].blur()
                    }
                } else if (event.keyCode === UP_CODE) {
                    this.handleKeypressUp()
                } else if (event.keyCode === DOWN_CODE) {
                    this.handleKeypressDown()
                } else {
                    this.showAutocomplete = true
                }
            },

            resetAutocomplete() {
                this.showAutocomplete = false

                this.counter = -1 // reset counter

                this.isRequestUrlFocused = false
            },

            handleKeypressUp() {
                this.counter > 0 ? this.counter-- : (this.counter = this.matchedUrls.length - 1)

                this.selectedRequestUrl = this.matchedUrls[this.counter]
            },

            handleKeypressDown() {
                this.counter < (this.matchedUrls.length - 1) ? this.counter++ : (this.counter = 0)

                this.selectedRequestUrl = this.matchedUrls[this.counter]
            },

            handleModifyRequestUrl() {
                if (this.showAutocomplete) {
                    return
                }

                this.resetAutocomplete()

                if (!this.checkIsUrlModified()) {
                    this.$refs['input'].blur()
                    return
                }

                if (this.checkIsCurl()) {
                    let curlRequests = new CurlParser().parse(this.urlStr)

                    if (curlRequests.size === 0) {
                        return
                    }

                    let curlRequest = curlRequests.get(0)

                    this.urlStr = curlRequest.url

                    EvHttpClientEventBus.$emit(EvHttpClientEvents.IMPORT_REQUEST_FROM_CURL, curlRequest, this.httpRequest)
                }

                try {
                    new GHCHttpClientUrlHelper(this.httpRequest, this.dynamicVariableRender)
                        .buildRequestUrlFromUrlStr(this.urlStr, this.previousUrlStr)

                    EvHttpClientEventBus.$emit(EvHttpClientEvents.MODIFY_REQUEST_PATH, this.httpRequest)

                    this.isUrlFormatError = false
                } catch (e) {
                    this.isUrlFormatError = true
                }

                this.$refs['input'].blur()

                this.selectedRequestUrl = undefined
            },

            handleModifyUrlParameters(httpRequest) {
                !httpRequest && (httpRequest = this.httpRequest)

                if (GHCObjectHelper.notEquals(httpRequest, this.httpRequest)) {
                    return
                }

                try {
                    this.urlStr = new GHCHttpClientUrlHelper(httpRequest, this.dynamicVariableRender).buildUrlStrFromRequestUrl()
                } catch (e) {
                    console.error("handleModifyUrlParameters error", e)
                }
            },

            checkIsTargetOnUrlInput(event) {
                return event.target.id && (event.target.id === 'ev-http-client-url-input')
            },

            checkIsUrlModified() {
                return this.previousUrlStr.trim() !== this.urlStr.trim()
            },

            checkIsCurl() {
                return this.urlStr.startsWith("curl ")
            },

            doSelectCachedUrl(url) {
                this.urlStr = url

                this.showAutocomplete = false

                this.handleModifyRequestUrl()

                this.$refs['input'].focus()
            },

            doCopyUrl() {
                const {clipboard} = require('electron')

                try {
                    clipboard.writeText(this.urlStr)
                } catch (e) {
                    // ignore
                }
            },
        },

        watch: {
            'httpRequest.requestMethod'() {
                EvHttpClientEventBus.$emit(EvHttpClientEvents.MODIFY_REQUEST_METHOD, this.httpRequest)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-request-url {
        display: flex;

        align-items: center;

        flex: 1;

        height: 28px;

        transition: border 0.1s;

        border: 1px solid #EAEAEA;

        border-radius: 6px;

        min-width: 1px;

        background-color: white;

        box-shadow: 0 1px 4px -2px rgb(0, 0, 0, 0.1);

        &--focused {
            transition: border 0.1s;

            border: 1px solid $SECONDARY_COLOR;
        }

        &__label {
            font-size: 11px;

            line-height: 16px;

            max-width: 80%;

            color: $PRIMARY_COLOR;
        }

        &__input-container {
            position: relative;

            display: flex;

            flex: 1;

            align-items: center;

            height: 24px;

            &__input {
                width: 100%;

                height: 16px;

                font-family: "SF Pro", sans-serif;

                font-weight: 500;

                font-size: 13px;

                line-height: 16px;

                color: $PRIMARY_FONT_COLOR;
            }
        }

        &__switcher-container {
            width: 28px;

            height: 28px;

            @include full-center;
        }
    }

    input::placeholder {
        font-size: 12px;

        line-height: 24px;

        color: #AABBCC;
    }

    .ev-autocomplete {
        position: absolute;

        top: 28px;

        display: flex;

        flex-direction: column;

        max-height: 320px;

        width: calc(100% + 12px);

        overflow-y: overlay;

        background-color: #FCFCFC;

        border: 1px solid #F1F1F1;

        border-radius: 6px;

        left: -4px;

        z-index: 800;

        @include component-shadow;

        &__label {
            text-indent: 4px;

            font-family: "SF Pro", sans-serif;

            font-size: 12px;

            font-weight: 500;

            line-height: 24px;

            color: $SECONDARY_FONT_COLOR;

            user-select: none;

            overflow: hidden;

            white-space: nowrap;

            text-overflow: ellipsis;

            &:hover {
                background-color: #F1F1F1;
            }

            &--selected {
                background-color: #F1F1F1;

                color: #007AFF;
            }
        }
    }

    .ev-http-client-server-wrapper {
        display: flex;

        align-items: center;

        width: fit-content;

        height: 18px;

        padding-left: 4px;

        padding-right: 4px;

        border-radius: 2px;

        background-color: #eee6ff;
        //background-color: #846caf;

        margin-right: 4px;
    }
</style>
