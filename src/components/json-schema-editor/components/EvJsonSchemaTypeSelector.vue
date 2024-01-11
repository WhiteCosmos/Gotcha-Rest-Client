<template>
    <v-menu v-bind="selectorMenuConfig"
            :nudge-top="nudgeTop"
            :disabled="disabled"
            v-model="showTypeSelectorMenu">
        <template v-slot:activator="{ on, attrs }">
            <div class="ev-json-schema-type-selector" v-on="on" v-bind="attrs">
                <ev-data-type-object-icon v-if="isObjectNode" :color="typeColor"></ev-data-type-object-icon>

                <ev-data-type-array-icon v-if="isArrayNode" :color="typeColor"></ev-data-type-array-icon>

                <ev-data-type-map-icon v-if="isDictionaryNode" :color="typeColor"></ev-data-type-map-icon>

                <ev-data-type-object-icon v-if="isReferenceNode" :color="typeColor"></ev-data-type-object-icon>

                <ev-data-type-boolean-icon v-if="isBooleanNode" :color="typeColor"></ev-data-type-boolean-icon>

                <ev-data-type-number-icon v-if="isNumberNode" :color="typeColor"></ev-data-type-number-icon>

                <ev-data-type-integer-icon v-if="isIntegerNode" :color="typeColor"></ev-data-type-integer-icon>

                <ev-data-type-string-icon v-if="isStringNode" :color="typeColor"></ev-data-type-string-icon>

                <ev-data-type-file-icon v-if="isFileNode" :color="typeColor"></ev-data-type-file-icon>
            </div>
        </template>

        <div class="ev-json-schema-type-selector__menu">
            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

            <div class="ev-json-schema-type-selector__menu-item"
                 @click="switchType(jsonTypes.object)"
                 v-if="!checkIsExcludeType('object')">
                <ev-data-type-object-icon></ev-data-type-object-icon>

                <span class="ev-json-schema-type-selector__menu-font">Object</span>
            </div>

            <div class="ev-json-schema-type-selector__menu-item"
                 @click="switchType(jsonTypes.array)"
                 v-if="!checkIsExcludeType('array')">
                <ev-data-type-array-icon></ev-data-type-array-icon>

                <span class="ev-json-schema-type-selector__menu-font">Array</span>
            </div>

            <div class="ev-json-schema-type-selector__menu-item"
                 @click="switchType(jsonTypes.dictionary)"
                 v-if="!checkIsExcludeType('dictionary')">
                <ev-data-type-map-icon></ev-data-type-map-icon>

                <span class="ev-json-schema-type-selector__menu-font">Dictionary</span>
            </div>

            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

            <ev-horizon-divider v-if="!checkIsExcludeType('schema')"></ev-horizon-divider>

            <ev-horizon-gutter :gutter="4" v-if="!checkIsExcludeType('schema')"></ev-horizon-gutter>

            <div style="padding-left: 4px; padding-right: 4px"
                 v-if="!checkIsExcludeType('schema')">
                <ev-context-submenu-item>{{ $t('schemaLabel') }}
                    <template v-slot:items>
                        <div v-for="group in jsonSchemaGroups">
                            <ev-popup-menu-divider :label="group.name"></ev-popup-menu-divider>

                            <ev-context-menu-item v-for="item in group.items"
                                                  @click.native="switchToReferenceType(item)">{{ item.name }}
                            </ev-context-menu-item>
                        </div>
                    </template>
                </ev-context-submenu-item>
            </div>

            <div class="d-flex flex-column">
                <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

                <ev-horizon-divider></ev-horizon-divider>

                <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

                <div class="ev-json-schema-type-selector__menu-item" @click="switchType(jsonTypes.string)">
                    <ev-data-type-string-icon></ev-data-type-string-icon>

                    <span class="ev-json-schema-type-selector__menu-font">String</span>
                </div>

                <div class="ev-json-schema-type-selector__menu-item" @click="switchType(jsonTypes.integer)">
                    <ev-data-type-integer-icon></ev-data-type-integer-icon>

                    <span class="ev-json-schema-type-selector__menu-font">Integer</span>
                </div>

                <div class="ev-json-schema-type-selector__menu-item" @click="switchType(jsonTypes.number)">
                    <ev-data-type-number-icon></ev-data-type-number-icon>

                    <span class="ev-json-schema-type-selector__menu-font">Number</span>
                </div>

                <div class="ev-json-schema-type-selector__menu-item" @click="switchType(jsonTypes.boolean)">
                    <ev-data-type-boolean-icon></ev-data-type-boolean-icon>

                    <span class="ev-json-schema-type-selector__menu-font">Boolean</span>
                </div>

                <div class="ev-json-schema-type-selector__menu-item" @click="switchType(jsonTypes.file)">
                    <ev-data-type-file-icon></ev-data-type-file-icon>

                    <span class="ev-json-schema-type-selector__menu-font">File</span>
                </div>

                <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

                <div style="padding-left: 4px; padding-right: 4px">
                    <ev-popup-menu-divider :label="formatLabel"></ev-popup-menu-divider>
                </div>

                <ev-horizon-gutter :gutter="6"></ev-horizon-gutter>

                <div style="padding-left: 4px; padding-right: 4px">
                    <ev-context-submenu-item>{{ format }}
                        <template v-slot:items>
                            <div v-for="(items, idx) in formats">
                                <ev-popup-menu-divider v-if="idx !== 0"></ev-popup-menu-divider>

                                <ev-context-menu-item v-for="item in items"
                                                      @click.native="switchToFormat(item)">{{ capitalize(item) }}
                                </ev-context-menu-item>
                            </div>
                        </template>
                    </ev-context-submenu-item>
                </div>
            </div>

            <ev-horizon-gutter :gutter="6"></ev-horizon-gutter>
        </div>
    </v-menu>
</template>

<script>
    import EvJsonObjectIcon from '@/components/json-editor-vsl/icons/ev-json-object-icon'
    import EvJsonBooleanIcon from '@/components/json-editor-vsl/icons/ev-json-boolean-icon'
    import EvJsonNumberIcon from '@/components/json-editor-vsl/icons/ev-json-number-icon'
    import EvJsonStringIcon from '@/components/json-editor-vsl/icons/ev-json-string-icon'
    import EvJsonArrayIcon from '@/components/json-editor-vsl/icons/ev-json-array-icon'
    import EvMenuTopIndicator from '@/components/json-editor-vsl/icons/ev-menu-top-indicator'
    import EvJsonNullIcon from '@/components/json-editor-vsl/icons/ev-json-null-icon'
    import EvRoundArrowIcon from '@/components/json-editor-vsl/icons/ev-round-arrow-icon'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvDataTypeNullIcon from '@/assets/icons/EvDataTypeNullIcon'
    import EvDataTypeObjectIcon from '@/assets/icons/EvDataTypeObjectIcon'
    import EvDataTypeArrayIcon from '@/assets/icons/EvDataTypeArrayIcon'
    import EvDataTypeBooleanIcon from '@/assets/icons/EvDataTypeBooleanIcon'
    import EvDataTypeNumberIcon from '@/assets/icons/EvDataTypeNumberIcon'
    import EvDataTypeStringIcon from '@/assets/icons/EvDataTypeStringIcon'
    import EvJsonSchemaNodeMixin from '@/components/json-schema-editor/mixins/EvJsonSchemaNodeMixin'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import AppCache from '@/AppCache'
    import EvContextSubmenuItem from '@/components/menu/EvContextSubmenuItem'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import GHCJsonSchemaNodeType from '@/components/json-schema-editor/GHCJsonSchemaNodeType'
    import EvDataTypeIntegerIcon from '@/assets/icons/EvDataTypeIntegerIcon'
    import EvDataTypeMapIcon from '@/assets/icons/EvDataTypeMapIcon'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import {EvHttpClientRequestDocsEventBus, EvHttpClientRequestDocsEvents} from '@/views/http-client/request/EvHttpClientRequestDocsEventBus'
    import EvDataTypeFileIcon from '@/assets/icons/EvDataTypeFileIcon'

    export default {
        name: "EvJsonSchemaTypeSelector",

        components: {
            EvDataTypeFileIcon,
            EvDataTypeMapIcon,
            EvDataTypeIntegerIcon,
            EvContextMenuItem,
            EvContextSubmenuItem,
            EvPopupMenuDivider,
            EvDataTypeStringIcon,
            EvDataTypeNumberIcon,
            EvDataTypeBooleanIcon,
            EvDataTypeArrayIcon,
            EvDataTypeObjectIcon,
            EvDataTypeNullIcon,
            EvMenuTopIndicator,
            EvHorizonGutter,
            EvRoundArrowIcon,
            EvJsonNullIcon,
            EvHorizonDivider,
            EvJsonArrayIcon,
            EvJsonStringIcon,
            EvJsonNumberIcon,
            EvJsonBooleanIcon,
            EvJsonObjectIcon
        },

        mixins: [
            EvJsonSchemaNodeMixin,
            EvStoreMixin,
        ],

        created() {
            EvHttpClientRequestDocsEventBus.$on(EvHttpClientRequestDocsEvents.SCROLL, this.handleEvHttpClientRequestDocsScroll)
        },

        beforeDestroy() {
            EvHttpClientRequestDocsEventBus.$off(EvHttpClientRequestDocsEvents.SCROLL, this.handleEvHttpClientRequestDocsScroll)
        },

        props: {
            excludeTypes: Array,

            disabled: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                showTypeSelectorMenu: false,

                selectorMenuConfig: {
                    'offset-y': true,

                    'close-on-content-click': true,

                    'allow-overflow': true,

                    'nudge-left': 5,
                },

                offset: 12,

                nudgeTop: 0,
            }
        },

        computed: {
            typeColor() {
                return this.disabled ? '#999' : '#333'
            },

            formats() {
                return [
                    [
                        'none',
                    ],
                    [
                        'int32',
                        'int64',
                        'float',
                        'double',
                    ],
                    [
                        'byte',
                        'binary',
                    ],
                    [
                        'date',
                        'date-time',
                        'password',
                        'email',
                        'uuid',
                    ]
                ]
            },

            format() {
                if (this.node.format) {
                    return _.capitalize(this.node.format)
                } else {
                    return this.$t('selectLabel')
                }
            },

            formatLabel() {
                return this.$t('formatLabel')
            },
        },

        watch: {
            showTypeSelectorMenu(newVal) {
                if (newVal) {
                    if (this.isObjectNode) {
                        this.nudgeTop = 28 - 2 // ???
                    }

                    if (this.isArrayNode) {
                        this.nudgeTop = 28 * 2 - 2 // ???
                    }

                    if (this.isDictionaryNode) {
                        this.nudgeTop = 28 * 3 - 2 // ???
                    }

                    if (this.isReferenceNode) {
                        this.nudgeTop = 28 * 4 - 2 // ???
                    }

                    if (this.isStringNode) {
                        this.nudgeTop = 28 * 5 + this.offset
                    }

                    if (this.isNumberNode) {
                        this.nudgeTop = 28 * 6 + this.offset
                    }

                    if (this.isIntegerNode) {
                        this.nudgeTop = 28 * 7 + this.offset
                    }

                    if (this.isBooleanNode) {
                        this.nudgeTop = 28 * 8 + this.offset
                    }

                    if (this.isNullNode) {
                        this.nudgeTop = 28 * 8 + this.offset
                    }
                }
            }
        },

        methods: {
            checkIsExcludeType(type) {
                if (!this.excludeTypes) {
                    return false
                }

                return this.excludeTypes.includes(type)
            },

            switchType(type) {
                if (this.node.type === type) {
                    return
                }

                if (type === this.jsonTypes.object) {
                    this.transformToObjectNode(this.node)
                }

                if (type === this.jsonTypes.array) {
                    this.transformToArrayNode(this.node)
                }

                if (type === this.jsonTypes.dictionary) {
                    this.transformToDictionaryNode(this.node)
                }

                if (type === this.jsonTypes.string) {
                    this.transformToStringNode(this.node)
                }

                if (type === this.jsonTypes.file) {
                    this.transformToFileNode(this.node)
                }

                if (type === this.jsonTypes.number) {
                    this.transformToNumberNode(this.node)
                }

                if (type === this.jsonTypes.integer) {
                    this.transformToNumberNode(this.node, 'integer')
                }

                if (type === this.jsonTypes.boolean) {
                    this.transformToBooleanNode(this.node)
                }

                if (type === this.jsonTypes.null_) {
                    this.transformToNullNode(this.node)
                }

                this.emitChangeJsonNodeType(this.node)
            },

            switchToReferenceType(ref) {
                this.showTypeSelectorMenu = false

                this.node.isContainer = true

                this.node.isRecursive = false

                this.node.expand = true

                this.node.type = GHCJsonSchemaNodeType.REFERENCE

                this.node.$ref = ref.uid

                this.node.children = []

                this.emitChangeJsonNodeType(this.node)
            },

            switchToFormat(format) {
                if (format === 'none') {
                    this.node.format = ''
                } else {
                    this.node.format = format
                }
            },

            capitalize(value) {
                return _.capitalize(value)
            },

            handleEvHttpClientRequestDocsScroll(event, delta) {
                if (this.showTypeSelectorMenu) {
                    this.nudgeTop += delta
                } else {
                    this.nudgeTop = 0
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    format: "Format",

                    selectLabel: "Select",

                    schemaLabel: "Schema",

                    formatLabel: "Format"
                },
                zh: {
                    format: "数据格式",

                    selectLabel: "请选择",

                    schemaLabel: "数据模型",

                    formatLabel: "数据格式"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-json-schema-type-selector {
        @include full-center;

        width: 28px;

        height: 16px;
    }

    .ev-json-schema-type-selector__menu {
        position: relative;

        display: flex;

        flex-direction: column;

        background-color: #FCFCFC;

        width: 96px;

        border-radius: 4px;

        overflow: auto;
    }

    .ev-json-schema-type-selector__menu-item {
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

    .my-menu {
        contain: initial;

        overflow: visible;

        align-self: center;
    }

    .ev-json-schema-type-selector__menu-font {
        font-size: 10px;

        color: $SECONDARY_FONT_COLOR;

        font-weight: bold;

        margin-left: 8px;

        user-select: none;
    }
</style>
