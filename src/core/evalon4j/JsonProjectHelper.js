export default {
    isJavaProject(jsonProject) {
        return jsonProject && jsonProject.projectType === 'JAVA'
    },

    isApidocProject(jsonProject) {
        return jsonProject && jsonProject.projectType === 'APIDOC'
    },

    isSwaggerProject(jsonProject) {
        return jsonProject && jsonProject.projectType === 'SWAGGER'
    },

    isOpenAPIProject(jsonProject) {
        return jsonProject && jsonProject.projectType === 'OPENAPI'
    },

    isRabiProject(jsonProject) {
        return jsonProject && jsonProject.projectType === 'RABIAPI'
    },

    isDemoProject(jsonProject) {
        return jsonProject && jsonProject.projectType === 'DEMO'
    }
}