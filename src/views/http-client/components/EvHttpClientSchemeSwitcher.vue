<template>
    <div class="http-client-scheme-switcher">
        <span class="http-client-scheme-switcher__http-label" :class="httpStyles" @click="doSelect('http')">HTTP</span>

        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <span class="http-client-scheme-switcher__https-label" :class="httpsStyles" @click="doSelect('https')">HTTPS</span>

        <v-spacer></v-spacer>

        <!--        <div class="ev-label-wrapper">-->
        <!--            <ev-label size="11" orange>证书选择</ev-label>-->
        <!--        </div>-->
    </div>
</template>

<script>
    import EvVerticalDivider from '@/components/layout/EvVerticalDivider'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvHttpClientSchemeSwitcher",

        components: {
            EvLabel,
            EvVerticalGutter,
            EvHorizonDivider,
            EvVerticalDivider
        },

        created() {
            this.scheme && (this.scheme_ = this.scheme.toLowerCase())
        },

        model: {
            prop: "scheme",
            event: "change"
        },

        props: {
            scheme: {
                type: String,
                default: () => {
                    return "http"
                }
            },
        },

        data() {
            return {
                scheme_: "http"
            }
        },

        watch: {
            scheme() {
                this.scheme && (this.scheme_ = this.scheme.toLowerCase())
            }
        },

        computed: {
            httpStyles() {
                if (this.scheme_ === "http") {
                    return [
                        'http-client-scheme-switcher__http-label--selected'
                    ]
                }
            },

            httpsStyles() {
                if (this.scheme_ === "https") {
                    return [
                        'http-client-scheme-switcher__https-label--selected'
                    ]
                }
            }
        },

        methods: {
            doSelect(val) {
                this.scheme_ = val

                this.$emit('change', val)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-scheme-switcher {
        display: flex;

        align-items: center;

        height: 28px;

        width: 100%;

        user-select: none;

        &__http-label {
            font-size: 11px;

            font-weight: 500;

            line-height: 16px;

            color: $PLACEHOLDER_FONT_COLOR;

            transition: .1s;

            &--selected {
                color: $PRIMARY_FONT_COLOR;

                font-weight: 500;
            }
        }

        &__https-label {
            font-size: 11px;

            line-height: 16px;

            font-weight: 500;

            color: $PLACEHOLDER_FONT_COLOR;

            &--selected {
                font-weight: 500;

                color: $GREEN_COLOR;
            }
        }
    }

    .ev-label-wrapper {
        display: flex;

        align-items: center;

        width: fit-content;

        padding-left: 4px;

        padding-right: 4px;

        height: 16px;

        background-color: #fff7e6;

        border-radius: 3px;

        transition: 100ms;

        &:hover {
            background-color: #ffefcc;
        }
    }
</style>
