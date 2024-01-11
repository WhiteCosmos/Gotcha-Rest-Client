<script>
    import {AppEventBus, AppEvents} from '@/AppEventBus'

    export default {
        name: "EvContextMenuMixin",

        created() {
            AppEventBus.$on(AppEvents.SHOW_CONTEXT_MENU, this.doHideContextMenu)
        },

        beforeDestroy() {
            clearTimeout(this.timeoutId)

            AppEventBus.$off(AppEvents.SHOW_CONTEXT_MENU, this.doHideContextMenu)
        },

        data() {
            return {
                coordinate: {
                    x: 0,
                    y: 0,
                },

                showContextMenu: false,

                timeoutId: -1,
            }
        },

        methods: {
            doShowContextMenu(event, callback) {
                this.showContextMenu = false

                this.timeoutId = setTimeout(() => {
                    event.preventDefault()

                    this.coordinate.x = event.clientX

                    this.coordinate.y = event.clientY

                    callback && callback()

                    AppEventBus.$emit(AppEvents.SHOW_CONTEXT_MENU)

                    this.showContextMenu = true
                }, 100)
            },

            doHideContextMenu() {
                this.showContextMenu = false
            }
        }
    }
</script>
