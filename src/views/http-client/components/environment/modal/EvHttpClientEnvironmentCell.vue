<template>
    <div class="ev-http-client-environment-cell">
        <ev-dynamic-variable-input v-model="target.value"
                                   placeholder="Value"
                                   :dense="true"
                                   :bulk-edit="false"></ev-dynamic-variable-input>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvBulkEditor from '@/components/input/EvBulkEditor'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput'

    export default {
        name: "EvHttpClientEnvironmentCell",

        components: {
            EvDynamicVariableInput,
            EvVerticalGutter,
            EvBulkEditor,
            EvBorderlessInput,
            EvLabel
        },

        props: {
            label: String,

            variable: Object,

            environment: Object,
        },

        computed: {
            target() {
                let variable = this.environment.variables.find(v => {
                    return v.uid === this.variable.uid
                })

                return variable || {value: ''} // TODO ???
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-environment-cell {
        @include full-center;

        height: 32px;

        width: 200px;

        //background-color: #FF8282;

        padding-left: 4px;

        //padding-right: 4px;

        &__wrapper {
            @include full-center;

            height: 16px;

            width: 100%;
        }
    }
</style>
