/**
 * @created_at 2022/2/24
 * @app_version 1.4.0
 */
import GHCMarkdownTableBuilder
    from '@/core/export/GHCMarkdownTableBuilder'

class GHCMarkdown {
    constructor() {
        this.md = ''
    }

    h1(value) {
        this.md += H1 + value + NEW_LINE

        return this
    }

    h2(value) {
        this.md += H2 + value + NEW_LINE

        return this
    }

    h3(value) {
        this.md += H3 + value + NEW_LINE

        return this
    }

    h4(value) {
        this.md += H4 + value + NEW_LINE

        return this
    }

    h5(value) {
        this.md += H5 + value + NEW_LINE

        return this
    }

    text(value) {
        this.md += value + NEW_LINE

        return this
    }

    script(value, format) {
        this.md += '```' + format + LINE_BREAK

        this.md += value + LINE_BREAK

        this.md += '```'

        this.md += NEW_LINE

        return this
    }

    properties(properties) {
        properties.forEach(prop => {
            let key = prop.key

            let value = prop.value

            this.md += LIST_ITEM + `${key}: ${value}` + LINE_BREAK
        })

        this.md += NEW_LINE

        return this
    }

    table(items, configs) {
        this.md += new GHCMarkdownTableBuilder(items, configs).build()

        return this
    }

    toString() {
        return this.md
    }
}

const H1 = "# "

const H2 = "## "

const H3 = "### "

const H4 = "#### "

const H5 = "##### "

const LIST_ITEM = " - "

const LINE_BREAK = "\n"

const NEW_LINE = "\n\n"

const REQUIRED = " √ "

const NOT_REQUIRED = " - "

export default GHCMarkdown