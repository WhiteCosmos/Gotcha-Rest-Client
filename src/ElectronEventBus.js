export default {
    changeAppLocale: (win, locale) => {
        win.webContents.send('change-app-locale', locale)
    },

    onChangeAppLocale: (callback) => {
        require('electron').ipcRenderer.on('change-app-locale', callback)
    },

    openAppDialog: (win, dialog) => {
        win.webContents.send('open-app-dialog', dialog)
    },

    onOpenAppDialog: (callback) => {
        require('electron').ipcRenderer.on('open-app-dialog', callback)
    }
}