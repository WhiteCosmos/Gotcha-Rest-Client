<template>
    <div class="dv-environment-variables-menu">
        <div class="dv-environment-variables-menu__item"
             v-for="variable in globalVariables"
             @click="doSelectVariable(variable)"
             @mouseover="onHover(variable)"
             @mouseleave="onLeave">
            <ev-label size="10" primary bold>{{ variable.key }}</ev-label>
        </div>

        <ev-dynamic-variable-preview :value="currentVariableValue"></ev-dynamic-variable-preview>
    </div>
</template>

<script>
    import DvEnvironmentVariablesGroupDivider from '@/components/dynamic-variable/variables/DvEnvironmentVariablesGroupDivider'
    import EvLabel from '@/components/typography/EvLabel'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvDynamicVariablePreview from '@/components/dynamic-variable/components/EvDynamicVariablePreview'

    export default {
        name: "DvGlobalVariablesMenu",

        components: {
            EvDynamicVariablePreview,
            EvLabel,
            DvEnvironmentVariablesGroupDivider
        },

        mixins: [
            EvStoreMixin,
        ],

        props: {
            selectedVariable: Object
        },

        data() {
            return {
                hoveredVariable: undefined
            }
        },

        computed: {
            globalVariables() {
                return this.currentProject.globalVariables
            },

            currentVariableValue() {
                if (this.hoveredVariable) {
                    let value = this.hoveredVariable.value

                    return this.dynamicVariableRender.render(value)
                }

                if (this.selectedVariable) {
                    let value = this.selectedVariable.value

                    return this.dynamicVariableRender.render(value)
                }
            },
        },

        methods: {
            doSelectVariable(variable) {
                this.$emit('select-variable', variable)
            },

            onHover(variable) {
                this.hoveredVariable = variable
            },

            onLeave() {
                this.hoveredVariable = undefined
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .dv-environment-variables-menu {
        display: flex;

        flex-direction: column;

        //max-height: 320px;

        min-height: 72px;

        min-width: 1px;

        background-color: #F1F1F1;

        border: 1px solid #D8D8D8;

        border-radius: 5px;

        overflow-y: auto;

        &__group {
            display: flex;

            flex-direction: column;
        }

        &__item {
            display: flex;

            align-items: center;

            height: 24px;

            padding-left: 4px;

            padding-right: 4px;

            &:hover {
                background-color: #E0E0E0;
            }
        }
    }
</style>
