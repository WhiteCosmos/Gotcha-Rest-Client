import _
    from 'lodash'
import Schema
    from '@/export/openapi/media/Schema'

class RequestBody {
    constructor(jsonStruct, jsonMethod, definitions) {
        this.description = jsonStruct.summary

        this.content = {}

        if (_.isEmpty(jsonMethod.consumes)) { // 默认返回JSON格式
            this.content["application/json"] = new Schema(jsonStruct, definitions)
        } else {
            jsonMethod.consumes.forEach(consume => {
                this.content[consume] = {
                    schema: new Schema(jsonStruct, definitions)
                }
            })
        }
    }
}

export default RequestBody