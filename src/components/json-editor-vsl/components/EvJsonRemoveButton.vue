<template>
    <div class="json-remove-button">
        <transition name="slide-y-transition" duration="80" mode="out-in">
            <ev-json-remove-icon v-if="!deletable" @click.native="toggleDeletable"></ev-json-remove-icon>

            <ev-deletable-icon key="deletable" v-if="deletable" @click.native="doDelete"></ev-deletable-icon>
        </transition>
    </div>
</template>

<script>
    import EvDeletableIcon from '@/views/http-client/icon/ev-deletable-icon'
    import EvDeleteIcon from '@/views/http-client/icon/ev-delete-icon'
    import DelayTrigger from '@/core/utils/DelayTrigger'
    import EvJsonRemoveIcon from '@/components/json-editor-vsl/icons/ev-json-remove-icon'

    export default {
        name: "EvJsonRemoveButton",

        components: {
            EvJsonRemoveIcon,
            EvDeleteIcon,
            EvDeletableIcon
        },

        props: {
            isEmpty: Boolean
        },

        data() {
            return {
                deletable: false
            }
        },

        methods: {
            toggleDeletable() {
                if (this.isEmpty) {
                    this.$emit('remove')

                    return
                }

                this.deletable = true

                new DelayTrigger(1500, () => {
                    this.deletable = false
                }).trigger()
            },

            doDelete() {
                this.$emit('remove')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonEditor";

    .json-remove-button {
        @include full-center;

        width: 14px;

        height: 14px;
    }
</style>
