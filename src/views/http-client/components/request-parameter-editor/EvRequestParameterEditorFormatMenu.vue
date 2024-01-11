<template>
    <div class="ev-request-parameter-editor-format-menu">
        <ev-popup-menu-radio-item :value="format"
                                  v-for="name in formats"
                                  :name="name"
                                  @change="emitFormatChange">{{ name }}
        </ev-popup-menu-radio-item>

        <div class="ev-request-parameter-editor-format-menu__example">
            <ev-label size="10" color="#999">{{ examples[format] }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvRequestParameterEditorFormatMenu",

        components: {
            EvLabel,
            EvPopupMenuRadioItem
        },

        props: {
            format: {
                type: String,
                default: "None"
            }
        },

        data() {
            return {
                formats: [
                    'None',
                    'Bracket',
                    'Index',
                    'Comma',
                ],

                examples: {
                    'None': 'foo=3&foo=5&foo=7',
                    'Bracket': 'foo[]=3&foo[]=5&foo[]=7',
                    'Index': 'foo[0]=3&foo[1]=3&foo[2]=7',
                    'Comma': 'foo=3,5,7'
                },
            }
        },

        methods: {
            emitFormatChange(format) {
                this.$emit('select', format)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-request-parameter-editor-format-menu {
        display: flex;

        flex-direction: column;

        background-color: #F1F1F1;

        border-radius: 3px;

        max-height: 320px;

        width: 160px;

        &__example {
            display: flex;

            align-items: center;

            padding: 6px;

            width: 100%;

            height: 28px;

            border-top: 1px solid #e0e0e0;

            background-color: #FAFAFA;
        }
    }
</style>
