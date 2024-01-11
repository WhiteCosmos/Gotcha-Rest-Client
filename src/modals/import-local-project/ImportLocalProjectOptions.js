class ImportLocalProjectOptions {
    constructor() {
        this.type = "DIRECTORY" // DIRECTORY | FILE | PROJECT

        this.directoryPath = "" // DIRECTORY

        this.filePath = "" // FILE

        this.projectName = "" // PROJECT

        this.bookmark = "" // Security Bookmark

        this.filePathBookmark = ""

        this.directoryPathBookmark = ""

        this.branchName = ""
    }
}

export default ImportLocalProjectOptions