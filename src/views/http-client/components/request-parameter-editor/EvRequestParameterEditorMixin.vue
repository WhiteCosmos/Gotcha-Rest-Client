<script>
    export default {
        name: "EvRequestParameterEditorMixin",

        props: {
            httpRequest: Object,

            options: {
                type: Object,
                default: () => {
                    return {
                        title: "Query Parameters",

                        keyPlaceholder: "Parameter Name",

                        valuePlaceholder: "Parameter Value",

                        availableKeys: [], // Available keys for auto complete

                        availableValues: [], // Available values for auto complete

                        mode: 'query', // header | path | query
                    }
                }
            }
        },

        computed: {
            isPathMode() {
                return this.options && this.options.mode === 'path'
            },

            isHeaderMode() {
                return this.options && this.options.mode === 'header'
            },

            isQueryMode() {
                return this.options && this.options.mode === 'query'
            },
        }
    }
</script>