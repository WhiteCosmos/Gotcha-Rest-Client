<template>
    <v-menu v-bind="config" v-model="show" :disabled="readOnly">
        <template v-slot:activator="{ on }">
            <div class="ev-key-value-condition-selector" :class="selectorStyle" v-on="on">
                <ev-label size="12" medium color="#555"> {{ item.condition }}</ev-label>
            </div>
        </template>

        <ev-context-menu v-if="isJsonPathMode">
            <ev-horizon-gutter :gutter="2"></ev-horizon-gutter>

            <ev-popup-menu-divider label="String"></ev-popup-menu-divider>

            <ev-context-menu-item @click.native="switchCondition('==')">{{ $t('equals') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="switchCondition('~=')">{{ $t('match') }}</ev-context-menu-item>

            <ev-popup-menu-divider label="Number"></ev-popup-menu-divider>

            <ev-context-menu-item @click.native="switchCondition('>')">{{ $t('greater') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="switchCondition('<')">{{ $t('less') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="switchCondition('≥')">{{ $t('greaterOrEquals') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="switchCondition('≤')">{{ $t('lessOrEquals') }}</ev-context-menu-item>

            <ev-popup-menu-divider label="Boolean"></ev-popup-menu-divider>

            <ev-context-menu-item @click.native="switchCondition('T')">True</ev-context-menu-item>

            <ev-context-menu-item @click.native="switchCondition('F')">False</ev-context-menu-item>

            <ev-popup-menu-divider label="Null"></ev-popup-menu-divider>

            <ev-context-menu-item @click.native="switchCondition('--')">Null</ev-context-menu-item>
        </ev-context-menu>

        <ev-context-menu v-else>
            <ev-context-menu-item @click.native="switchCondition('==')">{{ $t('equals') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="switchCondition('~=')">{{ $t('match') }}</ev-context-menu-item>
        </ev-context-menu>
    </v-menu>
</template>

<script>
    import EvMenuTopIndicator from '@/components/json-editor-vsl/icons/ev-menu-top-indicator'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvRoundArrowIcon from '@/components/json-editor-vsl/icons/ev-round-arrow-icon'
    import EvJsonNullIcon from '@/components/json-editor-vsl/icons/ev-json-null-icon'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvJsonArrayIcon from '@/components/json-editor-vsl/icons/ev-json-array-icon'
    import EvJsonStringIcon from '@/components/json-editor-vsl/icons/ev-json-string-icon'
    import EvJsonNumberIcon from '@/components/json-editor-vsl/icons/ev-json-number-icon'
    import EvJsonBooleanIcon from '@/components/json-editor-vsl/icons/ev-json-boolean-icon'
    import EvJsonObjectIcon from '@/components/json-editor-vsl/icons/ev-json-object-icon'
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'

    export default {
        name: "EvKeyValueConditionSelector",

        components: {
            EvPopupMenuDivider,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
            EvVerticalGutter,
            EvLabel,
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

        props: {
            item: Object,

            options: Object,

            readOnly: false,
        },

        data() {
            return {
                show: false,

                config: {
                    'offset-y': true,

                    'close-on-content-click': true,

                    'transition': 'dummy',
                },
            }
        },

        computed: {
            isJsonPathMode() {
                return this.options.mode === 'JSON_PATH'
            },

            selectorStyle() {
                return {
                    'ev-key-value-condition-selector--read-only': this.readOnly
                }
            },
        },

        methods: {
            switchCondition(symbol) {
                this.item.condition = symbol
            },

            checkItemType(type) {
                return this.item.type === type
            },
        },

        i18n: {
            messages: {
                en: {
                    string: "String",

                    number: "",

                    boolean: "",

                    null: "",

                    equals: "Equals",

                    match: "Match",

                    greater: "Greater than",

                    less: "Less than",

                    greaterOrEquals: "Greater or Equals",

                    lessOrEquals: "Less or Equals",
                },
                zh: {
                    string: "",

                    number: "",

                    boolean: "",

                    null: "",

                    equals: "等于",

                    match: "正则匹配",

                    greater: "大于",

                    less: "小于",

                    greaterOrEquals: "大于等于",

                    lessOrEquals: "小于等于",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-key-value-condition-selector {
        display: flex;

        align-items: center;

        justify-content: center;

        flex-shrink: 0;

        padding-bottom: 2px;

        height: 14px;

        width: 20px;

        border-radius: 2px;

        border: 1px solid $SECONDARY_FONT_COLOR;
    }
</style>
