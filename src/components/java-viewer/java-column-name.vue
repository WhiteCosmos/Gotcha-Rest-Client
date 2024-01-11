<template>
    <div class="field-name-column">
        <!--  缩进 -->

        <ev-vertical-gutter :gutter="16 * layer"></ev-vertical-gutter>

        <!-- 是否需要展示箭头 -->

        <div class="field-name-column__icon-container" v-if="isContainerNode" @click="doToggleExpand">
            <v-icon x-small color="primary" class="" v-if="expand">fa-angle-down</v-icon>

            <v-icon x-small :color="arrowColor" v-else>fa-angle-right</v-icon>
        </div>

        <!-- 不需要展示箭头则使用空格代替 -->

        <EvVerticalGutter :gutter="24" v-else></EvVerticalGutter>

        <!-- 根据层级展示视觉引导线 -->

        <div class="ev-row arrow-indicator"
             :class="getIndicatorStyle(layer + 1)"
             v-bind:style="{left: (layer + 1) * 16 - 4 + 'px'}"
             @click="handleClickAnIndicator(layer + 1)"
             @mouseenter="handleMouseEnterAnIndicator(layer + 1)"
             @mouseleave="handleMouseLeaveAnIndicator"
             v-if="isContainerNode && expand"></div>

        <div class="ev-row indicator"
             :class="getIndicatorStyle(n)"
             v-for="n in layer"
             v-bind:style="{left: n * 16 - 4 + 'px'}"
             @click="handleClickAnIndicator(n)"
             @mouseenter="handleMouseEnterAnIndicator(n)"
             @mouseleave="handleMouseLeaveAnIndicator"></div>

        <div class="field-name-column__content-column" :class="columnOnHoverClass" style="padding-top: 6px; align-items: flex-start">
            <EvSquareTag color="red" v-if="isMapKey">KEY</EvSquareTag>

            <EvSquareTag color="primary" v-if="isMapValue">VALUE</EvSquareTag>

            <!-- 前面存在标签时的间隔 -->

            <EvVerticalGutter :gutter="4" v-if="isMapKey || isMapValue"></EvVerticalGutter>

            <span class="field-name-column__content-label" :style="fieldNameColorStyle">{{ fieldName }}</span>

            <EvVerticalGutter :gutter="4" v-if="isRequired"></EvVerticalGutter>

            <span class="caption required" v-if="isRequired">*</span>

            <EvVerticalGutter :gutter="4"></EvVerticalGutter>
        </div>
    </div>
</template>

<script>
    import JsonStructMixin from "./JsonStructMixin"
    import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
    import EvSquareTag from '@/components/tag/EvSquareTag'
    import EvComponentMixin from '@/mixins/EvComponentMixin'

    export default {
        name: "java-column-name",

        components: {
            EvSquareTag,
            EvVerticalGutter
        },

        mixins: [
            JsonStructMixin,
            EvComponentMixin,
        ],

        computed: {
            columnColor() {
                let char = this.fieldName.charAt(0)

                let flag = (char.toUpperCase() === char)

                if (flag) {
                    return "#4A90E2"
                }

                return ""
            },

            arrowColor() {
                if (this.isHover) {
                    return this.primaryColor
                } else {
                    return this.greyColor
                }
            },

            layer() {
                return this.jsonStruct ? this.jsonStruct.layer_ : 0
            },

            expand() {
                return this.jsonStruct ? this.jsonStruct.expand_ : true
            },

            isContainerNode() {
                return this.jsonStruct && !_.isEmpty(this.jsonStruct.children)
            }
        },

        data() {
            return {
                indicatorHeight: 32,
            }
        },

        methods: {
            doToggleExpand() {
                this.$emit("toggle-expand")
            },

            handleClickAnIndicator(layer) {
                this.$emit('click-an-indicator', layer - 1)
            },

            handleMouseEnterAnIndicator(layer) {
                this.$emit('mouse-enter-an-indicator', layer)
            },

            handleMouseLeaveAnIndicator() {
                this.$emit('mouse-leave-an-indicator')
            },

            getIndicatorStyle(layer) {
                if (this.currentLayer === layer) {
                    return ['indicator--mouse-enter']
                } else {
                    return ['indicator--mouse-leave']
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./java-viewer";

    .field-name-column {
        display: flex;

        position: relative;

        flex: 1;

        //min-height: 28px;

        align-items: flex-start;

        min-width: 0;

        user-select: text;

        &__icon-container {
            padding-top: 4px;

            display: flex;

            align-items: center;

            justify-content: center;

            width: 24px;

            height: 24px;

            z-index: 999; // For Clicking
        }

        &__content-column {
            display: flex;

            flex: 1;

            align-items: center;

            min-width: 0;

            min-height: 27px;

            height: 100%;

            border-bottom: 1px solid #F1F1F1;
        }

        &__content-label {
            font-size: 11px;

            font-weight: normal;

            line-height: 16px;

            max-width: 80%;

            word-break: break-word;
        }
    }

    .field-name--ignore {
        text-decoration-line: line-through;
    }

    .required {
        user-select: none;

        color: #ff8282;
    }
</style>
