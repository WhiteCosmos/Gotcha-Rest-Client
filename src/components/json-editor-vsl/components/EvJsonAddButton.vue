<template>
    <div class="json-add-button">
        <ev-json-plus-icon></ev-json-plus-icon>
    </div>
</template>

<script>
    import EvJsonPlusIcon from '@/components/json-editor-vsl/icons/ev-json-plus-icon'

    export default {
        name: "EvJsonAddButton",

        components: {
            EvJsonPlusIcon
        },
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonEditor";

    .json-add-button {
        display: flex;

        justify-content: center;

        align-items: center;

        width: 16px;

        height: 16px;
    }
</style>
