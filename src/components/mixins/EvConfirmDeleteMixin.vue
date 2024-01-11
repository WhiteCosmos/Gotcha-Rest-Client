<script>
    import _ from 'lodash'
    import DelayTrigger from '@/core/utils/DelayTrigger'

    export default {
        name: "EvConfirmDeleteMixin",

        data() {
            return {
                deletable: false,
            }
        },

        methods: {
            toggleDeletable(deletableCallback = () => {
            }) {
                if (_.isEmpty(this.item.key) && _.isEmpty(this.item.value)) {
                    this.$emit('remove-item', this.item)
                    return
                }

                this.deletable = true

                new DelayTrigger(1500, () => {
                    this.deletable = false
                }).trigger()
            },
        }
    }
</script>

