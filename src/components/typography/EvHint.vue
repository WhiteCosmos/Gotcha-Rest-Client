<template>
    <div class="ev-hint">
        <ev-hint-icon></ev-hint-icon>
    </div>
</template>

<script>
    import EvHintIcon from '@/assets/icon/ev-hint-icon.vue'

    export default {
        name: "EvHint",
        components: {EvHintIcon},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-hint {
        @include full-center;
    }
</style>
