<template>
    <div class="key-value-viewer-item" :class="styles">
        <div class="key-value-viewer-item__key-column">
            <span class="key-value-viewer-item__key-column__label">{{ item.key }}</span>
        </div>

        <div class="key-value-viewer-item__value-column">
            <span class="key-value-viewer-item__value-column__label" ref="value-label">{{ item.value }}</span>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvKeyValueViewerItem",

        components: {
            EvVerticalGutter, EvLabel
        },

        created() {

        },

        props: {
            item: Object,

            index: Number,

            diffColor: Boolean
        },

        computed: {
            styles() {
                if (this.index % 2 === 0 && this.diffColor) {
                    return ['key-value-viewer-item--grey']
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "KeyValueViewer";

    .key-value-viewer-item {
        @include horizon-center;

        min-height: 28px;

        padding-left: $KEY_VALUE_VIEWER_PADDING_LEFT;

        padding-right: $KEY_VALUE_VIEWER_PADDING_RIGHT;

        border-bottom: 1px solid #F1F1F1;

        transition: 80ms;

        flex-shrink: 0;

        &--grey {
            background-color: #FAFAFA;
        }

        //&:hover {
        //    background-color: #F5F5F5;
        //}

        &__key-column {
            display: flex;

            align-items: flex-start;

            height: 100%;

            width: 160px;

            padding-top: 8px;

            padding-bottom: 7px; // with 1px border

            margin-right: 8px;

            &__label {
                font-family: "SF Pro", sans-serif;

                font-size: 12px;

                font-weight: 500;

                width: 100%;

                line-height: 1.2; // Chromium Default

                user-select: text !important;

                cursor: text;

                color: $PRIMARY_FONT_COLOR;
            }
        }

        &__value-column {
            display: flex;

            min-height: 27px; // with 1px border

            padding-top: 8px;

            padding-bottom: 7px;

            flex: 1;

            &__label {
                font-family: "SF Pro", sans-serif;

                font-size: 12px;

                font-weight: 500;

                //font-weight: 800;

                line-height: 1.2; // // Chromium Default

                color: $PRIMARY_FONT_COLOR;

                word-break: break-all;

                user-select: text !important;

                cursor: text;
            }

            &__button {
                font-size: 10px;

                font-weight: bold;

                color: $PRIMARY_FONT_COLOR;

                user-select: none;
            }
        }
    }
</style>
