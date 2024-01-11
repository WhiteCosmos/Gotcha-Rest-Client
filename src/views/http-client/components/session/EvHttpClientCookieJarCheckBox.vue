<template>
    <div class="check-box" :class="checkboxStyle" @click="toggle">
        <ev-check-icon v-if="flag_"></ev-check-icon>
    </div>
</template>

<script>
    import EvCheckIcon from '@/modals/export-project/export-filter/ev-check-icon'
    import EvHalfCheckIcon from '@/modals/export-project/export-filter/ev-half-check-icon'
    import EvUncheckIcon from '@/modals/export-project/export-filter/ev-uncheck-icon'

    export default {
        name: "EvHttpClientCookieJarCheckBox",

        components: {
            EvUncheckIcon,
            EvHalfCheckIcon,
            EvCheckIcon
        },

        created() {
            this.flag_ = this.flag
        },

        model: {
            prop: 'flag',
            event: 'change'
        },

        props: {
            flag: Boolean,
        },

        data() {
            return {
                flag_: false,
            }
        },

        computed: {
            checkboxStyle() {
                if (this.flag_) {
                    return ['check-box--checked']
                } else {
                    return ['check-box--unchecked']
                }
            }
        },

        methods: {
            toggle() {
                this.flag_ = !this.flag_

                this.$emit('change', this.flag_)
            }
        },

        watch: {
            flag(newVal) {
                this.flag_ = newVal
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .check-box {
        width: 14px;

        height: 14px;

        border-radius: 2px;

        @include full-center;

        transition: 50ms;

        border: 1px solid $PRIMARY_COLOR;

        &--checked {
            background-color: #007AFF;
        }

        &--unchecked {
            background-color: #FCFCFC;
        }
    }
</style>
