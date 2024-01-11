<template>
    <div class="dv-environment-variables-menu">
        <div class="dv-environment-variables-menu__group" v-for="group in groups">
            <dv-environment-variables-group-divider :label="group.default ? $t('defaultGroup') : group.name "></dv-environment-variables-group-divider>

            <div class="dv-environment-variables-menu__item"
                 v-for="variable in group.variables"
                 @click="doSelectVariable(variable)"
                 @mouseover="onHover(variable)"
                 @mouseleave="onLeave">
                <ev-label size="10" primary bold>{{ variable.name }}</ev-label>
            </div>
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
        name: "DvEnvironmentVariablesMenu",

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
            groups() {
                return this.currentEnvironments.groups
            },

            currentVariableValue() {
                if (!this.currentEnvironment) {
                    return
                }

                if (this.hoveredVariable) {
                    let result = this.currentEnvironment.variables.find(it => {
                        return it.uid === this.hoveredVariable.uid
                    })

                    return result ? this.dynamicVariableRender.render(result.value) : ''
                }

                if (this.selectedVariable) {
                    let result = this.currentEnvironment.variables.find(it => {
                        return it.uid === this.selectedVariable.uid
                    })

                    return result ? this.dynamicVariableRender.render(result.value) : ''
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
        },

        i18n: {
            messages: {
                en: {
                    defaultGroup: "Default Group"
                },
                zh: {
                    defaultGroup: "默认分组"
                }
            }
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
