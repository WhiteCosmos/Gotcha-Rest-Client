import ExportHelper
    from '@/export/ExportHelper'
import Markdown
    from '@/export/markdown/Markdown'
import JsonMethodContentDao
    from '@/core/dao/JsonMethodContentDao'
import i18n
    from '@/main'

async function buildFromJsonModule(jsonModule) {
    if (!jsonModule) {
        return ""
    }

    let md = ""

    md += Markdown.h1(jsonModule.moduleName)

    md += Markdown.text("description")

    if (!ExportHelper.isEmpty(jsonModule.restfulApis)) {
        md += Markdown.h2("HTTP API")
    }

    for (let jsonService of jsonModule.restfulApis) {
        if (ExportHelper.isUnchecked(jsonService.checkedStatus)) {
            continue
        }

        md += Markdown.h3(ExportHelper.getServiceTitle(jsonService))

        md += Markdown.text(ExportHelper.getServiceSubtitle(jsonService))

        for (let jsonMethod of jsonService.methods) {
            if (ExportHelper.isUnchecked(jsonMethod.checkedStatus)) {
                continue
            }

            let jsonMethodContent = await JsonMethodContentDao.query(jsonMethod.id)

            if (!jsonMethodContent) {
                continue
            }

            md += Markdown.h4(ExportHelper.getMethodTitle(jsonMethod))

            md += Markdown.text(ExportHelper.getMethodSubtitle(jsonMethod))

            md += Markdown.tags(jsonMethod.tags)

            md += Markdown.h5(i18n.t("MarkdownBuilder.requestMethod"))

            md += Markdown.text(jsonMethod.requestMethod)

            md += Markdown.h5(i18n.t("MarkdownBuilder.requestPath"))

            md += Markdown.text(jsonMethod.fullRequestPath)

            if (!ExportHelper.isEmpty(jsonMethodContent.consumes)) {
                md += Markdown.h5(i18n.t("MarkdownBuilder.consumes"))

                md += Markdown.list(jsonMethodContent.consumes)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.headers)) {
                md += Markdown.h5(i18n.t("MarkdownBuilder.requestHeaders"))

                md += Markdown.parametersTable(jsonMethodContent.headers)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.cookies)) {
                md += Markdown.h5(i18n.t("MarkdownBuilder.requestCookies"))

                md += Markdown.parametersTable(jsonMethodContent.cookies)
            }

            md += Markdown.h5(i18n.t("MarkdownBuilder.parameters"))

            if (ExportHelper.isEmpty(jsonMethodContent.parameters)) {
                md += Markdown.text(i18n.t("MarkdownBuilder.noParameter"))
            } else {
                md += Markdown.parametersTable(jsonMethodContent.parameters)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
                md += Markdown.h5(i18n.t("MarkdownBuilder.parameterConstraints"))

                md += Markdown.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.produces)) {
                md += Markdown.h5(i18n.t("MarkdownBuilder.produces"))

                md += Markdown.list(jsonMethodContent.produces)
            }

            md += Markdown.h5(i18n.t("MarkdownBuilder.response"))

            if (ExportHelper.isEmpty(jsonMethodContent.responses)) {
                md += Markdown.text(i18n.t("MarkdownBuilder.noResponse"))
            } else {
                md += Markdown.responsesTable(jsonMethodContent.responses)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.responseHeaders)) {
                md += Markdown.h5(i18n.t("MarkdownBuilder.responseHeaders"))

                md += Markdown.responsesTable(jsonMethodContent.responseHeaders)
            }
        }
    }

    if (!ExportHelper.isEmpty(jsonModule.restfulApis)) {
        Markdown.h2(md, "JAVA API")
    }

    for (let jsonService of jsonModule.javaServices) {
        if (ExportHelper.isUnchecked(jsonService.checkedStatus)) {
            continue
        }

        md += Markdown.h3(ExportHelper.getServiceTitle(jsonService))

        md += Markdown.text(ExportHelper.getServiceSubtitle(jsonService))

        for (let jsonMethod of jsonService.methods) {
            if (ExportHelper.isUnchecked(jsonMethod.checkedStatus)) {
                continue
            }

            let jsonMethodContent = await JsonMethodContentDao.query(jsonMethod.id)

            if (!jsonMethodContent) {
                continue
            }

            md += Markdown.h4(ExportHelper.getMethodTitle(jsonMethod))

            md += Markdown.text(ExportHelper.getMethodSubtitle(jsonMethod))

            md += Markdown.tags(jsonMethod.tags)

            md += Markdown.h5(i18n.t("MarkdownBuilder.parameters"))

            if (ExportHelper.isEmpty(jsonMethodContent.parameters)) {
                md += Markdown.text(i18n.t("MarkdownBuilder.noParameter"))
            } else {
                md += Markdown.parametersTable(jsonMethodContent.parameters)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
                md += Markdown.h5(i18n.t("MarkdownBuilder.parameterConstraints"))

                md += Markdown.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
            }

            md += Markdown.h5(i18n.t("MarkdownBuilder.responses"))

            if (ExportHelper.isEmpty(jsonMethodContent.responses)) {
                md += Markdown.text(i18n.t("MarkdownBuilder.noResponse"))
            } else {
                md += Markdown.responsesTable(jsonMethodContent.responses)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.exceptions)) {
                md += Markdown.h5(i18n.t("MarkdownBuilder.exceptions"))

                md += Markdown.responsesTable(jsonMethodContent.exceptions)
            }
        }
    }

    return md
}

async function buildFromJsonService(jsonService) {
    if (!jsonService) {
        return ""
    }

    let md = ""

    md += Markdown.h2(ExportHelper.getServiceTitle(jsonService))

    md += Markdown.text(ExportHelper.getServiceSubtitle(jsonService))

    for (let jsonMethod of jsonService.methods) {
        if (ExportHelper.isUnchecked(jsonMethod.checkedStatus)) {
            continue
        }

        md += Markdown.h3(ExportHelper.getMethodTitle(jsonMethod))

        md += Markdown.text(ExportHelper.getMethodSubtitle(jsonMethod))

        md += Markdown.tags(jsonMethod.tags)

        let jsonMethodContent = await JsonMethodContentDao.query(jsonMethod.id)

        if (!jsonMethodContent) {
            continue
        }

        if (jsonMethod.isHttpService) {
            md += Markdown.h4(i18n.t("MarkdownBuilder.requestMethod"))

            md += Markdown.text(jsonMethod.requestMethod)

            md += Markdown.h4(i18n.t("MarkdownBuilder.requestPath"))

            md += Markdown.text(jsonMethod.fullRequestPath)

            if (!ExportHelper.isEmpty(jsonMethodContent.consumes)) {
                md += Markdown.h5(i18n.t("MarkdownBuilder.consumes"))

                md += Markdown.list(jsonMethodContent.consumes)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.headers)) {
                md += Markdown.h5(i18n.t("MarkdownBuilder.requestHeaders"))

                md += Markdown.parametersTable(jsonMethodContent.headers)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.cookies)) {
                md += Markdown.h5(i18n.t("MarkdownBuilder.requestCookies"))

                md += Markdown.parametersTable(jsonMethodContent.cookies)
            }

            md += Markdown.h4(i18n.t("MarkdownBuilder.parameters"))

            if (ExportHelper.isEmpty(jsonMethodContent.parameters)) {
                md += Markdown.text(i18n.t("MarkdownBuilder.noParameter"))
            } else {
                md += Markdown.parametersTable(jsonMethodContent.parameters)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
                md += Markdown.h4(i18n.t("MarkdownBuilder.parameterConstraints"))

                md += Markdown.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
            }

            md += Markdown.h4(i18n.t("MarkdownBuilder.response"))

            if (ExportHelper.isEmpty(jsonMethodContent.responses)) {
                md += Markdown.text(i18n.t("MarkdownBuilder.noResponse"))
            } else {
                md += Markdown.responsesTable(jsonMethodContent.responses)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.responseHeaders)) {
                md += Markdown.h4(i18n.t("MarkdownBuilder.responseHeaders"))

                md += Markdown.responsesTable(jsonMethodContent.responseHeaders)
            }
        }

        if (jsonMethod.isJavaService) {
            let jsonMethodContent = await JsonMethodContentDao.query(jsonMethod.id)

            if (!jsonMethodContent) {
                continue
            }

            md += Markdown.h3(ExportHelper.getMethodTitle(jsonMethod))

            md += Markdown.text(ExportHelper.getMethodSubtitle(jsonMethod))

            md += Markdown.tags(jsonMethod.tags)

            md += Markdown.h4(i18n.t("MarkdownBuilder.parameters"))

            if (ExportHelper.isEmpty(jsonMethodContent.parameters)) {
                md += Markdown.text(i18n.t("MarkdownBuilder.noParameter"))
            } else {
                md += Markdown.parametersTable(jsonMethodContent.parameters)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
                md += Markdown.h4(i18n.t("MarkdownBuilder.parameterConstraints"))

                md += Markdown.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
            }

            md += Markdown.h4(i18n.t("MarkdownBuilder.response"))

            if (ExportHelper.isEmpty(jsonMethodContent.responses)) {
                md += Markdown.text(i18n.t("MarkdownBuilder.noResponse"))
            } else {
                md += Markdown.responsesTable(jsonMethodContent.responses)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.exceptions)) {
                md += Markdown.h4(i18n.t("MarkdownBuilder.exceptions"))

                md += Markdown.responsesTable(jsonMethodContent.exceptions)
            }
        }
    }

    return md
}

async function buildFromJsonMethod(jsonMethod) {
    if (!jsonMethod) {
        return ""
    }

    let md = ""

    let jsonMethodContent = await JsonMethodContentDao.query(jsonMethod.id)

    if (!jsonMethodContent) {
        return md
    }

    md += Markdown.h2(ExportHelper.getMethodTitle(jsonMethod))

    md += Markdown.text(ExportHelper.getMethodSubtitle(jsonMethod))

    md += Markdown.tags(jsonMethod.tags)

    if (jsonMethod.isHttpService) {
        md += Markdown.h3(i18n.t("MarkdownBuilder.requestMethod"))

        md += Markdown.text(jsonMethod.requestMethod)

        md += Markdown.h3(i18n.t("MarkdownBuilder.requestPath"))

        md += Markdown.text(jsonMethod.fullRequestPath)

        if (!ExportHelper.isEmpty(jsonMethodContent.consumes)) {
            md += Markdown.h5(i18n.t("MarkdownBuilder.consumes"))

            md += Markdown.list(jsonMethodContent.consumes)
        }

        if (!ExportHelper.isEmpty(jsonMethodContent.headers)) {
            md += Markdown.h5(i18n.t("MarkdownBuilder.requestHeaders"))

            md += Markdown.parametersTable(jsonMethodContent.headers)
        }

        if (!ExportHelper.isEmpty(jsonMethodContent.cookies)) {
            md += Markdown.h5(i18n.t("MarkdownBuilder.requestCookies"))

            md += Markdown.parametersTable(jsonMethodContent.cookies)
        }

        md += Markdown.h3(i18n.t("MarkdownBuilder.parameters"))

        if (ExportHelper.isEmpty(jsonMethodContent.parameters)) {
            md += Markdown.text(i18n.t("MarkdownBuilder.noParameter"))
        } else {
            md += Markdown.parametersTable(jsonMethodContent.parameters)
        }

        if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
            md += Markdown.h3(i18n.t("MarkdownBuilder.parameterConstraints"))

            md += Markdown.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
        }

        md += Markdown.h3(i18n.t("MarkdownBuilder.response"))

        if (ExportHelper.isEmpty(jsonMethodContent.responses)) {
            md += Markdown.text(i18n.t("MarkdownBuilder.noResponse"))
        } else {
            md += Markdown.responsesTable(jsonMethodContent.responses)
        }

        if (!ExportHelper.isEmpty(jsonMethodContent.responseHeaders)) {
            md += Markdown.h3(i18n.t("MarkdownBuilder.responseHeaders"))

            md += Markdown.responsesTable(jsonMethodContent.responseHeaders)
        }
    }

    if (jsonMethod.isJavaService) {
        md += Markdown.h3(i18n.t("MarkdownBuilder.parameters"))

        if (ExportHelper.isEmpty(jsonMethodContent.parameters)) {
            md += Markdown.text(i18n.t("MarkdownBuilder.noParameter"))
        } else {
            md += Markdown.parametersTable(jsonMethodContent.parameters)
        }

        if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
            md += Markdown.h3(i18n.t("MarkdownBuilder.parameterConstraints"))

            md += Markdown.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
        }

        md += Markdown.h3(i18n.t("MarkdownBuilder.response"))

        if (ExportHelper.isEmpty(jsonMethodContent.responses)) {
            md += Markdown.text(i18n.t("MarkdownBuilder.noResponse"))
        } else {
            md += Markdown.responsesTable(jsonMethodContent.responses)
        }

        if (!ExportHelper.isEmpty(jsonMethodContent.exceptions)) {
            md += Markdown.h3(i18n.t("MarkdownBuilder.exceptions"))

            md += Markdown.responsesTable(jsonMethodContent.exceptions)
        }
    }

    return md
}

export default {
    buildFromJsonModule,
    buildFromJsonService,
    buildFromJsonMethod,
}