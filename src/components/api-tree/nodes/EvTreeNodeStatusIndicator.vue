<template>
    <div class="ev-tree-node-status-indicator">
        <!--        <div class="ev-tree-node-status-indicator__indicator-wrapper" v-if="status === 'SUCCESS'">-->
        <div class="ev-tree-node-status-indicator__success" v-if="status === 'SUCCESS'"></div>
        <!--        </div>-->

        <div class="ev-tree-node-status-indicator__failed" v-if="status === 'FAILED'"></div>

        <div class="ev-tree-node-status-indicator__spinner" v-if="status === 'PENDING'">
            <ev-tree-node-spinner></ev-tree-node-spinner>
        </div>
    </div>
</template>

<script>
    import EvTreeNodeSpinner from '@/components/api-tree/components/EvTreeNodeSpinner'

    export default {
        name: "EvTreeNodeStatusIndicator",

        components: {
            EvTreeNodeSpinner
        },

        props: {
            status: String, // none success failed pending

            assertStatus: String // success failed
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-tree-node-status-indicator {
        position: relative;

        @include full-center;

        height: 16px;

        width: 16px;

        &__indicator-wrapper {
            @include full-center;

            height: 10px;

            width: 10px;

            border-radius: 10px;

            background-color: $RED_COLOR;

            //border: 1px solid $GREEN_BACKGROUND_COLOR;
        }

        &__success {
            height: 8px;

            width: 8px;

            border-radius: 8px;

            background-color: $GREEN_COLOR;

            border: 1px solid $GREEN_BACKGROUND_COLOR;

            //background-color: $RED_COLOR;
        }

        &__failed {
            height: 8px;

            width: 8px;

            border-radius: 8px;

            background-color: $RED_COLOR;

            border: 1px solid $GREEN_BACKGROUND_COLOR;
        }

        &__spinner {
            position: absolute;

            left: -16px;

            top: -16px;
        }
    }

</style>
