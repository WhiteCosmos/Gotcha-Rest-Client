<template>
    <div class="ev-center tab-button selector-common-style-2">
        <slot></slot>
    </div>
</template>

<script>
    import ShrinkIcon from '@/assets/icon/shrink-icon'
    export default {
        name: "EvTabButton",
        components: {ShrinkIcon},
    }
</script>

<style lang="scss" scoped>
    .tab-button {
        width: 28px;

        height: 28px;
    }
</style>
