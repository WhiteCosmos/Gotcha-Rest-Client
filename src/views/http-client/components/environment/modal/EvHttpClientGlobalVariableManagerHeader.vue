<template>
    <div class="ev-http-client-global-variable-manager-header">
        <div class="ev-http-client-global-variable-manager-header__name-column">
            <ev-label size="11" primary bold>{{ $t('name') }}</ev-label>
        </div>

        <div class="ev-http-client-global-variable-manager-header__value-column">
            <ev-label size="11" primary bold>{{ $t('value') }}</ev-label>

            <v-spacer></v-spacer>

            <ev-label size="11" bold blue @click.native="doAddVariable">{{ $t('addVariable') }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvHttpClientGlobalVariableManagerHeader",

        components: {
            EvVerticalGutter,
            EvLabel
        },

        methods: {
            doAddVariable() {
                this.$emit('add-variable')
            },
        },

        i18n: {
            messages: {
                en: {
                    name: "Name",

                    value: "Value",

                    addVariable: "Add Variable"
                },
                zh: {
                    name: "参数名",

                    value: "参数值",

                    addVariable: "添加变量"
                },
                jp: {
                    name: "変数名",

                    value: "変数値",

                    addVariable: "変数を追加"
                },

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-global-variable-manager-header {
        display: flex;

        align-items: center;

        width: 100%;

        height: 32px;

        border-bottom: 1px solid #EAEAEA;

        padding-left: 16px;

        &__name-column {
            display: flex;

            min-height: 1px;

            min-width: 1px;

            width: 240px;
        }

        &__value-column {
            display: flex;

            min-height: 1px;

            min-width: 1px;

            flex: 1;

            padding-right: 20px;
        }
    }
</style>
