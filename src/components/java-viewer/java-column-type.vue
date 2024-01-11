<template>
    <div class="field-type-column" :class="columnOnHoverClass">
        <!-- 字段类型名称 -->

        <span class="field-type-column__type-label" :style="fieldTypeColorStyle" :class="typeNotFoundClass">{{ fieldType }}</span>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <!-- 字段JSON类型名称 -->

        <span class="field-type-column__subtype-label">{{ fieldFormat }}</span>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <!-- 字段类型标签 -->

        <ev-round-tag v-if="fieldParameterType">{{ fieldParameterType.toUpperCase() }}</ev-round-tag>

        <div class="d-flex" v-else-if="isTypeNotFound">
            <EvVerticalGutter :gutter="8"></EvVerticalGutter>

            <EvAlertIcon></EvAlertIcon>
        </div>

        <div class="d-flex" v-else-if="isRecursiveType">
            <ev-recursive-tag>RECURSIVE</ev-recursive-tag>
        </div>

        <EvVerticalGutter :gutter="4"></EvVerticalGutter>
    </div>
</template>

<script>
    import JsonStructMixin from "./JsonStructMixin"
    import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
    import EvAlertIcon from '@/components/icon/EvAlertIcon'
    import EvRoundTag from '@/components/tag/EvRoundTag'
    import EvRecursiveTag from '@/components/tag/EvRecursiveTag'

    export default {
        name: "java-column-type",

        components: {
            EvRecursiveTag,
            EvRoundTag,
            EvAlertIcon,
            EvVerticalGutter,
        },

        mixins: [
            JsonStructMixin
        ],

        computed: {
            typeNotFoundClass() {
                return {
                    'type-not-found': this.isTypeNotFound
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./java-viewer";

    .field-type-column {
        display: flex;

        flex: 1;

        min-height: 27px;

        border-bottom: 1px solid #F1F1F1;

        align-items: flex-start;

        padding-top: 6px;

        min-width: 0;

        user-select: text;

        &__type-label {
            font-size: 11px;

            font-weight: normal;

            line-height: 16px;

            max-width: 80%;

            word-break: break-word;
        }

        &__subtype-label {
            font-size: 11px;

            font-weight: normal;

            color: #AABBCC;
        }
    }

    .type-not-found {
        text-decoration-line: line-through;
    }
</style>
