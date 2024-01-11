<script>
    export default {
        name: "EvTreeViewSelectorMixin",

        data() {
            return {
                treeViewType: "HTTP_API_VIEW",

                treeViewTypes: {
                    HTTP_API_VIEW: "HTTP_API_VIEW",

                    HTTP_MODEL_VIEW: "HTTP_MODEL_VIEW",

                    JAVA_API_VIEW: "JAVA_API_VIEW",

                    JAVA_MODEL_VIEW: "JAVA_MODEL_VIEW"
                }
            }
        },

        computed: {
            isHttpApiView() {
                return this.treeViewType === this.treeViewTypes.HTTP_API_VIEW
            },

            isHttpModelView() {
                return this.treeViewType === this.treeViewTypes.HTTP_MODEL_VIEW
            },

            isJavaApiView() {
                return this.treeViewType === this.treeViewTypes.JAVA_API_VIEW
            },

            isJavaModelView() {
                return this.treeViewType === this.treeViewTypes.JAVA_MODEL_VIEW
            }
        },

        methods: {
            checkIsHttpApiView(treeViewType) {
                return treeViewType === this.treeViewTypes.HTTP_API_VIEW
            },

            checkIsHttpModelView(treeViewType) {
                return treeViewType === this.treeViewTypes.HTTP_MODEL_VIEW
            },

            checkIsJavaApiView(treeViewType) {
                return treeViewType === this.treeViewTypes.JAVA_API_VIEW
            },

            checkIsJavaModelView(treeViewType) {
                return treeViewType === this.treeViewTypes.JAVA_MODEL_VIEW
            }
        }
    }
</script>

