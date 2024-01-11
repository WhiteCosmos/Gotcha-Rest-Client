<template>
    <div class="ev-json-schema-editor-header">
        <div class="ev-json-schema-editor__json-node__key">
            <div class="ev-json-schema-editor__json-node__widget" @click="doToggleExpandAll">
                <ev-expand-all-icon v-if="expand_"></ev-expand-all-icon>

                <ev-collapse-all-icon v-else></ev-collapse-all-icon>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="11" secondary bold>{{ $t('keyOrIndex') }}</ev-label>

            <v-spacer></v-spacer>
        </div>

        <div class="ev-json-schema-editor__json-node__type">
            <ev-label size="11" secondary bold>{{ $t('type') }}</ev-label>
        </div>

        <div class="ev-json-schema-editor__json-node__value">
            <ev-label size="11" secondary bold>{{ $t('value') }}</ev-label>

            <v-spacer></v-spacer>

            <div class="ev-json-schema-editor-header__label-container" v-if="isCopingOrMoving">
                <span class="ev-json-schema-editor-header__label">{{ message }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvJsonEditorVsl from '@/components/json-editor-vsl/EvJsonEditor'
    import EvExpandAllIcon from '@/components/json-editor-vsl/icons/ev-expand-all-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCollapseAllIcon from '@/components/json-editor-vsl/icons/ev-collapse-all-icon'

    import _ from 'lodash'

    export default {
        name: "EvJsonSchemaEditorHeader",

        components: {
            EvCollapseAllIcon,
            EvVerticalGutter,
            EvExpandAllIcon,
            EvJsonEditorVsl,
            EvLabel
        },

        created() {
            this.expand_ = this.expand
        },

        props: {
            copiedNode: Object,

            copiedNodes: Array,

            movedNode: Object,

            movedNodes: Array,

            expand: Boolean
        },

        data() {
            return {
                expand_: false,
            }
        },

        i18n: {
            messages: {
                en: {
                    keyOrIndex: "Key",

                    type: "Type",

                    value: "Description",
                },
                zh: {
                    keyOrIndex: "字段名",

                    type: "类型",

                    value: "描述",
                }
            }
        },

        computed: {
            isCopingOrMoving() {
                return this.copiedNode || this.movedNode || !_.isEmpty(this.copiedNodes) || !_.isEmpty(this.movedNodes)
            },

            message() {
                if (this.movedNode) {
                    return "Moving 1 Json Node"
                }

                if (!_.isEmpty(this.movedNodes)) {
                    return `Moving ${this.movedNodes.length} Json Nodes`
                }

                if (this.copiedNode) {
                    return "Copying 1 Json Node"
                }

                if (!_.isEmpty(this.copiedNodes)) {
                    return `Copying ${this.copiedNodes.length} Json Nodes`
                }
            }
        },

        methods: {
            doToggleExpandAll() {
                this.expand_ = !this.expand_

                this.$emit('toggle-expand-all', this.expand_)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./EvJsonSchemaEditor";

    .ev-json-schema-editor-header {
        display: flex;

        height: 28px;

        align-items: center;

        border-bottom: 1px solid #EAEAEA;

        user-select: none;

        padding-left: 16px;

        padding-right: 4px;

        &__label-container {
            display: flex;

            align-items: center;

            height: 16px;

            width: fit-content;

            padding-left: 8px;

            padding-right: 8px;

            background-color: $YELLOW_COLOR;

            border-radius: 3px;
        }

        &__label {
            padding-top: 1px;

            font-size: 10px;

            font-weight: 500;
        }
    }
</style>
