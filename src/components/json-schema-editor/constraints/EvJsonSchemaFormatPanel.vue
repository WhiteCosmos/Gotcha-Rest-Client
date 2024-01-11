<template>
    <div class="ev-json-schema-properties-panel">
        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <ev-popup-menu-divider label="Swagger"></ev-popup-menu-divider>

        <div class="ev-json-schema-properties-panel__row">
            <div class="d-flex" style="flex: 1">
                <ev-label size="11" secondary bold>Collection Format :</ev-label>
            </div>

            <div class="d-flex" style="flex: 1">
                <ev-basic-input v-model="format.collectionFormat" placeholder="csv | ssv | tsv | pipes"></ev-basic-input>
            </div>
        </div>

        <ev-popup-menu-divider label="OpenAPI"></ev-popup-menu-divider>

        <div class="ev-json-schema-properties-panel__row">
            <div class="d-flex" style="flex: 1">
                <ev-label size="11" secondary bold>Style :</ev-label>
            </div>

            <div class="d-flex" style="flex: 1">
                <ev-basic-input v-model="format.style" placeholder="form | simple | matrix"></ev-basic-input>
            </div>
        </div>

        <div class="ev-json-schema-properties-panel__row">
            <div class="d-flex" style="flex: 1">
                <ev-label size="11" secondary bold>Explode :</ev-label>
            </div>

            <div class="d-flex" style="flex: 1">
                <ev-switch v-model="format.explode"></ev-switch>
            </div>
        </div>

        <div class="ev-json-schema-properties-panel__row">
            <div class="d-flex" style="flex: 1">
                <ev-label size="11" secondary bold>Allow Reversed :</ev-label>
            </div>

            <div class="d-flex" style="flex: 1">
                <ev-switch v-model="format.allowReversed"></ev-switch>
            </div>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvBasicInput from '@/components/input/EvBasicInput'
    import EvSwitch from '@/components/button/EvSwitch'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvJsonSchemaFormatPanel",

        components: {
            EvHorizonGutter,
            EvSwitch,
            EvBasicInput,
            EvVerticalGutter,
            EvPopupMenuDivider,
            EvExportCheckBox,
            EvLabel
        },

        props: {
            format: Object
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvJsonSchemaProperties";

</style>
