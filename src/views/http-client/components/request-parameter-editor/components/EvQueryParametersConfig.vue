<template>
    <v-menu v-model="show" v-bind="menuConfig">
        <template v-slot:activator="{ on }">
            <div class="ev-settings-button" v-on="on">
                <span class="ev-settings-button__label">{{ $t('settings') }}</span>
            </div>
        </template>

        <div class="ev-popup-menu__items">
            <ev-menu-top-indicator class="ev-popup-menu__indicator" color="#F1F1F1"></ev-menu-top-indicator>

            <ev-popup-menu-divider :label="$t('arrayFormats')"></ev-popup-menu-divider>

            <ev-popup-menu-radio-item v-for="name in formats"
                                      :name="name"
                                      v-model="config.arrayFormat">{{ name }}
            </ev-popup-menu-radio-item>

            <ev-popup-menu-divider></ev-popup-menu-divider>

            <ev-popup-menu-radio-item v-for="name in separatorFormats"
                                      :name="name"
                                      v-model="config.arrayFormat">{{ name }}
            </ev-popup-menu-radio-item>

            <ev-popup-menu-text-item :label="$t('separator')"
                                     v-model="config.arrayFormatSeparator"
                                     :disable="!isArraySeparatorFormat"></ev-popup-menu-text-item>

            <ev-popup-menu-divider label=""></ev-popup-menu-divider>

            <ev-popup-menu-toggle-item v-model="config.skipEmptyString">{{ $t('skipEmptyString') }}</ev-popup-menu-toggle-item>
        </div>
    </v-menu>
</template>

<script>
    import EvRequestParameterConfigIcon from '@/views/http-client/components/request-parameter-editor/icons/EvRequestParameterConfigIcon'
    import EvMenuTopIndicator from '@/components/json-editor-vsl/icons/ev-menu-top-indicator'
    import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvPopupMenuToggleItem from '@/components/menu/EvPopupMenuToggleItem'
    import EvPopupMenuTextItem from '@/components/menu/EvPopupMenuTextItem'
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvQueryParametersConfig",

        components: {
            EvLabel,
            EvPopupMenuTextItem,
            EvPopupMenuToggleItem,
            EvPopupMenuDivider,
            EvPopupMenuRadioItem,
            EvMenuTopIndicator,
            EvRequestParameterConfigIcon
        },

        props: {
            config: Object,
        },

        data() {
            return {
                show: false,

                menuConfig: {
                    'offset-y': true,

                    'close-on-content-click': false,

                    'nudge-bottom': 1,

                    transition: "dummy"
                },

                format: 'None',

                formats: [
                    'None',
                    'Bracket',
                    'Index',
                    'Comma'
                ],

                separatorFormats: [
                    'Separator',
                    'Bracket-Separator',
                    'Colon-List-Separator',
                ],
            }
        },

        computed: {
            isArraySeparatorFormat() {
                return this.separatorFormats.includes(this.config.arrayFormat)
            },
        },

        methods: {
            doChangeFormat(format) {
                this.format = format

                this.show = false
            },
        },

        i18n: {
            messages: {
                en: {
                    settings: "CONFIG",

                    arrayFormats: "Array Formats",

                    separator: "Separator",

                    skipEmptyString: "Skip Empty String"
                },
                zh: {
                    settings: "参数设置",

                    arrayFormats: "数组格式",

                    separator: "分隔符",

                    skipEmptyString: "跳过空值参数"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-popup-menu {
        &__icon-container {
            @include full-center;
        }

        &__items {
            display: flex;

            flex-direction: column;

            width: fit-content;

            padding: 4px;

            border-radius: 6px;

            background-color: #F1F1F1;
        }

        &__indicator {
            position: absolute;

            display: block;

            top: -12px;

            align-self: center;
        }
    }

    .ev-settings-button {
        display: flex;

        align-items: center;

        height: 14px;

        width: fit-content;

        padding-left: 8px;

        padding-right: 8px;

        border-radius: 16px;

        border: 1px solid $SECONDARY_FONT_COLOR;

        &__label {
            font-size: 10px;

            font-weight: bold;

            line-height: 12px;

            color: $SECONDARY_FONT_COLOR;
        }
    }
</style>
