<template>
    <div class="ev-http-client-global-variable-manager">
        <ev-http-client-global-variable-manager-header @add-variable="handleAddVariable"></ev-http-client-global-variable-manager-header>

        <div class="ev-http-client-global-variable-manager__scroll">
            <ev-http-client-global-variable-manager-item v-for="variable in globalVariables"
                                                         :variable="variable"
                                                         @remove-variable="handleRemoveVariable(variable)"></ev-http-client-global-variable-manager-item>
        </div>
    </div>
</template>

<script>
    import EvHttpClientGlobalVariableManagerHeader from '@/views/http-client/components/environment/modal/EvHttpClientGlobalVariableManagerHeader'
    import EvHttpClientGlobalVariableItem from '@/views/http-client/components/environment/EvHttpClientGlobalVariableItem'
    import EvHttpClientGlobalVariableManagerItem from '@/views/http-client/components/environment/modal/EvHttpClientGlobalVariableManagerItem'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import v4 from 'node-uuid'

    export default {
        name: "EvHttpClientGlobalVariableManager",

        mixins: [
            EvStoreMixin,
        ],

        components: {
            EvHttpClientGlobalVariableManagerItem,
            EvHttpClientGlobalVariableItem,
            EvHttpClientGlobalVariableManagerHeader
        },

        props: {
            globalVariables: Array,
        },

        computed: {},

        data() {
            return {}
        },

        methods: {
            handleAddVariable() {
                this.globalVariables.push({
                    uid: v4(),
                    key: '',
                    value: ''
                })
            },

            handleRemoveVariable(variable) {
                this.globalVariables.splice(this.globalVariables.indexOf(variable), 1)
            },
        },

        i18n: {},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-http-client-global-variable-manager {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        width: 100%;

        &__scroll {
            display: flex;

            flex-direction: column;

            min-height: 1px;

            min-width: 1px;

            overflow-y: scroll;

            height: 100%;
        }
    }
</style>
