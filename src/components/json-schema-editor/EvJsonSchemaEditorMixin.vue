<script>
    import _ from 'lodash'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import GHCJsonSchemaResolver from '@/components/json-schema-editor/GHCJsonSchemaResolver'

    export default {
        name: "EvJsonSchemaEditorMixin",

        mixins: [
            EvStoreMixin,
        ],

        methods: {
            resolveReferenceTreeNodes(treeNodes) {
                if (_.isEmpty(treeNodes)) {
                    return
                }

                new GHCJsonSchemaResolver(this.jsonSchemaPool).resolveReferenceTreeNodes(treeNodes)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>
