const DEFAULT_MIN_WIDTH = 16

/**
 * @created_at 2022/2/24
 * @app_version 1.4.0
 */
class GHCMarkdownTableBuilder {
    constructor(items, configs) {
        this.items = items

        this.configs = configs
    }

    build() {
        let table = ''

        table += this._buildTableHeader()

        table += this._buildTableDivider()

        table += this._buildTableRows()

        table += '\n\n'

        return table
    }

    /**
     * @private
     */
    _buildTableHeader() {
        let header = ''

        this.configs.forEach(config => {
            let name = config.name

            let minWidth = config.minWidth || DEFAULT_MIN_WIDTH

            header += TABLE_DIVIDER + space(1) + name + space(minWidth - name.length)
        })

        header += LINE_BREAK

        return header
    }

    /**
     * @private
     */
    _buildTableDivider() {
        let divider = ""

        this.configs.forEach(config => {
            let columnWidth = config.minWidth || DEFAULT_MIN_WIDTH

            divider += TABLE_DIVIDER + underline(columnWidth)
        })

        divider += LINE_BREAK

        return divider
    }

    _buildTableRows() {
        let rows = ''

        this.items.forEach(item => {
            rows += this._buildTableRow(item)
        })

        return rows
    }

    _buildTableRow(item) {
        let row = ""

        this.configs.forEach(config => {
            let columnWidth = config.minWidth || DEFAULT_MIN_WIDTH

            let columnValue = config.callback(item) || ""

            row += TABLE_DIVIDER + space(1) + columnValue + space(columnWidth - columnValue.length)
        })

        row += ENTER

        return row
    }
}

const TABLE_DIVIDER = "|"

const UNDER_LINE = "-"

const ENTER = "\n"

const LINE_BREAK = "\n"

const NEW_LINE = "\n\n"

const FIELD_CHILDREN_SYMBOL = "└ "

const FIELD_DIVIDER_SYMBOL = "··"

function space(length) {
    let s = " "

    for (let i = 1; i < length; i++) {
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


export default GHCMarkdownTableBuilder