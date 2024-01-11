<template>
    <div class="dv-inline-script-editor">
        <div class="dv-inline-script-editor__navigator">
            <ev-circle-close-button @click.native="emitClose" style="position: absolute; left: 12px"></ev-circle-close-button>

            <ev-label size="11" secondary bold>{{ $t('title') }}</ev-label>
        </div>

        <div class="dv-inline-script-editor__content" v-if="render">
            <ev-codemirror-wrapper v-model="script" mode="json"></ev-codemirror-wrapper>
        </div>
    </div>
</template>

<script>
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import EvLabel from '@/components/typography/EvLabel'
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'

    export default {
        name: "DvInlineScriptEditor",

        components: {
            EvCodemirrorWrapper,
            EvLabel,
            EvCircleCloseButton
        },

        created() {
            this.script = this.payload.script
        },

        mounted() {
            this.$nextTick(() => {
                this.render = true
            })
        },

        props: {
            payload: Object
        },

        watch: {
            'payload.script'(newVal) {
                this.script = newVal
            },
        },

        data() {
            return {
                script: "",

                render: false,
            }
        },

        methods: {
            emitClose() {
                this.$emit('close', this.script)
            },
        },

        i18n: {
            messages: {
                en: {
                    title: "Script Editor"
                },
                zh: {
                    title: "编辑脚本"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .dv-inline-script-editor {
        display: flex;

        flex-direction: column;

        overflow: hidden;

        background-color: #FCFCFC;

        width: 720px;

        height: 640px;

        user-select: none;

        &__navigator {
            position: relative;

            display: flex;

            align-items: center;

            justify-content: center;

            width: 100%;

            height: 40px;

            border-bottom: 1px solid $MODAL_DIVIDER_COLOR;

            background-color: $MODAL_TITLE_COLOR;
        }

        &__content {
            display: flex;

            width: 100%;

            height: 600px;
        }
    }
</style>
