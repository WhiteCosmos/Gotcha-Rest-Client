import crypto
    from 'crypto'
import _
    from 'lodash'
import AppConfig
    from '@/AppConfig'
import GHCSecurityScopedResource
    from '@/mixins/GHCSecurityScopedResource'

/**
 * @created_at 2022/8/22
 * @app_version 1.5.0
 */
class GHCDynamicVariableCryptoRender {
    constructor() {

    }

    render(value) {
        let text = ''

        if (value.source === 'text') {
            if (!value.text) {
                return ''
            }

            text = value.text
        }

        if (value.source === 'file') {
            if (!value.file) {
                return ''
            }

            let fs = require('fs')

            let file = value.file

            if (file) {
                let resource = new GHCSecurityScopedResource()

                resource.startAccess(file.bookmark)

                text = fs.readFileSync(file.filepath)

                resource.stopAccess()
            }
        }

        let crypto = require('crypto')

        let hash = undefined

        if (value.algorithm === 'md5') {
            hash = crypto.createHash('md5')
        }

        if (value.algorithm === 'sha128') {
            hash = crypto.createHash('sha1')
        }

        if (value.algorithm === 'sha256') {
            hash = crypto.createHash('sha256')
        }

        if (hash) {
            return hash.update(text).digest('hex')
        } else {
            return ''
        }
    }
}

export default GHCDynamicVariableCryptoRender