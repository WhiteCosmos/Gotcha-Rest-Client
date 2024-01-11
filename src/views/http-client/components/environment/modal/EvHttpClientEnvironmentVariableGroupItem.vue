<template>
    <div class="ev-http-client-environment-variable-group-item" :class="itemStyle" @click="doSelectGroup">
        <!--        <ev-label size="11" secondary>{{ group.name }}</ev-label>-->

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-vertical-gutter :gutter="16" v-if="group.default"></ev-vertical-gutter>

        <div class="ev-http-client-environment-variable-group-item__drag" v-else>
            <ev-drag-icon></ev-drag-icon>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-label size="10" primary v-if="group.default">{{ group.name }}</ev-label>

        <ev-editable-label v-else :size="10" v-model="group.name"></ev-editable-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <v-spacer></v-spacer>

        <div class="ev-http-client-environment-variable-group-item__button" v-if="!group.default">
            <transition name="slide-y-transition" duration="80" mode="out-in">
                <ev-json-remove-icon key="delete" v-if="!deletable" @click.native="toggleDeletable"></ev-json-remove-icon>

                <ev-deletable-icon key="deletable" v-if="deletable" @click.native="emitRemoveGroup"></ev-deletable-icon>
            </transition>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvJsonRemoveIcon from '@/components/json-editor-vsl/icons/ev-json-remove-icon'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvDeletableIcon from '@/views/http-client/icon/ev-deletable-icon'
    import DelayTrigger from '@/core/utils/DelayTrigger'

    export default {
        name: "EvHttpClientEnvironmentVariableGroupItem",

        components: {
            EvDeletableIcon,
            EvEditableLabel,
            EvJsonRemoveIcon,
            EvBorderlessInput,
            EvDragIcon,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            group: Object,

            selectedGroup: Object,
        },

        data() {
            return {
                deletable: false,
            }
        },

        computed: {
            isSelected() {
                return this.group === this.selectedGroup
            },

            itemStyle() {
                return {
                    'ev-http-client-environment-variable-group-item--selected': this.isSelected
                }
            }
        },

        methods: {
            doSelectGroup() {
                this.$emit('select', this.group)
            },

            toggleDeletable() {
                this.deletable = true

                new DelayTrigger(1500, () => {
                    this.deletable = false
                }).trigger()
            },

            emitRemoveGroup() {
                this.$emit('remove-group', this.group)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-environment-variable-group-item {
        display: flex;

        align-items: center;

        height: 32px;

        padding-left: 4px;

        background-color: #F5F5F5;

        &--selected {
            background-color: #EAEAEA;
        }

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
