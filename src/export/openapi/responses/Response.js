import _
    from 'lodash'
import Schema
    from '@/export/openapi/media/Schema'

class Response {
    constructor(jsonStruct, jsonMethod) {
        this.description = jsonStruct.fieldSummary

        if (_.isEmpty(jsonMethod.produces)) {
            this.content = {
                "application/json": {
                    schema: new Schema(jsonStruct)
                }
            }
        } else {
            this.content = {}

            jsonMethod.produces.forEach(produce => {
                this.content[produce] = {
                    schema: new Schema(jsonStruct)
                }
            })
        }
    }
}

export default Response