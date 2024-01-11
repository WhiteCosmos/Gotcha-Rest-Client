<template>
    <div class="ev-request-template-item"
         @contextmenu="emitShowContextMenu($event, template)"
         :class="requestTemplateClasses">
        <ev-editable-label ref="ev-editable-label"
                           size="12" primary medium v-model="template.name"></ev-editable-label>

        <v-spacer></v-spacer>

        <div class="ev-icon-wrapper" @click.stop>
            <ev-json-remove-button @remove="emitRemoveTemplate"></ev-json-remove-button>
        </div>
    </div>
</template>

<script>
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon.vue'
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvEditIcon from '@/components/icon/ev-edit-icon.vue'
    import EvRemoveIcon from '@/components/icon/ev-remove-icon.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvCopyIcon from '@/components/icon/ev-copy-icon.vue'
    import EvEditableLabel from '@/components/input/EvEditableLabel.vue'
    import EvJsonRemoveButton from '@/components/json-editor-vsl/components/EvJsonRemoveButton.vue'

    export default {
        name: "EvRequestTemplateItem",

        components: {
            EvJsonRemoveButton,
            EvEditableLabel,
            EvCopyIcon,
            EvVerticalGutter,
            EvRemoveIcon,
            EvEditIcon,
            EvLabel,
            EvDragIcon
        },

        props: {
            template: Object,

            selectedTemplate: Object,
        },

        computed: {
            requestTemplateClasses() {
                if (this.selectedTemplate && this.selectedTemplate === this.template) {
                    return ['ev-request-template-item--selected']
                }
            },
        },

        methods: {
            emitRemoveTemplate() {
                this.$emit('remove-template', this.template)
            },

            emitShowContextMenu(event, template) {
                this.$emit('show-context-menu', event, template)
            },

            rename() {
                this.$refs['ev-editable-label'].enableEditing()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-request-template-item {
        display: flex;

        align-items: center;

        height: 32px;

        padding-left: 12px;

        padding-right: 8px;

        background-color: #FAFAFA;

        &--selected {
            background-color: #F1F1F1;
        }
    }

    .ev-icon-wrapper {
        @include full-center;

        width: 14px;

        height: 28px;
    }
</style>
