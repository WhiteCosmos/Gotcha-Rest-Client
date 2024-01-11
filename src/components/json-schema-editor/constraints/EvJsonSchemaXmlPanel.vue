<template>
    <div class="ev-json-schema-xml-panel">
        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="ev-json-schema-xml-panel__row">
            <div class="d-flex" style="flex: 1">
                <ev-label size="11" secondary bold>Name :</ev-label>
            </div>

            <div class="d-flex" style="flex: 1">
                <ev-basic-input v-model="xml.name" placeholder="Property Value"></ev-basic-input>
            </div>
        </div>

        <div class="ev-json-schema-xml-panel__row">
            <div class="d-flex" style="flex: 1">
                <ev-label size="11" secondary bold>Name Space :</ev-label>
            </div>

            <div class="d-flex" style="flex: 1">
                <ev-basic-input v-model="xml.namespace" placeholder="Property Value"></ev-basic-input>
            </div>
        </div>

        <div class="ev-json-schema-xml-panel__row">
            <div class="d-flex" style="flex: 1">
                <ev-label size="11" secondary bold>Prefix :</ev-label>
            </div>

            <div class="d-flex" style="flex: 1">
                <ev-basic-input v-model="xml.prefix" placeholder="Property Value"></ev-basic-input>
            </div>
        </div>

        <ev-popup-menu-divider></ev-popup-menu-divider>

        <div class="ev-json-schema-xml-panel__row">
            <div class="d-flex" style="flex: 1">
                <ev-label size="11" secondary bold>Attribute :</ev-label>
            </div>

            <div class="d-flex" style="flex: 1">
                <ev-switch v-model="xml.attribute"></ev-switch>
            </div>
        </div>

        <div class="ev-json-schema-xml-panel__row">
            <div class="d-flex" style="flex: 1">
                <ev-label size="11" secondary bold>Wrapped :</ev-label>
            </div>

            <div class="d-flex" style="flex: 1;">
                <ev-switch v-model="xml.wrapped"></ev-switch>
            </div>
        </div>
    </div>
</template>

<script>
    import EvBasicInput from '@/components/input/EvBasicInput'
    import EvLabel from '@/components/typography/EvLabel'
    import EvSwitch from '@/components/button/EvSwitch'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvJsonSchemaXmlPanel",

        components: {
            EvHorizonGutter,
            EvPopupMenuDivider,
            EvSwitch,
            EvLabel,
            EvBasicInput
        },

        props: {
            xml: Object
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-json-schema-xml-panel {
        display: flex;

        flex-direction: column;

        &__row {
            display: flex;

            align-items: center;

            height: 24px;

            width: 288px;

            padding-left: 8px;

            padding-right: 8px;
        }
    }
</style>
