<script>
    const currentWindow = require('electron').remote.getCurrentWindow()

    export default {
        name: "EvFileDialogMixin",

        methods: {
            openFile(extensions = [], properties = ['openFile']) {
                const {dialog} = require('electron').remote

                const path = require('path')

                return dialog.showOpenDialog(currentWindow, {
                    properties: properties,
                    filters: [{name: "Filter", extensions: extensions}],
                    securityScopedBookmarks: true
                }).then(file => {
                    if (file.canceled) {
                        return
                    }

                    let filepath = file.filePaths[0]

                    let filename = path.basename(filepath)

                    let bookmark = ''

                    if (file.bookmarks) {
                        bookmark = file.bookmarks[0]
                    }

                    return {
                        filename: filename,
                        filepath: filepath,
                        bookmark: bookmark
                    }
                })
            },
        }
    }
</script>

