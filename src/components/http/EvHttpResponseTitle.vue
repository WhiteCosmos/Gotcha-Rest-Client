<template>
    <div class="http-response-title">
        <div class="http-response-title__cylinder"></div>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <span class="http-response-title__label">{{ label }}</span>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <span :class="statusCodeStyle">{{ httpResponse.statusCode }}</span>

        <ev-vertical-gutter :gutter="2"></ev-vertical-gutter>

        <span :class="statusCodeStyle">{{ httpResponse.statusText }}</span>

        <v-spacer></v-spacer>

        <!--        <span class="http-response-title__label">{{ httpResponse.description }}</span>-->
        <div class="markdown-container" v-html="description">

        </div>

        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import MarkdownIt from 'markdown-it'
    import _ from 'lodash'

    export default {
        name: "EvHttpResponseTitle",

        components: {
            EvHorizonGutter,
            EvVerticalGutter
        },

        props: {
            label: String,

            httpResponse: Object // JsonHttpResponse
        },

        computed: {
            statusCodeStyle() {
                let statusCode = this.httpResponse.statusCode.toString()

                let colorStyle = "http-response-title__code-default"

                if (statusCode.startsWith("2")) {
                    colorStyle = 'http-response-title__code-200'
                }

                if (statusCode.startsWith("3")) {
                    colorStyle = 'http-response-title__code-300'
                }

                if (statusCode.startsWith("4")) {
                    colorStyle = 'http-response-title__code-400'
                }

                if (statusCode.startsWith("5")) {
                    colorStyle = 'http-response-title__code-500'
                }

                return [
                    'http-response-title__label',
                    colorStyle
                ]
            },

            description() {
                if (!this.httpResponse) {
                    return
                }

                if (!this.httpResponse.description || _.isEmpty(this.httpResponse.description)) {
                    return
                }

                let md = new MarkdownIt({
                    html: true,
                    linkify: true,
                    typographer: true
                })

                return md.render(this.httpResponse.description)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/markdown-http-response.scss";

    .http-response-title {
        position: relative;

        display: flex;

        align-items: flex-start;

        margin-top: 16px;

        user-select: none;

        min-height: 28px;

        background-color: #FCFCFC;

        border-right: 1px solid #cce5ff;

        border-top: 1px solid #cce5ff;

        border-bottom: 1px solid #cce5ff;

        border-radius: 2px;

        &__cylinder {
            position: absolute;

            height: 100%;

            width: 2px;

            background-color: $PRIMARY_COLOR;

            border-radius: 2px 0 0 2px;
        }

        &__label {
            font-size: 12px;

            line-height: 28px;

            font-weight: bold;

            color: $PRIMARY_COLOR;
        }

        &__code-default {
            color: $PRIMARY_COLOR;
        }

        &__code-200 {
            color: $GREEN_COLOR;
        }

        &__code-300 {
            color: $YELLOW_COLOR;
        }

        &__code-400 {
            color: #AABBCC;
        }

        &__code-500 {
            color: $RED_COLOR;
        }
    }
</style>
