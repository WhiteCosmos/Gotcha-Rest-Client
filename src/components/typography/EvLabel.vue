<template>
    <span class="ev-label" :class="labelClasses" :style="labelStyles" style="padding-top: 0px"><slot></slot></span>
</template>

<script>
    export default {
        name: "EvLabel",

        props: {
            size: {
                type: [String, Number],

                default: 12
            },

            width: Number, //

            lineHeight: {
                type: Number,

                default: 16
            },

            // Align TODO

            textAlign: String, // left center right

            verticalAlign: String, // top center bottom

            // Color

            color: String,

            primary: Boolean,

            secondary: Boolean,

            blue: Boolean,

            red: Boolean,

            green: Boolean,

            orange: Boolean,

            grey: Boolean,

            // Weight

            medium: Boolean,

            bold: Boolean,

            // Action

            selectable: {
                type: Boolean,

                default: false,
            },

            textTruncate: Boolean,
        },

        computed: {
            labelClasses() {
                return [
                    this.primary ? 'font-color--primary' : '',
                    this.secondary ? 'font-color--secondary' : '',
                    this.blue ? 'font-color--blue' : '',
                    this.red ? 'font-color--red' : '',
                    this.orange ? 'font-color--orange' : '',
                    this.green ? 'font-color--green' : '',
                    this.grey ? 'font-color--grey' : '',
                    this.textTruncate ? 'text-truncate' : '',
                ]
            },

            labelStyles() {
                let size = 12

                if (this.size instanceof String) {
                    size = Number.parseInt(this.size)
                } else {
                    size = this.size
                }

                let style = {
                    'font-size': this.px(size),
                    'font-weight': this.getFontWeight(),
                    'line-height': this.px(this.lineHeight),
                    'user-select': this.selectable ? 'auto' : 'none',
                }

                if (this.width) {
                    style['width'] = this.width + 'px'
                }

                if (this.color) {
                    style['color'] = this.color
                }

                return style
            }
        },

        methods: {
            px(value) {
                return value + 'px'
            },

            getFontWeight() {
                if (this.medium) {
                    return 500
                }

                if (this.bold) {
                    return 600
                }

                return 400
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-label {
        font-family: "SF Pro", "PingFang SC", sans-serif;

        font-weight: 500;

        display: inline-flex;

        height: 14px;

        line-height: 14px;
    }
</style>
