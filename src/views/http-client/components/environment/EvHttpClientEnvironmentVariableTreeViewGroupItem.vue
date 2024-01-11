<template>
    <div class="ev-http-client-environment-variable-tree-view-group-item"
         @contextmenu="emitShowContextMenu($event)"
         v-if="variable.match">
        <ev-editable-label
            ref="ev-editable-label"
            size="11" primary medium v-model="variable.name"></ev-editable-label>

        <v-spacer></v-spacer>

        <div class="d-flex align-center justify-center" style="height: 16px; width: 20px">
            <ev-json-remove-button @remove="emitRemoveVariable"></ev-json-remove-button>
        </div>
    </div>
</template>

<script>
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon'
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvJsonRemoveButton from '@/components/json-editor-vsl/components/EvJsonRemoveButton'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import {
        EvHttpClientEnvironmentManagerEventBus,
        EvHttpClientEnvironmentManagerEvents
    } from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentManagerEventBus'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'

    export default {
        name: "EvHttpClientEnvironmentVariableTreeViewGroupItem",

        components: {
            EvBorderlessInput,
            EvEditableLabel,
            EvJsonAddButton,
            EvJsonRemoveButton,
            EvVerticalGutter,
            EvLabel,
            EvDragIcon
        },

        props: {
            group: Object,

            variable: Object,
        },

        methods: {
            emitRemoveVariable() {
                EvHttpClientEnvironmentManagerEventBus.$emit(EvHttpClientEnvironmentManagerEvents.REMOVE_VARIABLE, this.group, this.variable)
            },

            emitShowContextMenu(event) {
                this.$emit('show-context-menu', event, this.variable)
            },

            rename() {
                this.$refs['ev-editable-label'].enableEditing()
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-environment-variable-tree-view-group-item {
        display: flex;

        align-items: center;

        width: 100%;

        height: 32px;

        padding-left: 24px;

        background-color: #FAFAFA;

        border-radius: 5px;
    }
</style>
