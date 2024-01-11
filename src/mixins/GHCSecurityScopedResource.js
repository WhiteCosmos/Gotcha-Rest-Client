/**
 * @created_at 2022/10/11
 * @app_version 1.5.3
 */

let {app} = require('electron').remote

class GHCSecurityScopedResource {
    constructor() {
        this.stopAccessingSecurityScopedResource = () => {
        }
    }

    startAccess(bookmark) {
        if (!bookmark) {
            return
        }

        this.stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(bookmark)
    }

    stopAccess() {
        this.stopAccessingSecurityScopedResource()
    }
}

export default GHCSecurityScopedResource