import GHCSecurityScopedResource
    from '@/mixins/GHCSecurityScopedResource'

/**
 * @created_at 2022/10/7
 * @app_version 1.5.0
 */
class GHCDynamicVariableEncodingRender {
    constructor() {

    }

    render(payload) {
        let target = payload.target

        let source = payload.source

        let data = ''

        if (source === 'text') {
            data = payload.text
        }

        if (source === 'file') {
            let fs = require('fs')

            let file = payload.file

            if (file) {
                let resource = new GHCSecurityScopedResource()

                resource.startAccess(file.bookmark)

                data = fs.readFileSync(file.filepath)

                resource.stopAccess()
            }
        }

        if (target === 'base64') {
            if (payload.encode) {
                return Buffer.from(data).toString('base64')
            } else {
                let base64 = new Buffer(data, 'base64')

                return base64.toString('utf-8')
            }
        }

        if (target === 'url') {
            if (payload.encode) {
                return encodeURIComponent(data)
            } else {
                return decodeURIComponent(data)
            }
        }

        return ''
    }
}

export default GHCDynamicVariableEncodingRender