import {app} from "electron"

const isMac = process.platform === 'darwin'

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
    {
        label: 'Project',
        submenu: [
            {
                label: "Add New Project",
                accelerator: "CommandOrControl+N",
                click: async () => {
                    addNewProject()
                }
            }
        ]
    },
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
            ...(true ? [
                {role: 'reload'},
                {role: 'forcereload'},
                {role: 'toggledevtools'},
                {type: 'separator'},
            ] : []),
            {role: 'togglefullscreen'}
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            {
                label: '1080P',
                click: async () => {
                    win.setSize(1920, 1080)
                }
            },
            {
                label: '900P',
                click: async () => {
                    win.setSize(1440, 900)
                }
            },
            {
                label: '720P',
                click: async () => {
                    win.setSize(1280, 720)
                }
            },
            {type: 'separator'},
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
    {
        role: 'help',
        submenu: [
            {
                label: 'User Guide',
                click: async () => {
                    const {shell} = require('electron')
                    await shell.openExternal('https://github.com/RabiAPI/RabiAPI-Support/wiki')
                }
            },
            {
                label: 'Report Bug',
                click: async () => {
                    const {shell} = require('electron')
                    await shell.openExternal('https://github.com/RabiAPI/RabiAPI-Support/')
                }
            },
            {type: 'separator'},
            {
                label: "Reset Database",
                click: async () => {
                    resetDatabase()
                }
            }
        ]
    }
]

function resetDatabase() {
    let webContents = win.webContents

    webContents && webContents.send('reset-database')
}

function addNewProject() {
    let webContents = win.webContents

    webContents && webContents.send('add-new-project')
}

export default template