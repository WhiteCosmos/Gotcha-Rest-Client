/**
 * @created_at 2022/5/13
 * @app_version 1.4.7
 */
class GHCFlattenTreeHelper {
    constructor() {

    }

    static checkIsLastTreeNode(sn, pn) {
        return pn.children[pn.children.length - 1] === sn
    }

    static checkIsSiblingAvailable(sn, tn, pn) {
        if (sn === tn) {
            if (tn.isContainer) {
                if (tn.expand) {
                    if (this.checkIsLastTreeNode(tn, pn)) {
                        return false
                    } else {
                        return false
                    }
                } else {
                    // noinspection RedundantIfStatementJS
                    if (this.checkIsLastTreeNode(tn, pn)) {
                        return true
                    } else {
                        return false
                    }
                }
            } else {
                // noinspection RedundantIfStatementJS
                if (this.checkIsLastTreeNode(tn, pn)) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            if (tn.isContainer) {
                if (tn.expand) {
                    if (this.checkIsLastTreeNode(tn, pn)) {
                        return false
                    } else {
                        return false
                    }
                } else {
                    // noinspection RedundantIfStatementJS
                    if (this.checkIsLastTreeNode(tn, pn)) {
                        return true
                    } else {
                        return false
                    }
                }
            } else {
                // noinspection RedundantIfStatementJS
                if (this.checkIsLastTreeNode(tn, pn)) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
}

export default GHCFlattenTreeHelper