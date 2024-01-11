<template>
    <div class="divider" :style="borderStyle"></div>
</template>

<script>
    export default {
        name: "EvVerticalDivider",

        props: {
            color: {
                type: String,
                default: "#EAEAEA"
            }
        },

        computed: {
            borderStyle() {
                return {
                    'border-right': `1px solid ${this.color}`
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .divider {
        width: 1px;

        height: 100%;
    }
</style>
