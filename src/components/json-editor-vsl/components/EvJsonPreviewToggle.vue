<template>
    <div class="ev-json-preview-toggle" @click="toggle">
        <ev-eye-close-icon v-if="preview"></ev-eye-close-icon>

        <ev-eye-icon v-else></ev-eye-icon>
    </div>
</template>

<script>
    import EvEyeIcon from '@/components/icon/ev-eye-icon.vue'
    import EvEyeCloseIcon from '@/components/icon/ev-eye-close-icon.vue'

    export default {
        name: "EvJsonPreviewToggle",

        components: {
            EvEyeCloseIcon,
            EvEyeIcon
        },

        data() {
            return {
                preview: false
            }
        },

        methods: {
            toggle() {
                this.preview = !this.preview

                this.$emit('toggle', this.preview)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-json-preview-toggle {
        @include full-center;

        border-radius: 2px;

        border: 1px solid #555;

        width: 24px;

        height: 14px;
    }
</style>
