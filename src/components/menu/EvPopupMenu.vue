<template>
    <v-menu v-bind="config_" v-model="showPopupMenu_" :disabled="disabled" :nudge-top="nudgeTop">
        <template v-slot:activator="{ on }">
            <div class="ev-popup-menu__icon-container" v-on="on">
                <slot name="icon"></slot>
            </div>
        </template>

        <div class="ev-popup-menu__items">
            <ev-menu-top-indicator class="ev-popup-menu__indicator" color="#F1F1F1"></ev-menu-top-indicator>

            <slot name="items"></slot>
        </div>
    </v-menu>
</template>

<script>
    import EvMenuTopIndicator from '@/components/json-editor-vsl/icons/ev-menu-top-indicator'
    import {
        EvHttpClientRequestDocsEventBus,
        EvHttpClientRequestDocsEvents
    } from '@/views/http-client/request/EvHttpClientRequestDocsEventBus'

    export default {
        name: "EvPopupMenu",

        components: {
            EvMenuTopIndicator
        },

        model: {
            prop: 'showPopupMenu',
            event: 'change'
        },

        props: {
            showPopupMenu: Boolean,

            config: Object,

            disabled: {
                type: Boolean,
                default: false
            }
        },

        created() {
            this.showPopupMenu_ = this.showPopupMenu

            this.config && (Object.assign(this.config_, this.config))

            EvHttpClientRequestDocsEventBus.$on(EvHttpClientRequestDocsEvents.SCROLL, this.handleScroll)
        },

        beforeDestroy() {
            clearTimeout(this.timeoutId)

            EvHttpClientRequestDocsEventBus.$off(EvHttpClientRequestDocsEvents.SCROLL, this.handleScroll)
        },

        watch: {
            showPopupMenu() {
                this.showPopupMenu_ = this.showPopupMenu
            },

            showPopupMenu_(newVal) {
                this.$emit('change', this.showPopupMenu_)

                if (!newVal) {
                    this.timeoutId = setTimeout(() => {
                        this.nudgeTop = 0
                    }, 300)
                }
            },
        },

        data() {
            return {
                config_: {
                    'offset-y': true,

                    'close-on-content-click': false,

                    'content-class': "popup-menu",

                    'nudge-bottom': 10,

                    'allow-overflow': true,
                },

                showPopupMenu_: false,

                nudgeTop: 0,

                timeoutId: -1,
            }
        },

        methods: {
            hide() {
                this.showPopupMenu_ = false
            },

            handleScroll(event, delta) {
                if (this.showPopupMenu_) {
                    this.nudgeTop += delta
                } else {
                    this.nudgeTop = 0
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-popup-menu {
        &__icon-container {
            @include full-center;
        }

        &__items {
            min-width: 120px;

            display: flex;

            flex-direction: column;

            width: fit-content;

            padding: 4px;

            border-radius: 6px;

            background-color: #F1F1F1;
        }

        &__indicator {
            position: absolute;

            display: block;

            top: -12px;

            align-self: center;
        }
    }

    .popup-menu {
        margin-top: 4px;

        contain: initial;

        overflow: visible;

        align-self: center;
    }
</style>
