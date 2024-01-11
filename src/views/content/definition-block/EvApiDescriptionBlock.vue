<template>
    <div class="d-flex flex-column" v-if="hasApiDescription">
        <ev-http-block-divider :label="$t('EvApiDescriptionBlock.title')"></ev-http-block-divider>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <!--        <div class="description">-->
        <!--            <div v-html="apiDescription" style="width: 720px"></div>-->
        <div class="markdown-container" v-html="apiDescription" style="margin-left: 10px"></div>
        <!--        </div>-->
    </div>
</template>

<script>
    import EvHttpBlockDivider from '@/components/http/EvHttpBlockDivider'
    import _ from 'lodash'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import MarkdownIt from 'markdown-it'

    export default {
        name: "EvApiDescriptionBlock",

        components: {
            EvHorizonGutter,
            EvHttpBlockDivider
        },

        props: {
            jsonMethod: Object
        },

        computed: {
            hasApiDescription() {
                return !_.isEmpty(this.jsonMethod.description)
            },

            apiDescription() {
                let md = new MarkdownIt({
                    html: true,
                    linkify: true,
                    typographer: true
                })

                return md.render(this.jsonMethod.description)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/markdown.scss";

    .description {
        font-size: 12px;

        font-weight: bold;

        color: $PRIMARY_FONT_COLOR;

        padding: 12px;

        height: 100%;
    }

    .description ::v-deep p {
        font-size: 12px;

        font-weight: normal;

        color: $PRIMARY_FONT_COLOR;
    }

    .description ::v-deep pre {
        font-size: 12px;

        font-weight: normal;

        color: $PRIMARY_FONT_COLOR;

        line-height: 20px;

        padding: 16px 4px;

        border-radius: 4px;
    }

    .description ::v-deep code {
        font-size: 12px;

        font-weight: normal;

        color: $PRIMARY_FONT_COLOR;

        font-family: "Source Code Pro", sans-serif;

        background-color: none;
    }
</style>
