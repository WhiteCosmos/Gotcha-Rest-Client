class JsonRepository {
    constructor() {
        this.repositoryName = ""

        this.repositoryType = "" // LOCAL REMOTE SOURCE_JAR

        this.projectIds = []

        this.lastSelectedProjectId = -1

        this.homeRelativePathBookmark = "" // Access .git directory under home

        this.gitlab = {} // Save gitlab config if is a remote repo

        this.github = {} // ...
    }
}

export default JsonRepository