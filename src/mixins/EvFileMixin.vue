<script>
    import fs from 'fs'
    import EvNotificationMixin from '@/mixins/EvNotificationMixin'

    export default {
        name: "EvFileMixin",

        mixins: [
            EvNotificationMixin,
        ],

        methods: {
            saveFile(content, extension = 'txt', filename = 'Untitled') {
                const {dialog, app} = require('electron').remote

                const options = {
                    defaultPath: app.getPath('desktop') + `/${filename}`,
                    filters: [
                        {
                            name: "File Extension",
                            extensions: [extension]
                        }
                    ]
                }

                let fs = require('fs')

                let currentWindow = require('electron').remote.getCurrentWindow()

                dialog.showSaveDialog(currentWindow, options).then(dir => {
                    if (dir.canceled) {
                        return
                    }

                    fs.writeFileSync(dir.filePath, content, {})

                    this.sendNotification(this.$t('success'))
                })
            },

            openFile() {
                const {dialog, app} = require('electron').remote


            },
        },

        i18n: {
            messages: {
                en: {
                    success: "Save file Complete"
                },
                zh: {
                    success: "保存文件完成"
                },
                zh_TW: {
                    success: "儲存檔案完成"
                }
            }
        }
    }
</script>