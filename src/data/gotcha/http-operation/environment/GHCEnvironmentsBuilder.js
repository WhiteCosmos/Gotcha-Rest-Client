import GHCEnvironments
    from '@/data/gotcha/http-operation/environment/GHCEnvironments'
import GHCEnvironmentVariableGroup
    from '@/data/gotcha/http-operation/environment/GHCEnvironmentVariableGroup'

class GHCEnvironmentsBuilder {
    constructor(project) {
        this.project = project
    }

    build() {
        let environments = new GHCEnvironments()

        environments.projectId = this.project.id

        let group = new GHCEnvironmentVariableGroup()

        group.default = true

        environments.groups.push(group)

        return environments
    }
}

export default GHCEnvironmentsBuilder