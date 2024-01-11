<template>
    <div class="module-label d-flex align-center clickable" v-on="events">
        <module-icon></module-icon>

        <EvVerticalGutter :gutter="8"></EvVerticalGutter>

        <span class="module-name">{{ moduleName }}</span>

        <EvVerticalGutter :gutter="4"></EvVerticalGutter>

        <v-spacer></v-spacer>

        <select-icon></select-icon>
    </div>
</template>

<script>
    import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
    import EvPlusButton from "@/components/button/EvPlusButton"
    import SelectIcon from '@/components/icon/select-icon'
    import ModuleIcon from '@/components/icon/module-icon'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvCount from '@/components/tag/EvCount'

    export default {
        name: "EvModuleLabel",

        components: {EvCount, ModuleIcon, SelectIcon, EvPlusButton, EvVerticalGutter},

        props: {
            events: Object,

            module: Object,
        },

        computed: {
            moduleName() {
                return this.module ? this.module.name : ''
            }
        },

        mixins: [
            EvStoreMixin,
        ]
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .module-label {
        width: 288px;

        height: 32px;
    }

    .module-name {
        color: $SECONDARY_FONT_COLOR;

        font-size: 12px;

        font-weight: bold;
    }
</style>
