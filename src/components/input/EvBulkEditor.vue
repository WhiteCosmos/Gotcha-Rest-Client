<template>
    <v-menu left v-bind="bulkEditorConfig" v-model="showBulkEditor">
        <template v-slot:activator="{ on }">
            <div class="ev-bulk-editor__icon-container" v-on="on">
                <ev-bulk-edit-icon></ev-bulk-edit-icon>
            </div>
        </template>

        <div class="ev-bulk-editor__menu-container">
            <ev-codemirror-wrapper ref="codemirror-wrapper" v-model="value_" mode='text'></ev-codemirror-wrapper>
        </div>
    </v-menu>
</template>

<script>
    import EvBulkEditIcon from '@/components/icon/ev-bulk-edit-icon'
    import 'codemirror/lib/codemirror.css'
    import '@/styles/codemirror-rabiapi-theme.css'
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'

    export default {
        name: "EvBulkEditor",

        components: {
            EvCodemirrorWrapper,
            EvBulkEditIcon,
        },

        created() {
            this.value_ = this.value
        },

        model: {
            prop: "value",
            event: "change"
        },

        props: {
            value: {
                type: String,
                default: "",
            }
        },

        watch: {
            showBulkEditor(newVal) {
                if (newVal) {
                    setTimeout(() => {
                        this.$refs['codemirror-wrapper'].reload()
                    }, 50)
                }
            },

            value(newVal) {
                this.value_ = newVal
            },

            value_(newVal) {
                this.$emit('change', newVal)
            }
        },

        data() {
            return {
                showBulkEditor: false,

                bulkEditorConfig: {
                    'eager': true,

                    'offset-x': true,

                    'close-on-content-click': false,

                    'content-class': "ev-bulk-editor-menu",

                    // 'transition': 'dummy'
                },

                value_: ""
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-bulk-editor {
        &__icon-container {
            @include full-center;

            width: 16px;

            height: 16px;
        }

        &__menu-container {
            position: relative;

            display: flex;

            width: 320px;

            height: 240px;

            min-width: 1px;

            min-height: 1px;

            //padding: 4px;

            border-radius: 3px;

            background-color: #F1F1F1;

            overflow-y: hidden;
        }
    }

    .ev-bulk-editor-menu {
        margin-top: 4px;

        contain: initial;

        overflow: visible;

        align-self: center;
    }
</style>
