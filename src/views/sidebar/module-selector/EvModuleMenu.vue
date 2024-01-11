<template>
    <div class="module-selector-menu">
        <EvModuleMenuItem v-for="module in modules"
                          :module="module"
                          :selected-module="selectedModule"
                          @click.native="doSelectModule(module)"></EvModuleMenuItem>
    </div>
</template>

<script>
    import EvModuleMenuItem from '@/views/sidebar/module-selector/EvModuleMenuItem'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import {AppEventBus, AppEvents} from '@/AppEventBus'

    export default {
        name: "EvModuleMenu",

        components: {
            EvModuleMenuItem,
        },

        props: {
            modules: Array,

            selectedModule: Object,
        },

        data() {
            return {
                selectedModule: undefined,
            }
        },

        methods: {
            doSelectModule(module) {
                AppEventBus.$emit(AppEvents.SELECT_MODULE, module)

                this.$emit('cancel')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .module-selector-menu {
        width: 100%;

        background-color: $SECONDARY_BACKGROUND_COLOR;

        user-select: none;
    }
</style>
