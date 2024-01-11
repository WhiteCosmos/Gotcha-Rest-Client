<template>
    <div class="ev-cookie-editor-item">
        <div class="editor-item__drag-icon">
            <!--            <ev-drag-icon></ev-drag-icon>-->
        </div>

        <ev-export-check-box v-model="cookie.checkedStatus"></ev-export-check-box>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <div class="ev-cookie-editor__name-column">
            <ev-borderless-input ref="key-input" :placeholder="$t('cookieName')" v-model="cookie.key"></ev-borderless-input>

            <ev-cookie-editor-item-property :cookie="cookie"></ev-cookie-editor-item-property>
        </div>

        <div class="ev-cookie-editor__value-column">
            <ev-dynamic-variable-input ref="value-input" :placeholder="$t('cookieValue')" v-model="cookie.value"></ev-dynamic-variable-input>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <div class="editor-item__delete-icon">
                <transition name="slide-y-transition" duration="80" mode="out-in">
                    <ev-json-remove-icon key="delete" v-if="!deletable" @click.native="toggleDeletable"></ev-json-remove-icon>

                    <ev-deletable-icon key="deletable" v-if="deletable" @click.native="emitRemoveCookie"></ev-deletable-icon>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvDeleteIcon from '@/views/http-client/icon/ev-delete-icon'
    import EvDeletableIcon from '@/views/http-client/icon/ev-deletable-icon'
    import DelayTrigger from '@/core/utils/DelayTrigger'
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon'
    import _ from 'lodash'
    import EvJsonRemoveIcon from '@/components/json-editor-vsl/icons/ev-json-remove-icon'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvBulkEditor from '@/components/input/EvBulkEditor'
    import EvCookieEditorItemProperty from '@/views/http-client/components/cookie-editor/EvCookieEditorItemProperty.vue'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput.vue'

    export default {
        name: "EvCookieEditorItem",

        components: {
            EvDynamicVariableInput,
            EvCookieEditorItemProperty,
            EvBulkEditor,
            EvBorderlessInput,
            EvJsonAddButton,
            EvJsonRemoveIcon,
            EvDragIcon,
            EvDeletableIcon,
            EvDeleteIcon,
            EvVerticalGutter,
            EvExportCheckBox
        },

        mixins: [],

        props: {
            cookie: Object,
        },

        data() {
            return {
                deletable: false,
            }
        },

        computed: {
            isContentEmpty() {
                return !this.item || (_.isEmpty(this.item.key) && _.isEmpty(this.item.value))
            }
        },

        watch: {
            'cookie.checkedStatus'() {
                this.emitUpdateCookie()
            },
            'cookie.key'() {
                this.emitUpdateCookie()
            },
            'cookie.value'() {
                this.emitUpdateCookie()
            }
        },

        methods: {
            toggleDeletable() {
                this.deletable = true

                new DelayTrigger(1500, () => {
                    this.deletable = false
                }).trigger()
            },

            emitUpdateCookie() {
                this.$emit('update-cookie', this.cookie)
            },

            emitRemoveCookie() {
                this.$emit('remove-cookie', this.cookie)
            },

            focusOnKey() {
                this.$refs['key-input'].focus()
            },

            focusOnValue() {
                this.$refs['value-input'].focus()
            }
        },

        i18n: {
            messages: {
                en: {
                    cookieName: "Cookie Name",

                    cookieValue: "Cookie Value",
                },
                zh: {
                    cookieName: "Cookie Name",

                    cookieValue: "Cookie Value",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvCookieEditor";

    .ev-cookie-editor-item {
        position: relative;

        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 24px;

        padding-right: 8px;

        border-bottom: 1px solid #F1F1F1;

        background-color: white;
    }

    .editor-item__drag-icon {
        width: 24px;

        height: 24px;

        @include full-center;

        position: absolute;

        left: 2px;
    }

    .editor-item__delete-icon {
        width: 16px;

        height: 16px;

        @include full-center;
    }
</style>