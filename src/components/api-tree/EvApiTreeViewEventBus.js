import Vue
    from 'vue'

export const EvApiTreeViewEventBus = new Vue()

export const EvApiTreeViewEvents = {
    // Private Events

    _TOGGLE_TREE_NODE: "_TOGGLE_TREE_NODE",

    _CLICK_TREE_NODE: "_CLICK_TREE_NODE",

    _RIGHT_CLICK_TREE_NODE: "_RIGHT_CLICK_TREE_NODE",

    _SAVE_API_TREE_VIEW: "_SAVE_API_TREE_VIEW",

    //  Public Events

    UPDATE_API_TREE_VIEW: "UPDATE_API_TREE_VIEW",

    // Http Client Events

    UPDATE_HTTP_OPERATION_NAME: "UPDATE_HTTP_OPERATION_NAME"
}
