<template>
    <div class="d-flex flex-shrink-0 divider" :style="borderStyle"></div>
</template>

<script>
    export default {
        name: "EvHorizonDivider",

        props: {
            color: {
                type: String,
                default: "#F1F1F1"
            }
        },

        computed: {
            borderStyle() {
                return {
                    'border-bottom': `1px solid ${this.color}`
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .divider {
        display: flex;

        flex: 1;
    }
</style>
