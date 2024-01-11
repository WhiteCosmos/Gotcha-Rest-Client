<template>
    <div class="d-flex mock-client-response-delay">

    </div>
</template>

<script>
    export default {
        name: "EvMockClientResponseDelay",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .mock-client-response-delay {
        height: 28px;

        display: flex;

        flex: 1;

        border: 1px solid $SECONDARY_COLOR;

        border-radius: 3px;

        @include white-background-gradient;

        @include component-shadow;
    }
</style>
