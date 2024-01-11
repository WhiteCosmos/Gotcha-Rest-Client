/**
 * @IndexedDB
 */
import RabiTreeViewGroupType
    from '@/views/sidebar/group-selector/RabiTreeViewGroupType'

class RabiTreeViewGroup {
    constructor() {
        this.moduleId = -1

        this.name = "HTTP APIs"

        this.group = "HTTP_SERVICE"

        this.type = "FIXED" // FIXED | DYNAMIC
    }

    static API_GROUP(moduleId) {
        let treeViewGroup = new RabiTreeViewGroup()

        treeViewGroup.name = "All APIs"

        treeViewGroup.moduleId = moduleId

        treeViewGroup.group = RabiTreeViewGroupType.API_GROUP

        treeViewGroup.type = RabiTreeViewGroupType.FIXED_GROUP

        return treeViewGroup
    }

    static HTTP_SERVICE_GROUP(moduleId) {
        let treeViewGroup = new RabiTreeViewGroup()

        treeViewGroup.name = "HTTP APIs"

        treeViewGroup.moduleId = moduleId

        treeViewGroup.group = RabiTreeViewGroupType.HTTP_SERVICE_GROUP

        treeViewGroup.type = RabiTreeViewGroupType.FIXED_GROUP

        return treeViewGroup
    }

    static HTTP_MODEL_GROUP(moduleId) {
        let treeViewGroup = new RabiTreeViewGroup()

        treeViewGroup.name = "HTTP Models"

        treeViewGroup.moduleId = moduleId

        treeViewGroup.group = RabiTreeViewGroupType.HTTP_MODEL_GROUP

        treeViewGroup.type = RabiTreeViewGroupType.FIXED_GROUP

        return treeViewGroup
    }

    static JAVA_SERVICE_GROUP(moduleId) {
        let treeViewGroup = new RabiTreeViewGroup()

        treeViewGroup.name = "RPC Services"

        treeViewGroup.moduleId = moduleId

        treeViewGroup.group = RabiTreeViewGroupType.JAVA_SERVICE_GROUP

        treeViewGroup.type = RabiTreeViewGroupType.FIXED_GROUP

        return treeViewGroup
    }

    static JAVA_MODEL_GROUP(moduleId) {
        let treeViewGroup = new RabiTreeViewGroup()

        treeViewGroup.name = "RPC Models"

        treeViewGroup.moduleId = moduleId

        treeViewGroup.group = RabiTreeViewGroupType.JAVA_MODEL_GROUP

        treeViewGroup.type = RabiTreeViewGroupType.FIXED_GROUP

        return treeViewGroup
    }
}

export default RabiTreeViewGroup