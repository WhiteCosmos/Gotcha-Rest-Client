import _
    from 'lodash'

let express = require('express')

/*
    1. Send request to mock service
    2. Check if url exists
        2.1 No, fetch JsonMethod from DB
        2.2 Generate mock content
    3. Return mock content
 */

class MockServer {
    constructor(jsonServices) {
        this.app = express()

        this.mockOperations = []

        this.initialize(jsonServices)
    }

    /**
     * @param {JsonService[]} jsonServices
     */
    initialize(jsonServices) {
        // Register all URLs

        jsonServices.forEach(jsonService => {
            jsonService.methods.forEach(jsonMethod => {
                this.app[jsonMethod.requestMethod.toLowerCase()](jsonMethod.requestPath, (req, res) => {
                    this.handle(req, res, jsonMethod)
                })
            })
        })

        // Fetch & generate default mocks
    }

    handle(req, res, jsonMethod) {
        // 根据 method 和 path 查找对应的 mockOperation

        let requestMethod = req.method

        let requestPath = req.path

        let mockOperations = []

        /*
            1. 检查参数匹配逻辑
                1.1 发现匹配 计算并返回结果
                1.2 无匹配 返回默认结果
         */

        let matchedMockOperation = this.findMatchedMockOperation(req, mockOperations)

        if (!matchedMockOperation) {
            this._sendDefaultMockResponse(res, jsonMethod)
        } else {
            this.sendMatchedMockResponse(res, matchedMockOperation)
        }
    }

    findMatchedMockOperation(req, mockOperations) {
        let params = req.params

        return undefined
    }

    /**
     * @param {Response} res
     * @param {RabiMockOperation} matchedMockOperation
     */
    sendMatchedMockResponse(res, matchedMockOperation) {
        // status code

        // response header

        // cookies

        // response body

        let httpResponse = matchedMockOperation.httpResponse

        res.status(httpResponse.statusCode)

        // response body
    }

    /**
     * Send default response if no mock operation found
     *
     * @param res
     * @param {JsonMethod} jsonMethod
     * @private
     */
    async _sendDefaultMockResponse(res, jsonMethod) {
        let jsonMethodContent = {}

        // let jsonMethodContent = await JsonMethodContentDao.query(jsonMethod.id)

        let httpResponses = jsonMethodContent.httpResponses

        let success = httpResponses.find(r => {
            return r.statusCode === 200
        })

        if (!success) {
            res.sendStatus('200')

            return
        }

        this._appendResponseHeaders(res, success.headers)

        this._appendResponsePayloads(res, success.payloads)
    }

    _appendResponseHeaders(res, headers) {
        headers && headers.forEach(header => {
            if (!_.isEmpty(header.fieldValue)) {
                res.append(header.fieldName, header.fieldValue)

                return
            }

            if (!_.isEmpty(header.defaultValue)) {
                res.append(header.fieldName, header.defaultValue)

                return
            }

            if (!_.isEmpty(header.exampleValue)) {
                res.append(header.fieldName, header.exampleValue)

                return
            }
        })
    }

    /**
     * @param res
     * @param {JsonHttpPayload[]} payloads
     * @private
     */
    _appendResponsePayloads(res, payloads) {
        if (_.isEmpty(payloads)) {
            res.sendStatus(200)

            return
        }

        let format = {}

        payloads.forEach(p => {
            format[p.contentType] = () => {
                let example = p.examples[0]

                res.send(example.value)
            }
        })

        format['default'] = () => {
            let jsonPayload = payloads.find(p => {
                return p.contentType === 'application/json'
            })

            if (jsonPayload) {
                res.type('application/json')

                let example = jsonPayload.examples[0]

                res.send(example.value)
            } else {
                res.sendStatus(406)
            }
        }

        res.format(format)
    }

    start(port) {
        this.app.listen(port, () => {

        })
    }

    restart() {

    }

    stop() {
        this.app.close()
    }

    update(mockOperation) {
        // 存在 id 在DB中更新

        // 不存在 id 创建新的Mock
    }
}

export default MockServer