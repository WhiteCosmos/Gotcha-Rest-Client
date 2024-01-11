export default {
    isNoneVersion(jsonVersion) {
        return jsonVersion && jsonVersion.versionType === 'NONE'
    },

    isGitVersion(jsonVersion) {
        return jsonVersion && jsonVersion.versionType === 'GIT'
    },

    isSemanticVersion(jsonVersion) {
        return jsonVersion && jsonVersion.versionType === 'SEMANTIC'
    }
}