<template>
    <div class="project-item d-flex flex-shrink-0">
        <span class="project-name text-truncate">{{ project.name }}</span>

        <v-spacer></v-spacer>

        <v-icon x-small color="blue" v-if="isCurrentProject">fa-check</v-icon>

        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvProjectTag from '@/views/titlebar/project-selector/EvProjectTag'
    import EvSquareTag from '@/components/tag/EvSquareTag'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvStoreMixin from '@/mixins/EvStoreMixin'

    export default {
        name: "EvProjectMenuItem",

        components: {
            EvVerticalGutter,
            EvSquareTag,
            EvProjectTag
        },

        mixins: [
            EvStoreMixin,
        ],

        props: {
            project: Object
        },

        computed: {
            isCurrentProject() {
                return this.currentProject && this.currentProject.id === this.project.id
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .project-item {
        display: flex;

        align-items: center;

        min-height: 0px;

        min-width: 0px;

        height: 32px;

        padding-left: 16px;
    }

    .project-item:hover {
        background-color: #E0E0E0;
    }

    .project-name {
        font-size: 11px;

        font-weight: bold;

        color: $SECONDARY_FONT_COLOR;

        width: 80%;
    }

    .project-path {
        font-size: 12px;

        color: #999;

        line-height: 24px;

        width: 80%;
    }
</style>
