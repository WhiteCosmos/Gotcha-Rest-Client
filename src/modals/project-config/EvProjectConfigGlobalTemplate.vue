<template>
    <div class="ev-project-config-global-template">
        <ev-http-client-request :http-operation="httpOperation"
                                :configuration="configuration"></ev-http-client-request>
    </div>
</template>

<script>
    import EvHttpClientRequest from '@/views/http-client/EvHttpClientRequest.vue'
    import GHCHttpOperation from '@/data/gotcha/http-operation/GHCHttpOperation'
    import EvStoreMixin from '@/mixins/EvStoreMixin.vue'

    export default {
        name: "EvProjectConfigGlobalTemplate",

        mixins: [
            EvStoreMixin
        ],

        components: {
            EvHttpClientRequest
        },

        data() {
            return {
                configuration: {
                    template: true,
                    urlEditable: true,
                },
            }
        },

        computed: {
            httpOperation() {
                return this.currentProject.globalTemplate
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-config-global-template {
        display: flex;

        flex: 1;

        height: 420px;

        //height: 100%;

        //height: 100%;

        overflow: hidden;
    }
</style>
