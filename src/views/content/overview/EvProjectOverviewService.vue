<template>
    <div class="project-overview-service">
        <span class="project-overview-service__summary">{{ summary }}</span>

        <div class="markdown-container" v-html="description"></div>
    </div>
</template>

<script>
    import MarkdownIt from 'markdown-it'

    export default {
        name: "EvProjectOverviewService",

        props: {
            jsonService: Object
        },

        computed: {
            summary() {
                if (!this.jsonService) {
                    return
                }

                return this.jsonService.serviceName
            },

            description() {
                if (!this.jsonService) {
                    return
                }

                if (!this.jsonService.summary) {
                    return "/"
                } else {
                    let md = new MarkdownIt({
                        html: true,
                        linkify: true,
                        typographer: true
                    })

                    return md.render(this.jsonService.summary)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/markdown.scss";

    .project-overview-service {
        display: flex;

        flex-direction: column;

        &__summary {
            font-size: 32px;

            font-weight: bolder;

            line-height: 56px;

            color: $PRIMARY_FONT_COLOR;
        }
    }
</style>
