<template>
    <div class="ev-http-client-request-body__wrapper">
        <ev-multipart-form-editor :options="multipartOptions"
                                  page-mode
                                  v-model="items"></ev-multipart-form-editor>
    </div>
</template>

<script>
    import EvMultipartFormEditor from '@/views/http-client/components/multipart-form-editor/EvMultipartFormEditor'

    export default {
        name: "EvHttpClientMultipartRequestBody",

        components: {
            EvMultipartFormEditor,
        },

        props: {
            httpRequest: Object
        },

        data() {
            return {
                multipartOptions: {
                    title: "Multipart",

                    subtitle: "multipart/form-data",

                    keyPlaceholder: "Part Key",

                    valuePlaceholder: "Part Value",
                }
            }
        },

        computed: {
            items: {
                get() {
                    return this.httpRequest.payload.multipart.items
                },

                set(items) {
                    this.httpRequest.payload.multipart.items = items
                }
            }
        },

        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import "EvHttpClientRequestBody";

    @import "~@/styles/scrollbar.scss";
</style>
