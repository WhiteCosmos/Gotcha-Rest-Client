import GHCMarkdown
    from '@/core/export/GHCMarkdown'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import GHCHttpClientUrlHelper
    from '@/views/http-client/core/GHCHttpClientUrlHelper'
import _
    from 'lodash'
import GHCJsonNodeBuilder
    from '@/components/json-editor-vsl/GHCJsonNodeBuilder'

import i18n
    from '@/main'
import RabiHttpOperationDao
    from '@/core/dao/RabiHttpOperationDao'
import GHCHttpClientCURLBuilder
    from '@/views/http-client/core/GHCHttpClientCURLBuilder'
import GHCOpenAPIComponentGenerator
    from '@/core/transformer/GHCOpenAPIComponentGenerator'

class GHCHttpClientRequestDocsExporter {
    constructor(cookieJar, variableRender, predict = () => {
        return true
    }) {
        this.cookieJar = cookieJar

        this.variableRender = variableRender

        this.predict = predict
    }

    exportToMarkdown(httpRequest) {
        let tableConfigs = [{
            name: i18n.t("GHCHttpClientRequestDocsExporter.name"),
            minWidth: 16,
            callback: (item) => {
                return item.key
            }
        }, {
            name: i18n.t("GHCHttpClientRequestDocsExporter.required"),
            minWidth: 9,
            callback: (item) => {
                return item.requiredStatus === 'CHECKED' ? '√' : 'X'
            }
        }, {
            name: i18n.t("GHCHttpClientRequestDocsExporter.description"),
            minWidth: 16,
            callback: (item) => {
                return item.description
            }
        }]

        let pathTableConfigs = [{
            name: i18n.t("GHCHttpClientRequestDocsExporter.name"),
            minWidth: 16,
            callback: (item) => {
                return item.key
            }
        }, {
            name: i18n.t("GHCHttpClientRequestDocsExporter.description"),
            minWidth: 16,
            callback: (item) => {
                return item.description
            }
        }]

        let md = new GHCMarkdown()

        md.h2(httpRequest.name)

        md.properties([
            {
                key: i18n.t("GHCHttpClientRequestDocsExporter.requestMethod"),
                value: httpRequest.requestMethod
            },
            {
                key: i18n.t("GHCHttpClientRequestDocsExporter.requestPath"),
                value: this._getRequestPath(httpRequest)
            },
        ])

        md.h3(i18n.t('GHCHttpClientRequestDocsExporter.requestDescription'))

        md.text(httpRequest.description)

        md.h3(i18n.t('GHCHttpClientRequestDocsExporter.request'))

        let headers = httpRequest.headers

        let pathParameters = httpRequest.pathParameters.filter(p => {
            return p.requiredStatus === 'CHECKED'
        })

        let queryParameters = httpRequest.queryParameters

        if (!_.isEmpty(headers)) {
            md.h4(i18n.t('GHCHttpClientRequestDocsExporter.headers'))

            md.table(headers, tableConfigs)
        }

        if (!_.isEmpty(pathParameters)) {
            md.h4(i18n.t('GHCHttpClientRequestDocsExporter.paths'))

            md.table(pathParameters, pathTableConfigs)
        }

        if (!_.isEmpty(queryParameters)) {
            md.h4(i18n.t('GHCHttpClientRequestDocsExporter.querys'))

            md.table(queryParameters, tableConfigs)
        }

        let payload = httpRequest.payload

        if (!this._isNonePayload(payload)) {
            md.h4(i18n.t('GHCHttpClientRequestDocsExporter.payload'))

            if (this._isTextPayload(payload)) {
                let text = payload.text

                md.properties([{
                    key: 'Content-Type',
                    value: text.contentType,
                }])

                md.script(text.content, text.contentType)
            }

            if (this._isJsonPayload(payload)) {
                let json = payload.json

                md.properties([{
                    key: 'Content-Type',
                    value: 'application/json',
                }])

                let content = new GHCJsonNodeBuilder(this.variableRender).buildJsonFromJsonNode(json.root)

                md.script(JSON.stringify(content, null, 4), 'json')
            }

            if (this._isFormPayload(payload)) {
                let form = payload.form

                md.properties([{
                    key: 'Content-Type',
                    value: 'application/x-www-form-urlencoded',
                }])

                md.table(form.items, tableConfigs)
            }

            if (this._isMultipartPayload(payload)) {
                let multipart = payload.multipart

                md.properties([{
                    key: 'Content-Type',
                    value: 'multipart/form-data',
                }])

                md.table(multipart.items, tableConfigs)
            }

            if (this._isGraphQLPayload(payload)) {
                // ignore
            }
        }

        md.h3(i18n.t('GHCHttpClientRequestDocsExporter.response'))

        let index = 1

        httpRequest.examples.forEach(example => {
            if (example.description) {
                md.h4(`${example.description}`)
            } else {
                md.h4(`${index++}.`)
            }

            md.properties([
                {
                    key: i18n.t('GHCHttpClientRequestDocsExporter.statusCode'),
                    value: `${example.statusCode} ${example.statusText}`
                },
                {
                    key: 'Content-Type',
                    value: example.dContentType
                },
            ])

            md.script(example.dExample, 'json')
        })

        return md.toString()
    }

    async batchExportToMarkdown(treeNodes) {
        let md = new GHCMarkdown()

        for (let i = 0; i < treeNodes.length; i++) {
            let treeNode = treeNodes[i]

            if (!this.predict(treeNode)) {
                continue
            }

            md.h1(treeNode.name)

            let httpOperationDao = new RabiHttpOperationDao()

            for (let i = 0; i < treeNode.children.length; i++) {
                let child = treeNode.children[i]

                if (!this.predict(child)) {
                    continue
                }

                let httpOperation = await httpOperationDao.query({id: child.httpRequestId})

                if (!httpOperation) {
                    continue
                }

                md.text(this.exportToMarkdown(httpOperation.httpRequest))
            }
        }

        return md
    }

    /**
     * TreeNode need to be flattened
     *
     * @param treeNodes
     * @returns {Promise}
     */
    async batchExportToCurl(treeNodes) {
        let md = new GHCMarkdown()

        let builder = new GHCHttpClientCURLBuilder(this.cookieJar, this.variableRender)

        let httpOperationDao = new RabiHttpOperationDao()

        for (let i = 0; i < treeNodes.length; i++) {
            let treeNode = treeNodes[i]

            if (!this.predict(treeNode)) {
                continue
            }

            md.h2(treeNode.name)

            for (let j = 0; j < treeNode.children.length; j++) {
                let child = treeNode.children[j]

                if (!this.predict(child)) {
                    continue
                }

                if (child.isContainer) {
                    continue
                }

                let httpOperation = await httpOperationDao.query({id: child.httpRequestId})

                let curl = builder.build(httpOperation.httpRequest)

                md.h3(child.name)

                md.script(curl, 'curl')
            }
        }

        return md
    }

    _getRequestPath(httpRequest) {
        return new GHCHttpClientUrlHelper(httpRequest, this.variableRender).buildRequestPathFromRequestUrl()
    }

    _isNonePayload(payload) {
        return payload && payload.type === GHCHttpRequestPayloadType.NONE
    }

    _isTextPayload(payload) {
        return payload && payload.type === GHCHttpRequestPayloadType.TEXT
    }

    _isJsonPayload(payload) {
        return payload && payload.type === GHCHttpRequestPayloadType.JSON
    }

    _isFormPayload(payload) {
        return payload && payload.type === GHCHttpRequestPayloadType.FORM
    }

    _isMultipartPayload(payload) {
        return payload && payload.type === GHCHttpRequestPayloadType.MULTIPART
    }

    _isGraphQLPayload(payload) {
        return payload && payload.type === GHCHttpRequestPayloadType.GRAPHQL
    }
}

export default GHCHttpClientRequestDocsExporter