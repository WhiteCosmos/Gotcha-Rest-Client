<template>
    <div class="ev-request-parameter-editor-ghost-item">
        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

        <div class="ev-request-parameter-description-editor__name-column">
            <ev-label grey size="11" v-if="options.mode === 'path'">{{ `# ${idx}` }}</ev-label>

            <ev-vertical-gutter :gutter="8" v-if="options.mode === 'path'"></ev-vertical-gutter>

            <div class="d-flex" style="flex: 1">
                <ev-borderless-input :placeholder="options.keyPlaceholder"
                                     v-model="ghostKey_"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-request-parameter-description-editor__optional-column">

        </div>

        <div class="ev-request-parameter-description-editor__value-column">
            <ev-borderless-input :placeholder="ghostValuePlaceholder" v-model="ghostValue_" :disabled="options.mode === 'path'"></ev-borderless-input>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLabel from '@/components/typography/EvLabel'
    import DelayTrigger from '@/core/utils/DelayTrigger'

    export default {
        name: "EvRequestParameterDescriptionEditorGhostItem",

        components: {
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

        computed: {
            ghostValuePlaceholder() {
                if (this.options.mode === 'path') {
                    return '-'
                } else {
                    return this.options.valuePlaceholder
                }
            },
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

                this.triggered = true

                new DelayTrigger(100, () => {
                    this.$emit('ghost-value-input', this.ghostValue_.trim())

                    this.ghostValue_ = ""

                    this.triggered = false
                }).trigger()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvRequestParameterDescriptionEditor";

    .ev-request-parameter-editor-ghost-item {
        position: relative;

        display: flex;

        align-items: center;

        height: 28px;

        padding-right: 4px;
    }
</style>