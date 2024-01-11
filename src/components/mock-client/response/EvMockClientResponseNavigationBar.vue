<template>
    <div class="d-flex justify-center align-center mock-client-response-navigation-bar">
        <div class="d-flex mock-client-response-navigation-bar__item">
            <span class="mock-client-response-navigation-bar__item__label">Response Headers</span>
        </div>

        <div class="d-flex mock-client-response-navigation-bar__item">
            <span class="mock-client-response-navigation-bar__item__label mock-client-response-navigation-bar__item__label--selected">Response Body</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EvMockClientResponseNavigationBar",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .mock-client-response-navigation-bar {
        width: 100%;

        height: 40px;

        background-color: #FAFAFA;

        padding-right: 36px;

        &__item {
            width: 120px;

            user-select: none;

            justify-content: center;

            &__label {
                font-size: 11px;

                font-weight: normal;

                color: #CCC;

                &--selected {
                    color: $PRIMARY_COLOR;

                    font-weight: bold;
                }

                &--unselected {

                }
            }
        }
    }
</style>
