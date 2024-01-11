<template>
    <div class="request-menu-item">
        <span :class="labelStyle">{{ menuLabel }}</span>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <div :class="indicatorStyle" v-if="showIndicator"></div>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvProTag from '@/components/tag/EvProTag.vue'

    export default {
        name: "EvHttpClientRequestMenuItem",

        components: {
            EvProTag,
            EvVerticalGutter
        },

        props: {
            label: String,

            active: false,

            enable: true,

            menu: Object,
        },

        computed: {
            showIndicator() {
                    return this.menu.indicator
            },

            labelStyle() {
                return [
                    'request-menu-item__label',
                    this.active ? 'request-menu-item__label--active' : 'request-menu-item__label--inactive',
                ]
            },

            indicatorStyle() {
                return [
                    'request-menu-item__indicator',
                    this.enable ? 'request-menu-item__indicator--enable' : 'request-menu-item__indicator--disable'
                ]
            },

            menuLabel() {
                switch (this.menu.type) {
                    case 'DESCRIPTION':
                        return this.$t('EvHttpClientRequestMenu.docs')
                    case 'REQUEST_HEADERS':
                        return this.$t('EvHttpClientRequestMenu.headers')
                    case 'REQUEST_PARAMETERS':
                        return this.$t('EvHttpClientRequestMenu.urlParams')
                    case 'REQUEST_BODY':
                        return this.$t('EvHttpClientRequestMenu.body')
                    case 'AUTHORIZATION':
                        return this.$t('EvHttpClientRequestMenu.auth')
                    case 'RESPONSE_ASSERTION':
                        return this.$t('EvHttpClientRequestMenu.tests')
                    default:
                        return "unknown"
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .request-menu-item {
        @include horizon-center;

        margin-right: 12px;

        height: 20px;

        &__label {
            font-size: 11px;

            font-weight: bold;

            user-select: none;

            white-space: nowrap;

            //padding-top: 2px;

            &--active {
                color: $PRIMARY_COLOR;
            }

            &--inactive {
                color: $SECONDARY_FONT_COLOR;
            }

            &--disabled {
                color: $PLACEHOLDER_FONT_COLOR;
            }
        }

        &__indicator {
            @include circle(6px);

            &--enable {
                background-color: #a3d96c;

                border: 1px solid #99cc66;
            }

            &--disable {
                background-color: transparent;

                border: 1px solid #AABBCC;
            }
        }
    }
</style>
