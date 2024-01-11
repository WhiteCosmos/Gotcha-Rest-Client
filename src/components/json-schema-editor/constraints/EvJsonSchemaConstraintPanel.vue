<template>
    <div class="ev-json-schema-constraint-panel">
        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="ev-json-schema-constraint-panel__item" v-if="isParamMode">
            <ev-export-check-box v-model="constraint.required"></ev-export-check-box>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="11" secondary bold>{{ $t('required') }}</ev-label>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <ev-export-check-box v-model="constraint.deprecated"></ev-export-check-box>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="11" secondary bold>{{ $t('deprecated') }}</ev-label>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <ev-export-check-box v-model="constraint.allowEmptyValue"></ev-export-check-box>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="11" secondary bold>{{ $t('nullable') }}</ev-label>
        </div>

        <div class="ev-json-schema-constraint-panel__item" v-if="isSchemaMode">
            <ev-export-check-box v-model="constraint.required"></ev-export-check-box>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="11" secondary bold>{{ $t('required') }}</ev-label>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <ev-export-check-box v-model="constraint.deprecated"></ev-export-check-box>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="11" secondary bold>{{ $t('deprecated') }}</ev-label>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <ev-export-check-box v-model="constraint.nullable"></ev-export-check-box>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="11" secondary bold>{{ $t('nullable') }}</ev-label>
        </div>

        <ev-popup-menu-divider v-if="isSchemaMode"></ev-popup-menu-divider>

        <div class="ev-json-schema-constraint-panel__item" v-if="isSchemaMode">
            <ev-switch v-model="constraint.readOnly"></ev-switch>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="11" secondary bold>{{ $t('readOnly') }}</ev-label>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <ev-switch v-model="constraint.writeOnly"></ev-switch>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="11" secondary bold>{{ $t('writeOnly') }}</ev-label>
        </div>

        <ev-popup-menu-divider></ev-popup-menu-divider>

        <div class="ev-json-schema-constraint-panel__item">
            <ev-label size="11" secondary bold>{{ $t('defaultValue') }} :</ev-label>

            <v-spacer></v-spacer>

            <div class="d-flex" style="width: 160px">
                <ev-basic-input v-model="constraint.defaultValue" placeholder="Default Value"></ev-basic-input>
            </div>
        </div>

        <div class="ev-json-schema-constraint-panel__item">
            <ev-label size="11" secondary bold>{{ $t('exampleValue') }} :</ev-label>

            <v-spacer></v-spacer>

            <div class="d-flex" style="width: 160px">
                <ev-basic-input v-model="constraint.exampleValue" placeholder="Example Value"></ev-basic-input>
            </div>
        </div>

        <ev-popup-menu-divider></ev-popup-menu-divider>

        <!-- String Constraint -->

        <div v-if="isStringType">
            <div class="ev-json-schema-constraint-panel__item">
                <ev-label size="11" secondary bold>{{ $t('minLength') }} :</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex">
                    <ev-basic-input v-model="constraint.minLength" placeholder="0"></ev-basic-input>
                </div>
            </div>

            <div class="ev-json-schema-constraint-panel__item">
                <ev-label size="11" secondary bold>{{ $t('maxLength') }} :</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex">
                    <ev-basic-input v-model="constraint.maxLength" placeholder="0"></ev-basic-input>
                </div>
            </div>

            <ev-popup-menu-divider></ev-popup-menu-divider>

            <div class="ev-json-schema-constraint-panel__item">
                <ev-label size="11" secondary bold>{{ $t('matches') }} :</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex" style="width: 160px">
                    <ev-basic-input v-model="constraint.match" placeholder="Regexp Expression"></ev-basic-input>
                </div>
            </div>
        </div>

        <!-- Number Constraint -->

        <div v-if="isNumberType">
            <div class="ev-json-schema-constraint-panel__item">
                <ev-label size="11" secondary bold>{{ $t('minimum') }} :</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex">
                    <ev-basic-input v-model="constraint.minimum" placeholder="0"></ev-basic-input>
                </div>
            </div>

            <div class="ev-json-schema-constraint-panel__item">
                <ev-label size="11" secondary bold>{{ $t('exclusiveMinimum') }} :</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex">
                    <ev-switch v-model="constraint.exclusiveMinimum"></ev-switch>
                </div>
            </div>

            <div class="ev-json-schema-constraint-panel__item">
                <ev-label size="11" secondary bold>{{ $t('maximum') }} :</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex">
                    <ev-basic-input v-model="constraint.maximum" placeholder="0"></ev-basic-input>
                </div>
            </div>

            <div class="ev-json-schema-constraint-panel__item">
                <ev-label size="11" secondary bold>{{ $t('exclusiveMaximum') }}</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex">
                    <ev-switch v-model="constraint.exclusiveMaximum"></ev-switch>
                </div>
            </div>

            <div class="ev-json-schema-constraint-panel__item">
                <ev-label size="11" secondary bold>{{ $t('multipleOf') }} :</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex">
                    <ev-basic-input v-model="constraint.multipleOf" placeholder="0"></ev-basic-input>
                </div>
            </div>
        </div>

        <!-- Array Constraint -->

        <div v-if="isArrayType">
            <div class="ev-json-schema-constraint-panel__item">
                <ev-label size="11" secondary bold>{{ $t('minItems') }} :</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex">
                    <ev-basic-input v-model="constraint.minItems" placeholder="0"></ev-basic-input>
                </div>
            </div>

            <div class="ev-json-schema-constraint-panel__item">
                <ev-label size="11" secondary bold>{{ $t('maxItems') }} :</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex">
                    <ev-basic-input v-model="constraint.maxItems" placeholder="0"></ev-basic-input>
                </div>
            </div>

            <div class="ev-json-schema-constraint-panel__item">
                <ev-label size="11" secondary bold>{{ $t('uniqueItems') }} :</ev-label>

                <v-spacer></v-spacer>

                <div class="d-flex">
                    <ev-switch v-model="constraint.uniqueItems"></ev-switch>
                </div>
            </div>
        </div>
    </div>
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
    import EvSwitch from '@/components/button/EvSwitch'

    export default {
        name: "EvJsonSchemaConstraintPanel",

        components: {
            EvSwitch,
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

            type: {
                type: String,
                default: 'string'
            },

            mode: {
                type: String,
                default: 'param'
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
            }
        },

        watch: {
            'constraint.readOnly'(newVal) {
                if (newVal && this.constraint.writeOnly) {
                    this.constraint.writeOnly = false
                }
            },
            'constraint.writeOnly'(newVal) {
                if (newVal && this.constraint.readOnly) {
                    this.constraint.readOnly = false
                }
            },
        },

        computed: {
            isParamMode() {
                return this.mode === 'param'
            },

            isSchemaMode() {
                return this.mode === 'schema'
            },

            isStringType() {
                return this.type === 'string'
            },

            isNumberType() {
                return this.type === 'number' || this.type === 'integer'
            },

            isArrayType() {
                return this.type === 'array'
            },
        },

        methods: {},

        i18n: {
            messages: {
                en: {
                    required: "Required",

                    deprecated: "Deprecated",

                    emptyValue: "Allow Empty Value",

                    nullable: "Nullable",

                    readOnly: "Read Only",

                    writeOnly: "Write Only",

                    minLength: "Min Length",

                    maxLength: "Max Length",

                    matches: "Pattern",

                    maximum: "Maximum",

                    exclusiveMaximum: "Exclude Maximum",

                    minimum: "Minimum",

                    exclusiveMinimum: "Exclude Minimum",

                    multipleOf: "Multiple Of",

                    minItems: "Min Items",

                    maxItems: "Max Items",

                    uniqueItems: "Unique Items",

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

                    deprecated: "是否废弃",

                    emptyValue: "允许空值",

                    nullable: "允许 NULL 值",

                    readOnly: "只读属性",

                    writeOnly: "只写属性",

                    minLength: "最小长度",

                    maxLength: "最大长度",

                    matches: "正则匹配",

                    maximum: "最大值",

                    exclusiveMaximum: "不包括最大值",

                    minimum: "最小值",

                    exclusiveMinimum: "不包括最小值",

                    multipleOf: "整数倍",

                    minItems: "最小长度",

                    maxItems: "最大长度",

                    uniqueItems: "不允许重复",

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

    .ev-json-schema-constraint-panel {
        display: flex;

        flex-direction: column;

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
