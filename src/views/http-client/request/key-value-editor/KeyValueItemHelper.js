import KeyValueItem
    from '@/views/http-client/request/key-value-editor/KeyValueItem'

class KeyValueItemHelper {
    /**
     * @param {KeyValueItem[]} items
     * @param key
     * @param value
     */
    static addKeyValueItem(items, key, value) {
        let existsItem = this.findKeyValueItemByKey(items, key)

        if (existsItem) {
            existsItem.value = value
        } else {
            existsItem = new KeyValueItem(key, value)

            items.push(existsItem)
        }
    }

    /**
     * @param {KeyValueItem[]} items
     * @param key
     */
    static removeKeyValueItem(items, key) {
        let existsItem = this.findKeyValueItemByKey(items, key)

        if (!existsItem) {
            return
        }

        let index = items.indexOf(existsItem)

        items.splice(index, 1)
    }

    static findKeyValueItemByKey(items, key) {
        return items.find(item => {
            // return item.key.toLowerCase() === key.toLowerCase()
            return item.key === key
        })
    }
}

export default KeyValueItemHelper