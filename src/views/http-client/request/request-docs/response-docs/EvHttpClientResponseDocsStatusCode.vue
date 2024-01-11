<template>
    <div class="ev-http-client-response-docs-status-code">
        <ev-label size="10" secondary>#{{ index + 1 }}</ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-label size="10" primary>{{ statusCode + ' ' + statusText }}</ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <v-hover v-slot="{ hover }">
            <div class="ev-http-client-response-docs-status-code__remove-button" @click="doRemove">
                <v-icon size="10" :color="hover ? '#FF5252' : '#FF9292'">fa-trash</v-icon>
            </div>
        </v-hover>

        <v-spacer></v-spacer>

        <div class="ev-http-client-response-docs-status-code__content-type">
            <ev-label size="10" grey>{{ contentType }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvHttpClientResponseDocsStatusCode",

        components: {
            EvVerticalGutter,
            EvLabel
        },

        props: {
            index: Number,

            example: Object,
        },

        computed: {
            statusCode() {
                return this.example.statusCode
            },

            statusText() {
                return this.example.statusText
            },

            contentType() {
                return this.example.contentType
            },

            color() {
                let statusCode = this.statusCode.toString()

                if (statusCode.startsWith("2")) {
                    return 'green'
                }

                if (statusCode.startsWith("3")) {
                    return 'orange'
                }

                if (statusCode.startsWith("4")) {
                    return 'grey'
                }

                if (statusCode.startsWith("5")) {
                    return 'red'
                }

                return 'grey'
            },
        },

        methods: {
            doRemove() {
                this.$emit('remove')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-response-docs-status-code {
        position: relative;

        display: flex;

        align-items: center;

        height: 28px;

        border-bottom: 1px solid #F5F5F5;

        &__content-type {
            display: flex;

            align-items: center;

            width: fit-content;

            height: 16px;

            border-radius: 3px;

            background-color: #FAFAFA;

            padding-left: 6px;

            padding-right: 6px;
        }

        &__remove-button {
            @include full-center;

            width: 16px;

            height: 16px;

            padding-bottom: 2px;
        }
    }
</style>
