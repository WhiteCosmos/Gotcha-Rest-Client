<template>
    <div class="empty-repository d-flex align-center justify-center">
        <ev-placeholder style="width: 480px">当前仓库是空的</ev-placeholder>
    </div>
</template>

<script>
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvPlaceholder from '@/components/typography/EvPlaceholder'

    export default {
        name: "EvEmptyRepository",
        components: {EvPlaceholder},
        mixins: [
            EvStoreMixin
        ]
    }
</script>

<style lang="scss" scoped>
    .empty-repository {
        display: flex;

        width: 100%;

        height: 100%;

        background-color: #FAFAFA;
    }
</style>
