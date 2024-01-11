<script>
    export default {
        name: "EvDoubleClickMixin",

        data() {
            return {
                clickCount: 0,

                clickDelay: 150,

                clickTimer: undefined,

                events: []
            }
        },

        methods: {
            handleClick(event, singleClickCallback, doubleClickCallback) {
                this.clickCount = this.clickCount + 1

                if (this.clickCount === 1) {
                    this.clickTimer = setTimeout(() => {
                        this.clickCount = 0

                        // console.log("setTimeout trigger")

                        singleClickCallback && singleClickCallback()
                    }, this.clickDelay)
                } else {
                    clearTimeout(this.clickTimer)

                    this.clickTimer = undefined

                    this.clickCount = 0

                    doubleClickCallback && doubleClickCallback()
                }
            }
        }
    }
</script>


