<script>
    import {EvJsonSchemaManagerEventBus, EvJsonSchemaManagerEvents} from '@/modals/json-schema-manager/EvJsonSchemaManagerEventBus'

    export default {
        name: "EvJsonSchemaManagerEventMixin",

        methods: {
            emitAddJsonSchemaGroup() {
                EvJsonSchemaManagerEventBus.$emit(EvJsonSchemaManagerEvents.ADD_JSON_SCHEMA_GROUP)
            },

            emitRemoveJsonSchemaGroup(group) {
                EvJsonSchemaManagerEventBus.$emit(EvJsonSchemaManagerEvents.REMOVE_JSON_SCHEMA_GROUP, group)
            },

            emitAddJsonSchemaItem(group) {
                EvJsonSchemaManagerEventBus.$emit(EvJsonSchemaManagerEvents.ADD_JSON_SCHEMA, group)
            },
        }
    }
</script>


