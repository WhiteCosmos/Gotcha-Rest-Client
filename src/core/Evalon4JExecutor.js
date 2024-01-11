import _
    from 'lodash'
import {
    spawn
} from 'child_process'
import Evalon4JParseResult
    from '@/data/evalon/Evalon4JParseResult'
import Evalon4JExecutorType
    from '@/core/Evalon4JExecutorType'
import ProjectImporterPayloadSource
    from '@/views/titlebar/project-importer/ProjectImporterPayloadSource'
import AppConfig
    from '@/AppConfig'
import GHCJson
    from '@/core/json/GHCJson'

let {app} = require('electron').remote

class Evalon4JExecutor {
    /**
     * @param {ProjectImporterPayload} payload
     */
    execute(payload) {
        return new Promise((resolve, reject) => {
            let path = ""

            let bookmark = ""

            let type

            if (payload.isFromFile()) {
                type = Evalon4JExecutorType.JSON

                path = payload.path

                bookmark = payload.bookmark
            }

            if (payload.isFromUrl()) {
                type = Evalon4JExecutorType.JSON

                path = payload.temporaryPath
            }

            if (payload.isFromJava()) {
                type = Evalon4JExecutorType.JAVA

                path = payload.path

                bookmark = payload.bookmark
            }

            let stopAccessingSecurityScopedResource = this._startAccessingSecurityScopedResource(bookmark)

            let evalon4jLocation = this._fetchEvalon4JLocation()

            let evalon4j = spawn(evalon4jLocation, ['-p', path, '-t', type])

            let evalon4jParseResultStr = ""

            let evalon4jParseResult = undefined

            evalon4j.on('error', (err => {
                console.error(`Execute Evalon4J Failed: `, err)

                stopAccessingSecurityScopedResource()

                if (payload.isFromUrl()) {
                    this._removeTemporaryFile(path)
                }

                evalon4jParseResult = Evalon4JParseResult.EXECUTE_EVALON4J_ERROR()

                reject(evalon4jParseResult)
            }))

            evalon4j.stdout.on('data', (data) => {
                evalon4jParseResultStr += data
            })

            evalon4j.stdout.on('close', () => {
                stopAccessingSecurityScopedResource()

                if (payload.isFromUrl()) {
                    this._removeTemporaryFile(path)
                }

                try {
                    evalon4jParseResult = GHCJson.parse(evalon4jParseResultStr)

                    if (evalon4jParseResult.hasError) {
                        reject(evalon4jParseResult)
                    } else {
                        this._appendProjectImporterPayload(evalon4jParseResult, payload)

                        resolve(evalon4jParseResult)
                    }
                } catch (err) {
                    evalon4jParseResult = Evalon4JParseResult.RESOLVE_EVALON4J_ERROR()

                    reject(evalon4jParseResult)
                }
            })
        })
    }

    _appendProjectImporterPayload(evalon4jParseResult, payload) {
        let data = evalon4jParseResult.data

        if (payload.isFromUrl()) {
            data.source = ProjectImporterPayloadSource.URL

            data.url = payload.url

            data.sha = payload.sha
        }

        if (payload.isFromFile()) {
            data.source = ProjectImporterPayloadSource.FILE

            data.path = payload.path

            data.bookmark = payload.bookmark
        }

        if (payload.isFromJava()) {
            data.source = ProjectImporterPayloadSource.JAVA

            data.path = payload.path

            data.bookmark = payload.bookmark
        }
    }

    _removeTemporaryFile(filepath) {
        let fs = require('fs')

        fs.unlink(filepath, () => {
        })
    }

    _fetchEvalon4JLocation() {
        const node_path = require('path')

        if (AppConfig.alpha()) {
            return "./public/evalon4j-core/bin/evalon4j"
        } else {
            let dirname = node_path.resolve(__dirname, '..')

            return node_path.join(dirname, 'evalon4j-core/bin/evalon4j')
        }
    }

    _startAccessingSecurityScopedResource(bookmark) {
        let stopAccessingSecurityScopedResource

        if (_.isEmpty(bookmark) || AppConfig.isDevelopment()) {
            stopAccessingSecurityScopedResource = () => {
            }
        } else {
            stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(bookmark)
        }

        return stopAccessingSecurityScopedResource
    }
}

export default Evalon4JExecutor