<template>
    <div class="ev-menu">
        <slot></slot>
    </div>
</template>

<script>
    import EvMenuTopIndicator from '@/components/json-editor-vsl/icons/ev-menu-top-indicator'

    export default {
        name: "EvMenu",
        components: {
            EvMenuTopIndicator,
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-menu {
        display: flex;

        flex-direction: column;

        background-color: #F1F1F1;

        border-radius: 4px;

        padding: 4px;

        overflow: auto;
    }

    .ev-menu-indicator {
        position: absolute;

        display: block;

        top: -12px;

        align-self: center;
    }
</style>
