<template>
    <div class="ev-json-schema-properties-panel">
        <div class="ev-json-schema-properties-panel__item">
            <div class="d-flex align-center" style="width: 160px; margin-right: 8px">
                <ev-basic-input v-model='enumsStr' placeholder="ONE,TWO,THREE"></ev-basic-input>
            </div>

            <ev-label size="11" bold secondary @click.native="doImportEnums">导入</ev-label>

            <v-spacer></v-spacer>

            <ev-json-add-button @click.native="doAddItem"></ev-json-add-button>
        </div>

        <div class="ev-scroll-wrapper">
            <draggable v-model="constraint.enums"
                       handle=".dv-enumeration-menu__drag"
                       animation="200">
                <div class="dv-enumeration-menu__item" v-for="(item, idx) in constraint.enums">
                    <ev-drag-icon color="#999" class="dv-enumeration-menu__drag"></ev-drag-icon>

                    <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                    <ev-editable-label v-model="item.value" :size="11" secondary bold :ref="`ev-editable-label-${idx}`"></ev-editable-label>

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
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvBasicInput from '@/components/input/EvBasicInput'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvEditIcon from '@/components/icon/ev-edit-icon'
    import EvRemoveIcon from '@/components/icon/ev-remove-icon'
    import GHCDynamicVariableEnumerationItem from '@/components/dynamic-variable/enumeration/GHCDynamicVariableEnumerationItem'

    import draggable from 'vuedraggable'

    export default {
        name: "EvJsonSchemaEnumsPanel",

        components: {
            EvRemoveIcon,
            EvEditIcon,
            EvVerticalGutter,
            EvDragIcon,
            EvEditableLabel,
            EvJsonAddButton,
            EvBasicInput,
            EvLabel,
            draggable
        },

        props: {
            constraint: Object
        },

        data() {
            return {
                enumsStr: ''
            }
        },

        computed: {
            items() {
                return this.constraint.enums
            },
        },

        methods: {
            doAddItem() {
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
                if (!this.enumsStr) {
                    return
                }

                let splits = this.enumsStr.split(',')

                splits.forEach(split => {
                    if (!split) {
                        return
                    }

                    split = split.trim()

                    let item = new GHCDynamicVariableEnumerationItem()

                    item.value = split

                    this.items.push(item)
                })

                this.enumsStr = ''
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvJsonSchemaProperties";

    .ev-json-schema-properties-panel {
        &__placeholder {
            @include full-center;

            width: 100%;

            height: 28px;

            border: 1px dashed #CCC;

            border-radius: 2px;
        }

        &__item {
            display: flex;

            align-items: center;

            height: 27px; // center 27 + 1 = 28

            width: 100%;

            border-bottom: 1px solid #E0E0E0;

            padding-left: 4px;

            padding-right: 4px;
        }
    }

    .dv-enumeration-menu {
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

            height: 28px;

            padding-left: 4px;

            padding-right: 5px;
        }
    }

    .ev-scroll-wrapper {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        height: 232px;

        overflow-y: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
