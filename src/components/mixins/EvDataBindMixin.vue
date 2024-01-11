<script>
    export default {
        name: "EvDataBindMixin",

        created() {
            this.value_ = this.value
        },

        model: {
            prop: "value",
            event: "change"
        },

        props: {
            value: [String, Number, Boolean, Object, Array]
        },

        data() {
            return {
                value_: undefined
            }
        },

        watch: {
            value() {
                this.value_ = this.value
            },
            value_() {
                this.$emit('change', this.value_)
            },
        }

    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>
