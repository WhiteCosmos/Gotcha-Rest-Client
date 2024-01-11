import Schema
    from '@/export/swagger/Schema'
import _
    from 'lodash'

class Response {
    constructor(jsonStruct, definitions) {
        // TODO headers

        this.description = jsonStruct.fieldSummary

        if (!_.isEmpty(jsonStruct.children)) {
            this.schema = new Schema(jsonStruct.children[0], definitions)
        }
    }
}

export default Response