<template>
    <v-dialog v-model="dialog" persistent width="400" overlay-color="#FCFCFC">
        <v-card>
            <div class="ev-remove-project-modal">
                <div class="ev-remove-project-modal__message-container">
                    <span class="ev-remove-project-modal__text">{{ $t('EvRemoveVersionModal.message', {name: name}) }}</span>
                </div>

                <div class="ev-remove-project-modal__button-container">
                    <v-spacer></v-spacer>

                    <v-btn color="error" small @click="confirm" elevation="0">{{ $t('EvRemoveVersionModal.confirm') }}</v-btn>

                    <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                    <v-btn color="grey" small text @click="cancel">{{ $t('EvRemoveVersionModal.cancel') }}</v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvStoreMixin from '@/mixins/EvStoreMixin'

    export default {
        name: "EvRemoveVersionModal",

        components: {
            EvVerticalGutter
        },

        mixins: [
            EvStoreMixin,
        ],

        created() {
            AppEventBus.$on(AppEvents.REMOVE_VERSION, () => {
                this.dialog = true
            })
        },

        data() {
            return {
                dialog: false
            }
        },

        methods: {
            cancel() {
                this.dialog = false
            },

            confirm() {
                this.dialog = false

                this.$emit('confirm')
            }
        },

        computed: {
            name() {
                if (!this.currentVersion) {
                    return
                }

                return this.currentVersion.name
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-remove-project-modal {
        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: center;

        width: 400px;

        height: 160px;

        background-color: #FAFAFA;

        &__text {
            font-size: 11px;

            line-height: 16px;

            font-weight: bolder;

            color: $PRIMARY_FONT_COLOR;
        }

        &__message-container {
            height: 112px;

            display: flex;

            align-items: center;

            padding-left: 32px;

            padding-right: 32px;
        }

        &__button-container {
            height: 48px;

            display: flex;

            width: 100%;

            align-items: center;

            padding-right: 16px;

            border-top: 1px solid #E0E0E0;

            background-color: #FAFAFA;
        }
    }
</style>
