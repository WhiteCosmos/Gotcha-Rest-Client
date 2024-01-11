<script>
    import {EvHttpClientCookieJarsEventBus, EvHttpClientCookieJarsEvents} from '@/views/http-client/components/session/EvHttpClientCookieJarsEventBus'

    export default {
        name: "EvHttpClientCookieJarMixin",

        props: {},

        methods: {
            emitAddCookieJar() {
                this.$emit('add-cookie-jar')
            },

            emitAddCookieJarDomain(cookieJar) {
                this.$emit('add-cookie-jar-domain', cookieJar)
            },

            emitRenameCookieJar(cookieJar) {
                EvHttpClientCookieJarsEventBus.$emit(EvHttpClientCookieJarsEvents.RENAME_COOKIE_JAR, cookieJar)
            },

            emitRenameCookieJarDomain(cookieJar, cookieJarDomain) {
                EvHttpClientCookieJarsEventBus.$emit(EvHttpClientCookieJarsEvents.RENAME_COOKIE_JAR_DOMAIN, cookieJar, cookieJarDomain)
            },

            emitCopyCookieJar(cookieJar) {

            },

            emitCopyCookieJarDomain(cookieJar, cookieJarDomain) {

            },

            emitMoveCookieJar() {

            },

            emitMoveCookieJarDomain() {

            },

            emitPasteCookieJar() {

            },

            emitPasteCookieJarDomain() {

            },

            emitRemoveCookieJar(cookieJar) {
                this.$emit('remove-cookie-jar', cookieJar)
            },

            emitRemoveCookieJarDomain() {

            },

            emitSelectCookieJar(cookieJar) {
                this.$emit('select-cookie-jar', cookieJar)
            },

            emitSelectCookieJarDomain(cookieJar, cookieJarDomain) {
                this.$emit('select-cookie-jar-domain', cookieJar, cookieJarDomain)
            },

            emitShowContextMenu(event, cookieJar, cookieJarDomain) {
                this.$emit('show-context-menu', event, cookieJar, cookieJarDomain)
            }
        }
    }
</script>
