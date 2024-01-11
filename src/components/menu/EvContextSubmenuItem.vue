<template>
    <v-menu offset-x open-on-hover v-model="active" nudge-left="2">
        <template v-slot:activator="{ on, attrs }">
            <div class="ev-context-submenu-item"
                 :class="contextSubmenuItemClasses" v-on="on">
                <ev-label size="11" bold :color="active ? 'white' : '#333'">
                    <slot></slot>
                </ev-label>

                <v-spacer></v-spacer>

                <ev-arrow-right :color="active ? 'white' : '#AABBCC'"></ev-arrow-right>
            </div>
        </template>

        <ev-context-menu>
            <slot name="items"></slot>
        </ev-context-menu>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvArrowRight from '@/components/icon/ev-arrow-right'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'

    export default {
        name: "EvContextSubmenuItem",

        components: {
            EvContextMenuItem,
            EvContextMenu,
            EvArrowRight,
            EvLabel
        },

        data() {
            return {
                active: false
            }
        },

        computed: {
            contextSubmenuItemClasses() { // EvFoo -> fooClasses
                if (this.active) {
                    return ['ev-context-submenu-item--active']
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-context-submenu-item {
        @include horizon-center;

        width: 100%;

        height: 24px;

        padding-left: 8px;

        padding-right: 8px;

        border-radius: 3px;

        user-select: none;

        &--active {
            background-color: $PRIMARY_COLOR;
        }
    }
</style>
