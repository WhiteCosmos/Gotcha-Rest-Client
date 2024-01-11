<template>
    <div class="ev-tree-view-group-selector-menu">
        <ev-tree-view-group-selector-menu-item v-for="group in groups"
                                               :tree-view-group="group"
                                               @click.native="doSelectTreeViewGroup(group)"></ev-tree-view-group-selector-menu-item>
    </div>
</template>

<script>
    import EvTreeViewGroupSelectorMenuItem from '@/views/sidebar/group-selector/EvTreeViewGroupSelectorMenuItem'

    export default {
        name: "EvTreeViewGroupMenu",

        components: {
            EvTreeViewGroupSelectorMenuItem
        },

        props: {
            groups: Array
        },

        methods: {
            doSelectTreeViewGroup(group) {
                this.$emit('select-tree-view-group', group)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-tree-view-group-selector-menu {
        display: flex;

        flex-direction: column;

        background-color: #FCFCFC;

        user-select: none;
    }
</style>
