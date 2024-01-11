<template>
    <ev-column>
        <java-viewer-title @expand-all="handleExpandAll"
                           @collapse-all="handleCollapseAll"
                           @sort-by-field-name="handleSortFieldsByFieldName"></java-viewer-title>

        <dynamic-scroller :items="jsonStructs_"
                          :min-item-size="28"
                          :buffer="400"
                          key-field="uid_"
                          page-mode>
            <template v-slot="{ item, index, active }">
                <dynamic-scroller-item :item="item" :active="active" :data-index="index">
                    <java-field-object v-if="checkIsContainerNode(item)"
                                       :json-struct="item"
                                       :current-layer="currentLayer_"
                                       @toggle-expand="handleToggleExpand"
                                       @click-an-indicator="handleClickAnIndicator"
                                       @mouse-enter-an-indicator="handleMouseEnterAnIndicator"
                                       @mouse-leave-an-indicator="handleMouseLeaveAnIndicator"></java-field-object>

                    <java-field-primitive v-else
                                          :json-struct="item"
                                          :current-layer="currentLayer_"
                                          @click-an-indicator="handleClickAnIndicator"
                                          @mouse-enter-an-indicator="handleMouseEnterAnIndicator"
                                          @mouse-leave-an-indicator="handleMouseLeaveAnIndicator"></java-field-primitive>
                </dynamic-scroller-item>
            </template>
        </dynamic-scroller>
    </ev-column>
</template>

<script>
    import JavaViewerTitle from "./java-viewer-title"
    import EvColumn from '@/components/layout/EvColumn'
    import _ from 'lodash'
    import EvRow from '@/components/layout/EvRow'
    import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
    import JsonStructMixin from '@/components/java-viewer/JsonStructMixin'

    export default {
        name: "java-viewer",

        components: {
            EvRow,
            EvColumn,
            JavaFieldObject: () => import("./java-field-object"),
            JavaFieldPrimitive: () => import("./java-field-primitive"),
            JavaViewerTitle
        },

        mixins: [
            JsonStructMixin,
        ],

        created() {
            this.jsonStructs_ = []

            this.flattenJsonStructs(this.jsonStructs, 0, this.jsonStructs_)
        },

        watch: {
            jsonStructs() {
                this.jsonStructs_ = []

                this.flattenJsonStructs(this.jsonStructs, 0, this.jsonStructs_)
            }
        },

        props: {
            jsonStructs: {
                type: Array,
                default: () => {
                    return []
                }
            },
        },

        data() {
            return {
                jsonStructs_: [],

                itemsPool: new Map(),

                maxLayer: 0,

                currentLayer_: -1,

                comparison: {
                    NONE: (a, b) => {
                        let aId = Number.parseInt(a.uid_)

                        let bId = Number.parseInt(b.uid_)

                        if (aId > bId) {
                            return 1
                        }

                        if (aId < bId) {
                            return -1
                        }

                        return 0
                    },

                    ASC: (a, b) => {
                        if (a.fieldName < b.fieldName) {
                            return -1
                        }

                        if (a.fieldName > b.fieldName) {
                            return 1
                        }

                        return 0
                    },

                    DESC: (a, b) => {
                        if (a.fieldName < b.fieldName) {
                            return 1
                        }

                        if (a.fieldName > b.fieldName) {
                            return -1
                        }

                        return 0
                    }
                }
            }
        },

        methods: {
            handleClickAnIndicator(layer) {
                let items = this.jsonStructs_.filter(jsonStruct => {
                    return jsonStruct.layer_ === layer
                })

                items.forEach(item => {
                    item.expand_ = false

                    this._collapseJsonStruct(item)
                })
            },

            handleMouseEnterAnIndicator(layer) {
                this.currentLayer_ = layer
            },

            handleMouseLeaveAnIndicator() {
                this.currentLayer_ = -1
            },

            handleExpandAll() {
                this.itemsPool.clear()

                this.jsonStructs_ = []

                this.flattenJsonStructs(this.jsonStructs, 0, this.jsonStructs_)
            },

            handleCollapseAll() {
                for (let item of this.itemsPool.keys()) { // Expand all collapsed item
                    item.expand_ = true

                    this._expandJsonStruct(item)
                }

                let layer = this.maxLayer

                while (layer > 0) {
                    let items = this.jsonStructs_.filter(jsonStruct => {
                        return jsonStruct.layer_ === (layer - 1)
                    })

                    layer--

                    if (_.isEmpty(items)) {
                        continue
                    }

                    items.forEach(item => {
                        item.expand_ = false

                        this._collapseJsonStruct(item)
                    })
                }
            },

            handleSortFieldsByFieldName(order) {
                this.itemsPool.clear()

                this.jsonStructs_ = []

                this._sortJsonStructs(this.jsonStructs, this.comparison[order])

                this.flattenJsonStructs(this.jsonStructs, 0, this.jsonStructs_)
            },

            handleSortFieldsByFieldType() {
                // TODO
            },

            handleToggleExpand(jsonStruct) {
                jsonStruct.expand_ = !jsonStruct.expand_

                jsonStruct.expand_ ? this._expandJsonStruct(jsonStruct) : this._collapseJsonStruct(jsonStruct)
            },

            _expandJsonStruct(jsonStruct) {
                let index = this.jsonStructs_.indexOf(jsonStruct)

                let items = this.itemsPool.get(jsonStruct)

                if (!items || _.isEmpty(items)) {
                    this.itemsPool.delete(jsonStruct)

                    return
                }

                this.jsonStructs_.splice(index + 1, 0, ...items)

                this.itemsPool.delete(jsonStruct)
            },

            _collapseJsonStruct(jsonStruct) {
                let index = this.jsonStructs_.indexOf(jsonStruct)

                let items = []

                for (let i = index + 1; i < this.jsonStructs_.length; i++) {
                    let item = this.jsonStructs_[i]

                    if (item.layer_ > jsonStruct.layer_) {
                        items.push(item)
                    } else {
                        break
                    }
                }

                this.jsonStructs_.splice(index + 1, items.length)

                if (!_.isEmpty(items)) {
                    this.itemsPool.set(jsonStruct, items)
                }
            },

            async flattenJsonStructs(jsonStructs, layer = 0, flatten = []) {
                if (_.isEmpty(jsonStructs)) {
                    return
                }

                if (layer > this.maxLayer) {
                    this.maxLayer = layer
                }

                jsonStructs.forEach(jsonStruct => {
                    this.appendControlFields(jsonStruct, layer)

                    flatten.push(jsonStruct)

                    if (!_.isEmpty(jsonStruct.children)) {
                        return this.flattenJsonStructs(jsonStruct.children, layer + 1, flatten)
                    }
                })
            },

            appendControlFields(jsonStruct, layer) {
                if (!jsonStruct.uid_) {
                    this.$set(jsonStruct, "uid_", _.uniqueId())
                }

                this.$set(jsonStruct, "expand_", true)

                this.$set(jsonStruct, "layer_", layer)
            },

            _sortJsonStructs(jsonStructs, compare) {
                if (!jsonStructs || _.isEmpty(jsonStructs)) {
                    return
                }

                jsonStructs.sort(compare)

                jsonStructs.forEach(jsonStruct => {
                    this._sortJsonStructs(jsonStruct.children, compare)
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
