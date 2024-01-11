import _
    from 'lodash'

export default {
    getColumnWidth(jsonStructs, columnName, defaultWidth) {
        let columnNameCounts = new Set([])

        jsonStructs.forEach(jsonStruct => {
            countLongestColumnName(columnName, jsonStruct, 0, columnNameCounts)
        })

        let maxColumnWidth = Array.from(columnNameCounts).sort(compare)[0] // 返回最大值

        return maxColumnWidth < defaultWidth ? defaultWidth : maxColumnWidth
    }
}

function countLongestColumnName(columnName,
                                jsonStruct,
                                layer = 0,
                                counts = new Set([])) {
    counts.add(jsonStruct[columnName].length + layer * 2)

    if (!_.isEmpty(jsonStruct.children)) {
        jsonStruct.children.forEach(child => {
            countLongestColumnName(columnName, child, layer + 1, counts)
        })
    }
}

function compare(a, b) {
    return a > b ? -1 : 1
}