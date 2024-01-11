<template>
    <div class="d-flex flex-column">
        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" bold secondary>Bearer Token</ev-label>
            </div>
            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>Token</ev-label>
            </div>

            <div class="ev-row__value-part">
                <ev-dynamic-variable-input size="12" :bulk-edit="false" dense password placeholder="Token" v-model="value.token"></ev-dynamic-variable-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>Prefix</ev-label>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input size="12" dense placeholder="Bearer" v-model="value.prefix"></ev-borderless-input>
            </div>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput.vue'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput.vue'

    export default {
        name: "EvHttpClientBearerTokenAuth",

        components: {
            EvDynamicVariableInput,
            EvBorderlessInput,
            EvLabel
        },

        props: {
            value: Object
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "EvHttpClientAuthLayout";
</style>
