<template>
    <div class="import-local-project-option" @click="doSelectOption">
        <div class="import-local-project-option__radio">
            <ev-export-type-toggle-button :flag="selected"></ev-export-type-toggle-button>
        </div>

        <div class="import-local-project-option__container">
            <label>
                <input
                    ref="project-name-input"
                    type="text"
                    v-model="options.projectName"
                    placeholder="未命名项目"
                    class="import-local-project-option__container__input">
            </label>
        </div>
    </div>
</template>

<script>
    import EvExportTypeToggleButton from '@/modals/export-project/export-type/EvExportTypeToggleButton'

    export default {
        name: "EvCreateEmptyProjectOption",

        components: {
            EvExportTypeToggleButton
        },

        props: {
            options: Object,
        },

        data() {
            return {}
        },

        computed: {
            selected() {
                return this.options && this.options.type === 'PROJECT'
            },

            placeholder() {
                // i18n
            }
        },

        methods: {
            doSelectOption() {
                this.options.type = 'PROJECT'

                let input = this.$refs['project-name-input']

                input.focus()
            },
        },

        watch: {
            'options.type'() {
                this.options.projectName = ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .import-local-project-option {
        width: 320px;

        height: 72px;

        background-color: #FAFAFA;

        border-radius: 4px;

        border: 1px solid #EAEAEA;

        display: flex;

        align-items: center;

        transition: 100ms;

        user-select: none;

        &:hover {
            background-color: #F8F8F8;
        }

        &__radio {
            height: 72px;

            width: 72px;

            @include full-center;

            border-right: 1px solid #EAEAEA;
        }

        &__container {
            @include full-center;

            padding-left: 8px;

            padding-right: 8px;

            flex: 1;

            &__input {
                font-size: 11px;

                color: $SECONDARY_FONT_COLOR;

                outline: none;

                border: non;

                &::placeholder {
                    font-size: 11px;

                    color: #AABBCC;
                }
            }

            &__file-selector {
                @include full-center;

                width: 100%;

                height: 56px;

                border: 1px dashed #E0E0E0;

                border-radius: 4px;

                background-color: #F8F8F8;

                padding: 8px;

                &__label {
                    font-size: 11px;

                    font-weight: bold;

                    color: #AABBCC;
                }
            }
        }
    }
</style>
