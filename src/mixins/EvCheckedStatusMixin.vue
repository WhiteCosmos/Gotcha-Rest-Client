<script>
    import _ from 'lodash'
    import EvCheckedStatusHelper from '@/mixins/EvCheckedStatusHelper'

    export default {
        name: "EvCheckedStatusMixin",

        methods: {
            toggleItemCheckedStatus(item) {
                if (!item) {
                    return
                }

                if (this.isItemChecked(item)) {
                    this.toItemUnchecked(item)
                    return
                }

                if (this.isItemUnchecked(item)) {
                    this.toItemChecked(item)
                    return
                }
            },

            setItemsCheckedStatus(items, checkedStatus) {
                if (_.isEmpty(items)) {
                    return
                }

                items && items.forEach(item => {
                    item.checkedStatus = checkedStatus
                })
            },

            isEveryChecked(items) {
                return EvCheckedStatusHelper.isEveryChecked(items)
            },

            isAnyHalfChecked(items) {
                return EvCheckedStatusHelper.isAnyHalfChecked(items)
            },

            isAnyChecked(items) {
                return EvCheckedStatusHelper.isAnyChecked(items)
            },

            isNullChecked(items) {
                return EvCheckedStatusHelper.isNullChecked(items)
            },

            isItemChecked(item) {
                return EvCheckedStatusHelper.isItemChecked(item)
            },

            isItemUnchecked(item) {
                return EvCheckedStatusHelper.isItemUnchecked(item)
            },

            toItemChecked(item) {
                item && (item.checkedStatus = "CHECKED")
            },

            toItemUnchecked(item) {
                item && (item.checkedStatus = "UNCHECKED")
            },

            toItemHalfChecked(item) {
                item && (item.checkedStatus = "HALF_CHECKED")
            },

            toEveryChecked(items) {
                items && items.forEach(item => {
                    if (item.checkedStatus === 'HALF_CHECKED') {
                        return
                    }

                    item.checkedStatus = "CHECKED"
                })
            },

            toEveryUnchecked(items) {
                items && items.forEach(item => {
                    item.checkedStatus = "UNCHECKED"
                })
            }
        }
    }
</script>
