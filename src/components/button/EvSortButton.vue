<template>
    <div class="ev-sort-button" @click="toggle">
        <v-icon size="11" :color="sortUpColor" style="position: absolute; top: 6px">fa-sort-up</v-icon>

        <v-icon size="11" :color="sortDownColor" style="position: absolute; bottom: 6px">fa-sort-down</v-icon>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvSortButton",

        components: {
            EvHorizonGutter,
            EvVerticalGutter
        },

        data() {
            return {
                order: "NONE", // NONE ASC DESC,

                orders: [
                    "NONE",
                    "ASC",
                    "DESC",
                ],

                count: 4 // First calc should be 1
            }
        },

        computed: {
            sortUpColor() {
                if (this.order === "ASC") {
                    return "#007AFF"
                } else {
                    return "#AABBCC"
                }
            },

            sortDownColor() {
                if (this.order === "DESC") {
                    return "#007AFF"
                } else {
                    return "#AABBCC"
                }
            }
        },

        methods: {
            toggle() {
                this.order = this.orders[this.count % 3]

                this.count++

                this.$emit("toggle", this.order)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-sort-button {
        position: relative;

        @include full-center;

        flex-direction: column;

        height: 24px;

        width: 16px;

        //background-color: #FF8282;
    }
</style>
