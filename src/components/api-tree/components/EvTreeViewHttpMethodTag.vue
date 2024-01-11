<template>
    <div class="ev-tree-view-http-method-tag">
        <span class="ev-tree-view-http-method-tag__label" :style="{'color': getFontColor(httpMethodName)}">{{ httpMethodName }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvTreeViewHttpMethodTag",

        props: {
            requestMethod: String,

            selected: Boolean,
        },

        data() {
            return {}
        },

        methods: {
            getFontColor(httpMethod) {
                if (this.selected) {
                    return 'white'
                }

                if (['GET', 'HEAD'].includes(httpMethod)) {
                    return '#87b35b'
                }

                if (['POST', 'PUT', 'PATCH'].includes(httpMethod)) {
                    return '#f3ab3e'
                }

                if (['DEL'].includes(httpMethod)) {
                    return '#FF8282'
                }

                if (['OPTIONS', 'TRACE'].includes(httpMethod)) {
                    return '#8f70cc'
                }

                return '#007AFF'
            }
        },

        computed: {
            httpMethodName() {
                if (this.requestMethod === "DELETE") {
                    return "DEL"
                }

                return this.requestMethod
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-tree-view-http-method-tag {
        display: flex;

        justify-content: center;

        align-items: center;

        height: 16px;

        padding-right: 4px;

        user-select: none;

        &__label {
            font-size: 11px;

            font-weight: normal;
        }
    }
</style>
