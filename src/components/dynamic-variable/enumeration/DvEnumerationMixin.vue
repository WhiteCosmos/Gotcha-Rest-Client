<script>
    export default {
        name: "DvEnumerationMixin",

        methods: {
            emitAddItem() {
                this.$emit('add-item')
            },

            emitRemoveItem(item) {
                this.$emit('remove-item', item)
            },

            emitEditItem(item) {
                this.$emit('edit-item', item)
            },
        }
    }
</script>
