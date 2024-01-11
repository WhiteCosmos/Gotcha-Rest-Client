<template>
    <div :style="style" class="flex-shrink-0">

    </div>
</template>

<script>
    export default {
        name: "EvVerticalGutter",

        props: {
            gutter: Number
        },

        computed: {
            style() {
                return {
                    width: this.gutter + "px"
                }
            }
        }
    }
</script>

<style lang="scss">

</style>
