<template>
    <ev-popup-menu :config="menuConfig" v-model="showPopupMenu">
        <template slot="icon">
            <ev-request-parameter-import-icon></ev-request-parameter-import-icon>
        </template>

        <template slot="items">
            <div class="textarea-container">
                <textarea class="textarea-container__textarea" :placeholder="placeholder" v-model="value"></textarea>
            </div>

            <ev-context-menu-divider></ev-context-menu-divider>

            <div class="d-flex justify-center">
                <ev-text-button :no-border="true" @click.native="doImport">{{ label }}</ev-text-button>
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
    import EvRequestParameterImportIcon from '@/views/http-client/components/request-parameter-editor/icons/EvRequestParameterImportIcon'
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvRequestParametersImporter",

        /*
        TODO List

        1. 增加是否覆盖选项
         */

        components: {
            EvHorizonGutter,
            EvCodemirrorWrapper,
            EvRequestParameterImportIcon,
            EvTextButton,
            EvContextMenuDivider,
            EvPopupMenuRadioItem,
            EvRequestParameterExportIcon,
            EvPopupMenu
        },

        props: {
            options: Object,
        },

        data() {
            return {
                menuConfig: {
                    'nudge-left': 102,
                    'close-on-content-click': false,
                },

                value: '',

                showPopupMenu: false
            }
        },

        computed: {
            label() {
                let label = this.options.importerLabel

                return label ? label : 'Import'
            },

            placeholder() {
                let placeholder = this.options.importerPlaceholder

                return placeholder ? placeholder : 'Import'
            },
        },

        watch: {
            showPopupMenu(newVal) {
                if (newVal === false) {
                    this.clearValue()
                }
            }
        },

        methods: {
            doImport() {
                this.showPopupMenu = false

                this.$emit('import', this.value)

                this.clearValue()
            },

            clearValue() {
                setTimeout(() => {
                    this.value = ''
                }, 100)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .textarea-container {
        display: flex;

        width: 200px;

        height: 120px;

        border: 1px solid #E0E0E0;

        border-radius: 3px;

        margin: 4px;

        &__textarea {
            width: 100%;

            height: 100%;

            background-color: white;

            outline: none;

            resize: none;

            border-radius: 3px;

            padding: 4px;

            font-size: 11px;

            color: $SECONDARY_FONT_COLOR;

            &::placeholder {
                font-size: 11px;

                color: $PLACEHOLDER_FONT_COLOR;
            }
        }
    }
</style>
