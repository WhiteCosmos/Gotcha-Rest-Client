<template>
    <div class="ev-radio" @click="toggle">
        <div class="ev-radio__dot">
            <div class="ev-radio__dot--selected" v-if="selected"></div>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <span class="ev-radio__text" :class="{'ev-radio__text--selected': selected}">{{ name }}</span>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvRadio",

        components: {
            EvVerticalGutter
        },

        model: {
            prop: 'model_',
            event: 'change',
        },

        props: {
            name: String,

            value: String,

            model_: String,
        },

        data() {
            return {}
        },

        computed: {
            selected() {
                return this.value === this.model_
            }
        },

        methods: {
            toggle() {
                this.$emit('change', this.value)
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-radio {
        height: 16px;

        display: flex;

        align-items: center;

        user-select: none;
    }

    .ev-radio__dot {
        width: 10px;

        height: 10px;

        border-radius: 10px;

        border: 1px solid #AABBCC;

        display: flex;

        align-items: center;

        justify-content: center;

        &--selected {
            width: 6px;

            height: 6px;

            border: 1px solid $PRIMARY_COLOR;

            background-color: $PRIMARY_COLOR;

            border-radius: 6px;
        }
    }

    .ev-radio__text {
        font-size: 11px;

        line-height: 13px;

        padding-top: 1px;

        text-align: center;

        color: $PRIMARY_FONT_COLOR;

        font-family: "SF Pro", sans-serif;

        //padding-bottom: 2px;

        font-weight: 500;

        //background-color: #FF8282;

        &--selected {
            font-size: 11px;

            //line-height: 12px;

            color: $PRIMARY_COLOR;
        }
    }
</style>
