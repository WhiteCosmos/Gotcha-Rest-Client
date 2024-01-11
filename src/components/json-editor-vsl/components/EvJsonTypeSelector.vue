<template>
    <v-menu v-bind="selectorMenuConfig"
            :nudge-top="nudgeTop"
            v-model="showTypeSelectorMenu">
        <template v-slot:activator="{ on }">
            <div class="json-type-selector" v-on="on">
                <ev-data-type-object-icon v-if="isObjectNode"></ev-data-type-object-icon>

                <ev-data-type-array-icon v-if="isArrayNode"></ev-data-type-array-icon>

                <ev-data-type-boolean-icon v-if="isBooleanNode"></ev-data-type-boolean-icon>

                <ev-data-type-number-icon v-if="isNumberNode"></ev-data-type-number-icon>

                <ev-data-type-string-icon v-if="isStringNode"></ev-data-type-string-icon>

                <ev-data-type-null-icon v-if="isNullNode"></ev-data-type-null-icon>
            </div>
        </template>


        <div class="json-type-selector__menu">
            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

            <div class="json-type-selector__menu-item" @click="switchType(jsonTypes.object)">
                <ev-data-type-object-icon></ev-data-type-object-icon>

                <span class="json-type-selector__menu-font">Object</span>
            </div>

            <div class="json-type-selector__menu-item" @click="switchType(jsonTypes.array)">
                <ev-data-type-array-icon></ev-data-type-array-icon>

                <span class="json-type-selector__menu-font">Array</span>
            </div>

            <div class="d-flex flex-column" v-if="!isRootNode">
                <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

                <ev-horizon-divider></ev-horizon-divider>

                <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

                <div class="json-type-selector__menu-item" @click="switchType(jsonTypes.string)">
                    <ev-data-type-string-icon></ev-data-type-string-icon>

                    <span class="json-type-selector__menu-font">String</span>
                </div>

                <div class="json-type-selector__menu-item" @click="switchType(jsonTypes.number)">
                    <ev-data-type-number-icon></ev-data-type-number-icon>

                    <span class="json-type-selector__menu-font">Number</span>
                </div>

                <div class="json-type-selector__menu-item" @click="switchType(jsonTypes.boolean)">
                    <ev-data-type-boolean-icon></ev-data-type-boolean-icon>

                    <span class="json-type-selector__menu-font">Boolean</span>
                </div>

                <div class="json-type-selector__menu-item" @click="switchType(jsonTypes.null_)">
                    <ev-data-type-null-icon></ev-data-type-null-icon>

                    <span class="json-type-selector__menu-font">Null</span>
                </div>
            </div>

            <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>
        </div>
    </v-menu>
</template>

<script>
    import EvJsonObjectIcon from '@/components/json-editor-vsl/icons/ev-json-object-icon'
    import EvJsonBooleanIcon from '@/components/json-editor-vsl/icons/ev-json-boolean-icon'
    import EvJsonNumberIcon from '@/components/json-editor-vsl/icons/ev-json-number-icon'
    import EvJsonStringIcon from '@/components/json-editor-vsl/icons/ev-json-string-icon'
    import EvJsonArrayIcon from '@/components/json-editor-vsl/icons/ev-json-array-icon'
    import EvJsonNodeMixin from '@/components/json-editor-vsl/editors/EvJsonNodeMixin'
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
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvContextSubmenuItem from '@/components/menu/EvContextSubmenuItem'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'

    export default {
        name: "EvJsonTypeSelector",

        components: {
            EvPopupMenuDivider,
            EvContextMenuItem,
            EvContextSubmenuItem,
            EvVerticalGutter,
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
            EvJsonNodeMixin
        ],

        data() {
            return {
                showTypeSelectorMenu: false,

                selectorMenuConfig: {
                    'offset-y': true,

                    'close-on-content-click': true,

                    'allow-overflow': true,

                    'content-class': "my-menu",

                    'nudge-left': 11,

                    'transition': 'dummy'
                },

                offset: 7,

                nudgeTop: 0,
            }
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

                    if (this.isStringNode) {
                        this.nudgeTop = 28 * 3 + this.offset
                    }

                    if (this.isNumberNode) {
                        this.nudgeTop = 28 * 4 + this.offset
                    }

                    if (this.isBooleanNode) {
                        this.nudgeTop = 28 * 5 + this.offset
                    }

                    if (this.isNullNode) {
                        this.nudgeTop = 28 * 6 + this.offset
                    }
                }
            }
        },

        methods: {
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

                if (type === this.jsonTypes.string) {
                    this.transformToStringNode(this.node)
                }

                if (type === this.jsonTypes.number) {
                    this.transformToNumberNode(this.node)
                }

                if (type === this.jsonTypes.boolean) {
                    this.transformToBooleanNode(this.node)
                }

                if (type === this.jsonTypes.null_) {
                    this.transformToNullNode(this.node)
                }

                this.emitChangeJsonNodeType()
            }
        },

        i18n: {
            messages: {
                en: {
                    object: "Object",

                    array: "Array",

                    string: "String",

                    number: "Number",

                    boolean: "Boolean",

                    null: "Null"
                },
                zh: {
                    object: "对象",

                    array: "数组",

                    string: "文本",

                    number: "",

                    boolean: "",

                    null: ""
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .json-type-selector {
        @include full-center;

        width: 16px;

        height: 16px;
    }

    .json-type-selector__menu {
        //position: relative;

        display: flex;

        flex-direction: column;

        background-color: #FCFCFC;

        width: 96px;

        border-radius: 4px;

        overflow: auto;
    }

    .json-type-selector__menu-item {
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

    .json-type-selector__menu-item--next {
        height: 28px;

        display: flex;

        //align-items: center;

        padding-left: 4px;

        padding-right: 4px;
    }

    .my-menu {
        contain: initial;

        overflow: visible;

        align-self: center;
    }

    .json-type-selector__menu-font {
        font-size: 10px;

        color: $SECONDARY_FONT_COLOR;

        font-weight: bold;

        margin-left: 8px;

        user-select: none;
    }
</style>
