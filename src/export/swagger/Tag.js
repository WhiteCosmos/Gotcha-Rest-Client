import JsonMethodHelper
    from '@/core/evalon4j/JsonMethodHelper'

class Tag {
    constructor(jsonService) {
        this.name = JsonMethodHelper.getServiceSummary(jsonService)

        this.description = jsonService.description
    }
}

export default Tag