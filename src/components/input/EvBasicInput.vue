<template>
    <div class="ev-basic-input">
        <input type="text" v-model="value_" :placeholder="placeholder" spellcheck="false" @blur="emitBlur">
    </div>
</template>

<script>
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'

    export default {
        name: "EvBasicInput",

        mixins: [
            EvDataBindMixin
        ],

        props: {
            placeholder: String,
        },

        methods: {
            emitBlur() {
                this.$emit('blur')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-basic-input {
        display: flex;

        align-items: center;

        height: 20px;

        width: 100%;

        border: 1px solid #E0E0E0;

        border-radius: 2px;

        background-color: #FFF;

        padding-top: 1px;
    }

    input {
        width: 100%;

        text-indent: 2px;

        font-family: "SF Pro", sans-serif;

        font-weight: 500;

        font-size: 12px;

        color: $PRIMARY_FONT_COLOR;

        &::placeholder {
            font-size: 12px;

            color: $PLACEHOLDER_FONT_COLOR;
        }
    }
</style>
