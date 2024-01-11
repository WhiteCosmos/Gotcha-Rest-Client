import GHCCookieJar
    from '@/data/gotcha/http-operation/cookie/GHCCookieJar'
import GHCCookieJars
    from '@/data/gotcha/http-operation/cookie/GHCCookieJars'

class GHCCookieJarsBuilder {
    constructor(project) {
        this.project = project
    }

    build() {
        let cookieJars = new GHCCookieJars()

        cookieJars.projectId = this.project.id

        let cookieJar = new GHCCookieJar()

        cookieJar.name = "Default Cookie Jar"

        cookieJar.default = true

        cookieJars.selectedCookieJarUID = cookieJar.uid

        cookieJars.cookieJars.push(cookieJar)

        return cookieJars
    }
}

export default GHCCookieJarsBuilder