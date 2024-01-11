<template>
    <v-menu v-model="show" v-bind="menuConfig">
        <template v-slot:activator="{ on }">
            <div class="ev-request-parameter-editor-format-selector" v-on="on">
                <ev-label size="10" secondary bold>FORMAT :</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="10" secondary>{{ item.format }}</ev-label>

                <v-spacer></v-spacer>

                <ev-small-select-icon></ev-small-select-icon>
            </div>
        </template>

        <ev-request-parameter-editor-format-menu :format="item.format"
                                                 @select="doSelect"></ev-request-parameter-editor-format-menu>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvSmallSelectIcon from '@/views/http-client/icon/ev-small-select-icon'
    import EvRequestParameterEditorFormatMenu from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorFormatMenu'

    export default {
        name: "EvRequestParameterEditorFormatSelector",

        components: {
            EvRequestParameterEditorFormatMenu,
            EvSmallSelectIcon,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            item: Object,
        },

        created() {
            /**
             * Add 'format' field
             * @since 1.4.6
             */
            if (!this.item.format) {
                this.$set(this.item, 'format', 'None')

                this.$set(this.item, 'separator', '')
            }
        },

        data() {
            return {
                show: false,

                menuConfig: {
                    'offset-y': true,

                    'close-on-content-click': false,

                    'nudge-bottom': 2,
                }
            }
        },

        methods: {
            doSelect(format) {
                this.item.format = format
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-request-parameter-editor-format-selector {
        display: flex;

        align-items: center;

        width: 160px;

        height: 18px;

        padding-left: 6px;

        padding-right: 6px;

        border: 1px solid #D8D8D8;

        background-color: #FAFAFA;

        padding-top: 1px;

        border-radius: 3px;
    }
</style>
