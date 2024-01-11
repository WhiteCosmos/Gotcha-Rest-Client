<template>
    <div class="ev-multipart-form-editor-ghost-item">
        <div class="ev-multipart-form-editor__name-column">
            <ev-label blue size="10" v-if="options.indexMode">{{ `Index ${idx}` }}</ev-label>

            <ev-borderless-input v-else
                                 :placeholder="options.keyPlaceholder"
                                 v-model="ghostKey_"></ev-borderless-input>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <div class="ev-multipart-form-editor__value-column">
            <ev-dynamic-variable-input :placeholder="options.valuePlaceholder" v-model="ghostValue_" :bulk-edit="false"></ev-dynamic-variable-input>
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
        name: "EvMultipartFormEditorGhostItem",

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
                    this.$emit('ghost-key-input', this.ghostKey_)

                    this.ghostKey_ = ""

                    this.triggered = false
                }).trigger()
            },

            ghostValue_() {
                if (this.triggered || _.isEmpty(this.ghostValue_)) {
                    return
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
    @import "EvMultipartFormEditor";

    .ev-multipart-form-editor-ghost-item {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 46px;

        padding-right: 12px;

        border-bottom: 1px solid #F1F1F1;
    }
</style>