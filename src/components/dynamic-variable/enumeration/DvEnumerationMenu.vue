<template>
    <div class="dv-enumeration-menu">
        <dv-enumeration-menu-title :label="$t('enums')" @add-item="handleAddItem"></dv-enumeration-menu-title>

        <div class="dv-enumeration-menu__placeholder" v-if="isEmpty">
            <ev-label size="11" medium grey>{{ $t('empty') }}</ev-label>
        </div>

        <draggable v-else
                   v-model="items_"
                   handle=".dv-enumeration-menu__drag"
                   animation="200">
            <div class="dv-enumeration-menu__item" v-for="(item, idx) in items_" @click="doSelectItem(item)">
                <ev-editable-label v-model="item.value" :size="11" secondary medium :ref="`ev-editable-label-${idx}`"></ev-editable-label>

                <v-spacer></v-spacer>

                <div class="dv-enumeration-menu__options">
                    <div class="dv-enumeration-menu__icon" @click.stop="doEditItem(item)">
                        <ev-edit-icon></ev-edit-icon>
                    </div>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <div class="dv-enumeration-menu__icon" @click.stop="doRemoveItem(item)">
                        <ev-remove-icon></ev-remove-icon>
                    </div>
                </div>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-drag-icon color="#999" class="dv-enumeration-menu__drag"></ev-drag-icon>
            </div>
        </draggable>

        <div class="dv-enumeration-menu__importer">
            <input type="text" placeholder="ONE,TWO,THREE" class="dv-enumeration-menu__importer__input" v-model="enums">

            <ev-label size="11" secondary bold @click.native="doImportEnums">{{ $t('import') }}</ev-label>
        </div>
    </div>
</template>
<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon'
    import DvEnumerationMenuTitle from '@/components/dynamic-variable/enumeration/DvEnumerationMenuTitle'
    import DvEnumerationMixin from '@/components/dynamic-variable/enumeration/DvEnumerationMixin'
    import GHCDynamicVariableEnumerationItem from '@/components/dynamic-variable/enumeration/GHCDynamicVariableEnumerationItem'
    import draggable from 'vuedraggable'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvEditIcon from '@/components/icon/ev-edit-icon'
    import EvRemoveIcon from '@/components/icon/ev-remove-icon'

    export default {
        name: "DvEnumerationMenu",

        components: {
            EvRemoveIcon,
            EvEditIcon,
            EvVerticalGutter,
            EvEditableLabel,
            DvEnumerationMenuTitle,
            EvDragIcon,
            EvLabel,
            draggable
        },

        mixins: [
            DvEnumerationMixin,
        ],

        created() {
            this.items_ = this.items
        },

        model: {
            prop: "items",
            event: "update"
        },

        props: {
            items: Array,
        },

        data() {
            return {
                items_: [],

                enums: '',
            }
        },

        watch: {
            items() {
                this.items_ = this.items
            },
        },

        computed: {
            isEmpty() {
                return !this.items || this.items.length === 0
            },
        },

        methods: {
            doSelectItem(item) {
                this.$emit('select-item', item)
            },

            handleAddItem() {
                let item = new GHCDynamicVariableEnumerationItem()

                item.value = `ENUM_${this.items.length + 1}`

                this.items.push(item)

                this.$nextTick(() => {
                    this.doEditItem(item)
                })
            },

            doEditItem(item) {
                let idx = this.items.indexOf(item)

                let name = `ev-editable-label-${idx}`

                let ref = this.$refs[name][0]

                ref.enableEditing()
            },

            doRemoveItem(item) {
                this.items.splice(this.items.indexOf(item), 1)
            },

            doImportEnums() {
                if (!this.enums) {
                    return
                }

                let splits = this.enums.split(',')

                splits.forEach(split => {
                    if (!split) {
                        return
                    }

                    split = split.trim()

                    let item = new GHCDynamicVariableEnumerationItem()

                    item.value = split

                    this.items.push(item)
                })

                this.enums = ''
            },
        },

        i18n: {
            messages: {
                en: {
                    enums: "Enums",

                    empty: "No Enum",

                    import: "Import"
                },
                zh: {
                    enums: "全部枚举",

                    empty: "空",

                    import: "导入"
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .dv-enumeration-menu {
        display: flex;

        flex-direction: column;

        max-height: 320px;

        min-height: 1px;

        min-width: 1px;

        background-color: #F1F1F1;

        border: 1px solid #D8D8D8;

        border-radius: 5px;

        overflow-y: auto;

        &__placeholder {
            @include full-center;

            height: 32px;
        }

        &__icon {
            @include full-center;

            width: 14px;

            height: 14px;
        }

        &__options {
            display: flex;
        }

        &__item {
            display: flex;

            flex-shrink: 0;

            align-items: center;

            height: 24px;

            padding-left: 4px;

            padding-right: 5px;

            &:hover {
                background-color: #e0e0e0;
            }
        }

        &__importer {
            display: flex;

            align-items: center;

            justify-content: space-between;

            height: 28px;

            border-top: 1px solid #E0E0E0;

            padding-left: 4px;

            padding-right: 4px;

            &__input {
                border: 1px solid #E0E0E0;

                border-radius: 3px;

                width: 80%;

                outline: none;

                font-size: 10px;

                color: $PRIMARY_FONT_COLOR;

                background-color: white;
            }
        }
    }
</style>
