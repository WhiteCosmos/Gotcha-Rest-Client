import Markdown
    from '@/export/markdown/Markdown'
import ExportHelper
    from '@/export/ExportHelper'
import i18n
    from '@/main'
import _
    from 'lodash'

class MarkdownBuilder_ {
    buildFromJsonMethod(jsonMethod) {
        let md = ""

        md += Markdown.h2(ExportHelper.getMethodTitle(jsonMethod))

        md += Markdown.text(ExportHelper.getMethodSubtitle(jsonMethod))

        md += Markdown.tags(jsonMethod.tags)

        if (jsonMethod.isHttpService) {
            this._buildFromHttpService(md, jsonMethod)
        }

        if (jsonMethod.isJavaService) {
            this._buildFromJavaService(md, jsonMethod)
        }

        return md
    }

    _buildFromHttpService(md, jsonMethod) {
        md += Markdown.h3(i18n.t("MarkdownBuilder.requestMethod"))

        md += Markdown.text(jsonMethod.requestMethod)

        md += Markdown.h3(i18n.t("MarkdownBuilder.requestPath"))

        md += Markdown.text(jsonMethod.requestPath)

        let httpRequest = jsonMethod.httpRequest

        if (!_.isEmpty(httpRequest.headers)) {
            md += Markdown.h5(i18n.t("MarkdownBuilder.requestHeaders"))

            md += Markdown.parametersTable(jsonMethod.headers)
        }

        md += Markdown.h3(i18n.t("MarkdownBuilder.parameters"))

        if (_.isEmpty(httpRequest.urlParams)) {
            md += Markdown.text(i18n.t("MarkdownBuilder.noParameter"))
        } else {
            md += Markdown.parametersTable(httpRequest.urlParams)
        }

        // TODO payload

        let httpResponses = jsonMethod.httpResponses

        httpResponses && httpResponses.forEach(httpResponse => {
            md += Markdown.h3(`Response ${httpResponse.statusCode} ${httpResponse.statusText}`)

            if (!_.isEmpty(httpResponse.headers)) {
                md += Markdown.h3(i18n.t("MarkdownBuilder.responseHeaders"))

                md += Markdown.responsesTable(httpResponse.headers)
            }

            if (!_.isEmpty(httpResponse.payloads)) {
                let payload = httpResponse.payloads[0]

                md += Markdown.h3("Response Payload")

                md += Markdown.responsesTable(payload.content)
            }
        })
    }

    _buildFromJavaService(md, jsonMethod) {

    }
}

export default MarkdownBuilder_