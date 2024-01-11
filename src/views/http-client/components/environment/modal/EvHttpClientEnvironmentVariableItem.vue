<template>
    <div class="ev-http-client-environment-variable">
        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <div class="ev-http-client-environment-variable__drag">
            <ev-drag-icon></ev-drag-icon>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-borderless-input v-model="variable.name" placeholder="Variable Name"></ev-borderless-input>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <div class="ev-http-client-environment-variable__button">
            <transition name="slide-y-transition" duration="80" mode="out-in">
                <ev-json-remove-icon key="delete" v-if="!deletable" @click.native="toggleDeletable"></ev-json-remove-icon>

                <ev-deletable-icon key="deletable" v-if="deletable" @click.native="emitRemoveVariable"></ev-deletable-icon>
            </transition>
        </div>

        <ev-vertical-gutter :gutter="2"></ev-vertical-gutter>

        <div class="ev-http-client-environment-variable__button" @click="emitAddVariable">
            <ev-json-plus-icon></ev-json-plus-icon>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvJsonRemoveIcon from '@/components/json-editor-vsl/icons/ev-json-remove-icon'
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon'
    import EvJsonPlusIcon from '@/components/json-editor-vsl/icons/ev-json-plus-icon'
    import _ from 'lodash'
    import DelayTrigger from '@/core/utils/DelayTrigger'
    import EvDeletableIcon from '@/views/http-client/icon/ev-deletable-icon'

    export default {
        name: "EvHttpClientEnvironmentVariableItem",

        components: {
            EvDeletableIcon,
            EvJsonPlusIcon,
            EvDragIcon,
            EvJsonRemoveIcon,
            EvVerticalGutter,
            EvBorderlessInput,
            EvLabel
        },

        props: {
            variable: Object,
        },

        data() {
            return {
                deletable: false,
            }
        },

        watch: {
            'variable.name'() {
                this.$emit('modify-variable')
            },
        },

        methods: {
            toggleDeletable() {
                if (_.isEmpty(this.variable.name)) {
                    this.emitRemoveVariable()

                    return
                }

                this.deletable = true

                new DelayTrigger(1500, () => {
                    this.deletable = false
                }).trigger()
            },

            emitRemoveVariable() {
                this.$emit('remove-variable', this.variable)
            },

            emitAddVariable() {
                this.$emit('add-variable', this.variable)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-environment-variable {
        display: flex;

        align-items: center;

        flex-shrink: 0;

        min-height: 1px;

        min-width: 1px;

        height: 32px;

        width: 100%;

        background-color: #F5F5F5;

        //padding-left: 16px;

        //padding-right: 16px;

        border-bottom: 1px solid #E0E0E0;

        //border-bottom: 1px solid transparent;

        &__drag {
            @include full-center;

            width: 16px;

            height: 16px;
        }

        &__button {
            @include full-center;

            width: 16px;

            height: 16px;
        }
    }
</style>
