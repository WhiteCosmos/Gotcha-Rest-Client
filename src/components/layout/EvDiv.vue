<template>
    <div class="ev-div" :class="classes" :style="styles">
        <slot></slot>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: "EvDiv",

        props: {
            width: String,

            height: String,

            minWidth: {
                type: Number,

                default: 0,
            },

            minHeight: {
                type: Number,

                default: 0,
            },

            radius: {
                type: Number,

                default: 0,
            },

            direction: {
                type: String,

                default: "row" // row | column
            },

            // Layout

            flex: {
                type: Number,

                default: 1,
            },

            align: { // top | center | bottom
                type: String,

                default: "center"
            },

            justify: { // left | center | right
                type: String,

                default: "left"
            },

            // Padding

            paddingLeft: {
                type: Number,

                default: 0,
            },

            paddingRight: {
                type: Number,

                default: 0,
            },

            paddingTop: {
                type: Number,

                default: 0,
            },

            paddingBottom: {
                type: Number,

                default: 0,
            },

            backgroundColor: String,

            scrollable: false,

            // Border

            borderTop: Object,

            borderLeft: Object,

            borderBottom: Object,

            borderRight: Object,

            border: Object,
        },

        computed: {
            classes() {
                let vo = []


                return vo
            },

            styles() {
                let vo = {}

                this.setWidthAndHeight(vo)

                this.setFlexLayout(vo)

                this.setPadding(vo)

                this.setBackground(vo)

                this.setBorder(vo)

                return vo
            },

            directionIsRow() {
                return this.direction === 'row'
            },

            directionIsColumn() {
                return this.direction === 'column'
            }
        },

        methods: {
            setWidthAndHeight(vo) {
                if (!_.isEmpty(this.width)) {
                    if (this.endsWithPercent(this.width)) {
                        vo['width'] = this.width
                    }

                    vo['width'] = this.px(this.width)
                } else {
                    vo['width'] = '100%'
                }

                if (!_.isEmpty(this.height)) {
                    vo['height'] = this.px(this.height)
                }

                vo['min-width'] = this.px(this.minWidth)

                vo['min-height'] = this.px(this.minHeight)

                vo['border-radius'] = this.px(this.radius)
            },

            setFlexLayout(vo) {
                vo['flex-direction'] = this.direction

                // if (_.isEmpty(this.width)) {
                //     vo['flex'] = this.flex
                // }

                // if (this.justify === 'left') {
                //     if (this.directionIsRow) {
                //         vo['justify-content'] = 'flex-start'
                //     }
                //
                //     if (this.directionIsColumn) {
                //         vo['align-items'] = 'flex-start'
                //     }
                // }
                //
                // if (this.justify === 'center') {
                //     if (this.directionIsRow) {
                //         vo['justify-content'] = 'center'
                //     }
                //
                //     if (this.directionIsColumn) {
                //         vo['align-items'] = 'center'
                //     }
                // }
                //
                // if (this.justify === 'right') {
                //     if (this.directionIsRow) {
                //         vo['justify-content'] = 'flex-end'
                //     }
                //
                //     if (this.directionIsColumn) {
                //         vo['align-items'] = 'flex-end'
                //     }
                // }
                //
                // if (this.align === 'top') {
                //     if (this.directionIsRow) {
                //         vo['align-items'] = 'flex-start'
                //     }
                //
                //     if (this.directionIsColumn) {
                //         vo['justify-content'] = 'flex-start'
                //     }
                // }
                //
                // if (this.align === 'center') {
                //     if (this.directionIsRow) {
                //         vo['align-items'] = 'center'
                //     }
                //
                //     if (this.directionIsColumn) {
                //         vo['justify-content'] = 'center'
                //     }
                // }
                //
                // if (this.align === 'bottom') {
                //     if (this.directionIsRow) {
                //         vo['align-items'] = 'flex-end'
                //     }
                //
                //     if (this.directionIsColumn) {
                //         vo['justify-content'] = 'flex-end'
                //     }
                // }
            },

            setPadding(vo) {
                vo['padding-top'] = this.px(this.paddingTop)

                vo['padding-left'] = this.px(this.paddingLeft)

                vo['padding-bottom'] = this.px(this.paddingBottom)

                vo['padding-right'] = this.px(this.paddingRight)
            },

            setBackground(vo) {
                if (this.endsWithPercent(this.backgroundColor)) {
                    vo['background-color'] = this.backgroundColor
                }
            },

            setBorder(vo) {
                if (typeof this.borderTop === 'string') {
                    vo['border-top'] = this.borderTop
                }

                if (typeof this.borderLeft === 'string') {
                    vo['border-left'] = this.borderLeft
                }

                if (typeof this.borderBottom === 'string') {
                    vo['border-bottom'] = this.borderBottom
                }

                if (typeof this.borderRight === 'string') {
                    vo['border-right'] = this.borderRight
                }

                if (typeof this.border === 'string') {
                    vo['border'] = this.border
                }

                // TODO object
            },

            setScrollable(vo) {
                if (this.scrollable) {
                    vo['overflow-y'] = 'scroll'
                }
            },

            px(value) {
                return value + 'px'
            },

            startsWithHash(value) {
                return value && (typeof value) === 'string' && value.startsWith("#")
            },

            endsWithPercent(value) {
                return value && (typeof value) === 'string' && value.endsWith("%")
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-div {
        display: flex;

        user-select: none;
    }
</style>
