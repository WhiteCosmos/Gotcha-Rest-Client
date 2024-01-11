<template>
    <div class="ev-http-client-response-docs-placeholder">
        <ev-label size="10" grey>No Response Body</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvHttpClientResponseDocsPlaceholder",
        components: {EvLabel},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-response-docs-placeholder {
        @include full-center;

        width: 100%;

        height: 72px;

        border: 1px dashed #F1F1F1;

        border-radius: 6px;
    }
</style>
