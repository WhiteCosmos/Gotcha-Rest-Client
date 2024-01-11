'use strict'

import {
    app,
    BrowserWindow,
    protocol
} from 'electron'
import {
    createProtocol,
} from 'vue-cli-plugin-electron-builder/lib'
import ElectronBrowserWindowTracker
    from '@/ElectronBrowserWindowTracker'
import AppConfig
    from '@/AppConfig'
import ElectronEventBus
    from '@/ElectronEventBus'

const {Menu} = require('electron')

const isMac = process.platform === 'darwin'

const isDevelopment = AppConfig.isDevelopment()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null

let windows = new Set()

let willQuitApp = false

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: {
        secure: true,
        standard: true
    }
}])

function createMainWindow() {
    const menu = Menu.buildFromTemplate(template)

    Menu.setApplicationMenu(menu)

    let tracker = new ElectronBrowserWindowTracker(app)

    let bounds = tracker.getBounds()

    // Create the browser window.
    win = new BrowserWindow({
        show: false,
        width: bounds.width,
        height: bounds.height,
        minWidth: 1280,
        minHeight: 720,
        title: "Gotcha",
        titleBarStyle: 'hiddenInset',
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            devTools: true,
            webSecurity: false,
            webviewTag: true,
        },
        nodeIntegrationInWorker: true
    })

    win.moveTop() // Move top when opening

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }

    win.on('close', (event) => {
        if (willQuitApp) {
            win = null
        } else {
            event.preventDefault()
            win.hide()
        }
    })

    // win.on('closed', () => {
    //     win = null
    // })

    win.on('resized', (event) => {
        tracker.setBounds(event.sender.getBounds())
    })

    win.on('ready-to-show', () => {
        win.show()
    })
}


app.on('before-quit', () => {
    willQuitApp = true
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createMainWindow()
    } else {
        win.show()
    }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
        // try {
        //   await installVueDevtools()
        // } catch (e) {
        //   console.error('Vue Devtools failed to install:', e.toString())
        // }

    }
    createMainWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}

const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'services'},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}
        ]
    }] : []),
    // {
    //     label: 'Project',
    //     submenu: [
    //         {
    //             label: "Add New Project",
    //             accelerator: "CommandOrControl+O",
    //             click: async () => {
    //                 addNewProject()
    //             }
    //         }
    //     ]
    // },
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            ...(isMac ? [
                {role: 'pasteAndMatchStyle'},
                {role: 'delete'},
                {role: 'selectAll'},
                {type: 'separator'},
                {
                    label: 'Speech',
                    submenu: [
                        {role: 'startspeaking'},
                        {role: 'stopspeaking'}
                    ]
                }
            ] : [
                {role: 'delete'},
                {type: 'separator'},
                {role: 'selectAll'}
            ])
        ]
    },
    // { role: 'viewMenu' }
    {
        label: 'View',
        submenu: [
            ...([
                {role: 'reload'},
                {role: 'forcereload'},
                {role: 'toggledevtools'},
                {type: 'separator'},
            ]),
            {role: 'togglefullscreen'}
        ]
    },
    // {role: 'windowMenu'}
    {
        label: 'Window',
        submenu: [
            {
                label: '1080P',
                click: async () => {
                    win.setSize(1920, 1080, true)
                }
            },
            {
                label: '900P',
                click: async () => {
                    win.setSize(1440, 900, true)
                }
            },
            {
                label: '720P',
                click: async () => {
                    win.setSize(1280, 720, true)
                }
            },
            {type: 'separator'},
            // {
            //     label: 'New Window',
            //     accelerator: "CommandOrControl+N",
            //     click: async () => {
            //         createWindow()
            //     }
            // },
            {role: 'close'},
            {role: 'minimize'},
            {role: 'zoom'},
            ...(isMac ? [
                {type: 'separator'},
                {role: 'front'},
                {type: 'separator'},
                {
                    role: 'window',
                    click: async () => {
                        win && win.show()
                    }
                }
            ] : [
                {role: 'close'}
            ])
        ]
    },
    // {
    //     label: "Manage",
    //     submenu: [
    //         {
    //             label: "Environments",
    //             click: async () => {
    //                 ElectronEventBus.openAppDialog(win, 'environment-manager')
    //             }
    //         },
    //         {
    //             label: "Cookie Jars",
    //             click: async () => {
    //                 ElectronEventBus.openAppDialog(win, 'cookie-jar-manager')
    //             }
    //         },
    //     ]
    // },
    {
        label: "Languages",
        submenu: [
            {
                label: "简体中文",
                click: async () => {
                    ElectronEventBus.changeAppLocale(win, 'zh')
                }
            },
            {
                label: "繁體中文",
                click: async () => {
                    ElectronEventBus.changeAppLocale(win, 'zh_TW')
                }
            },
            {
                label: 'English',
                click: async () => {
                    ElectronEventBus.changeAppLocale(win, 'en')
                }
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'User Guide',
                click: async () => {
                    const {shell} = require('electron')
                    await shell.openExternal('https://github.com/WhiteCosmos/Gotcha-HTTP-Client-Support')
                }
            },
            {
                label: 'Report Bug',
                click: async () => {
                    const {shell} = require('electron')
                    await shell.openExternal('https://github.com/WhiteCosmos/Gotcha-HTTP-Client-Support')
                }
            },
        ]
    }
]