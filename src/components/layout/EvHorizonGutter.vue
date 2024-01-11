<template>
    <div :style="style" class="flex-shrink-0">
        <span style="opacity: 0"></span>
    </div>
</template>

<script>
    export default {
        name: "EvHorizonGutter",

        props: {
            gutter: Number
        },

        computed: {
            style() {
                return {
                    height: this.gutter + "px",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
