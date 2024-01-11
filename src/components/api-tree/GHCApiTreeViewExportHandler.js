/**
 * @created_at 2022/7/3
 * @app_version 1.5.0
 */
import GHCHttpClientRequestDocsExporter
    from '@/views/http-client/request/request-docs/GHCHttpClientRequestDocsExporter'
import GHCPostmanCollectionV2Builder
    from '@/core/postman/GHCPostmanCollectionV2Builder'

class GHCApiTreeViewExportHandler {
    constructor(cookieJar, variableRender) {
        this.cookieJar = cookieJar

        this.variableRender = variableRender
    }

    async handle(treeNode, type) {
        if (type === 'postman') {
            let builder = new GHCPostmanCollectionV2Builder(this.cookieJar, this.variableRender)

            return JSON.stringify(await builder.build(treeNode), null, 2)
        }

        let treeNodes = this._flattenTreeNode(treeNode)

        let exporter = new GHCHttpClientRequestDocsExporter(this.cookieJar, this.variableRender)

        if (type === 'markdown') {
            return await exporter.batchExportToMarkdown(treeNodes)
        }

        if (type === 'curl') {
            return await exporter.batchExportToCurl(treeNodes)
        }
    }

    getExtension(type) {
        if (type === 'postman') {
            return 'json'
        }

        if (type === 'markdown') {
            return 'md'
        }

        if (type === 'curl') {
            return 'md'
        }
    }

    getFilename(treeNode, type) {
        if (type === 'postman') {
            return `${treeNode.name}.postman_collection`
        }

        if (type === 'markdown') {
            return treeNode.name
        }

        if (type === 'curl') {
            return treeNode.name
        }
    }

    _flattenTreeNode(treeNode) {
        let groups = [treeNode]

        treeNode.children.forEach(child => {
            if (child.isContainer) {
                groups.push(...this._flattenTreeNode(child))
            }
        })

        return groups
    }
}

export default GHCApiTreeViewExportHandler