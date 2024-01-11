<template>
    <div class="d-flex mock-client-response-body-navigation-bar">
        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-radio name="None" value="none" v-model="contentType"></ev-radio>

        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

        <ev-radio name="Raw" value="text/plain" v-model="contentType"></ev-radio>

        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

        <ev-radio name="JSON" value="application/json" v-model="contentType"></ev-radio>

        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

        <ev-radio name="File" value="application/x-www-form-urlencoded" v-model="contentType"></ev-radio>

        <!--        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>-->

        <!--        <ev-radio name="Multipart" value="multipart/form-data" v-model="contentType"></ev-radio>-->
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvRadio from '@/components/form/EvRadio'

    export default {
        name: "EvMockClientResponseBodyNavigationBar",

        components: {
            EvRadio,
            EvVerticalGutter
        },

        data() {
            return {
                contentType: "application/json"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .mock-client-response-body-navigation-bar {
        height: 24px;

        background-color: #FAFAFA;

        border-bottom: 1px solid #F1F1F1;
    }
</style>
