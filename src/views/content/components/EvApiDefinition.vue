<template>
    <div class="api-definition flex-shrink-0" id="ev-api-definition">
        <!-- 接口标题 -->

        <api-title-block :json-method="currentJsonMethod"></api-title-block>

        <!-- 接口描述 -->

        <ev-api-description-block :json-method="currentJsonMethod"></ev-api-description-block>

        <!-- HTTP 接口定义 -->

        <ev-http-request-block :json-method="currentJsonMethod" v-if="isHttpService"></ev-http-request-block>

        <ev-http-responses-block :json-method="currentJsonMethod" v-if="isHttpService"></ev-http-responses-block>

        <!-- RPC 接口定义 -->

        <ev-rpc-request-block :json-method="currentJsonMethod" v-if="isJavaService"></ev-rpc-request-block>

        <ev-rpc-response-block :json-method="currentJsonMethod" v-if="isJavaService"></ev-rpc-response-block>

        <ev-rpc-exception-block :json-method="currentJsonMethod" v-if="isJavaService"></ev-rpc-exception-block>

        <api-placeholder-block></api-placeholder-block>

        <v-fade-transition>
            <div class="back-to-top" v-show="showBackToTopButton" @click="backToTop">
                <span class="back-to-top__font">{{ $t('backToTop') }}</span>
            </div>
        </v-fade-transition>
    </div>
</template>

<script>
    import ApiTitleBlock from '@/views/content/definition-block/ApiTitleBlock'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import {EvContentTabsEventBus, EvContentTabsEvents} from '@/components/tabs/EvContentTabsEventBus'
    import ApiPlaceholderBlock from '@/views/content/definition-block/ApiPlaceholderBlock'
    import {EvExportButtonEventBus, EvExportButtonEvents} from '@/views/content/EvExportButtonEventBus'
    import EvHttpRequestBlock from '@/components/http/EvHttpRequestBlock'
    import EvApiDescriptionBlock from '@/views/content/definition-block/EvApiDescriptionBlock'
    import EvRpcRequestBlock from '@/components/rpc/EvRpcRequestBlock'
    import EvRpcResponseBlock from '@/components/rpc/EvRpcResponseBlock'
    import EvRpcExceptionBlock from '@/components/rpc/EvRpcExceptionBlock'
    import EvHttpResponsesBlock from '@/components/http/EvHttpResponsesBlock'

    export default {
        name: "EvApiDocumentation",

        components: {
            EvHttpResponsesBlock,
            EvRpcExceptionBlock,
            EvRpcResponseBlock,
            EvRpcRequestBlock,
            EvApiDescriptionBlock,
            EvHttpRequestBlock,
            ApiPlaceholderBlock,
            EvHorizonGutter,
            ApiTitleBlock,
        },

        created() {
            EvExportButtonEventBus.$on(EvExportButtonEvents.EXPORT_TO_HTML, (jsonMethodContent) => {
                if (this.contentTab.jsonMethodContent.id !== jsonMethodContent.id) {
                    return
                }
            })

            EvExportButtonEventBus.$on(EvExportButtonEvents.READY_TO_EXPORT, (contentTab) => {

            })
        },

        props: {
            scrollEvent: Event,

            contentTab: Object,
        },

        computed: {
            isJavaService() {
                return this.currentJsonMethod.isJavaService
            },

            isHttpService() {
                return this.currentJsonMethod.isHttpService
            },

            currentJsonMethod() {
                return this.contentTab.jsonMethod
            }
        },

        data() {
            return {
                showBackToTopButton: false,
            }
        },

        methods: {
            backToTop() {
                // this.$emit('back-to-top')
                // this.$vuetify.goTo(0)
                EvContentTabsEventBus.$emit(EvContentTabsEvents.BACK_TO_TOP)
            }
        },

        watch: {
            scrollEvent(newVal) {
                if (newVal && newVal.target.scrollTop > 128) {
                    this.showBackToTopButton = true
                }

                if (!newVal || newVal.target.scrollTop < 128) {
                    this.showBackToTopButton = false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .api-definition {
        display: flex;

        width: 100%;

        flex-direction: column;

        padding-left: 72px;

        padding-right: 72px;
    }

    .back-to-top {
        width: 100px;

        height: 28px;

        @include blue-background-gradient;

        @include component-shadow;

        border-top: 1px solid $LIGHT_HOVER_COLOR;

        border-left: 1px solid $LIGHT_HOVER_COLOR;

        border-right: 1px solid $LIGHT_HOVER_COLOR;

        border-radius: 4px 4px 0 0;

        display: flex;

        align-self: center;

        align-items: center;

        justify-content: center;

        position: fixed;

        bottom: 0px;

        user-select: none;
    }

    .back-to-top__font {
        font-size: 12px;

        font-weight: bold;

        line-height: 24px;

        color: white;
    }

</style>
