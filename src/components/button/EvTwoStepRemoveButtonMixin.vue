<script>
    import DelayTrigger from '@/core/utils/DelayTrigger'

    export default {
        name: "EvTwoStepRemoveButtonMixin",

        data() {
            return {
                EvTwoStepRemoveButtonMixin: {
                    flag: false,
                }
            }
        },

        computed: {
            isTwoStepRemoveTriggered() {
                return this.EvTwoStepRemoveButtonMixin.flag
            }
        },

        methods: {
            triggerTwoStepRemove() {
                this.EvTwoStepRemoveButtonMixin.flag = true

                new DelayTrigger(1500, () => {
                    this.EvTwoStepRemoveButtonMixin.flag = false
                }).trigger()
            },

            confirmTwoStepRemove(item) {
                this.$emit('remove', item)
            }
        }
    }
</script>

