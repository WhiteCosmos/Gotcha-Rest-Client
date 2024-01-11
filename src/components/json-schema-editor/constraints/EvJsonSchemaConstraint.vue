<template>
    <ev-popup-menu :config="menuConfig" :disabled="disabled">
        <template slot="icon">
            <div class="ev-json-schema-constraint">
                <ev-required-icon></ev-required-icon>
            </div>
        </template>

        <template slot="items">
            <div class="ev-json-schema-constraint__menu">
                <ev-label size="11" bold secondary>{{ $t('menu.constraint') }}</ev-label>

                <!--                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

                <ev-label size="11" bold secondary>{{ $t('menu.xml') }}</ev-label>

                <!--                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

                <ev-label size="11" bold secondary>{{ $t('menu.extensions') }}</ev-label>

                <!--                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

                <ev-label size="11" bold secondary>{{ $t('menu.misc') }}</ev-label>
            </div>

            <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

            <div class="ev-json-schema-constraint__item">
                <ev-export-check-box v-model="constraint.required"></ev-export-check-box>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-label size="11" secondary bold>{{ $t('required') }}</ev-label>
            </div>

            <div class="ev-json-schema-constraint__item">
                <ev-export-check-box v-model="constraint.nullable"></ev-export-check-box>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-label size="11" secondary bold>允许 NULL</ev-label>
            </div>

            <ev-popup-menu-divider></ev-popup-menu-divider>

            <div class="ev-json-schema-constraint__item">
                <ev-label size="11" secondary bold>{{ $t('defaultValue') }}</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex" style="width: 160px">
                    <ev-basic-input v-model="constraint.defaultValue" placeholder="Default Value"></ev-basic-input>
                </div>
            </div>

            <div class="ev-json-schema-constraint__item">
                <ev-label size="11" secondary bold>{{ $t('exampleValue') }}</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex" style="width: 160px">
                    <ev-basic-input v-model="constraint.exampleValue" placeholder="Example Value"></ev-basic-input>
                </div>
            </div>

            <ev-popup-menu-divider></ev-popup-menu-divider>

            <div class="ev-json-schema-constraint__item">
                <ev-label size="11" secondary bold>{{ $t('minLength') }}</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex">
                    <ev-basic-input v-model="constraint.minLength" placeholder="Min Length"></ev-basic-input>
                </div>
            </div>

            <div class="ev-json-schema-constraint__item">
                <ev-label size="11" secondary bold>{{ $t('maxLength') }}</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex">
                    <ev-basic-input v-model="constraint.maxLength" placeholder="Max Length"></ev-basic-input>
                </div>
            </div>

            <ev-popup-menu-divider></ev-popup-menu-divider>

            <div class="ev-json-schema-constraint__item">
                <ev-label size="11" secondary bold>{{ $t('matches') }}</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex" style="width: 160px">
                    <ev-basic-input v-model="constraint.match" placeholder="Regexp Expression"></ev-basic-input>
                </div>
            </div>

            <ev-popup-menu-divider></ev-popup-menu-divider>

            <div class="ev-json-schema-constraint__item">
                <ev-label size="11" secondary bold>{{ $t('enums') }}</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex" style="width: 160px">
                    <ev-basic-input v-model="constraint.enums" placeholder="One，Two，Three"></ev-basic-input>
                </div>
            </div>
        </template>
    </ev-popup-menu>
</template>

<script>
    import EvRequiredIcon from '@/components/json-editor-vsl/icons/ev-required-icon'
    import EvPopupMenu from '@/components/menu/EvPopupMenu'
    import EvPopupMenuToggleItem from '@/components/menu/EvPopupMenuToggleItem'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvLabel from '@/components/typography/EvLabel'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvBasicInput from '@/components/input/EvBasicInput'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvJsonSchemaConstraint",

        components: {
            EvHorizonGutter,
            EvBorderlessInput,
            EvBasicInput,
            EvVerticalGutter,
            EvExportCheckBox,
            EvLabel,
            EvPopupMenuDivider,
            EvPopupMenuToggleItem,
            EvPopupMenu,
            EvRequiredIcon
        },

        created() {

        },

        beforeDestroy() {

        },

        props: {
            constraint: Object,

            disabled: {
                type: Boolean,
                default: false
            },
        },

        data() {
            return {
                menuConfig: {
                    'nudge-left': 141,
                    'close-on-content-click': false,
                },

                required: 'CHECKED',
            }
        },

        methods: {},

        i18n: {
            messages: {
                en: {
                    required: "Required",

                    minLength: "Min Length",

                    maxLength: "Max Length",

                    matches: "Pattern",

                    enums: "Enums",

                    defaultValue: "Default",

                    exampleValue: "Example",

                    menu: {
                        constraint: "Constraint",

                        xml: "XML",

                        extensions: "Extensions",

                        misc: "Misc"
                    }
                },
                zh: {
                    required: "是否必填",

                    minLength: "最小长度",

                    maxLength: "最大长度",

                    matches: "正则匹配",

                    enums: "枚举",

                    defaultValue: "默认值",

                    exampleValue: "示例值",

                    menu: {
                        constraint: "约束条件",

                        xml: "XML 配置",

                        extensions: "扩展字段",

                        misc: "其它"
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-json-schema-constraint {
        @include full-center;

        width: 14px;

        height: 14px;

        &__item {
            display: flex;

            align-items: center;

            height: 24px;

            width: 288px;

            padding-left: 8px;

            padding-right: 8px;
        }

        &__menu {
            display: flex;

            align-items: center;

            justify-content: space-around;

            padding-left: 8px;

            padding-right: 8px;

            height: 24px;

            border-bottom: 1px solid #CCC;

            //border-radius: 3px;

            //border: 1px solid #999;

            //background-color: #FF8282;
        }
    }
</style>
