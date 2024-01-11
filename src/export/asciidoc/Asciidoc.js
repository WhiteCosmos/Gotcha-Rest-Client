import MarkdownHelper
    from '@/export/markdown/MarkdownHelper'
import MarkdownTableBuilder
    from '@/export/markdown/MarkdownTableBuilder'
import AsciidocTableBuilder
    from '@/export/asciidoc/AsciidocTableBuilder'

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

    tags(tags) {
        let val = ""

        tags && tags.forEach(tag => {
            val += LIST + `${tag.tagName} : ${tag.tagValue}` + "\n"
        })

        val += "\n"

        return val
    },

    parametersTable(jsonStructs) {
        let configs = [
            {
                columnName: "Name",
                columnWidth: MarkdownHelper.getColumnWidth(jsonStructs, "fieldName", 24),
                indent: true,
                ratio: 4,
                callback(jsonStruct) {
                    return jsonStruct.fieldName
                }
            },
            {
                columnName: "Required",
                columnWidth: 12,
                ratio: 1,
                callback(jsonStruct) {
                    let required = jsonStruct.isRequired

                    return required ? REQUIRED : NOT_REQUIRED
                }
            },
            {
                columnName: "Type",
                columnWidth: MarkdownHelper.getColumnWidth(jsonStructs, "fieldTypeName", 24),
                ratio: 4,
                callback(jsonStruct) {
                    return jsonStruct.fieldTypeName + " (" + (jsonStruct.jsonTypeName || "") + ")"
                }
            },
            {
                columnName: "Comment",
                columnWidth: 32,
                ratio: 4,
                callback(jsonStruct) {
                    return jsonStruct.fieldSummary || "/"
                }
            },
        ]

        return new AsciidocTableBuilder(configs).build(jsonStructs)
    },

    parameterConstraintsTable(jsonStructs) {
        let configs = [
            {
                columnName: "Name",
                columnWidth: MarkdownHelper.getColumnWidth(jsonStructs, "fieldName", 24),
                ratio: 2,
                callback(jsonStruct) {
                    return jsonStruct.fieldName
                }
            },
            {
                columnName: "Type",
                columnWidth: MarkdownHelper.getColumnWidth(jsonStructs, "fieldTypeName", 24),
                ratio: 1,
                callback(jsonStruct) {
                    return jsonStruct.fieldTypeName + " (" + (jsonStruct.jsonTypeName || "") + ")"
                }
            },
            {
                columnName: "Constraint",
                columnWidth: 32,
                ratio: 2,
                callback(jsonStruct) {
                    let constraints = ""

                    for (let name in jsonStruct.constraint) {
                        constraints += `${name} : ${jsonStruct.constraint[name]} / `
                    }

                    return constraints
                }
            },
        ]

        return new AsciidocTableBuilder(configs).build(jsonStructs)
    },

    responsesTable(jsonStructs) {
        let configs = [
            {
                columnName: "Name",
                columnWidth: MarkdownHelper.getColumnWidth(jsonStructs, "fieldName", 24),
                indent: true,
                ratio: 2,
                callback(jsonStruct) {
                    return jsonStruct.fieldName
                }
            },
            {
                columnName: "Type",
                columnWidth: MarkdownHelper.getColumnWidth(jsonStructs, "fieldTypeName", 24),
                ratio: 1,
                callback(jsonStruct) {
                    return jsonStruct.fieldTypeName + " (" + (jsonStruct.jsonTypeName || "") + ")"
                }
            },
            {
                columnName: "Comment",
                columnWidth: 32,
                ratio: 2,
                callback(jsonStruct) {
                    return jsonStruct.fieldSummary || "/"
                }
            },
        ]

        return new AsciidocTableBuilder(configs).build(jsonStructs)
    }
}

const H1 = "= "

const H2 = "== "

const H3 = "=== "

const H4 = "===== "

const H5 = "====== "

const LIST = " * "

const NEW_LINE = "\n\n"

const REQUIRED = " √ "

const NOT_REQUIRED = " - "

function italic(text) {
    return "_" + text + "_"
}

function quote(text) {
    return "`" + text + "`"
}

