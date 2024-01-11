<template>
    <div class="d-flex align-center">
        <span class="http-payloads-selector__label">{{ label }} : </span>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <div class="http-payloads-selector__selector-container" v-if="isSingleItem">
            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span class="http-payloads-selector__selector-container__label text-truncate">{{ currentItem[itemKey] || defaultValue }}</span>

            <v-spacer></v-spacer>
        </div>

        <v-menu offset-y v-model="showSelectorMenu" v-else>
            <template v-slot:activator="{ on }">
                <div class="http-payloads-selector__selector-container" v-on="on">
                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <span class="http-payloads-selector__selector-container__label text-truncate">{{ currentItem[itemKey] || defaultValue }}</span>

                    <v-spacer></v-spacer>

                    <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

                    <select-icon></select-icon>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
                </div>
            </template>

            <div class="http-payloads-selector__selector-menu">
                <div class="http-payloads-selector__selector-menu__item" v-for="item in items" @click="doSelect(item)">
                    <span class="http-payloads-selector__selector-menu__item__label text-truncate">{{ item[itemKey] }}</span>
                </div>
            </div>
        </v-menu>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import SelectIcon from '@/components/icon/select-icon'

    import _ from 'lodash'

    export default {
        name: "EvHttpPayloadsSelector",

        components: {
            SelectIcon,
            EvVerticalGutter
        },

        created() {
            this.updateCurrentItem()
        },

        watch: {
            items() {
                this.updateCurrentItem()
            }
        },

        props: {
            label: {
                type: String,
                default: "Label"
            },

            defaultValue: String,

            items: Array,

            itemKey: String,
        },

        data() {
            return {
                showSelectorMenu: false,

                currentItem: undefined,
            }
        },

        computed: {
            isSingleItem() {
                return !_.isEmpty(this.items) && this.items.length === 1
            },
        },

        methods: {
            doSelect(item) {
                this.currentItem = item

                this.$emit('select', item)
            },

            updateCurrentItem() {
                if (_.isEmpty(this.items)) {
                    return
                }

                this.currentItem = this.items[0]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-payloads-selector {
        &__label {
            font-size: 11px;

            font-weight: bold;

            color: $PRIMARY_COLOR;
        }

        &__selector-container {
            display: flex;

            align-items: center;

            height: 20px;

            width: 172px;

            //background-color: #F1F1F1;

            @include white-background-gradient;

            border-radius: 2px;

            border: 1px solid $SECONDARY_COLOR;

            &__label {
                font-size: 11px;

                font-weight: bold;

                color: $PRIMARY_COLOR;

                width: 90%;
            }
        }

        &__selector-menu {
            width: 172px;

            //background-color: $SECONDARY_BACKGROUND_COLOR;

            background-color: #FAFAFA;

            user-select: none;

            &__item {
                height: 24px;

                display: flex;

                align-items: center;

                padding-left: 4px;

                &:hover {
                    background-color: #F1F1F1;
                }

                &__label {
                    font-size: 11px;

                    font-weight: bold;

                    color: $PRIMARY_COLOR;
                }
            }
        }
    }
</style>
