class JsonProject {
    constructor() {
        // uuid: "",
        //
        //     repositoryId: -1,
        //
        //     remoteProjectId: -1, // 托管项目的项目ID
        //
        //     projectName: "",
        //
        //     projectPath: "", // exists if local project
        //
        //     projectBookmark: "", // scoped bookmarked for using project again
        //
        //     projectType: "LOCAL", // LOCAL 本地项目 REMOTE 远程仓库 GITLAB GITHUB SOURCE_JAR
        //
        //     defaultBranchName: "master", // exists if remote project, default is master
        //
        //     lastSelectedBranchId: -1, // 上一次选择的分支
        //
        //     isGitProject: true,
        //
        //     isDemoProject: false,
        //
        //     branchIds: [], // 分支 ID 列表
        //
        //     tagIds: [], // TAG ID 列表
        //
        //     gitlabProject: {}, // 保存通过Gitlab返回的原始数据
        //
        // githubProject: {},

        this.uuid = ""

        this.repositoryId = -1

        this.projectName = ""

        this.projectDescription = ""

        this.projectPath = "" // DIRECTORY_PATH FILE_PATH

        this.projectBookmark = "" // Bookmark to access projectPath

        this.projectType = "" // JAVA SWAGGER RABIAPI ... DEMO

        this.branchIds = []

        this.gitlab = {} // If is gitlab project
    }
}

export default JsonProject