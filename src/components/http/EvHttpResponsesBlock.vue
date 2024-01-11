<template>
    <div class="d-flex flex-column">
        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <ev-http-response-block :http-response="response" v-for="response in responses"></ev-http-response-block>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import _ from 'lodash'
    import JsonHttpResponseBuilder from '@/views/content/components/struct-definition/JsonHttpResponseBuilder'
    import EvHttpResponseBlock from '@/components/http/EvHttpResponseBlock'

    export default {
        name: "EvHttpResponsesBlock",

        components: {
            EvHttpResponseBlock,
            EvHorizonGutter
        },

        props: {
            jsonMethod: Object
        },

        computed: {
            responses() {
                if (!_.isEmpty(this.jsonMethod.httpResponses)) {
                    return this.jsonMethod.httpResponses
                }

                let httpResponses = []

                this.jsonMethod.responses.forEach(jsonStruct => {
                    httpResponses.push(JsonHttpResponseBuilder.buildFromJsonStruct(this.jsonMethod, jsonStruct))
                })

                return httpResponses
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>
