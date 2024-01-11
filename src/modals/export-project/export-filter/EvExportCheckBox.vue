<template>
    <div class="check-box" @click="toggle">
        <ev-check-icon v-if="is(statuses.CHECKED)"></ev-check-icon>

        <ev-half-check-icon v-if="is(statuses.HALF_CHECKED)"></ev-half-check-icon>

        <ev-uncheck-icon v-if="is(statuses.UNCHECKED)"></ev-uncheck-icon>
    </div>
</template>

<script>
    import EvCheckIcon from '@/modals/export-project/export-filter/ev-check-icon'
    import EvHalfCheckIcon from '@/modals/export-project/export-filter/ev-half-check-icon'
    import EvStateMachineMixin from '@/mixins/EvStateMachineMixin'
    import EvUncheckIcon from '@/modals/export-project/export-filter/ev-uncheck-icon'

    export default {
        name: "EvExportCheckBox",

        components: {
            EvUncheckIcon,
            EvHalfCheckIcon,
            EvCheckIcon
        },

        mixins: [
            EvStateMachineMixin,

        ],

        mounted() {
            this.initStateMachine(this.statuses.CHECKED)

            this.status_ = this.status || 'CHECKED'
        },

        model: {
            prop: 'status',
            event: 'change'
        },

        props: {
            status: String,
        },

        data() {
            return {
                statuses: {
                    CHECKED: "CHECKED",

                    HALF_CHECKED: "HALF_CHECKED",

                    UNCHECKED: "UNCHECKED",
                }
            }
        },

        methods: {
            toggle() {
                if (this.is(this.statuses.CHECKED)) {
                    this.to(this.statuses.UNCHECKED)
                    this.$emit('change', this.status_)
                    return
                }

                if (this.is(this.statuses.HALF_CHECKED)) {
                    this.to(this.statuses.UNCHECKED)
                    this.$emit('change', this.status_)
                    return
                }

                if (this.is(this.statuses.UNCHECKED)) {
                    this.to(this.statuses.CHECKED)
                    this.$emit('change', this.status_)
                    return
                }
            }
        },

        watch: {
            status(newVal) {
                this.status_ = newVal
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "export-filter";

    .check-box {
        width: 14px;

        height: 14px;

        background-color: $PRIMARY_COLOR;

        border-radius: 2px;

        @include full-center;
    }
</style>
