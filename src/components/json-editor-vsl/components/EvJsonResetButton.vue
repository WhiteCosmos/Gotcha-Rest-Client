<template>
    <div class="json-add-button">
        <ev-json-reset-icon></ev-json-reset-icon>
    </div>
</template>

<script>
    import EvJsonPlusIcon from '@/components/json-editor-vsl/icons/ev-json-plus-icon'
    import EvJsonResetIcon from '@/components/json-editor-vsl/icons/ev-json-reset-icon'

    export default {
        name: "EvJsonResetButton",

        components: {
            EvJsonResetIcon,
            EvJsonPlusIcon
        },
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonEditor";

    .json-add-button {
        @include full-center;

        width: 16px;

        height: 16px;
    }
</style>
