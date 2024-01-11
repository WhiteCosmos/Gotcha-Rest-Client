<template>
    <v-menu offset-y :close-on-content-click="false" :disabled="disabled" v-model="showTreeViewGroupSelector" attach=".tool-container">
        <template v-slot:activator="{ on }">
            <ev-tree-view-group-label :events="on"
                                      :tree-view-group="selectedGroup"
                                      :disabled="disabled"
                                      :show="showTreeViewGroupSelector"></ev-tree-view-group-label>
        </template>

        <ev-tree-view-group-menu :groups="groups" @select-tree-view-group="doSelectTreeViewGroup"></ev-tree-view-group-menu>
    </v-menu>
</template>

<script>
    import EvTreeViewGroupLabel from '@/views/sidebar/group-selector/EvTreeViewGroupLabel'
    import EvTreeViewGroupMenu from '@/views/sidebar/group-selector/EvTreeViewGroupSelectorMenu'
    import {
        EvTreeViewGroupSelectorEventBus,
        EvTreeViewGroupSelectorEvents
    } from '@/views/sidebar/group-selector/EvTreeViewGroupSelectorEventBus'

    export default {
        name: "EvTreeViewGroupSelector",

        components: {
            EvTreeViewGroupMenu,
            EvTreeViewGroupLabel
        },

        props: {
            groups: {
                type: Array,
                default: () => {
                    return []
                }
            },

            selectedGroup: Object,
        },

        data() {
            return {
                showTreeViewGroupSelector: false,
            }
        },

        computed: {
            disabled() {
                return this.groups && this.groups.length === 1
            }
        },

        methods: {
            doSelectTreeViewGroup(group) {
                this.showTreeViewGroupSelector = false

                this.selectedGroup = group

                EvTreeViewGroupSelectorEventBus.$emit(EvTreeViewGroupSelectorEvents.SELECT_TREE_VIEW_GROUP, group)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>
