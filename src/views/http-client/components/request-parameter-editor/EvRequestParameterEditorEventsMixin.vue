<script>
    export default {
        name: "EvRequestParameterEditorEventsMixin",

        methods: {
            emitExportParameters(type) {
                this.$emit('export-parameters', type)
            },

            emitImportParameters(str) {
                this.$emit('import-parameters', str)
            },
        }
    }
</script>
