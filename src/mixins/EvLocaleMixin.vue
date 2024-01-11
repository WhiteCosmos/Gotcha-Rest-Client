<script>
    const {app} = require('electron').remote

    export default {
        name: "EvLocaleMixin",

        computed: {
            isLocale_EN() {
                let locale = app.getLocale()

                return !locale.startsWith("zh")
            },

            isLocale_ZH() {
                let locale = app.getLocale()

                return locale.startsWith("zh")
            }
        }
    }
</script>