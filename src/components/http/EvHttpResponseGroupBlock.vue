<template>
    <div class="http-response-group">
        <div class="http-response-group__title">
            <span class="http-response-group__title__label">返回响应</span>

            <v-spacer></v-spacer>

            <!--            <span class="http-response-body__title__content-type">Content-Type: </span>-->

            <!--            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>-->

            <!--            <span class="http-response-body__title__content-type">application/json</span>-->
        </div>

        <div class="d-flex flex-column" style="background-color: #FCFCFC; padding-left: 16px">
            <div class="http-response-group__row">
                <span class="http-response-group__row__status-code">200 OK</span>

                <span class="http-response-group__row__description">Successful Operation</span>
            </div>

            <div class="http-response-group__row">
                <span class="http-response-group__row__status-code">400 Invalid</span>


                <span class="http-response-group__row__description">Invalid Operation</span>
            </div>

            <div class="http-response-group__row">
                <span class="http-response-group__row__status-code">500 Internal Server Error</span>

                <span class="http-response-group__row__description">Service Exception</span>
            </div>
        </div>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvHttpResponseGroupBlock",

        components: {
            EvVerticalGutter,
            EvHttpEmptyPlaceholder,
            EvHorizonGutter
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-response-group {
        //padding-left: 24px;

        display: flex;

        flex-direction: column;

        justify-content: flex-start;

        &__title {
            @include horizon-center;

            height: 32px;

            user-select: none;

            border-bottom: 1px solid #007AFF;

            &__label {
                color: #007AFF;

                font-size: 12px;

                font-weight: bold;

                line-height: 24px;
            }
        }

        &__row {
            display: flex;

            flex-direction: column;

            justify-content: center;

            height: 56px;

            //border-bottom: 1px solid #E0E0E0;

            &__status-code {
                color: $GREEN_COLOR;

                font-size: 11px;

                font-weight: bold;

                line-height: 16px;
            }

            &__description {
                //color: $SECONDARY_FONT_COLOR;

                color: #AABBCC;

                font-size: 11px;

                font-weight: bold;

                line-height: 24px;
            }
        }
    }
</style>
