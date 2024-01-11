<template>
    <div class="ev-http-client-global-variable-item" @click="doCopyGlobalVariable">
        <ev-label size="10" primary text-truncate>{{ variable.key }}</ev-label>

        <v-spacer></v-spacer>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import {clipboard} from 'electron'

    export default {
        name: "EvHttpClientGlobalVariableItem",

        components: {
            EvLabel
        },

        props: {
            variable: {
                type: Object,
                default: () => {
                    return {
                        key: "BASE_URL",
                        value: "httpbin.org"
                    }
                }
            }
        },

        methods: {
            doCopyGlobalVariable() {
                const {clipboard} = require('electron')

                let text = `{{${this.variable.key}}}`

                clipboard.writeText(text)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-global-variable-item {
        display: flex;

        align-items: center;

        width: 100%;

        height: 20px;

        padding-left: 6px;

        padding-right: 6px;

        &:hover {
            background-color: #E0E0E0;
        }
    }
</style>
