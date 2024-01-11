<template>
    <div class="ev-virtual-scroll-test">
        <!--        <RecycleScroller-->
        <!--            :key="999"-->
        <!--            :items="items"-->
        <!--            :item-size="28"-->
        <!--            key-field="id"-->
        <!--            :buffer="140"-->
        <!--            page-mode-->
        <!--            v-slot="{ item }">-->
        <!--            <ev-cube :item="item"></ev-cube>-->
        <!--        </RecycleScroller>-->

        <ev-horizon-gutter :gutter="800"></ev-horizon-gutter>

        <RecycleScroller
            :items="items_2"
            :item-size="28"
            key-field="id"
            page-mode
            :buffe="48"
            v-slot="{ item }">
        </RecycleScroller>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvVirtualScrollTest",
        components: {EvHorizonGutter},
        created() {
            let count = 0

            for (let i = 0; i < 50; i++) {
                this.items.push({
                    id: count++
                })
            }

            for (let i = 0; i < 40; i++) {
                this.items_2.push({
                    id: count++
                })
            }
        },

        data() {
            return {
                items: [],

                items_2: []
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-virtual-scroll-test {
        display: flex;

        width: 100%;

        flex-direction: column;

        padding-left: 72px;

        padding-right: 72px;
    }
</style>
