<template>
    <div class="dv-faker-js-expression-tree-view">
        <div class="d-flex flex-column" v-for="(group, idx) in groups">
            <div class="dv-group" @click="toggleGroup(group)">
                <div class="dv-icon">
                    <ev-arrow-down color="#AABBCC" v-if="group.expand"></ev-arrow-down>

                    <ev-arrow-right color="#AABBCC" v-else></ev-arrow-right>
                </div>

                <ev-label size="12">{{ group.emoji }}</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="12" bold secondary>{{ capitalize(group.name) }}</ev-label>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-label size="12" bold secondary>{{ group.cname }}</ev-label>
            </div>

            <!--            <div class="dv-item" v-if="group.expand" style="margin-left: 28px">-->
            <!--                <ev-label size="11" secondary v-if="group.expand">{{ group.description }}</ev-label>-->
            <!--            </div>-->

            <div class="dv-item" v-for="item in group.items" v-if="group.expand" @click="emitSelectExpression(group, item)">
                <ev-label size="12" bold secondary>{{ item.name }}</ev-label>

                <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

                <ev-label size="11" grey>{{ item.description }}</ev-label>
            </div>
        </div>
    </div>
</template>

<script>
    import EvArrowDown from '@/components/icon/ev-arrow-down'
    import EvArrowRight from '@/components/icon/ev-arrow-right'
    import EvLabel from '@/components/typography/EvLabel'
    import DvFakerJsMixin from '@/components/dynamic-variable/faker-js/DvFakerJsMixin'
    import _ from 'lodash'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "DvFakerJsExpressionTreeView",

        components: {
            EvHorizonGutter,
            EvVerticalGutter,
            EvLabel,
            EvArrowRight,
            EvArrowDown
        },

        mixins: [
            DvFakerJsMixin,
        ],

        computed: {},

        data() {
            return {}
        },

        methods: {
            toggleGroup(group) {
                if (group.hasOwnProperty('expand')) {
                    group.expand = !group.expand
                } else {
                    this.$set(group, 'expand', true)
                }
            },

            capitalize(value) {
                return _.capitalize(value)
            },

            emitSelectExpression(group, item) {
                this.$emit('select', group, item)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .dv-faker-js-expression-tree-view {
        @include flex-column;

        //padding-left: 16px;
    }

    .dv-icon {
        @include full-center;

        width: 28px;

        height: 16px;

        padding-top: 1px;

        //background-color: #FF8282;
    }

    .dv-group {
        @include flex-row;

        align-items: center;

        min-height: 28px;

        width: 100%;
    }

    .dv-item {
        @include flex-column;

        //align-items: center;

        min-height: 48px;

        margin-left: 32px;

        margin-top: 8px;
    }

    .dv-divider {
        display: flex;

        flex: 1;

        height: 1px;

        background-color: #E0E0E0;
    }
</style>
