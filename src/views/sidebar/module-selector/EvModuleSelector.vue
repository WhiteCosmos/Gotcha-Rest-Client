<template>
    <v-menu offset-y :close-on-content-click="false" v-model="showModuleSelector" attach=".tool-container">
        <template v-slot:activator="{ on }">
            <div class="module-selector selector-common-style d-flex align-center">
                <ev-module-label :module="selectedModule" :events="on" :active="showModuleSelector"></ev-module-label>
            </div>
        </template>

        <ev-module-menu :modules="modules" :selected-module="selectedModule" @cancel="cancel"></ev-module-menu>
    </v-menu>
</template>

<script>
    import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
    import EvModuleLabel from "@/views/sidebar/module-selector/EvModuleLabel"
    import EvModuleMenu from "@/views/sidebar/module-selector/EvModuleMenu"
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvAppCacheMixin from '@/mixins/EvAppCacheMixin'
    import RabiVersionDao from '@/core/dao/RabiVersionDao'
    import RabiModuleDao from '@/core/dao/RabiModuleDao'

    export default {
        name: "EvModuleSelector",

        components: {
            EvModuleMenu,
            EvModuleLabel,
            EvVerticalGutter
        },

        mixins: [
            EvStoreMixin,
            EvAppCacheMixin,
        ],

        created() {
            AppEventBus.$on(AppEvents.SELECT_VERSION, (version) => {
                this.handleSelectVersion(version)
            })
        },

        props: {
            modules: Array,

            selectedModule: Object,
        },

        data() {
            return {
                showModuleSelector: false,
            }
        },

        methods: {
            cancel() {
                this.showModuleSelector = false
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .module-selector {
        width: 100%;

        padding-left: 8px;

        padding-right: 8px;

        height: 28px;

        user-select: none;
    }

    .module-name {
        max-width: 216px;

        font-size: 14px;

        color: $PRIMARY_COLOR;

        line-height: 32px;
    }
</style>
