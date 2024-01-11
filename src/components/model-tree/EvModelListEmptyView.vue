<template>
    <div class="model-list-empty-view">
        <span class="model-list-empty-view-title">{{ $t("EvModelListEmptyView.title") }}</span>

        <span class="model-list-empty-view-subtitle">{{ $t("EvModelListEmptyView.subtitle") }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvModelListEmptyView",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .model-list-empty-view {
        @include full-center;

        flex-direction: column;

        width: 100%;

        height: 100%;

        padding-bottom: 72px;

        user-select: none;

        .model-list-empty-view-title {
            font-size: 12px;

            line-height: 40px;

            font-weight: bold;

            color: $PRIMARY_COLOR;
        }

        .model-list-empty-view-subtitle {
            font-size: 10px;

            line-height: 32px;

            font-weight: normal;

            color: #AABBCC;
        }
    }
</style>
