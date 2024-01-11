<template>
    <div class="ev-http-client-cookie-jar-item-wrapper">
        <div class="ev-http-client-cookie-jar-item"
             :class="cookieJarStyle"
             @click="emitSelectCookieJar(cookieJar)"
             @contextmenu="emitShowContextMenu($event, cookieJar)">
            <div class="ev-http-client-cookie-jar-item__widget" @click="collapse = !collapse">
                <ev-arrow-right v-if="collapse"></ev-arrow-right>

                <ev-arrow-down v-else></ev-arrow-down>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="12" primary bold v-if="isDefaultCookieJar">{{ cookieJar.name }}</ev-label>

            <ev-editable-label v-else :size="12"
                               :ref="cookieJar.uid"
                               secondary
                               bold
                               v-model="cookieJar.name"></ev-editable-label>

            <div class="ev-http-client-cookie-jar-item__divider"></div>

            <div class="ev-http-client-cookie-jar-item__widget" @click="emitAddCookieJarDomain(cookieJar)">
                <ev-circle-plus-icon></ev-circle-plus-icon>
            </div>

            <ev-vertical-gutter :gutter="2"></ev-vertical-gutter>
        </div>

        <draggable v-model="domains"
                   handle=".ev-http-client-cookie-jar-domain-item"
                   group="domains"
                   @change="handleDragCookieJarDomain"
                   animation="200">
            <div class="ev-http-client-cookie-jar-domain-item"
                 :class="cookieJarDomainStyle(domain)"
                 v-if="!collapse"
                 v-for="domain in domains"
                 @click="emitSelectCookieJarDomain(cookieJar, domain)"
                 @contextmenu="emitShowContextMenu($event, cookieJar, domain)">

                <div class="ev-http-client-cookie-jar-domain-item__icon">
                    <!--                <ev-http-client-cookie-jar-domain-icon></ev-http-client-cookie-jar-domain-icon>-->
                </div>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-editable-label :size="12"
                                   :ref="`${cookieJar.uid}-${domain.name}`"
                                   secondary
                                   medium
                                   v-model="domain.name"
                                   @complete="onDomainNameChange(domain)"></ev-editable-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-counter-label :value="domain.cookies.length"></ev-counter-label>

                <v-spacer></v-spacer>

                <ev-json-remove-button @click.native.stop=""
                                       @remove="emitRemoveCookieJarDomain(domain)"></ev-json-remove-button>

                <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>
            </div>
        </draggable>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon'
    import EvLabel from '@/components/typography/EvLabel'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvTwoStepRemoveButtonMixin from '@/components/button/EvTwoStepRemoveButtonMixin'
    import EvJsonRemoveIcon from '@/components/json-editor-vsl/icons/ev-json-remove-icon'
    import EvDeletableIcon from '@/views/http-client/components/multipart-form-editor/ev-deletable-icon'
    import EvArrowRight from '@/components/icon/ev-arrow-right'
    import EvArrowDown from '@/components/icon/ev-arrow-down'
    import EvHttpClientCookieJarMixin from '@/views/http-client/components/session/EvHttpClientCookieJarMixin'
    import EvCheckbox from '@/components/button/EvCheckbox'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvHttpClientCookieJarDomainIcon from '@/views/http-client/components/session/EvHttpClientCookieJarDomainIcon'
    import EvCirclePlusIcon from '@/views/http-client/icon/ev-circle-plus-icon'
    import EvCounterLabel from '@/components/label/EvCounterLabel'
    import {EvHttpClientCookieJarsEventBus, EvHttpClientCookieJarsEvents} from '@/views/http-client/components/session/EvHttpClientCookieJarsEventBus'
    import _ from 'lodash'
    import EvJsonRemoveButton from '@/components/json-editor-vsl/components/EvJsonRemoveButton.vue'
    import draggable from 'vuedraggable'

    export default {
        name: "EvHttpClientCookieJarItem",

        components: {
            EvJsonRemoveButton,
            EvCounterLabel,
            EvCirclePlusIcon,
            EvHttpClientCookieJarDomainIcon,
            EvExportCheckBox,
            EvCheckbox,
            EvArrowDown,
            EvArrowRight,
            EvDeletableIcon,
            EvJsonRemoveIcon,
            EvEditableLabel,
            EvLabel,
            EvDragIcon,
            EvVerticalGutter,
            draggable
        },

        mixins: [
            EvTwoStepRemoveButtonMixin,
            EvHttpClientCookieJarMixin,
        ],

        created() {
            EvHttpClientCookieJarsEventBus.$on(EvHttpClientCookieJarsEvents.RENAME_COOKIE_JAR, (cookieJar) => {
                let ref = this.$refs[`${cookieJar.uid}`]

                ref && ref.enableEditing()
            })

            EvHttpClientCookieJarsEventBus.$on(EvHttpClientCookieJarsEvents.RENAME_COOKIE_JAR_DOMAIN, (cookieJar, cookieJarDomain) => {
                let refs = this.$refs[`${cookieJar.uid}-${cookieJarDomain.name}`]

                if (_.isEmpty(refs)) {
                    return
                }

                refs[0].enableEditing()
            })
        },

        props: {
            cookieJar: Object,

            selectedCookieJar: Object,

            selectedCookieJarDomain: Object,

            focusedCookieJar: Object,

            focusedCookieJarDomain: Object,

            drag: Boolean,
        },

        data() {
            return {
                collapse: false,
            }
        },

        watch: {
            drag(newVal) {
                newVal && (this.collapse = true)
            }
        },

        computed: {
            domains: {
                get() {
                    return this.cookieJar.domains
                },

                set(values) {
                    this.cookieJar.domains = values
                },
            },

            isSelectedCookieJar() {
                return this.cookieJar === this.selectedCookieJar && !this.selectedCookieJarDomain
            },

            isFocusedCookieJar() {
                return this.cookieJar === this.focusedCookieJar
            },

            isDefaultCookieJar() {
                return this.cookieJar && this.cookieJar.default
            },

            cookieJarStyle() {
                return {
                    'ev-http-client-cookie-jar-item--selected': this.isSelectedCookieJar
                }
            },
        },

        methods: {
            checkIsSelectedCookieJarDomain(cookieJarDomain) {
                return cookieJarDomain === this.selectedCookieJarDomain
            },

            checkIsFocusedCookieJarDomain(cookieJarDomain) {
                return cookieJarDomain === this.focusedCookieJarDomain
            },

            cookieJarDomainStyle(cookieJarDomain) {
                return {
                    'ev-http-client-cookie-jar-domain-item--selected': this.checkIsSelectedCookieJarDomain(cookieJarDomain)
                }
            },

            onDomainNameChange(domain) {
                domain.cookies.forEach(cookie => {
                    cookie.domain = domain.name
                })
            },

            emitRemoveCookieJarDomain(domain) {
                this.$emit('remove-cookie-jar-domain', domain)
            },

            handleDragCookieJarDomain() {
                EvHttpClientCookieJarsEventBus.$emit(EvHttpClientCookieJarsEvents.UPDATE_COOKIE_JAR)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-cookie-jar-item-wrapper {
        display: flex;

        flex-direction: column;
    }

    .ev-http-client-cookie-jar-item {
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

        &__widget {
            @include full-center;

            width: 20px;

            height: 32px;
        }

        &__divider {
            display: flex;

            flex: 1;

            height: 1px;

            border-top: 1px solid #E0E0E0;

            margin-left: 4px;

            margin-right: 4px;
        }
    }

    .ev-http-client-cookie-jar-domain-item {
        display: flex;

        align-items: center;

        height: 32px;

        padding-left: 8px;

        background-color: #F5F5F5;

        &__icon {
            @include full-center;

            width: 16px;

            height: 16px;
        }

        &--selected {
            background-color: #EAEAEA;
        }
    }
</style>
