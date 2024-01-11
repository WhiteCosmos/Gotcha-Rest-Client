<template>
    <div class="ev-tree-view-group-selector-menu-item">
        <div class="ev-tree-view-group-selector-menu-item__icon-container" v-if="isServiceGroup">
            <v-icon x-small color="orange">fa-bolt</v-icon>
        </div>

        <div class="ev-tree-view-group-selector-menu-item__icon-container" v-if="isModelGroup">
            <v-icon x-small color="green">fa-cubes</v-icon>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <span class="ev-tree-view-group-selector-menu-item__label" :class="labelStyle">{{ treeViewGroup.name }}</span>
    </div>
</template>

<script>
    import RabiTreeViewGroupType from '@/views/sidebar/group-selector/RabiTreeViewGroupType'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvTreeViewGroupSelectorMenuItem",

        components: {
            EvVerticalGutter
        },

        props: {
            treeViewGroup: Object
        },

        computed: {
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
                    return ['ev-tree-view-group-selector-menu-item__label--service-group']
                }

                if (this.isModelGroup) {
                    return ['ev-tree-view-group-selector-menu-item__label--model-group']
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-tree-view-group-selector-menu-item {
        display: flex;

        align-items: center;

        padding-left: 6px;

        height: 28px;

        &:hover {
            background-color: #F1F1F1;
        }

        &__label {
            font-size: 11px;

            font-weight: bolder;

            &--service-group {
                color: orange;
            }

            &--model-group {
                color: green;
            }
        }

        &__icon-container {
            width: 16px;

            height: 16px;

            @include full-center;
        }
    }
</style>
