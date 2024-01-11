<template>
    <div class="ev-http-client-global-variable-manager-item">
        <div class="ev-http-client-global-variable-manager-item__name-column">
            <ev-borderless-input v-model="variable.key" placeholder="Variable Name"></ev-borderless-input>
        </div>

        <div class="ev-http-client-global-variable-manager-item__value-column">
            <ev-dynamic-variable-input v-model="variable.value" :bulk-edit="false" placeholder="Variable Value"></ev-dynamic-variable-input>
        </div>

        <ev-label bold red size="10" @click.native="emitRemoveVariable">{{ $t('EvContextMenu.remove') }}</ev-label>

        <!--        <div class="ev-http-client-global-variable-manager-item__icon-container" style="margin-right: 1px">-->
        <!--            <transition name="slide-y-transition" duration="80" mode="out-in">-->
        <!--                <ev-json-remove-icon key="delete" v-if="!deletable" @click.native="toggleDeletable"></ev-json-remove-icon>-->
        <!--                <ev-deletable-icon key="deletable" v-if="deletable" @click.native="emitRemoveItem"></ev-deletable-icon>-->
        <!--            </transition>-->
        <!--        </div>-->
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvTwoStepRemoveButtonMixin from '@/components/button/EvTwoStepRemoveButtonMixin'
    import EvJsonRemoveIcon from '@/components/json-editor-vsl/icons/ev-json-remove-icon'
    import EvDeletableIcon from '@/views/http-client/icon/ev-deletable-icon'
    import _ from 'lodash'
    import DelayTrigger from '@/core/utils/DelayTrigger'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput.vue'

    export default {
        name: "EvHttpClientGlobalVariableManagerItem",

        components: {
            EvDynamicVariableInput,
            EvDeletableIcon,
            EvJsonRemoveIcon,
            EvVerticalGutter,
            EvBorderlessInput,
            EvLabel
        },

        mixins: [
            EvTwoStepRemoveButtonMixin,
        ],

        props: {
            variable: Object
        },

        data() {
            return {
                name: "",

                value: "",

                deletable: false,
            }
        },

        methods: {
            toggleDeletable() {
                if (_.isEmpty(this.variable.key) && _.isEmpty(this.variable.value)) {
                    this.$emit('remove', this.variable)
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
        },

        i18n: {
            messages: {
                en: {},

                zh: {}
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-global-variable-manager-item {
        display: flex;

        align-items: center;

        flex-shrink: 0;

        min-width: 1px;

        min-height: 1px;

        width: 100%;

        height: 32px;

        border-bottom: 1px solid #EAEAEA;

        padding-left: 16px;

        padding-right: 8px;

        &__name-column {
            display: flex;

            min-height: 1px;

            min-width: 1px;

            width: 240px;

            padding-right: 16px;
        }

        &__value-column {
            display: flex;

            flex: 1;

            min-height: 1px;

            min-width: 1px;

            padding-right: 320px;
        }

        &__icon-container {
            @include full-center;

            height: 32px;

            width: 32px;
        }
    }

</style>
