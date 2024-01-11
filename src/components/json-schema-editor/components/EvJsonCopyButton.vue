<template>
    <div class="json-add-button">
        <ev-json-copy-icon></ev-json-copy-icon>
    </div>
</template>

<script>
    import EvJsonPlusIcon from '@/components/json-editor-vsl/icons/ev-json-plus-icon'
    import EvJsonCopyIcon from '@/components/json-editor-vsl/icons/ev-json-copy-icon'

    export default {
        name: "EvJsonCopyButton",
        components: {EvJsonCopyIcon, EvJsonPlusIcon},
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonSchemaEditor";

    .json-add-button {
        @include full-center;

        width: 14px;

        height: 14px;
    }
</style>
