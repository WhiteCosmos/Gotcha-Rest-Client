<template>
    <v-menu v-model="flag" v-bind="config">
        <template v-slot:activator="{ on }">
            <div class="ev-text-request-body-mode-selector" v-on="on">
                <span class="ev-text-request-body-mode-selector__label">{{ mode_.toUpperCase() }}</span>

                <div class="ev-text-request-body-mode-selector__icon-container">
                    <ev-small-select-icon></ev-small-select-icon>
                </div>
            </div>
        </template>

        <div class="ev-text-request-body-mode-selector__menu">
            <v-hover v-slot="{ hover }" v-for="mode in modes">
                <div class="ev-text-request-body-mode-selector__menu-item"
                     :class="{'ev-text-request-body-mode-selector__menu-item--hover': hover}"
                     @click="doSelectMode(mode)">
                    <ev-label size="10" primary>{{ mode.toUpperCase() }}</ev-label>
                </div>
            </v-hover>
        </div>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import SelectIcon from '@/components/icon/select-icon'
    import EvSoftWrapIcon from '@/views/http-client/icon/ev-soft-wrap-icon'
    import EvSmallSelectIcon from '@/views/http-client/icon/ev-small-select-icon'

    export default {
        name: "EvTextRequestBodyModeSelector",

        components: {
            EvSmallSelectIcon,
            EvSoftWrapIcon,
            SelectIcon,
            EvVerticalGutter,
            EvLabel
        },

        mixins: [],

        created() {
            if (!this.mode) {
                this.doSelectMode('json')
            } else {
                this.mode_ = this.mode
            }
        },

        model: {
            prop: 'mode',
            event: 'change'
        },

        props: {
            mode: {
                type: String,
                default: 'json'
            }
        },

        watch: {
            mode(newVal) {
                this.mode_ = newVal
            }
        },

        data() {
            return {
                flag: false,

                config: {
                    'offset-y': true,

                    'top': true,

                    'nudge-left': 8,

                    'transition': false,

                    'tile': true
                },

                mode_: 'text',

                modes: [
                    'text',
                    'json',
                    'yaml',
                    'html',
                    'xml',
                ]
            }
        },

        methods: {
            doSelectMode(mode) {
                this.mode_ = mode

                this.$emit('change', this.mode_)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-text-request-body-mode-selector {
        display: flex;

        align-items: center;

        height: 24px;

        user-select: none;

        &__icon-container {
            display: flex;

            justify-content: center;

            align-items: center;

            width: 16px;

            height: 16px;

            padding-bottom: 1px;
        }

        &__label {
            font-size: 10px;

            line-height: 10px;

            baseline-shift: 4px;

            height: 10px;

            color: $PRIMARY_FONT_COLOR;
        }

        &__menu {
            display: flex;

            flex-direction: column;

            width: 64px;

            background-color: #F1F1F1;
        }

        &__menu-item {
            display: flex;

            align-items: center;

            //justify-content: flex-end;

            height: 20px;

            padding-left: 8px;

            padding-right: 8px;

            &--hover {
                background-color: #E0E0E0;
            }
        }
    }
</style>
