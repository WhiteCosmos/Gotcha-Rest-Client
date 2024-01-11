<template>
    <div class="json-expand-button" @click="emitToggleJsonNode">
        <ev-arrow-down v-if="node.expand"></ev-arrow-down>

        <ev-arrow-right v-else></ev-arrow-right>
    </div>
</template>

<script>
    import EvArrowRight from '@/components/icon/ev-arrow-right'
    import EvJsonNodeMixin from '@/components/json-editor-vsl/editors/EvJsonNodeMixin'
    import EvArrowDown from '@/components/icon/ev-arrow-down'

    export default {
        name: "EvJsonExpandButton",

        components: {
            EvArrowDown,
            EvArrowRight
        },

        mixins: [
            EvJsonNodeMixin
        ],
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .json-expand-button {
        @include full-center;

        width: 16px;

        height: 16px;
    }
</style>
