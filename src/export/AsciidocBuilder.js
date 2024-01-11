import Asciidoc
    from '@/export/asciidoc/Asciidoc'
import ExportHelper
    from '@/export/ExportHelper'
import JsonMethodContentDao
    from '@/core/dao/JsonMethodContentDao'
import i18n
    from '@/main'

async function buildFromJsonModule(jsonModule) {
    if (!jsonModule) {
        return ""
    }

    let as = ""

    as += Asciidoc.h1(jsonModule.moduleName)

    as += Asciidoc.text("description")

    if (!ExportHelper.isEmpty(jsonModule.restfulApis)) {
        as += Asciidoc.h2("HTTP API")
    }

    for (let jsonService of jsonModule.restfulApis) {
        if (ExportHelper.isUnchecked(jsonService.checkedStatus)) {
            continue
        }

        as += Asciidoc.h3(ExportHelper.getServiceTitle(jsonService))

        as += Asciidoc.text(ExportHelper.getServiceSubtitle(jsonService))


        for (let jsonMethod of jsonService.methods) {
            if (ExportHelper.isUnchecked(jsonMethod.checkedStatus)) {
                continue
            }

            let jsonMethodContent = await JsonMethodContentDao.query(jsonMethod.id)

            if (!jsonMethodContent) {
                continue
            }

            as += Asciidoc.h4(ExportHelper.getMethodTitle(jsonMethod))

            as += Asciidoc.text(ExportHelper.getMethodSubtitle(jsonMethod))

            as += Asciidoc.tags(jsonMethod.tags)

            as += Asciidoc.h5(i18n.t("MarkdownBuilder.requestMethod"))

            as += Asciidoc.text(jsonMethod.requestMethod)

            as += Asciidoc.h5(i18n.t("MarkdownBuilder.requestPath"))

            as += Asciidoc.text(jsonMethod.fullRequestPath)

            if (!ExportHelper.isEmpty(jsonMethodContent.headers)) {
                as += Asciidoc.h5(i18n.t("MarkdownBuilder.requestHeaders"))

                as += Asciidoc.parameterConstraintsTable(jsonMethodContent.headers)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.cookies)) {
                as += Asciidoc.h5(i18n.t("MarkdownBuilder.requestCookies"))

                as += Asciidoc.parameterConstraintsTable(jsonMethodContent.cookies)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
                as += Asciidoc.h5(i18n.t("MarkdownBuilder.parameterConstraints"))

                as += Asciidoc.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
            }

            as += Asciidoc.h5(i18n.t("MarkdownBuilder.parameters"))

            if (ExportHelper.isEmpty(jsonMethodContent.parameters)) {
                as += Asciidoc.text(i18n.t("MarkdownBuilder.noParameter"))
            } else {
                as += Asciidoc.parametersTable(jsonMethodContent.parameters)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
                as += Asciidoc.h5(i18n.t("MarkdownBuilder.parameterConstraints"))

                as += Asciidoc.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
            }

            as += Asciidoc.h5(i18n.t("MarkdownBuilder.response"))

            if (ExportHelper.isEmpty(jsonMethodContent.responses)) {
                as += Asciidoc.text(i18n.t("MarkdownBuilder.noResponse"))
            } else {
                as += Asciidoc.responsesTable(jsonMethodContent.responses)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.responseHeaders)) {
                as += Asciidoc.h5(i18n.t("MarkdownBuilder.responseHeaders"))

                as += Asciidoc.responsesTable(jsonMethodContent.responseHeaders)
            }
        }
    }

    if (!ExportHelper.isEmpty(jsonModule.restfulApis)) {
        Asciidoc.h2(as, "JAVA API")
    }

    for (let jsonService of jsonModule.javaServices) {
        if (ExportHelper.isUnchecked(jsonService.checkedStatus)) {
            continue
        }

        as += Asciidoc.h3(ExportHelper.getServiceTitle(jsonService))

        as += Asciidoc.text(ExportHelper.getServiceSubtitle(jsonService))

        for (let jsonMethod of jsonService.methods) {
            if (ExportHelper.isUnchecked(jsonMethod.checkedStatus)) {
                continue
            }

            let jsonMethodContent = await JsonMethodContentDao.query(jsonMethod.id)

            if (!jsonMethodContent) {
                continue
            }

            as += Asciidoc.h4(ExportHelper.getMethodTitle(jsonMethod))

            as += Asciidoc.text(ExportHelper.getMethodSubtitle(jsonMethod))

            as += Asciidoc.tags(jsonMethod.tags)

            as += Asciidoc.h5(i18n.t("MarkdownBuilder.parameters"))

            if (ExportHelper.isEmpty(jsonMethodContent.parameters)) {
                as += Asciidoc.text(i18n.t("MarkdownBuilder.noParameter"))
            } else {
                as += Asciidoc.parametersTable(jsonMethodContent.parameters)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
                as += Asciidoc.h5(i18n.t("MarkdownBuilder.parameterConstraints"))

                as += Asciidoc.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
            }

            as += Asciidoc.h5(i18n.t("MarkdownBuilder.response"))

            if (ExportHelper.isEmpty(jsonMethodContent.responses)) {
                as += Asciidoc.text(i18n.t("MarkdownBuilder.noResponse"))
            } else {
                as += Asciidoc.responsesTable(jsonMethodContent.responses)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.exceptions)) {
                as += Asciidoc.h5(i18n.t("MarkdownBuilder.exceptions"))

                as += Asciidoc.responsesTable(jsonMethodContent.exceptions)
            }
        }
    }

    return as
}

async function buildFromJsonService(jsonService) {
    if (!jsonService) {
        return ""
    }

    let as = ""

    as += Asciidoc.h2(ExportHelper.getServiceTitle(jsonService))

    as += Asciidoc.text(ExportHelper.getServiceSubtitle(jsonService))

    for (let jsonMethod of jsonService.methods) {
        as += Asciidoc.h3(ExportHelper.getMethodTitle(jsonMethod))

        as += Asciidoc.text(ExportHelper.getMethodSubtitle(jsonMethod))

        as += Asciidoc.tags(jsonMethod.tags)

        let jsonMethodContent = await JsonMethodContentDao.query(jsonMethod.id)

        if (!jsonMethodContent) {
            continue
        }

        if (jsonMethod.isHttpService) {
            as += Asciidoc.h4(i18n.t("MarkdownBuilder.requestMethod"))

            as += Asciidoc.text(jsonMethod.requestMethod)

            as += Asciidoc.h4(i18n.t("MarkdownBuilder.requestPath"))

            as += Asciidoc.text(jsonMethod.fullRequestPath)

            if (!ExportHelper.isEmpty(jsonMethodContent.headers)) {
                as += Asciidoc.h5(i18n.t("MarkdownBuilder.requestHeaders"))

                as += Asciidoc.parameterConstraintsTable(jsonMethodContent.headers)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.cookies)) {
                as += Asciidoc.h5(i18n.t("MarkdownBuilder.requestCookies"))

                as += Asciidoc.parameterConstraintsTable(jsonMethodContent.cookies)
            }

            as += Asciidoc.h4(i18n.t("MarkdownBuilder.parameters"))

            if (ExportHelper.isEmpty(jsonMethodContent.parameters)) {
                as += Asciidoc.text(i18n.t("MarkdownBuilder.noParameter"))
            } else {
                as += Asciidoc.parametersTable(jsonMethodContent.parameters)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
                as += Asciidoc.h4(i18n.t("MarkdownBuilder.parameterConstraints"))

                as += Asciidoc.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
            }

            as += Asciidoc.h4(i18n.t("MarkdownBuilder.response"))

            if (ExportHelper.isEmpty(jsonMethodContent.responses)) {
                as += Asciidoc.text(i18n.t("MarkdownBuilder.noResponse"))
            } else {
                as += Asciidoc.responsesTable(jsonMethodContent.responses)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.responseHeaders)) {
                as += Asciidoc.h4(i18n.t("MarkdownBuilder.responseHeaders"))

                as += Asciidoc.responsesTable(jsonMethodContent.responseHeaders)
            }
        }

        if (jsonMethod.isJavaService) {
            let jsonMethodContent = await JsonMethodContentDao.query(jsonMethod.id)

            if (!jsonMethodContent) {
                continue
            }

            as += Asciidoc.h3(ExportHelper.getMethodTitle(jsonMethod))

            as += Asciidoc.text(ExportHelper.getMethodSubtitle(jsonMethod))

            as += Asciidoc.tags(jsonMethod.tags)

            as += Asciidoc.h4(i18n.t("MarkdownBuilder.parameters"))

            if (ExportHelper.isEmpty(jsonMethodContent.parameters)) {
                as += Asciidoc.text(i18n.t("MarkdownBuilder.noParameter"))
            } else {
                as += Asciidoc.parametersTable(jsonMethodContent.parameters)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
                as += Asciidoc.h4(i18n.t("MarkdownBuilder.parameterConstraints"))

                as += Asciidoc.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
            }

            as += Asciidoc.h4(i18n.t("MarkdownBuilder.response"))

            if (ExportHelper.isEmpty(jsonMethodContent.responses)) {
                as += Asciidoc.text(i18n.t("MarkdownBuilder.noResponse"))
            } else {
                as += Asciidoc.responsesTable(jsonMethodContent.responses)
            }

            if (!ExportHelper.isEmpty(jsonMethodContent.exceptions)) {
                as += Asciidoc.h4(i18n.t("MarkdownBuilder.exceptions"))

                as += Asciidoc.responsesTable(jsonMethodContent.exceptions)
            }
        }
    }

    return as

}

async function buildFromJsonMethod(jsonMethod) {
    if (!jsonMethod) {
        return ""
    }

    let as = ""

    let jsonMethodContent = await JsonMethodContentDao.query(jsonMethod.id)

    if (!jsonMethodContent) {
        return as
    }

    as += Asciidoc.h2(ExportHelper.getMethodTitle(jsonMethod))

    as += Asciidoc.text(ExportHelper.getMethodSubtitle(jsonMethod))

    as += Asciidoc.tags(jsonMethod.tags)

    if (jsonMethod.isHttpService) {
        as += Asciidoc.h3(i18n.t("MarkdownBuilder.requestMethod"))

        as += Asciidoc.text(jsonMethod.requestMethod)

        as += Asciidoc.h3(i18n.t("MarkdownBuilder.requestPath"))

        as += Asciidoc.text(jsonMethod.fullRequestPath)

        if (!ExportHelper.isEmpty(jsonMethodContent.headers)) {
            as += Asciidoc.h5(i18n.t("MarkdownBuilder.requestHeaders"))

            as += Asciidoc.parameterConstraintsTable(jsonMethodContent.headers)
        }

        if (!ExportHelper.isEmpty(jsonMethodContent.cookies)) {
            as += Asciidoc.h5(i18n.t("MarkdownBuilder.requestCookies"))

            as += Asciidoc.parameterConstraintsTable(jsonMethodContent.cookies)
        }

        as += Asciidoc.h3(i18n.t("MarkdownBuilder.parameters"))

        if (ExportHelper.isEmpty(jsonMethodContent.parameters)) {
            as += Asciidoc.text(i18n.t("MarkdownBuilder.noParameter"))
        } else {
            as += Asciidoc.parametersTable(jsonMethodContent.parameters)
        }

        if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
            as += Asciidoc.h3(i18n.t("MarkdownBuilder.parameterConstraints"))

            as += Asciidoc.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
        }

        as += Asciidoc.h3(i18n.t("MarkdownBuilder.response"))

        if (ExportHelper.isEmpty(jsonMethodContent.responses)) {
            as += Asciidoc.text(i18n.t("MarkdownBuilder.noResponse"))
        } else {
            as += Asciidoc.responsesTable(jsonMethodContent.responses)
        }

        if (!ExportHelper.isEmpty(jsonMethodContent.responseHeaders)) {
            as += Asciidoc.h3(i18n.t("MarkdownBuilder.responseHeaders"))

            as += Asciidoc.responsesTable(jsonMethodContent.responseHeaders)
        }
    }

    if (jsonMethod.isJavaService) {
        as += Asciidoc.h3(i18n.t("MarkdownBuilder.parameters"))

        if (ExportHelper.isEmpty(jsonMethodContent.parameters)) {
            as += Asciidoc.text(i18n.t("MarkdownBuilder.noParameter"))
        } else {
            as += Asciidoc.parametersTable(jsonMethodContent.parameters)
        }

        if (!ExportHelper.isEmpty(jsonMethodContent.parameterConstraints)) {
            as += Asciidoc.h3(i18n.t("MarkdownBuilder.parameterConstraints"))

            as += Asciidoc.parameterConstraintsTable(jsonMethodContent.parameterConstraints)
        }

        as += Asciidoc.h3(i18n.t("MarkdownBuilder.response"))

        if (ExportHelper.isEmpty(jsonMethodContent.responses)) {
            as += Asciidoc.text(i18n.t("MarkdownBuilder.noResponse"))
        } else {
            as += Asciidoc.responsesTable(jsonMethodContent.responses)
        }

        if (!ExportHelper.isEmpty(jsonMethodContent.exceptions)) {
            as += Asciidoc.h3(i18n.t("MarkdownBuilder.exceptions"))

            as += Asciidoc.responsesTable(jsonMethodContent.exceptions)
        }
    }

    return as
}

export default {
    buildFromJsonModule,
    buildFromJsonService,
    buildFromJsonMethod
}