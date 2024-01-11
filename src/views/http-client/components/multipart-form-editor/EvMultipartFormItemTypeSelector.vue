<template>
    <v-menu v-bind="selectorMenuConfig" v-model="showTypeSelectorMenu">
        <template v-slot:activator="{ on }">
            <div class="multipart-form-item-type-selector" v-on="on">
                <ev-data-type-file-icon v-if="item.dataType === 'file'"></ev-data-type-file-icon>

                <ev-data-type-string-icon v-if="item.dataType === 'text'"></ev-data-type-string-icon>
            </div>
        </template>

        <div class="multipart-form-item-type-selector__menu">
            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

            <div class="multipart-form-item-type-selector__menu-item" @click="switchType('text')">
                <ev-data-type-string-icon></ev-data-type-string-icon>

                <span class="multipart-form-item-type-selector__menu-label">{{ $t('text') }}</span>
            </div>

            <div class="multipart-form-item-type-selector__menu-item" @click="switchType('file')">
                <ev-data-type-file-icon></ev-data-type-file-icon>

                <span class="multipart-form-item-type-selector__menu-label">{{ $t('file') }}</span>
            </div>

            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>
        </div>
    </v-menu>
</template>

<script>
    import EvJsonFileIcon from '@/components/json-editor-vsl/icons/ev-json-file-icon'
    import EvJsonStringIcon from '@/components/json-editor-vsl/icons/ev-json-string-icon'
    import EvMenuTopIndicator from '@/components/json-editor-vsl/icons/ev-menu-top-indicator'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvDataTypeFileIcon from '@/assets/icons/EvDataTypeFileIcon'
    import EvDataTypeStringIcon from '@/assets/icons/EvDataTypeStringIcon'

    export default {
        name: "EvMultipartFormItemTypeSelector",

        components: {
            EvDataTypeStringIcon,
            EvDataTypeFileIcon,
            EvHorizonGutter,
            EvMenuTopIndicator,
            EvJsonStringIcon,
            EvJsonFileIcon
        },

        mixins: [],

        props: {
            item: Object
        },

        data() {
            return {
                showTypeSelectorMenu: false,

                selectorMenuConfig: {
                    'close-on-content-click': true,

                    'nudge-left': 3,

                    'nudge-top': 2,

                    'transition': 'dummy',
                },
            }
        },

        methods: {
            switchType(type) {
                this.item.dataType = type

                this.item.value = ""
            }
        },

        i18n: {
            messages: {
                en: {
                    text: "Text",

                    file: "File"
                },
                zh: {
                    text: "文本",

                    file: "文件"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .multipart-form-item-type-selector {
        @include full-center;

        width: 32px;

        height: 32px;

        &__menu {
            display: flex;

            flex-direction: column;

            background-color: #FCFCFC;

            width: 96px;

            border-radius: 4px;

            overflow: auto;

            &-item {
                height: 28px;

                display: flex;

                align-items: center;

                padding-left: 8px;

                padding-right: 4px;

                margin-left: 4px;

                margin-right: 4px;

                border-radius: 4px;

                &:hover {
                    background-color: #F1F1F1;
                }
            }

            &-label {
                font-size: 10px;

                font-weight: bold;

                color: $SECONDARY_FONT_COLOR;

                margin-left: 8px;

                user-select: none;
            }
        }
    }

    .my-menu {
        margin-top: 6px;

        contain: initial;

        overflow: visible;

        align-self: center;
    }

    .indicator-position {
        position: absolute;

        display: block;

        top: -12px;

        align-self: center;
    }
</style>
