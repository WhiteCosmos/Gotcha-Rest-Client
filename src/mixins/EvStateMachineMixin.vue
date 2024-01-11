<script>
    export default {
        name: "EvStateMachineMixin",

        data() {
            return {
                status_: "",
            }
        },

        methods: {
            initStateMachine(status) {
                this.status_ = status
            },

            is(status) {
                return this.status_ === status
            },

            to(status) {
                this.status_ = status
            }
        }
    }
</script>

