import {v4} from 'uuid'

class EvFlattenTreeNode {
    constructor() {
        this.idx = -1

        this.uid = v4()

        /**
         * Layer level in total tree
         *
         * @type {number}
         */
        this.layer = 0

        /**
         * Checked Status -> CHECKED | HALF_CHECKED | UNCHECKED
         *
         * @type {string}
         */
        this.checkedStatus = 'CHECKED'

        /**
         * Decide node is a container or not
         *
         * @type {boolean}
         */
        this.isContainer = false

        /**
         * Expand or collapse, only container
         *
         * @type {boolean}
         */
        this.expand = false

        /**
         * Tag is matched when searching
         *
         * @type {boolean}
         */
        this.matched = false

        /**
         * unflatten
         *
         * @type {*[]}
         */
        this.children = []
    }
}

export default EvFlattenTreeNode