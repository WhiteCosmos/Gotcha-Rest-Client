/**
 * @created_at 2022/11/20
 * @app_version 1.6.0
 */
class GHCOpenAPIExportSettings {
    constructor() {
        this.title = ''

        this.version = ''

        this.description = ''

        this.termsOfService = ''

        this.contact = {
            name: "",
            url: "",
            email: ""
        }

        this.license = {
            name: "",
            url: ""
        }

        this.servers = []
    }
}

export default GHCOpenAPIExportSettings