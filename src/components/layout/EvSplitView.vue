<template>
    <div class="ev-split-view"
         :style="splitViewStyle"
         @mousemove="handleMouseMove"
         @mouseup="handleMouseUp"
         @mouseleave="handleMouseUp"
         ref="ev-split-view">
        <div class="ev-split-view__major-view" :style="majorViewStyle">
            <slot name="major"></slot>
        </div>

        <div class="ev-split-view__divider" @mousedown="handleMouseDown">
            <div class="ev-split-view__draggable-divider" :style="splitViewDividerStyle"></div>
        </div>

        <div ref='ev-split-view__minor-view' class="ev-split-view__minor-view" :style="minorViewStyle">
            <slot name="minor"></slot>
        </div>
    </div>
</template>

<script>
    import {EvSplitViewEventBus, EvSplitViewEvents} from '@/components/layout/EvSplitViewEventBus'

    export default {
        name: "EvSplitView",

        props: {
            config: Object
        },

        created() {
            this.restoreSplitViewConfig()

            EvSplitViewEventBus.$on(EvSplitViewEvents.DRAG_COMPLETE, this.handleDragComplete)
        },

        beforeDestroy() {
            EvSplitViewEventBus.$off(EvSplitViewEvents.DRAG_COMPLETE, this.handleDragComplete)
        },

        data() {
            return {
                minMajorViewWidth: 1,

                minMinorViewWidth: 1,

                majorViewWidth: 512,

                drag: false,

                position: {
                    clientX: 0,
                    clientY: 0
                },

                outOfBound: false,

                srcElement: undefined // divider
            }
        },

        computed: {
            minorViewWidth() {
                let minorView = this.$refs['ev-split-view__minor-view']

                return minorView.offsetWidth
            },

            splitViewStyle() {
                if (this.drag) {
                    return {
                        cursor: 'col-resize'
                    }
                }
            },

            splitViewDividerStyle() {
                if (this.drag) {
                    return {
                        'background-color': '#007AFF',
                        'cursor': 'col-resize',
                        'opacity': 0.8,
                        'transition': '0.2s',
                    }
                }
            },

            majorViewStyle() {
                return {
                    width: this.majorViewWidth + 'px'
                }
            },

            minorViewStyle() {
                // return {
                //     width: this.minorViewWidth + 'px'
                // }
            },
        },

        methods: {
            handleDragComplete(majorViewWidth) {
                this.majorViewWidth = majorViewWidth
            },

            makeView(type) {
                if (type === 'MAJOR') {
                    this.majorViewWidth = this.minMajorViewWidth
                }

                if (type === 'CENTER') {
                    let totalWidth = this._getTotalWidth()

                    this.majorViewWidth = Math.floor(totalWidth / 2)
                }

                if (type === 'MINOR') {
                    let totalWidth = this._getTotalWidth()

                    this.majorViewWidth = totalWidth - this.minMinorViewWidth
                }

                this.updateSplitViewConfig()
            },

            handleMouseDown(event) {
                this.position.clientX = event.clientX

                this.position.clientY = event.clientY

                this.drag = true

                this.outOfBound = false

                this.srcElement = event.srcElement
            },

            handleMouseMove(event) {
                if (!this.drag) {
                    return
                }

                if (Math.abs(event.movementX) === 0) {
                    return
                }

                let source = this.srcElement

                let rectangle = source.getBoundingClientRect()

                let clientX = event.clientX

                let sourceX = rectangle.left

                if (this.outOfBound) {
                    if (Math.abs(clientX - sourceX) < 3) {
                        this.outOfBound = false
                    } else {
                        return
                    }
                } else {
                    if (Math.abs(clientX - sourceX) > 72) {
                        this.outOfBound = true
                        return
                    }
                }

                if (this.checkIsDragToLeft(event)) {
                    let changedMajorViewWidth = this.getChangedMajorViewWidth(event)

                    if (changedMajorViewWidth < this.config.minMajorViewWidth) {
                        this.majorViewWidth = this.config.minMajorViewWidth
                    } else {
                        this.majorViewWidth = changedMajorViewWidth
                    }
                }

                if (this.checkIsDragToRight(event)) {
                    let changedMinorViewWidth = this.getChangedMinorViewWidth(event)

                    if (changedMinorViewWidth <= this.minMinorViewWidth) {
                        // ignore
                    } else {
                        this.majorViewWidth += Math.abs(event.movementX)
                    }
                }

                this.position.clientX = event.clientX

                this.position.clientY = event.clientY
            },

            handleMouseUp() {
                if (this.drag) {
                    EvSplitViewEventBus.$emit(EvSplitViewEvents.DRAG_COMPLETE, this.majorViewWidth)
                }

                this.drag = false

                this.updateSplitViewConfig()
            },

            checkIsDragToLeft(event) {
                return event.clientX - this.position.clientX < 0
            },

            checkIsDragToRight(event) {
                return event.clientX - this.position.clientX > 0
            },

            getChangedMajorViewWidth(event) {
                return this.majorViewWidth - Math.abs(event.movementX)
            },

            getChangedMinorViewWidth(event) {
                let minorView = this.$refs['ev-split-view__minor-view']

                let minorViewWidth = minorView.offsetWidth

                return minorViewWidth - Math.abs(event.movementX)
            },

            restoreSplitViewConfig() {
                let configs = localStorage.getItem("splitViewConfigs")

                if (!configs) {
                    configs = '{}'

                    localStorage.setItem('splitViewConfigs', configs)
                }

                configs = JSON.parse(configs)

                let config = configs[this.config.name]

                if (config) {
                    this.majorViewWidth = config.majorViewWidth
                }
            },

            updateSplitViewConfig() {
                let configs = localStorage.getItem("splitViewConfigs")

                if (!configs) {
                    configs = '{}'

                    localStorage.setItem('splitViewConfigs', configs)
                }

                configs = JSON.parse(configs)

                let config = configs[this.config.name]

                if (!config) {
                    config = {}

                    configs[this.config.name] = config
                }

                config.majorViewWidth = this.majorViewWidth

                localStorage.setItem('splitViewConfigs', JSON.stringify(configs))
            },

            _getTotalWidth() {
                let div = this.$refs['ev-split-view']

                return div.offsetWidth
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-split-view {
        display: flex;

        min-width: 1px;

        min-height: 1px;

        width: 100%;

        height: 100%;

        &__major-view {
            display: flex;

            //flex: 1;

            //flex-shrink: 0;

            min-width: 1px;

            min-height: 1px;

            //background-color: green;

            height: 100%;

            //opacity: 0.3;

            overflow: hidden;
        }

        &__minor-view {
            display: flex;

            flex: 1;

            flex-shrink: 0;

            min-width: 1px;

            min-height: 1px;

            height: 100%;

            overflow: hidden;
        }

        &__divider {
            width: 1px;

            height: 100%;

            //border-major: 1px solid red;

            background-color: #EAEAEA;

            position: relative;
        }

        &__draggable-divider {
            position: absolute;

            height: 100%;

            width: 5px;

            background-color: transparent;

            left: -2px;

            z-index: 4; // Code Mirror's is 3 !!!

            &:hover {
                background-color: #007AFF;

                cursor: col-resize;

                opacity: 0.6;

                transition: 0.2s;
            }
        }
    }
</style>
