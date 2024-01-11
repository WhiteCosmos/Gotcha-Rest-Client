<template>
    <ev-popup-menu :config="menuConfig" :disabled="disabled">
        <template slot="icon">
            <div class="ev-icon-wrapper">
                <ev-required-icon :color="disabled ? '#999' : '#333'"></ev-required-icon>
            </div>
        </template>

        <template slot="items">
            <div class="ev-json-schema-properties__menu">
                <div class="ev-json-schema-properties__menu-header">
                    <div class="ev-label-wrapper" @click="menu = 'constraint'">
                        <ev-label size="11" bold :color="isConstraintMenu ? '#333' : '#999'">{{ $t('menu.constraint') }}</ev-label>
                    </div>

                    <div class="ev-label-wrapper" @click="menu = 'enums'">
                        <ev-label size="11" bold :color="isEnumsMenu ? '#333' : '#999'">{{ $t('menu.enums') }}</ev-label>

                        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                        <ev-counter-label :value="properties.constraint.enums.length"></ev-counter-label>
                    </div>

                    <div class="ev-label-wrapper" @click="menu = 'xml'" v-if="isSchemaMode">
                        <ev-label size="11" bold :color="isXmlMenu ? '#333' : '#999'">{{ $t('menu.xml') }}</ev-label>
                    </div>

                    <div class="ev-label-wrapper" @click="menu = 'format'" v-if="isParamMode">
                        <ev-label size="11" bold :color="isFormatMenu ? '#333' : '#999'">{{ $t('menu.format') }}</ev-label>
                    </div>
                </div>

                <ev-json-schema-constraint-panel
                    v-if="menu === 'constraint'"
                    :mode="mode"
                    :constraint="properties.constraint"
                    :type="type"></ev-json-schema-constraint-panel>

                <ev-json-schema-xml-panel :xml="properties.xml" v-if="menu === 'xml'"></ev-json-schema-xml-panel>

                <ev-json-schema-enums-panel :constraint="properties.constraint" v-if="menu === 'enums'"></ev-json-schema-enums-panel>

                <ev-json-schema-format-panel :format="properties.format" v-if="menu === 'format'"></ev-json-schema-format-panel>
            </div>
        </template>
    </ev-popup-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvRequiredIcon from '@/components/json-editor-vsl/icons/ev-required-icon'
    import EvPopupMenu from '@/components/menu/EvPopupMenu'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvJsonSchemaConstraintPanel from '@/components/json-schema-editor/constraints/EvJsonSchemaConstraintPanel'
    import EvJsonSchemaXmlPanel from '@/components/json-schema-editor/constraints/EvJsonSchemaXmlPanel'
    import EvJsonSchemaEnumsPanel from '@/components/json-schema-editor/constraints/EvJsonSchemaEnumsPanel'
    import EvJsonSchemaFormatPanel from '@/components/json-schema-editor/constraints/EvJsonSchemaFormatPanel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCounterLabel from '@/components/label/EvCounterLabel'

    export default {
        name: "EvJsonSchemaProperties",

        components: {
            EvCounterLabel,
            EvVerticalGutter,
            EvJsonSchemaFormatPanel,
            EvJsonSchemaEnumsPanel,
            EvJsonSchemaXmlPanel,
            EvJsonSchemaConstraintPanel,
            EvHorizonGutter,
            EvPopupMenu,
            EvRequiredIcon,
            EvLabel
        },

        props: {
            properties: Object,

            type: {
                type: String,
                default: 'string'
            },

            mode: {
                type: String,
                default: 'param' // param | schema
            },

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

                menu: 'constraint', // constraint xml enums misc
            }
        },

        computed: {
            isParamMode() {
                return this.mode === 'param'
            },

            isSchemaMode() {
                return this.mode === 'schema'
            },

            isConstraintMenu() {
                return this.menu === 'constraint'
            },

            isEnumsMenu() {
                return this.menu === 'enums'
            },

            isXmlMenu() {
                return this.menu === 'xml'
            },

            isFormatMenu() {
                return this.menu === 'format'
            },
        },

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

                        enums: "Enums",

                        extensions: "Extensions",

                        misc: "Misc",

                        format: "Format",
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

                        enums: "枚举列表",

                        extensions: "扩展字段",

                        misc: "其它",

                        format: "格式设置",
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-json-schema-properties {
        display: flex;

        flex-direction: column;

        &__menu {
            display: flex;

            flex-direction: column;

            width: 288px;

            height: 288px;
        }

        &__menu-header {
            display: flex;

            align-items: center;

            justify-content: space-around;

            padding-left: 8px;

            padding-right: 8px;

            height: 28px;

            border-bottom: 1px solid #CCC;

            //border-radius: 3px;

            //border: 1px solid #999;

            //background-color: #FF8282;
        }
    }

    .ev-icon-wrapper {
        @include full-center;

        width: 14px;

        height: 14px;
    }

    .ev-label-wrapper {
        display: flex;

        align-items: center;

        height: 28px;

        width: fit-content;

        padding-left: 8px;

        padding-right: 8px;
    }
</style>
