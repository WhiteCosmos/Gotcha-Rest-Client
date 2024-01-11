<script>
    import _ from 'lodash'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import AppConfig from '@/AppConfig'

    let {app} = require('electron').remote

    let {dialog} = require('electron').remote

    export default {
        name: "EvAuthorizationMixin",

        computed: {
            isHomeRelativePathAuthorized() {
                if (!this.currentRepository) {
                    return false
                }

                return !_.isEmpty(this.currentRepository.homeRelativePathBookmark)
            }
        },

        mixins: [
            EvStoreMixin,
        ],

        methods: {
            homeRelativePathAuthorize() {
                dialog.showOpenDialog({
                    properties: ["openDirectory"],
                    defaultPath: app.getPath("home"),
                    securityScopedBookmarks: true,
                    buttonLabel: "Authorize"
                }).then(file => {
                    if (file.canceled) { // ignore
                        return
                    }

                    if (!_.isEmpty(file.bookmarks)) {
                        this.$store.dispatch("repository/saveHomeRelativePathBookmark", file.bookmarks[0])
                    } else {
                        this.$store.dispatch("repository/saveHomeRelativePathBookmark", "homeRelativePathBookmark") // test
                    }
                })
            },

            startAccessingHomeRelativePath() {
                let bookmark = this.localRepository.homeRelativePathBookmark

                let stopAccessingSecurityScopedResource

                if (_.isEmpty(bookmark) || AppConfig.isDevelopment()) {
                    stopAccessingSecurityScopedResource = () => {
                    }
                } else {
                    stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(bookmark)
                }

                return stopAccessingSecurityScopedResource
            },

            startAccessProjectRelativePath(bookmark) {
                let stopAccessingSecurityScopedResource

                if (_.isEmpty(bookmark) || AppConfig.isDevelopment()) {
                    stopAccessingSecurityScopedResource = () => {
                    }
                } else {
                    stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(bookmark)
                }

                return stopAccessingSecurityScopedResource
            },
        }
    }
</script>