<template>
    <div class="api-tag d-flex align-center justify-center">
        <span class="api-tag__font">API</span>
    </div>
</template>

<script>
    export default {
        name: "EvApiTag",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .api-tag {
        height: 16px;

        border-radius: 2px;

        border: 1px solid $SECONDARY_COLOR;

        background-color: #f2f8ff;
    }

    .api-tag__font {
        width: 28px;

        text-align: center;

        font-size: 12px;

        line-height: 16px;

        font-weight: bold;

        //line-height: 14px;

        color: $PRIMARY_COLOR;

        font-family: "Helvetica", sans-serif;
    }

</style>
