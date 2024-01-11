<template>
    <div>
        <slot v-if="shouldRender"></slot>
    </div>
</template>

<script>
    export default {
        name: "EvLazyComponent",

        created() {
            this.$nextTick(() => {
                this.shouldRender = true
            })
        },

        data() {
            return {
                shouldRender: false,
            }
        },
    }
</script>
