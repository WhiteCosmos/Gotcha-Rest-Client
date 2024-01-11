<template>
    <div class="subtitle-1 d-flex align-center">
        <span class="subtitle-font"><slot></slot></span>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

<!--        <span class="response-code">200 OK</span>-->

        <!--        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

        <div class="example-switch" v-if="showJsonExampleButton">
            <v-divider vertical inset></v-divider>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <span class="example-switch__text" :class="exampleTextStyle" @click="toggle">{{ $t("apiDefinition.showJson") }}</span>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-switch v-model="switchFlag"></ev-switch>
        </div>

        <v-spacer></v-spacer>

        <div class="d-flex align-center" v-if="consumes && consumes.length !== 0" style="height: 32px">
            <span class="meta__font">Content-Type : {{ consumes }}</span>
        </div>

        <div class="d-flex align-center" v-if="produces && produces.length !== 0" style="height: 32px">
            <span class="meta__font">Media Type : {{ produces }}</span>
        </div>
    </div>
</template>

<script>
    import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
    import EvSwitch from '@/components/button/EvSwitch'

    export default {
        name: "EvApiSubtitle",

        components: {EvSwitch, EvVerticalGutter},

        model: {
            prop: 'exampleSwitch',
            event: 'toggle'
        },

        props: {
            exampleSwitch: false,

            showJsonExampleButton: false,

            consumes: undefined,

            produces: undefined,
        },

        data() {
            return {
                switchFlag: false,
            }
        },

        methods: {
            toggle() {
                this.switchFlag = !this.exampleSwitch
            }
        },

        computed: {
            exampleTextStyle() {
                return {
                    'example-switch__text--open': this.exampleSwitch,
                    'example-switch__text--close': !this.exampleSwitch,
                }
            },
        },

        watch: {
            switchFlag() {
                this.$emit('toggle', !this.exampleSwitch)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../style/common";

    .subtitle-1 {
        height: 32px;

        border-bottom: 1px solid $SECONDARY_COLOR;

        user-select: none;
    }

    .subtitle-font {
        font-size: 12px;

        font-weight: bold;

        color: #007AFF;

        line-height: 32px;
    }

    .button-font {
        font-size: 12px;

        color: #b3b3b3;

        font-weight: normal;
    }

    .example-switch {
        display: flex;

        align-items: center;

        height: 32px;
    }

    .example-switch__text {
        font-size: 12px;

        font-weight: normal;

        &--open {
            color: #007AFF;
        }

        &--close {
            color: #b3b3b3;
        }
    }

    .meta__font {
        font-size: 12px;

        font-weight: normal;

        font-style: italic;

        //color: $SECONDARY_FONT_COLOR;
        color: $PRIMARY_COLOR;
    }

    .response-code {
        font-size: 12px;

        color: $GREEN_COLOR;
    }
</style>
