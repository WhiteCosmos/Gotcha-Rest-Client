<template>
    <div class="close-button d-flex justify-center align-center" @mouseenter="hover_ = true" @mouseleave="hover_ = false">
        <x-icon v-if="hover_"></x-icon>
    </div>
</template>

<script>
    import CancelIcon from '@/components/icon/cancel-icon'
    import XIcon from '@/components/button/x-icon'

    export default {
        name: "EvCircleCloseButton",

        components: {XIcon, CancelIcon},

        data() {
            return {
                hover_: false,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .close-button {
        width: 14px;

        height: 14px;

        border-radius: 8px;

        background-color: #ed6c60;

        border: 1px solid #e65e5e;

        padding-top: 1px;
    }
</style>
