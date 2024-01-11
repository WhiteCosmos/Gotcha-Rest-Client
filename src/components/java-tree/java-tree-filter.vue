<template>
    <div class="java-tree-filter d-flex align-center">
        <div class="filter-icon d-flex align-center justify-center">
            <search-icon></search-icon>
        </div>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <input placeholder="搜索接口" class="input-style">
    </div>
</template>

<script>
    import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
    import SearchIcon from '@/components/icon/search-icon'

    export default {
        name: "java-tree-filter",

        components: {SearchIcon, EvVerticalGutter},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .java-tree-filter {
        height: 28px;

        width: 100%;

        border: 1px solid #007AFF;

        border-radius: 16px;

        background-color: white;

        padding: 4px;
    }

    .filter-icon {
        width: 20px;

        height: 20px;

        border-radius: 12px;

        //background-color: #626a73;
    }

    .input-style {
        border: none;

        outline: none;

        width: 100%;

        font-size: 12px;

        background-color: white;

        color: $SECONDARY_FONT_COLOR;
    }
</style>
