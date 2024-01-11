<template>
    <div class="toggle-button">
        <transition name="fade" :duration="50">
            <div class="toggle-button__inner-circle" v-if="flag_"></div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "EvExportTypeToggleButton",

        model: {
            prop: "flag",
            event: "change"
        },

        props: {
            flag: Boolean,
        },

        mounted() {
            this.flag_ = this.flag
        },

        data() {
            return {
                flag_: false,
            }
        },

        methods: {
            toggle() {
                this.flag_ = !this.flag_
            }
        },

        watch: {
            flag(newVal) {
                this.flag_ = newVal
            },

            flag_(newVal) {
                this.$emit('change', newVal)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .toggle-button {
        width: 16px;

        height: 16px;

        border-radius: 16px;

        border: 1px solid $SECONDARY_COLOR;

        display: flex;

        @include full-center;
    }

    .toggle-button__inner-circle {
        width: 12px;

        height: 12px;

        border-radius: 12px;

        background-color: $PRIMARY_COLOR;
    }
</style>
