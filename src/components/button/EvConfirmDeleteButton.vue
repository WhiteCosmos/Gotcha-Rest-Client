<!-- 二次确认删除按钮 -->

<template>
    <div class="ev-confirm-delete-button">
        <transition name="slide-y-transition" duration="80" mode="out-in">
            <ev-json-remove-icon key="delete" v-if="!deletable" @click.native="toggleDeletable"></ev-json-remove-icon>

            <ev-deletable-icon key="deletable" v-if="deletable" @click.native="emitRemove"></ev-deletable-icon>
        </transition>
    </div>
</template>

<script>
    import EvJsonRemoveIcon from '@/components/json-editor-vsl/icons/ev-json-remove-icon'
    import EvDeletableIcon from '@/views/http-client/icon/ev-deletable-icon'
    import DelayTrigger from '@/core/utils/DelayTrigger'

    export default {
        name: "EvConfirmDeleteButton",

        components: {
            EvDeletableIcon,
            EvJsonRemoveIcon
        },

        props: {
            trigger: {
                type: Function,
                default: () => {
                    return false
                }
            }
        },

        data() {
            return {
                deletable: false
            }
        },

        methods: {
            toggleDeletable() {
                if (this.trigger()) {
                    this.emitRemove()
                    return
                }

                this.deletable = true

                new DelayTrigger(1500, () => {
                    this.deletable = false
                }).trigger()
            },

            emitRemove() {
                this.$emit('remove')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-confirm-delete-button {
        @include full-center;

        width: 16px;

        height: 16px;
    }
</style>
