<template>
    <ev-popup-menu :config="config" ref="ev-popup-menu">
        <template slot="icon">
            <ev-request-parameter-export-icon></ev-request-parameter-export-icon>
        </template>

        <template slot="items">
            <ev-popup-menu-radio-item name="text" v-model="value">Text</ev-popup-menu-radio-item>

            <ev-popup-menu-radio-item name="json" v-model="value">Json</ev-popup-menu-radio-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <div class="d-flex justify-center">
                <ev-text-button :no-border="true" @click.native="doExport">{{ label }}</ev-text-button>
            </div>
        </template>
    </ev-popup-menu>
</template>

<script>
    import EvPopupMenu from '@/components/menu/EvPopupMenu'
    import EvRequestParameterExportIcon from '@/views/http-client/components/request-parameter-editor/icons/EvRequestParameterExportIcon'
    import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvTextButton from '@/components/button/EvTextButton'

    export default {
        name: "EvRequestParametersExporter",

        components: {
            EvTextButton,
            EvContextMenuDivider,
            EvPopupMenuRadioItem,
            EvRequestParameterExportIcon,
            EvPopupMenu
        },

        props: {
            options: Object
        },

        data() {
            return {
                config: {
                    'nudge-left': 55,
                    'close-on-content-click': false,
                },

                value: "text"
            }
        },

        computed: {
            label() {
                let label = this.options.exporterLabel

                return label ? label : 'Export'
            },

            placeholder() {
                let placeholder = this.options.exporterPlaceholder

                return placeholder ? placeholder : 'e.g.'
            },
        },

        methods: {
            doExport() {
                this.$emit('export', this.value)

                this.$refs['ev-popup-menu'].hide()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>
