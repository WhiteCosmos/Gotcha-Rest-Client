<template>
    <div class="ev-json-schema-manager">
        <ev-json-schema-manager-sidebar @close="doClose"
                                        :selected-json-schema-group="selectedJsonSchemaGroup"
                                        :selected-json-schema="selectedJsonSchema"
                                        :groups="jsonSchemaGroups"></ev-json-schema-manager-sidebar>

        <ev-json-schema-manager-content v-if="selectedJsonSchema"
                                        :selected-json-schema-group="selectedJsonSchemaGroup"
                                        :selected-json-schema="selectedJsonSchema"></ev-json-schema-manager-content>

        <ev-json-schema-manager-content-placeholder v-else></ev-json-schema-manager-content-placeholder>
    </div>
</template>

<script>
    import EvJsonSchemaManagerSidebar from '@/modals/json-schema-manager/EvJsonSchemaManagerSidebar'
    import EvJsonSchemaManagerContent from '@/modals/json-schema-manager/EvJsonSchemaManagerContent'
    import EvJsonSchemaManagerContentPlaceholder from '@/modals/json-schema-manager/EvJsonSchemaManagerContentPlaceholder'
    import GHCJsonSchemaGroup from '@/modals/json-schema-manager/data/GHCJsonSchemaGroup'
    import GHCJsonSchema from '@/modals/json-schema-manager/data/GHCJsonSchema'
    import {EvJsonSchemaManagerEventBus, EvJsonSchemaManagerEvents} from '@/modals/json-schema-manager/EvJsonSchemaManagerEventBus'
    import {EvJsonSchemaEditorEventBus, EvJsonSchemaEditorEvents} from '@/components/json-schema-editor/EvJsonSchemaEditorEventBus'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import {v4} from 'node-uuid'

    export default {
        name: "EvJsonSchemaManager",

        components: {
            EvJsonSchemaManagerContentPlaceholder,
            EvJsonSchemaManagerSidebar,
            EvJsonSchemaManagerContent,
        },

        created() {
            EvJsonSchemaManagerEventBus.$on(EvJsonSchemaManagerEvents.ADD_JSON_SCHEMA_GROUP, this.handleAddJsonSchemaGroup)

            EvJsonSchemaManagerEventBus.$on(EvJsonSchemaManagerEvents.REMOVE_JSON_SCHEMA_GROUP, this.handleRemoveJsonSchemaGroup)

            EvJsonSchemaManagerEventBus.$on(EvJsonSchemaManagerEvents.SELECT_JSON_SCHEMA, this.handleSelectJsonSchemaItem)

            EvJsonSchemaManagerEventBus.$on(EvJsonSchemaManagerEvents.ADD_JSON_SCHEMA, this.handleAddJsonSchemaItem)

            EvJsonSchemaManagerEventBus.$on(EvJsonSchemaManagerEvents.CLONE_JSON_SCHEMA, this.handleCloneJsonSchemaItem)

            EvJsonSchemaManagerEventBus.$on(EvJsonSchemaManagerEvents.REMOVE_JSON_SCHEMA, this.handleRemoveJsonSchemaItem)
        },

        beforeDestroy() {
            EvJsonSchemaManagerEventBus.$off(EvJsonSchemaManagerEvents.ADD_JSON_SCHEMA_GROUP, this.handleAddJsonSchemaGroup)

            EvJsonSchemaManagerEventBus.$off(EvJsonSchemaManagerEvents.REMOVE_JSON_SCHEMA_GROUP, this.handleRemoveJsonSchemaGroup)

            EvJsonSchemaManagerEventBus.$off(EvJsonSchemaManagerEvents.SELECT_JSON_SCHEMA, this.handleSelectJsonSchemaItem)

            EvJsonSchemaManagerEventBus.$off(EvJsonSchemaManagerEvents.ADD_JSON_SCHEMA, this.handleAddJsonSchemaItem)

            EvJsonSchemaManagerEventBus.$off(EvJsonSchemaManagerEvents.CLONE_JSON_SCHEMA, this.handleCloneJsonSchemaItem)

            EvJsonSchemaManagerEventBus.$off(EvJsonSchemaManagerEvents.REMOVE_JSON_SCHEMA, this.handleRemoveJsonSchemaItem)
        },

        mixins: [
            EvStoreMixin,
        ],

        computed: {
            defaultGroup() {
                return this.jsonSchemaGroups.find(it => {
                    return it.default === true
                })
            },
        },

        watch: {
            currentProject(newVal) {
                if (newVal) {
                    this.selectedJsonSchemaGroup = undefined

                    this.selectedJsonSchema = undefined
                }
            },
        },

        data() {
            return {
                selectedJsonSchemaGroup: undefined,

                selectedJsonSchema: undefined,
            }
        },

        methods: {
            doClose() {
                EvJsonSchemaEditorEventBus.$emit(EvJsonSchemaEditorEvents.SCHEMA_UPDATED)

                this.$emit('close')
            },

            handleSelectJsonSchemaItem(jsonSchemaGroup, jsonSchema) {
                this.selectedJsonSchemaGroup = jsonSchemaGroup

                this.selectedJsonSchema = jsonSchema
            },

            handleAddJsonSchemaGroup() {
                let group = new GHCJsonSchemaGroup()

                group.name = "New Group " + this.jsonSchemaGroups.length

                this.jsonSchemaGroups.push(group)
            },

            handleRemoveJsonSchemaGroup(group) {
                if (group.default) {
                    return
                }

                this.defaultGroup.items.push(...group.items)

                this.jsonSchemaGroups.splice(this.jsonSchemaGroups.indexOf(group), 1)
            },

            handleAddJsonSchemaItem(group) {
                let schema = new GHCJsonSchema()

                schema.name = "Schema"

                group.items.push(schema)
            },

            handleCloneJsonSchemaItem(group, jsonSchema) {
                let duplicatedJsonSchema = _.cloneDeep(jsonSchema)

                duplicatedJsonSchema.uid = v4()

                let index = group.items.indexOf(jsonSchema)

                group.items.splice(index + 1, 0, duplicatedJsonSchema)
            },

            handleRemoveJsonSchemaItem(group, jsonSchema) {
                if (this.selectedJsonSchema === jsonSchema) {
                    this.selectedJsonSchema = undefined
                }

                group.items.splice(group.items.indexOf(jsonSchema), 1)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-json-schema-manager {
        display: flex;

        overflow: hidden;

        background-color: #FCFCFC;

        width: 960px;

        height: 640px;

        border-radius: 5px;
    }
</style>
