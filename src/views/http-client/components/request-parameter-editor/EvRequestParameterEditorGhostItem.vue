<template>
    <div class="ev-request-parameter-editor-ghost-item">
        <ev-vertical-gutter :gutter="22"></ev-vertical-gutter>

        <div class="ev-request-parameter-editor__name-column">
            <ev-label grey size="11" v-if="options.mode && options.mode === 'path'">{{ `# ${idx}` }}</ev-label>

            <ev-borderless-input v-else
                                 :placeholder="options.keyPlaceholder"
                                 v-model="ghostKey_"></ev-borderless-input>

            <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>
        </div>

        <div class="ev-request-parameter-editor__value-column">
            <ev-dynamic-variable-input :placeholder="options.valuePlaceholder"
                                       v-model="ghostValue_" :bulk-edit="false"></ev-dynamic-variable-input>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLabel from '@/components/typography/EvLabel'
    import DelayTrigger from '@/core/utils/DelayTrigger'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput'

    export default {
        name: "EvRequestParameterEditorGhostItem",

        components: {
            EvDynamicVariableInput,
            EvLabel,
            EvVerticalGutter,
            EvBorderlessInput,
        },

        mixins: [],

        props: {
            idx: Number,

            options: Object,
        },

        data() {
            return {
                ghostKey_: "",

                ghostValue_: "",

                triggered: false,
            }
        },

        watch: {
            ghostKey_() {
                if (this.triggered || _.isEmpty(this.ghostKey_)) {
                    return
                }

                this.triggered = true

                new DelayTrigger(100, () => {
                    this.$emit('ghost-key-input', this.ghostKey_.trim())

                    this.ghostKey_ = ""

                    this.triggered = false
                }).trigger()
            },

            ghostValue_() {
                if (this.triggered || _.isEmpty(this.ghostValue_)) {
                    return
                }

                if ((typeof this.ghostValue_) === 'string') {
                    this.ghostValue_ = this.ghostValue_.trim()
                }

                this.triggered = true

                new DelayTrigger(100, () => {
                    this.$emit('ghost-value-input', this.ghostValue_)

                    this.ghostValue_ = ""

                    this.triggered = false
                }).trigger()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvRequestParameterEditor";

    .ev-request-parameter-editor-ghost-item {
        display: flex;

        min-width: 1px;

        min-height: 1px;

        flex-shrink: 0;

        align-items: center;

        height: 28px;

        padding-left: 24px;

        padding-right: 8px;

        border-bottom: 1px solid #F1F1F1;
    }
</style>