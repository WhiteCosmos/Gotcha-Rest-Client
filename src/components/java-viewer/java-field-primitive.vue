<template>
    <div class="d-flex flex-grow-1" @mouseenter="hover_ = true" @mouseleave="hover_ = false">
        <java-column-name :json-struct="jsonStruct"
                          :current-layer="currentLayer"
                          :is-hover="hover_"
                          @click-an-indicator="handleClickAnIndicator"
                          @mouse-enter-an-indicator="handleMouseEnterAnIndicator"
                          @mouse-leave-an-indicator="handleMouseLeaveAnIndicator"></java-column-name>

        <java-column-type :json-struct="jsonStruct" :is-hover="hover_"></java-column-type>

        <java-column-description :json-struct="jsonStruct" :is-hover="hover_"></java-column-description>
    </div>
</template>

<script>
    import JavaColumnName from "./java-column-name"
    import JavaColumnType from "./java-column-type"
    import JavaColumnDescription from "./java-column-description"
    import JsonStructMixin from "./JsonStructMixin"

    export default {
        name: "java-field-primitive",

        props: {
            jsonStruct: Object
        },

        components: {
            JavaColumnName,
            JavaColumnType,
            JavaColumnDescription,
        },

        mixins: [
            JsonStructMixin
        ],

        methods: {
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

</style>
