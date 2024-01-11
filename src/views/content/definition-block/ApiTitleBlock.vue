<template>
    <div class="api-title-blockk">
        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <!-- API 标题 -->

        <div class="api-title-block">
            <div class="api-title-block__title">
                <span class="api-title-block__title-text"
                      :class="{'api-title-block__title-text--deprecated': isDeprecated}">{{ apiTitle }}</span>
            </div>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <ev-square-tag color="green">{{ apiType }}</ev-square-tag>

            <v-spacer></v-spacer>

            <!--            <ev-export-button :json-method-content="jsonMethod"></ev-export-button>-->

<!--            <ev-api-definition-export-bar :json-method="jsonMethod"></ev-api-definition-export-bar>-->
        </div>

        <!-- API 副标题 -->

        <div class="api-title-block">
            <ev-http-method-tag :request-method="httpMethod" v-if="httpMethod"></ev-http-method-tag>

            <ev-vertical-gutter :gutter="4" v-if="httpMethod"></ev-vertical-gutter>

            <!--            <span class="api-title-block__subtitle">{{ apiSubtitle }}</span>-->

            <ev-http-request-path :path="apiSubtitle"></ev-http-request-path>

            <!--            <ev-http-request-path :path="apiSubtitle"></ev-http-request-path>-->
        </div>

        <!-- API 标签列表 -->

        <div class="api-title-block" v-if="jsonMethod.tags">
            <EvVerticalGutter :gutter="4"></EvVerticalGutter>

            <div class="d-flex" v-for="tag in jsonMethod.tags">
                <EvKVTag :k="tag.tagName" :v="tag.tagValue"></EvKVTag>

                <EvVerticalGutter :gutter="16" v-if="tag.tagValue"></EvVerticalGutter>
            </div>
        </div>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvSquareTag from '@/components/tag/EvSquareTag'
    import EvExportButton from '@/views/content/EvExportButton'
    import EvHttpMethodTag from '@/components/typography/EvHttpMethodTag'
    import EvKVTag from '@/components/typography/EvKVTag'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHttpRequestPath from '@/components/label/EvHttpRequestPath'
    import EvApiDefinitionExportBar from '@/components/export/EvApiDefinitionExportBar'

    export default {
        name: "ApiTitleBlock",

        components: {
            EvApiDefinitionExportBar,
            EvHttpRequestPath,
            EvHorizonGutter,
            EvKVTag,
            EvHttpMethodTag,
            EvExportButton,
            EvSquareTag,
            EvVerticalGutter
        },

        mixins: [],

        props: {
            jsonMethod: Object,
        },

        computed: {
            apiTitle() {
                let jsonMethod = this.jsonMethod

                if (!jsonMethod) {
                    return ""
                }

                return jsonMethod.summary || jsonMethod.methodName
            },

            apiType() {
                let jsonMethod = this.jsonMethod

                if (!jsonMethod) {
                    return ""
                }

                if (jsonMethod.isHttpService) {
                    return "HTTP"
                }

                if (jsonMethod.isJavaService) {
                    return "RPC"
                }
            },

            isDeprecated() {
                let jsonMethod = this.jsonMethod

                if (!jsonMethod) {
                    return false
                }

                return jsonMethod.isDeprecated
            },

            apiSubtitle() {
                let jsonMethod = this.jsonMethod

                if (!jsonMethod) {
                    return ""
                }

                if (jsonMethod.isHttpService) {
                    return jsonMethod.requestPath
                }

                if (jsonMethod.isJavaService) {
                    return jsonMethod.serviceName + "." + jsonMethod.methodName
                }
            },

            httpMethod() {
                let jsonMethod = this.jsonMethod

                if (!jsonMethod) {
                    return undefined
                }

                if (jsonMethod.isHttpService) {
                    return jsonMethod.requestMethod || 'GET'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "definition-block";

    .api-title-block {
        display: flex;

        align-items: center;

        min-height: 40px;

        min-width: 0;
    }

    .api-title-block__title {
        max-width: 70%;

        word-break: break-word;
    }

    .api-title-block__title-text {
        font-size: 28px;

        line-height: 40px;

        font-weight: bold;

        color: $PRIMARY_COLOR;

        user-select: text;

        &--deprecated {
            color: #CCC;

            text-decoration: line-through;
        }
    }

    .api-title-block__subtitle {
        font-size: 16px;

        line-height: 40px;

        font-weight: bolder;

        color: $SECONDARY_FONT_COLOR;

        text-indent: 2px;
    }
</style>
