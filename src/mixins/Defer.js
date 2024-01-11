export default function (count = 10) {
    return {
        data() {
            return {
                displayPriority: 0,

                displayPriorityId: -1,
            }
        },

        mounted() {
            this.runDisplayPriority()
        },

        beforeDestroy() {
            cancelAnimationFrame(this.displayPriorityId)
        },

        methods: {
            runDisplayPriority() {
                const step = () => {
                    this.displayPriorityId = requestAnimationFrame(() => {
                        this.displayPriority++
                        if (this.displayPriority < count) {
                            step()
                        }
                    })
                }

                step()
            },

            defer(priority) {
                return this.displayPriority >= priority
            }
        }
    }
}