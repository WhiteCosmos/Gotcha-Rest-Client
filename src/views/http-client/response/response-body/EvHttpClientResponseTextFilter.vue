<template>
    <div class="ev-http-client-response-text-filter">
        <div class="ev-http-client-response-text-filter__input-container">
            <ev-borderless-input dense v-model="value" placeholder="Full Text Search"></ev-borderless-input>

            <v-spacer></v-spacer>

            <div class="ev-http-client-response-text-filter__control-panel" v-if="value">
                <div class="ev-http-client-response-text-filter__control-panel__icon" @click="emitFindPrevious">
                    <ev-http-client-arrow-top-icon></ev-http-client-arrow-top-icon>
                </div>

                <ev-vertical-gutter :gutter="2"></ev-vertical-gutter>

                <div class="ev-http-client-response-text-filter__control-panel__icon" @click="emitFindNext">
                    <ev-http-client-arrow-bottom-icon></ev-http-client-arrow-bottom-icon>
                </div>

                <!--                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

                <!--                <ev-label size="10" secondary>1 of 9</ev-label>-->
            </div>
        </div>
    </div>
</template>

<script>
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHttpClientArrowTopIcon from '@/views/http-client/response/response-body/EvHttpClientArrowTopIcon'
    import EvHttpClientArrowBottomIcon from '@/views/http-client/response/response-body/EvHttpClientArrowBottomIcon'
    import DelayTrigger from '@/core/utils/DelayTrigger'

    export default {
        name: "EvHttpClientResponseTextFilter",

        components: {
            EvHttpClientArrowBottomIcon,
            EvHttpClientArrowTopIcon,
            EvVerticalGutter,
            EvLabel,
            EvBorderlessInput
        },

        props: {
            matchCount: Number,
        },

        data() {
            return {
                value: "",

                trigger: undefined,
            }
        },

        watch: {
            value() {
                if (!this.value) {
                    this.$emit('search', this.value)
                }

                if (!this.trigger) {
                    this.trigger = new DelayTrigger(300, () => {
                        this.$emit('search', this.value)
                    })
                } else {
                    this.trigger.refresh()
                }
            }
        },

        methods: {
            emitFindPrevious() {
                this.$emit('find-previous')
            },

            emitFindNext() {
                this.$emit('find-next')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-response-text-filter {
        display: flex;

        //align-items: center;

        flex-shrink: 0;

        height: 28px;

        width: 100%;

        background-color: #FCFCFC;

        border-top: 1px solid #F1F1F1;

        //padding: 4px;

        //padding-left: 36px;

        padding-top: 4px;

        padding-left: 4px;

        padding-right: 4px;

        &__input-container {
            display: flex;

            align-items: center;

            padding-left: 4px;

            padding-right: 4px;

            width: 100%;

            height: 20px;

            border: 1px solid #E0E0E0;

            border-radius: 4px;

            background-color: #EAEAEA;
        }

        &__control-panel {
            display: flex;

            flex-shrink: 0;

            width: fit-content;

            height: 20px;

            align-items: center;

            padding-left: 4px;

            padding-right: 4px;

            //background-color: #FF8282;

            //opacity: 0.5;

            &__icon {
                @include full-center;

                height: 12px;

                width: 12px;

                border-radius: 3px;

                &:hover {
                    background-color: #D8D8D8;
                }
            }
        }
    }
</style>
