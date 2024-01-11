<template>
    <div class="model-tree-view-item" @mouseenter="toggleHover" @mouseleave="toggleHover">
        <div class="model-tree-view-indicator">
            <div class="indicator-icon" v-if="isSelected"></div>
        </div>

        <div class="d-flex flex-column flex-grow-1">
            <span :class="modelTitleClasses" v-html="fieldSummary"></span>

            <span :class="modelSubtitleClasses" v-html="fieldDescription"></span>
        </div>
    </div>
</template>

<script>
    import {
        EvModelListViewEventBus,
        EvModelListViewEvents
    } from '@/components/model-tree/EvModelListViewEventBus'
    import EvJsonTreeViewMixin from '@/components/java-tree/EvJsonTreeViewMixin'
    import _ from 'lodash'

    export default {
        name: "EvModelListViewItem",

        mixins: [
            EvJsonTreeViewMixin,
        ],

        created() {
            EvModelListViewEventBus.$on(EvModelListViewEvents.SEARCH, (s) => {
                this.handleSearch(s)
            })
        },

        props: {
            jsonStruct: Object,

            selectedJsonStruct: Object,
        },

        data() {
            return {
                keyword: undefined,

                hover: false,
            }
        },

        computed: {
            isSelected() {
                return this.jsonStruct === this.selectedJsonStruct
            },

            fieldSummary() {
                let highlight = this.jsonStruct.fieldName

                return this.replaceWithHighlight(highlight, this.keyword)
            },

            fieldDescription() {
                let highlight = this.jsonStruct.fieldSummary || '/'

                return this.replaceWithHighlight(highlight, this.keyword)
            },

            modelTitleClasses() {
                return [
                    'model-tree-view-title',
                    'text-truncate',
                    (this.isSelected || this.hover) ? 'model-tree-view-title--selected' : ''
                ]
            },

            modelSubtitleClasses() {
                return [
                    'model-tree-view-subtitle',
                    'text-truncate',
                    (this.isSelected || this.hover) ? 'model-tree-view-subtitle--selected' : ''
                ]
            }
        },

        methods: {
            toggleHover() {
                this.hover = !this.hover
            },

            handleSearch(s) {
                if (_.isEmpty(s)) {
                    this.keyword = undefined
                } else {
                    this.keyword = s
                }
            },

            replaceWithHighlight_(text, keyword) {
                return undefined
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .model-tree-view-item {
        display: flex;

        align-items: center;

        height: 56px;

        border-bottom: 1px solid #F2F2F2;

        transition: 80ms;

        &:hover {
            background-color: #FAFAFA;
        }

        .model-tree-view-indicator {
            @include square(28px, 0);

            padding-left: 0px; // 为了与其它图标对齐

            .indicator-icon {
                width: 4px;

                height: 12px;

                border-radius: 4px;

                background-color: $PRIMARY_COLOR;

                transform: scale(.8);

                box-shadow: 0px 1px 4px -2px #C2C7CC;
            }
        }
    }

    .model-tree-view-title {
        font-size: 12px;

        line-height: 32px;

        font-weight: bold;

        max-width: 240px;

        transition: 100ms;

        & {
            color: $SECONDARY_FONT_COLOR;
        }

        &--selected {
            color: $PRIMARY_COLOR;
        }
    }

    .model-tree-view-subtitle {
        font-size: 10px;

        line-height: 24px;

        max-width: 240px;

        transition: 100ms;

        & {
            color: $PLACEHOLDER_FONT_COLOR;
        }

        &--selected {
            color: $PRIMARY_COLOR;
        }
    }

    ::v-deep .highlight {
        background-color: #f3d23e;

        color: black;
    }
</style>
