<template>
    <div class="ev-cookie-editor-header">
        <ev-export-check-box v-model="checkedStatus_"></ev-export-check-box>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <div class="ev-cookie-editor__name-column">
            <ev-label size="12" bold secondary>{{ $t('EvKeyValueEditor.name') }}</ev-label>

            <!--            <v-spacer></v-spacer>-->

            <!--            <div class="ev-cookie-editor__status-column">-->
            <!--                <v-tooltip left transition="fade-transition" content-class="ev-cookie-editor-header__tooltip">-->
            <!--                    <template v-slot:activator="{ on, attrs }">-->
            <!--                        <v-icon size="11" color="#999" v-on="on">fa-link</v-icon>-->
            <!--                    </template>-->
            <!--                    <span class="ev-cookie-editor-header__tooltip__label">Set-Cookie</span>-->
            <!--                </v-tooltip>-->
            <!--            </div>-->
        </div>

        <div class="ev-cookie-editor__value-column">
            <ev-label size="12" bold secondary>{{ $t('EvKeyValueEditor.value') }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'

    export default {
        name: "EvCookieEditorHeader",

        components: {
            EvExportCheckBox,
            EvVerticalGutter,
            EvLabel
        },

        created() {
            this.checkedStatus_ = this.checkedStatus
        },

        model: {
            prop: "checkedStatus",
            event: "change"
        },

        props: {
            checkedStatus: String,
        },

        data() {
            return {
                checkedStatus_: "CHECKED"
            }
        },

        watch: {
            checkedStatus(newVal) {
                this.checkedStatus_ = newVal
            },

            checkedStatus_(newVal) {
                this.$emit('change', newVal)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvCookieEditor";

    .ev-cookie-editor-header {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 24px;

        padding-right: 8px;

        border-bottom: 1px solid #F1F1F1;

        user-select: none;

        &__column {
            display: flex;

            align-items: center;

            flex: 1;

            flex-shrink: 0;
        }

        &__icon-column {
            @include full-center;

            height: 28px;

            width: 28px;

            background-color: #E0E0E0;
        }

        &__tooltip {
            display: flex;

            align-items: center;

            background-color: #FAFAFA;

            border-radius: 3px;

            width: fit-content;

            height: 16px;

            &__label {
                font-size: 11px;

                font-weight: bold;

                color: $SECONDARY_FONT_COLOR;
            }
        }
    }
</style>
