import MarkdownTableBuilder
    from '@/export/markdown/MarkdownTableBuilder'
import _
    from 'lodash'
import MarkdownHelper
    from '@/export/markdown/MarkdownHelper'

export default {
    h1(text) {
        return H1 + text + NEW_LINE
    },

    h2(text) {
        return H2 + text + NEW_LINE
    },

    h3(text) {
        return H3 + text + NEW_LINE
    },

    h4(text) {
        return H4 + text + NEW_LINE
    },

    h5(text) {
        return H5 + text + NEW_LINE
    },

    text(text) {
        return text + NEW_LINE
    },

    table(items, configs) {

    },

    parametersTable(jsonStructs) {
        let configs = [
            {
                columnName: "Name",
                columnWidth: MarkdownHelper.getColumnWidth(jsonStructs, "fieldName", 24),
                indent: true,
                callback(jsonStruct) {
                    return jsonStruct.fieldName
                }
            },
            {
                columnName: "Required",
                columnWidth: 12,
                callback(jsonStruct) {
                    let required = jsonStruct.isRequired

                    return required ? REQUIRED : NOT_REQUIRED
                }
            },
            {
                columnName: "Type",
                columnWidth: MarkdownHelper.getColumnWidth(jsonStructs, "fieldType", 24),
                callback(jsonStruct) {
                    // return jsonStruct.fieldTypeName + " "
                    //     + (jsonStruct.jsonTypeName ? `(${jsonStruct.jsonTypeName})` : "") + " "
                    //     + (jsonStruct.parameterType ? `[${jsonStruct.parameterType}]` : "")

                    return jsonStruct.fieldType
                }
            },
            {
                columnName: "Comment",
                columnWidth: 32,
                callback(jsonStruct) {
                    return jsonStruct.summary || "/"
                }
            },
        ]

        return new MarkdownTableBuilder(configs).build(jsonStructs)
    },

    parameterConstraintsTable(jsonStructs) {
        let configs = [
            {
                columnName: "Name",
                columnWidth: MarkdownHelper.getColumnWidth(jsonStructs, "fieldName", 24),
                indent: true,
                callback(jsonStruct) {
                    return jsonStruct.fieldName
                }
            },
            {
                columnName: "Type",
                columnWidth: MarkdownHelper.getColumnWidth(jsonStructs, "fieldTypeName", 24),
                callback(jsonStruct) {
                    return jsonStruct.fieldTypeName + " " + (jsonStruct.jsonTypeName ? `(${jsonStruct.jsonTypeName})` : "")
                }
            },
            {
                columnName: "Constraint",
                columnWidth: 32,
                callback(jsonStruct) {
                    let constraints = ""

                    for (let name in jsonStruct.constraint) {
                        constraints += `${name} : ${jsonStruct.constraint[name]} / `
                    }

                    return constraints
                }
            },
        ]

        return new MarkdownTableBuilder(configs).build(jsonStructs)
    },

    responsesTable(jsonStructs) {
        let configs = [
            {
                columnName: "Name",
                columnWidth: MarkdownHelper.getColumnWidth(jsonStructs, "fieldName", 24),
                indent: true,
                callback(jsonStruct) {
                    return jsonStruct.fieldName
                }
            },
            {
                columnName: "Type",
                columnWidth: MarkdownHelper.getColumnWidth(jsonStructs, "fieldType", 24),
                callback(jsonStruct) {
                    return jsonStruct.fieldType
                }
            },
            {
                columnName: "Comment",
                columnWidth: 32,
                callback(jsonStruct) {
                    return jsonStruct.summary || "/"
                }
            },
        ]

        return new MarkdownTableBuilder(configs).build(jsonStructs)
    },

    tags(tags) {
        let val = ""

        tags && tags.forEach(tag => {
            val += LIST_ITEM + `${tag.tagName} : ${tag.tagValue}` + "\n"
        })

        val += "\n"

        return val
    },

    list(items) {
        let list = ""

        items.forEach(item =>
            list += (LIST_ITEM + item + "\n")
        )

        list += "\n"

        return list
    }
}

const H1 = "# "

const H2 = "## "

const H3 = "### "

const H4 = "#### "

const H5 = "##### "

const LIST_ITEM = " - "

const NEW_LINE = "\n\n"

const REQUIRED = " √ "

const NOT_REQUIRED = " - "