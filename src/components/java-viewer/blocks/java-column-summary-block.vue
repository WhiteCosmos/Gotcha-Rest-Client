<template>
    <div class="column-block">
        <!--        <span class="column-block-summary">{{ value }}</span>-->
        <!--        <div v-html="markedHtml"></div>-->
        <div class="markdown-description-container" v-html="html"></div>
        <!--        <div v-html="html"></div>-->
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import marked from 'marked'
    import MarkdownIt from 'markdown-it'

    export default {
        name: "java-column-summary-block",

        components: {
            EvHorizonGutter
        },

        props: {
            value: String
        },

        computed: {
            html() {
                let md = new MarkdownIt({
                    html: true,
                    linkify: true,
                    typographer: true
                })

                return md.render(this.value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "java-column-block";

    @import "~@/styles/markdown-description.scss";
</style>
