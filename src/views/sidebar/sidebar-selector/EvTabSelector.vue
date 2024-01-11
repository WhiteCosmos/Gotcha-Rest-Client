<template>
    <v-menu offset-y v-model="expand_" open-delay="100" attach=".tool-container">
        <template v-slot:activator="{ on }">
            <div class="ev-selector d-flex align-center" v-on="on" style="width: 160px">
                <!--                <ev-tab-selector-item :tree-type="treeTypes.RESTFUL_APIS" v-if="treeType_ === treeTypes.RESTFUL_APIS"></ev-tab-selector-item>-->

                <!--                <ev-tab-selector-item :tree-type="treeTypes.RESTFUL_MODELS" v-if="treeType_ === treeTypes.RESTFUL_MODELS"></ev-tab-selector-item>-->

                <!--                <ev-tab-selector-item :tree-type="treeTypes.JAVA_SERVICES" v-if="treeType_ === treeTypes.JAVA_SERVICES"></ev-tab-selector-item>-->

                <!--                <ev-tab-selector-item :tree-type="treeTypes.JAVA_MODELS" v-if="treeType_ === treeTypes.JAVA_MODELS"></ev-tab-selector-item>-->

                <ev-tab-selector-item :tree-type="treeType_"></ev-tab-selector-item>

                <v-spacer></v-spacer>

                <div class="ev-selector__indicator">
                    <v-icon color="white" x-small v-if="expand_">fa-angle-down</v-icon>

                    <v-icon color="white" x-small v-else>fa-angle-left</v-icon>
                </div>
            </div>
        </template>

        <div class="tab-menu d-flex flex-column">
            <ev-tab-selector-item :tree-type="treeTypes.RESTFUL_APIS" @click.native="treeType_ = treeTypes.RESTFUL_APIS" class="item-hover"></ev-tab-selector-item>

            <ev-tab-selector-item :tree-type="treeTypes.RESTFUL_MODELS" @click.native="treeType_ = treeTypes.RESTFUL_MODELS" class="item-hover"></ev-tab-selector-item>

            <ev-horizon-divider></ev-horizon-divider>

            <ev-tab-selector-item :tree-type="treeTypes.JAVA_SERVICES" @click.native="treeType_ = treeTypes.JAVA_SERVICES" class="item-hover"></ev-tab-selector-item>

            <ev-tab-selector-item :tree-type="treeTypes.JAVA_MODELS" @click.native="treeType_ = treeTypes.JAVA_MODELS" class="item-hover"></ev-tab-selector-item>
        </div>
    </v-menu>
</template>

<script>
    import ApiIcon from '@/components/icon/api-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvApiTag from '@/views/sidebar/sidebar-selector/EvApiTag'
    import EvBeanTag from '@/views/sidebar/sidebar-selector/EvBeanTag'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvCount from '@/components/tag/EvCount'
    import EvTabSelectorItem from '@/views/sidebar/sidebar-selector/EvTabSelectorItem'
    import {EvTreeViewSelectorEventBus, EvTreeViewSelectorEvents} from '@/views/sidebar/tree-view-selector/EvTreeViewSelectorEventBus'
    import EvTreeViewSelectorMixin from '@/views/sidebar/tree-view-selector/EvTreeViewSelectorMixin'

    export default {
        name: "EvTabSelector",

        components: {EvTabSelectorItem, EvCount, EvHorizonDivider, EvBeanTag, EvApiTag, EvVerticalGutter, ApiIcon},

        mixins: [
            EvStoreMixin,

            EvTreeViewSelectorMixin,
        ],

        model: {
            prop: "treeType",
            event: "change"
        },

        props: {
            treeType: {
                type: String,
                default: "RESTFUL_APIS"
            }
        },

        mounted() {
            this.treeType_ = this.treeType

            EvTreeViewSelectorEventBus.$emit(EvTreeViewSelectorEvents.TREE_VIEW_SWITCH, this.toTreeViewType(this.treeType), this.toTreeViewType(this.treeType))
        },

        data() {
            return {
                expand_: false,

                treeType_: "JAVA_SERVICES",

                treeTypes: {
                    JAVA_SERVICES: "JAVA_SERVICES",

                    JAVA_MODELS: "JAVA_MODELS",

                    RESTFUL_APIS: "RESTFUL_APIS",

                    RESTFUL_MODELS: "RESTFUL_MODELS",
                },
            }
        },

        methods: {
            toTreeViewType(treeType) {
                if (treeType === this.treeTypes.RESTFUL_APIS) {
                    return this.treeViewTypes.HTTP_API_VIEW
                }

                if (treeType === this.treeTypes.RESTFUL_MODELS) {
                    return this.treeViewTypes.HTTP_MODEL_VIEW
                }

                if (treeType === this.treeTypes.JAVA_SERVICES) {
                    return this.treeViewTypes.JAVA_API_VIEW
                }

                if (treeType === this.treeTypes.JAVA_MODELS) {
                    return this.treeViewTypes.JAVA_MODEL_VIEW
                }
            }
        },

        watch: {
            treeType(newVal, oldVal) {
                this.treeType_ = newVal

                // Temporary

                EvTreeViewSelectorEventBus.$emit(EvTreeViewSelectorEvents.TREE_VIEW_SWITCH, this.toTreeViewType(newVal), this.toTreeViewType(oldVal))
            },

            treeType_(newVal, oldVal) {
                this.$emit('change', newVal)

                // Temporary

                EvTreeViewSelectorEventBus.$emit(EvTreeViewSelectorEvents.TREE_VIEW_SWITCH, this.toTreeViewType(newVal), this.toTreeViewType(oldVal))
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .menu-style {

    }

    .tab-menu {
        @include white-background-gradient;

        user-select: none;
    }

    .item-hover {
        &:hover {
            background-color: #e6ecf2;
        }
    }
</style>
