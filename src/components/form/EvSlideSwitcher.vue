<template>
    <div class="ev-slide-switcher">
        <div class="ev-slide-switcher__item" v-for="(item, index) in items" @click="doSelectItem(item)">
            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <span class="ev-slide-switcher__label" :class="labelClasses(item)">{{ item.name }}</span>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <v-divider vertical inset v-if="index < (items.length - 1)"></v-divider>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvSlideSwitcher",

        components: {
            EvVerticalGutter,
            EvLabel
        },

        created() {
            if (this.options) {
                if (this.options.panelType === this.items[0].code) {
                    this.selectedItem = this.items[0]
                }

                if (this.options.panelType === this.items[1].code) {
                    this.selectedItem = this.items[1]
                }
            } else {
                this.selectedItem = this.items[1]
            }
        },

        props: {
            options: Object,
        },

        data() {
            return {
                selectedItem: undefined
            }
        },

        computed: {
            items() {
                return [
                    {
                        name: this.$t('globalVariables'),
                        code: "GLOBAL_VARIABLES"
                    },
                    {
                        name: this.$t('environments'),
                        code: "ENVIRONMENT_VARIABLES"
                    },
                ]
            },
        },

        methods: {
            doSelectItem(item) {
                this.selectedItem = item

                this.$emit('select', item)
            },

            labelClasses(item) {
                if (this.selectedItem && item.code === this.selectedItem.code) {
                    return ['ev-slide-switcher__label--selected']
                } else {
                    return ['ev-slide-switcher__label--unselected']
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    globalVariables: "Global Variables",

                    environments: "Environments"
                },
                zh: {
                    globalVariables: "全局变量",

                    environments: "环境管理"
                },
                zh_TW: {
                    globalVariables: "全局變數",

                    environments: "環境管理"
                },
                jp: {
                    globalVariables: "グローバル変数",

                    environments: "環境管理",
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-slide-switcher {
        display: flex;

        align-items: center;

        height: 24px;

        border-radius: 3px;

        @include white-background-gradient;

        &__item {
            display: flex;

            align-items: center;

            height: 24px;

            width: fit-content;

            //padding-left: 16px;

            //padding-right: 16px;
        }

        &__label {
            font-size: 11px;

            font-weight: bold;

            &--unselected {
                color: $SECONDARY_FONT_COLOR;
            }

            &--selected {
                color: $PRIMARY_COLOR;

                //font-weight: bold;
            }
        }
    }
</style>
