import GHCJson
    from '@/core/json/GHCJson'

const fs = require('fs')

const path = require('path')

class ElectronBrowserWindowTracker {
    constructor(app) {
        this.app = app

        this.profile = {
            x: 0,
            y: 0,
            width: 1280,
            height: 800,
        }

        this.path = ''

        this._initializeProfile()
    }

    getBounds() {
        return this.profile
    }

    setBounds(bounds) {
        this.profile.width = bounds.width

        this.profile.height = bounds.height

        fs.writeFileSync(this.path, GHCJson.stringify(this.profile))
    }

    _initializeProfile() {
        if (this._isDevelopment()) {
            this.path = './profile.json'
        } else {
            let userdata = this.app.getPath('userData')

            this.path = path.join(userdata, 'profile.json')
        }

        try {
            this.profile = JSON.parse(fs.readFileSync(this.path).toString('UTF-8'))
        } catch (e) {
            fs.writeFileSync(this.path, JSON.stringify(this.profile))
        }
    }

    _isDevelopment() {
        // return this.app && this.app.isPackaged
        return false
    }
}

export default ElectronBrowserWindowTracker