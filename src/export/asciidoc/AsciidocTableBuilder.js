import _
    from 'lodash'

class AsciidocTableBuilder {
    constructor(configs) {
        this.configs = configs
    }

    build(jsonStructs) {
        let table = ""

        // table += buildTableRatio(this.configs) 存在展示问题

        table += buildTableDivider()

        table += buildTableTitle(this.configs)

        table += buildTableRows(this.configs, jsonStructs, 0)

        table += buildTableDivider()

        table += "\n"

        return table
    }
}

function buildTableRatio(configs) {
    let ratios = []

    configs.forEach(config => {
        ratios.push(config.ratio)
    })

    return `[cols=${ratios.toString()}]` + ENTER
}

function buildTableTitle(configs) {
    let title = ""

    configs.forEach(config => {
        let columnName = config.columnName

        let columnWidth = config.columnWidth

        title += TABLE_DIVIDER + space(1) + columnName + space(columnWidth - columnName.length)
    })

    title += ENTER

    return title

}

function buildTableDivider() {
    return "|===" + ENTER
}

function buildTableRows(configs, jsonStructs, layer = 0) {
    let rows = ""

    jsonStructs.forEach(jsonStruct => {
        if (jsonStruct.isIgnore) {
            return
        }

        rows += buildTableRow(configs, jsonStruct, layer)

        if (!_.isEmpty(jsonStruct.children)) {
            rows += buildTableRows(configs, jsonStruct.children, layer + 1)
        }
    })

    return rows
}

function buildTableRow(configs, jsonStruct, layer = 0) {
    let row = ""

    configs.forEach(config => {
        let columnWidth = config.columnWidth

        let columnValue = config.callback(jsonStruct) || ""

        if (config.indent && layer > 0) {
            columnValue = placeholder(layer) + FIELD_CHILDREN_SYMBOL + columnValue
        }

        row += TABLE_DIVIDER + space(1) + columnValue + space(columnWidth - columnValue.length)
    })

    row += ENTER

    return row
}

const TABLE_DIVIDER = "|"

const UNDER_LINE = "-"

const EQUALS = "="

const ENTER = "\n"

const FIELD_CHILDREN_SYMBOL = "└ "

const FIELD_DIVIDER_SYMBOL = "··"

function space(length) {
    let s = " "

    for (let i = 0; i < length; i++) {
        s += " "
    }

    return s
}

function underline(length) {
    let s = UNDER_LINE

    for (let i = 0; i < length; i++) {
        s += UNDER_LINE
    }

    return s
}

function equals(length) {
    let s = EQUALS

    for (let i = 0; i < length; i++) {
        s += EQUALS
    }

    return s
}

function placeholder(length) {
    let s = ""

    if (length === 1) {
        return s
    }

    for (let i = 0; i < length; i++) {
        s += FIELD_DIVIDER_SYMBOL
    }

    return s
}

export default AsciidocTableBuilder