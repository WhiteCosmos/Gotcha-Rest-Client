<template>
    <div class="tree-view-group-label" v-on="events">
        <!--        <div class="tree-view-group-label__icon-container" v-if="isServiceGroup">-->
        <!--            <v-icon x-small color="orange">fa-bolt</v-icon>-->
        <!--        </div>-->

        <!--        <div class="tree-view-group-label__icon-container" v-if="isModelGroup">-->
        <!--            <v-icon x-small color="green">fa-cubes</v-icon>-->
        <!--        </div>-->

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <span class="tree-view-group-label__label" :class="labelStyle">{{ $t('allApis') }}</span>

        <v-spacer></v-spacer>

        <div class="tree-view-group-label__icon-container" v-if="!disabled">
            <v-icon x-small color="#007AFF" v-if="show">fa-caret-down</v-icon>

            <v-icon x-small color="#007AFF" v-else>fa-caret-left</v-icon>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
    </div>
</template>

<script>
    import RabiTreeViewGroupType from '@/views/sidebar/group-selector/RabiTreeViewGroupType'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvTreeViewGroupLabel",

        components: {
            EvVerticalGutter
        },

        props: {
            events: Object,

            treeViewGroup: Object,

            disabled: Boolean,

            show: false,
        },

        computed: {
            name() {
                return this.treeViewGroup ? this.treeViewGroup.name : ""
            },

            isServiceGroup() {
                return this.treeViewGroup && (this.treeViewGroup.group === RabiTreeViewGroupType.HTTP_SERVICE_GROUP
                    || this.treeViewGroup.group === RabiTreeViewGroupType.JAVA_SERVICE_GROUP
                    || this.treeViewGroup.group === RabiTreeViewGroupType.API_GROUP)
            },

            isModelGroup() {
                return this.treeViewGroup && (this.treeViewGroup.group === RabiTreeViewGroupType.HTTP_MODEL_GROUP
                    || this.treeViewGroup.group === RabiTreeViewGroupType.JAVA_MODEL_GROUP)
            },

            labelStyle() {
                if (this.isServiceGroup) {
                    return ['tree-view-group-label__label--service-group']
                }

                if (this.isModelGroup) {
                    return ['tree-view-group-label__label--model-group']
                }
            }
        },

        i18n: {
            messages: {
                en: {
                    allApis: "All APIs"
                },
                zh: {
                    allApis: "全部接口"
                },
                zh_TW: {
                    allApis: "全部接口"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .tree-view-group-label {
        display: flex;

        align-items: center;

        flex: 1;

        height: 28px;

        padding-left: 6px;

        @include white-background-gradient;

        @include component-shadow;

        border-radius: $BORDER_RADIUS;

        user-select: none;

        &__icon-container {
            width: 16px;

            height: 16px;

            @include full-center;
        }

        &__label {
            font-size: 11px;

            line-height: 16px;

            font-weight: bolder;

            color: $SECONDARY_FONT_COLOR;

            //&--service-group {
            //    color: orange;
            //}
            //
            //&--model-group {
            //    color: green;
            //}
        }
    }
</style>
