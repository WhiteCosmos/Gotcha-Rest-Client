import _
    from 'lodash'

const CHECKED_STATUS = {
    CHECKED: "CHECKED",

    UNCHECKED: "UNCHECKED",

    HALF_CHECKED: "HALF_CHECKED",
}

class EvCheckedStatusHelper {
    static isItemChecked(item) {
        return item && [CHECKED_STATUS.CHECKED, CHECKED_STATUS.HALF_CHECKED].includes(item.checkedStatus)
    }

    static toItemChecked(item) {
        item && (item.checkedStatus = CHECKED_STATUS.CHECKED)
    }

    static isItemHalfChecked(item) {
        return item && item.checkedStatus === CHECKED_STATUS.HALF_CHECKED
    }

    static toItemHalfChecked(item) {
        item && (item.checkedStatus = CHECKED_STATUS.HALF_CHECKED)
    }

    static isItemUnchecked(item) {
        return item && item.checkedStatus === CHECKED_STATUS.UNCHECKED
    }

    static toItemUnchecked(item) {
        item && (item.checkedStatus = CHECKED_STATUS.UNCHECKED)
    }

    static isEveryChecked(items) {
        if (_.isEmpty(items)) {
            return false
        }

        let checkedItems = items.filter(item => {
            return EvCheckedStatusHelper.isItemChecked(item)
        })

        return checkedItems.length === items.length
    }

    static isAnyHalfChecked(items) {
        if (_.isEmpty(items)) {
            return false
        }

        let checkedItems = items.filter(item => {
            return EvCheckedStatusHelper.isItemHalfChecked(item)
        })

        return checkedItems.length > 0 && checkedItems.length < items.length
    }

    static isAnyChecked(items) {
        if (_.isEmpty(items)) {
            return false
        }

        let checkedItems = items.filter(item => {
            return EvCheckedStatusHelper.isItemChecked(item)
        })

        return checkedItems.length > 0 && checkedItems.length < items.length
    }

    static isNullChecked(items) {
        if (_.isEmpty(items)) {
            return false
        }

        let uncheckedItems = items.filter(item => {
            return EvCheckedStatusHelper.isItemUnchecked(item)
        })

        return uncheckedItems.length === items.length
    }
}

export default EvCheckedStatusHelper