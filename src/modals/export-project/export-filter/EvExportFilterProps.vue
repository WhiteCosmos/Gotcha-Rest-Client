<script>
    export default {
        name: "EvExportFilterProps",

        props: {
            selectedJsonModule: Object,

            selectedJsonService: Object,

            jsonModule: Object,

            jsonModules: Array,

            jsonService: Object,

            jsonServices: Array,

            jsonMethod: Object,

            jsonMethods: Array,
        },

        methods: {
            doSelectJsonModule(jsonModule) {
                this.$emit("select", jsonModule)
            },

            doSelectJsonService(jsonService) {
                this.$emit("select", jsonService)
            }
        }
    }
</script>


