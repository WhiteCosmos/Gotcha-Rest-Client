<template>
    <div class="ev-http-client-empty-placeholder">
        <ev-label size="11" grey>
            <slot></slot>
        </ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvHttpClientEmptyPlaceholder",

        components: {
            EvLabel
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-empty-placeholder {
        @include full-center;

        width: 100%;

        height: 72px;

        border: 1px dashed #D8D8D8;

        border-radius: 5px;
    }
</style>
