<template>
    <div class="d-flex justify-center align-center mock-client-update-mock-button">
        <span class="mock-client-update-mock-button__label">UPDATE</span>
    </div>
</template>

<script>
    export default {
        name: "EvMockClientUpdateMockButton",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .mock-client-update-mock-button {
        width: 64px;

        height: 28px;

        @include component-shadow;

        @include blue-background-gradient;

        border-radius: 4px;

        &__label {
            font-size: 11px;

            line-height: 16px;

            font-weight: bold;

            color: white;
        }
    }
</style>
