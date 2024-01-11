<template>
    <div class="no-search-results">
        <span class="no-search-results-title">{{ $t("EvNoSearchResults.title") }}</span>

        <span class="no-search-results-subtitle">{{ $t("EvNoSearchResults.subtitle", {keyword: keyword}) }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvNoSearchResults",

        props: {
            keyword: String,
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .no-search-results {
        @include full-center;

        flex-direction: column;

        width: 100%;

        height: 100%;

        padding-bottom: 72px;

        user-select: none;

        .no-search-results-title {
            font-size: 12px;

            line-height: 40px;

            font-weight: bold;

            color: $PRIMARY_COLOR;
        }

        .no-search-results-subtitle {
            font-size: 10px;

            line-height: 32px;

            font-weight: normal;

            color: #AABBCC;
        }
    }
</style>
