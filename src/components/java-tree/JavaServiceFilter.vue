<template>
    <div class="java-service-filter d-flex align-center" @keydown.esc="clear()">
        <div class="filter-icon">
            <search-icon></search-icon>
        </div>

        <div class="d-flex flex-grow-1">
            <input type="text" class="filter-input" :placeholder="$t('search')" v-model="filterKeyword_">
        </div>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-cancel-icon v-show="filterKeyword_" @click.native="clear"></ev-cancel-icon>

        <!--        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

        <!--        <ev-filter-icon></ev-filter-icon>-->

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
    </div>
</template>

<script>
    import FilterIcon from '@/components/icon/filter-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import CancelIcon from '@/components/icon/cancel-icon'
    import EvEscButton from '@/components/java-tree/EvEscButton'
    import SearchIcon from '@/components/icon/search-icon'
    import {EvJsonTreeViewEventBus, EvJsonTreeViewEvents} from '@/components/java-tree/EvJsonTreeViewEventBus'
    import {EvTreeViewSelectorEventBus, EvTreeViewSelectorEvents} from '@/views/sidebar/tree-view-selector/EvTreeViewSelectorEventBus'
    import {EvModelListViewEventBus, EvModelListViewEvents} from '@/components/model-tree/EvModelListViewEventBus'
    import {EvLocalRepositoryEventBus, EvLocalRepositoryEvents} from '@/events/EvLocalRepositoryEventBus'
    import EvCancelIcon from '@/views/http-client/components/multipart-form-editor/ev-cancel-icon'
    import EvFilterIcon from '@/assets/icon/ev-filter-icon'

    export default {
        name: "JavaServiceFilter",

        components: {
            EvFilterIcon,
            EvCancelIcon,
            SearchIcon,
            EvEscButton, CancelIcon,
            EvVerticalGutter,
            FilterIcon
        },

        created() {
            EvLocalRepositoryEventBus.$on(EvLocalRepositoryEvents.LOCAL_REPOSITORY_EVENTS, () => {
                this.handleTreeViewSwitch()
            })

            EvTreeViewSelectorEventBus.$on(EvTreeViewSelectorEvents.TREE_VIEW_SWITCH, () => {
                this.handleTreeViewSwitch()
            })
        },

        model: {
            prop: "filterKeyword",

            event: 'change'
        },

        props: {
            filterKeyword: {
                type: String,

                default: ""
            }
        },

        data() {
            return {
                filterKeyword_: ""
            }
        },

        methods: {
            clear() {
                this.filterKeyword_ = ""
            },

            handleTreeViewSwitch(newTreeViewType, oldTreeViewType) {
                this.clear()
            }
        },

        watch: {
            filterKeyword_(newVal) {
                this.$emit('change', newVal)

                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents.SEARCH, newVal)

                EvModelListViewEventBus.$emit(EvModelListViewEvents.SEARCH, newVal)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .java-service-filter {
        width: 100%;

        height: 28px;

        user-select: none;

        border-radius: 5px;

        //border: 1px solid #EAEAEA;

        background-image: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);

        box-shadow: 0 2px 4px -2px $SHADOW_COLOR;
    }

    .filter-icon {
        width: 28px;

        height: 28px;

        display: flex;

        justify-content: center;

        align-items: center;

        padding-left: 1px;
    }

    .filter-input {
        width: 100%;

        border: none;

        outline: none;

        caret-color: #AABBCC;

        font-family: "SF Pro", sans-serif;

        font-size: 12px;

        font-weight: 500;

        color: $SECONDARY_FONT_COLOR;

        &::placeholder {
            color: #AABBCC;

            font-size: 12px;
        }
    }
</style>
