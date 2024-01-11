<template>
    <div class="branch-item d-flex align-center">
        <span class="branch-name text-truncate">{{ version.name }}</span>

        <v-spacer></v-spacer>

        <v-icon x-small color="blue" v-if="isCurrentVersion">fa-check</v-icon>
    </div>
</template>

<script>
    export default {
        name: "EvVersionMenuItem",

        props: {
            branch: {
                type: Object,
            },

            version: Object,

            selectedVersion: Object,
        },

        computed: {
            branchColor() {
                return {
                    'branch-color_current': this.isCurrentVersion,

                    'branch-color': !this.isCurrentVersion,
                }
            },

            isCurrentVersion() {
                return this.version === this.selectedVersion
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .branch-item {
        height: 32px;

        padding-left: 16px;

        padding-right: 16px;
    }

    .branch-item:hover {
        background-color: #E0E0E0;
    }

    .branch-name {
        font-size: 11px;

        font-weight: bold;

        color: $SECONDARY_FONT_COLOR;

        width: 80%;
    }

    .branch-color_current {
        color: #007AFF;
    }

    .branch-color {
        color: $PRIMARY_FONT_COLOR;
    }

    .branch-menu__icon {
        width: 12px;

        height: 12px;

        display: flex;

        justify-content: center;

        align-items: center;
    }

    .branch-menu__icon__circle {
        width: 4px;

        height: 4px;

        border-radius: 4px;

        background-color: #9acc68;
    }
</style>
