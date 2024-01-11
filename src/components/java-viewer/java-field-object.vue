<template>
    <div class="java-field-object"
         @mouseenter="hover_ = true"
         @mouseleave="hover_ = false">
        <java-column-name :json-struct="jsonStruct"
                          :show-arrow="true"
                          :is-hover="hover_"
                          :current-layer="currentLayer"
                          @toggle-expand="handleToggleExpand"
                          @click-an-indicator="handleClickAnIndicator"
                          @mouse-enter-an-indicator="handleMouseEnterAnIndicator"
                          @mouse-leave-an-indicator="handleMouseLeaveAnIndicator"></java-column-name>

        <java-column-type :json-struct="jsonStruct"
                          :is-hover="hover_"></java-column-type>

        <java-column-description :json-struct="jsonStruct" :is-hover="hover_"></java-column-description>
    </div>
</template>

<script>
    import JavaColumnDescription from "./java-column-description"
    import JavaColumnType from "./java-column-type"
    import JavaColumnName from "./java-column-name"
    import JsonStructMixin from "./JsonStructMixin"

    export default {
        name: "java-field-object",

        components: {
            JavaFieldPrimitive: () => import("./java-field-primitive"),
            JavaFieldObject: () => import("./java-field-object"),
            JavaColumnName,
            JavaColumnType,
            JavaColumnDescription
        },

        mixins: [
            JsonStructMixin,
        ],

        methods: {
            handleToggleExpand() {
                this.$emit('toggle-expand', this.jsonStruct)
            },

            handleClickAnIndicator(layer) {
                this.$emit('click-an-indicator', layer)
            },

            handleMouseEnterAnIndicator(layer) {
                this.$emit('mouse-enter-an-indicator', layer)
            },

            handleMouseLeaveAnIndicator() {
                this.$emit('mouse-leave-an-indicator')
            },
        }
    }
</script>

<style lang="scss" scoped>
    .java-field-object {
        display: flex;

        min-width: 0;

        min-height: 27px;
    }
</style>
