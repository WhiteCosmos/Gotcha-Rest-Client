<template>
    <div class="ev-context-menu-divider" :style="styles">
        <ev-label size="8" secondary v-if="label" style="margin-right: 4px; margin-left: 8px">{{ label }}</ev-label>

        <div class="ev-context-menu-divider__line"></div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvContextMenuDivider",

        components: {
            EvVerticalGutter,
            EvLabel
        },

        props: {
            label: String,
        },

        computed: {
            styles() {
                if (this.label) {
                    return {
                        height: '14px'
                    }
                } else {
                    return {
                        height: '8px'
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-context-menu-divider {
        display: flex;

        align-items: center;

        width: 100%;

        //height: 12px;

        &__line {
            display: flex;

            flex: 1;

            border-bottom: 1px solid #E0E0E0;
        }
    }
</style>
