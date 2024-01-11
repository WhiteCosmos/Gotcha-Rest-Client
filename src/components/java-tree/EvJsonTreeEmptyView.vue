<template>
    <div class="json-tree-empty-view">
        <span class="json-tree-empty-view-title">{{ $t("EvJsonTreeEmptyView.title") }}</span>

        <span class="json-tree-empty-view-subtitle">{{ $t("EvJsonTreeEmptyView.subtitle") }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvJsonTreeEmptyView",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .json-tree-empty-view {
        @include full-center;

        flex-direction: column;

        width: 100%;

        height: 100%;

        padding-bottom: 72px;

        user-select: none;

        .json-tree-empty-view-title {
            font-size: 12px;

            line-height: 40px;

            font-weight: bold;

            color: $PRIMARY_COLOR;
        }

        .json-tree-empty-view-subtitle {
            font-size: 10px;

            line-height: 32px;

            font-weight: normal;

            color: #AABBCC;
        }
    }
</style>
