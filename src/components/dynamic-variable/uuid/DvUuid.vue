<template>
    <div class="dv-wrapper">
        <div class="dv-header">
            <ev-label size="11" bold secondary>UUID</ev-label>
        </div>

        <div class="dv-divider"></div>

        <div class="dv-container">
            <ev-popup-menu-radio-item v-model="value_.version" name="v1">v1</ev-popup-menu-radio-item>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-popup-menu-radio-item v-model="value_.version" name="v4">v4</ev-popup-menu-radio-item>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import EvRadio from '@/components/form/EvRadio'
    import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "DvUuid",

        components: {
            EvVerticalGutter,
            EvPopupMenuRadioItem,
            EvRadio,
            EvLabel
        },

        mixins: [
            EvDataBindMixin
        ]
    }
</script>

<style lang="scss" scoped>
    @import "../DynamicVariable";

</style>
