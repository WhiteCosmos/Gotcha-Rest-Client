/**
 * @created_at 2022/10/2
 * @app_version 1.5.0
 */
import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'

class GHCDynamicVariableFileContent {
    constructor() {
        this.type = GHCDynamicVariableType.FILE_CONTENT

        this.filename = ''

        this.filepath = ''

        this.bookmark = ''
    }
}

export default GHCDynamicVariableFileContent