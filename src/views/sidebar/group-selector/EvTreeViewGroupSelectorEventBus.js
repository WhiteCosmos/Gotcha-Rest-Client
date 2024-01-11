import Vue
    from 'vue'

export const EvTreeViewGroupSelectorEventBus = new Vue()

export const EvTreeViewGroupSelectorEvents = {
    SELECT_TREE_VIEW_GROUP: "SELECT_TREE_VIEW_GROUP",

    CREATE_TREE_VIEW_GROUP: "CREATE_TREE_VIEW_GROUP",

    REMOVE_TREE_VIEW_GROUP: "REMOVE_TREE_VIEW_GROUP"
}
