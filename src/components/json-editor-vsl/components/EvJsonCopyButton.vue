<template>
    <div class="ev-icon-wrapper" @click="emitCopy">
        <ev-copy-icon></ev-copy-icon>
    </div>
</template>

<script>
    import EvCopyIcon from '@/components/icon/ev-copy-icon.vue'

    export default {
        name: "EvJsonCopyButton",

        components: {
            EvCopyIcon
        },

        methods: {
            emitCopy() {
                this.$emit('copy')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonEditor";

    .ev-icon-wrapper {
        @include full-center;

        width: 16px;

        height: 16px;
    }
</style>
