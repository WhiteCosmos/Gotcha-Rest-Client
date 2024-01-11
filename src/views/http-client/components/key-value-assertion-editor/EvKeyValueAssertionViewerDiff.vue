<template>
    <div class="ev-key-value-assertion-viewer-diff">
        <pre class="diff-text" v-html="html"></pre>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: "EvKeyValueAssertionViewerDiff",

        props: {
            diff: Array,
        },

        computed: {
            html() {
                let html = ''

                this.diff.forEach(part => {
                    let value = _.escape(part.value)

                    if (part.added) {
                        html += `<ins>${value}</ins>`
                    } else if (part.removed) {
                        html += `<del>${value}</del>`
                    } else {
                        html += value
                    }
                })

                return html
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-key-value-assertion-viewer-diff {
        background-color: #F5F5F5;

        .diff-text {
            word-break: break-all;

            white-space: break-spaces;

            font-size: 11px;

            color: $SECONDARY_FONT_COLOR;

            background-color: #F5F5F5;

            border-radius: 3px;

            ::v-deep ins {
                text-decoration: none;

                font-size: 11px;

                color: #406619;

                background-color: #eaf2c2;
            }

            ::v-deep del {
                text-decoration: none;

                font-size: 11px;

                height: 10px;

                color: #b30000;

                background-color: #fadad7;
            }
        }
    }
</style>
