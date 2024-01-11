<template>
    <div class="ev-abstract-button ev-switch" @click="toggle"
         :class="switchStyle">
        <div class="ev-switch__circle"
             :class="switchCircleStyle"></div>
    </div>
</template>

<script>
    export default {
        name: "EvSwitch",

        mixins: [],

        model: {
            prop: 'flag',
            event: 'toggle'
        },

        props: {
            flag: {
                type: Boolean,
                default: false,
            }
        },

        methods: {
            toggle() {
                this.$emit('toggle', !this.flag)
            }
        },

        computed: {
            switchStyle() {
                return {
                    'ev-switch--open': this.flag,
                    'ev-switch--close': !this.flag,
                }
            },

            switchCircleStyle() {
                return {
                    'ev-switch__circle--open': this.flag,
                    'ev-switch__circle--close': !this.flag,
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-switch {
        display: flex;

        align-items: center;

        width: 32px;

        height: 14px;

        border-radius: 14px;

        transition: .1s;

        &--open {
            background-color: #a4d96f;
        }

        &--close {
            background-color: #E0E0E0;
        }
    }

    .ev-switch__circle {
        width: 10px;

        height: 10px;

        border-radius: 10px;

        background-color: white;

        margin-left: 2px;

        transition: .1s;

        &--open {
            margin-left: 20px;
            transition: margin-left .1s;
        }

        &--close {
            margin-left: 2px;
            transition: margin-left .1s;
        }
    }
</style>
