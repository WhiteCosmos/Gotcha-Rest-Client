<template>
    <div class="dv-menu">
        <div class="dv-enumeration-menu__placeholder" v-if="isEmpty">
            <ev-label size="11" grey>{{ $t('empty') }}</ev-label>
        </div>

        <div class="dv-menu__item" v-for="item in items" @click="doSelectItem(item)">
            <ev-label size="11" secondary bold v-if="item[name]">{{ item[name] }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    import _ from 'lodash'

    export default {
        name: "DvMenu",

        components: {
            EvLabel
        },

        props: {
            items: Array,

            name: String,
        },

        computed: {
            isEmpty() {
                return _.isEmpty(this.items)
            },
        },

        methods: {
            doSelectItem(item) {
                this.$emit('select', item)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .dv-menu {
        display: flex;

        flex-direction: column;

        max-height: 320px;

        min-height: 1px;

        min-width: 1px;

        background-color: #F1F1F1;

        border: 1px solid #D8D8D8;

        border-radius: 5px;

        overflow-y: auto;

        &__item {
            display: flex;

            flex-shrink: 0;

            align-items: center;

            height: 24px;

            padding-left: 4px;

            padding-right: 4px;

            &:hover {
                background-color: #e0e0e0;
            }
        }
    }
</style>
