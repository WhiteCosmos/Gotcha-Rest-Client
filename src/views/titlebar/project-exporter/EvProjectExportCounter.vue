<template>
    <div class="ev-project-export-counter">
        <ev-folder-close-icon></ev-folder-close-icon>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-counter-label :value="count.count_1"></ev-counter-label>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-lighting-icon color="#AABBCC"></ev-lighting-icon>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-counter-label :value="count.count_2"></ev-counter-label>
    </div>
</template>

<script>
    import EvFolderCloseIcon from '@/components/api-tree/icons/ev-folder-close-icon'
    import EvCounterLabel from '@/components/label/EvCounterLabel'
    import EvLightingIcon from '@/components/api-tree/icons/ev-lighting-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvExportTreeViewMixin from '@/views/titlebar/project-exporter/export-tree-view/EvExportTreeViewMixin'

    export default {
        name: "EvProjectExportCounter",

        components: {
            EvVerticalGutter,
            EvLightingIcon,
            EvCounterLabel,
            EvFolderCloseIcon
        },

        props: {
            count: Object
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-export-counter {
        position: absolute;

        display: flex;

        align-items: center;

        bottom: 48px;

        right: 24px;
    }
</style>