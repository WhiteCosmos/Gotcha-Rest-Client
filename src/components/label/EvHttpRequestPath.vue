<template>
    <div class="http-request-path">
        <div class="http-request-path__label-container" v-for="(path, index) in paths">
            <span class="http-request-path__path-label" v-if="index > 0">/</span>

            <span class="http-request-path__path-label" v-if="!isPathParameter(path)">{{ path }}</span>

            <span class="http-request-path__param-label" v-else>{{ path.replaceAll(/{(.*)}/g, '$1') }}</span>
        </div>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvHttpRequestPath",

        components: {
            EvVerticalGutter
        },

        props: {
            path: String,
            default: "/path"
        },

        computed: {
            paths() {
                return this.path.split("/")
            }
        },

        methods: {
            isPathParameter(path) {
                return path.match(/{.*}/)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-request-path {
        display: flex;

        align-items: center;

        height: 28px;

        &__label-container {
            display: flex;

            align-items: center;

            height: 28px;
        }

        &__path-label {
            font-size: 13px;

            font-weight: 500;

            color: $SECONDARY_FONT_COLOR;
        }

        &__param-label {
            height: 16px;

            font-size: 11px;

            font-weight: bold;

            line-height: 14px;

            color: #007AFF;

            background-color: #e6f2ff;

            border-radius: 3px;

            padding: 2px 4px;

            margin-left: 2px;

            margin-right: 2px;
        }
    }
</style>
