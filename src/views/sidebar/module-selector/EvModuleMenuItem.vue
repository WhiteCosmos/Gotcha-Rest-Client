<template>
    <div class="module-item d-flex align-center">
        <div class="module-item__container">
            <div class="module-item__indicator" v-if="isSelectedModule"></div>
        </div>

        <span class="module-name text-truncate" :class="moduleColor">{{ module.name }}</span>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvModuleMenuItem",

        components: {
            EvVerticalGutter
        },

        props: {
            module: undefined,

            selectedModule: undefined,
        },

        computed: {
            moduleColor() {
                return {
                    'module-color_current': this.isSelectedModule,

                    'module-color': !this.isSelectedModule,
                }
            },

            isSelectedModule() {
                if (!this.selectedModule) {
                    return false
                }

                if (!this.module) {
                    return false
                }

                return this.selectedModule.id === this.module.id
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .module-item {
        height: 40px;

        padding-left: 8px;

        padding-right: 8px;
    }

    .module-item__container {
        width: 22px;

        height: 14px;

        display: flex;

        align-items: center;

        padding-left: 6px;
    }

    .module-item__indicator {
        width: 4px;

        height: 4px;

        border-radius: 4px;

        background-color: $PRIMARY_COLOR;
    }

    .module-item:hover {
        background-color: #E0E0E0;
    }

    .module-color_current {
        color: $PRIMARY_COLOR;
    }

    .module-color {
        color: $SECONDARY_FONT_COLOR;
    }

    .module-name {
        font-size: 12px;

        font-weight: bold;

        //color: $SECONDARY_FONT_COLOR;

        line-height: 32px;
    }

    .filter-container {
        padding: 16px;
    }
</style>
