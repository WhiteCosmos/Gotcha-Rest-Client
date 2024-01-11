<template>
    <div class="ev-datetime-menu">
        <div class="d-flex flex-column" style="padding: 4px">
            <ev-popup-menu-divider :label="$t('currentTime')"></ev-popup-menu-divider>

            <div class="d-flex align-center" style="height: 28px">
                <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>

                <ev-checkbox v-model="value.now" @click.native.stop=""></ev-checkbox>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="11" secondary bold>Now</ev-label>
            </div>

            <ev-popup-menu-divider :label="$t('formats')"></ev-popup-menu-divider>

            <ev-popup-menu-radio-item name="ISO-8601" v-model="value.format">ISO-8601</ev-popup-menu-radio-item>

            <ev-popup-menu-radio-item name="Timestamp" v-model="value.format">Timestamp</ev-popup-menu-radio-item>

            <ev-popup-menu-radio-item name="Unix" v-model="value.format">Unix</ev-popup-menu-radio-item>

            <div class="d-flex align-center">
                <ev-popup-menu-radio-item name="Custom" v-model="value.format">Custom</ev-popup-menu-radio-item>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <input type="text"
                       class="ev-datetime-menu__custom-datetime__input"
                       :disabled="value.format !== 'Custom'"
                       v-model="value.customFormat">
            </div>

            <ev-popup-menu-divider :label="$t('offsets')" v-if="value.now === 'CHECKED'"></ev-popup-menu-divider>

            <div class="ev-datetime-menu__offsets" v-if="value.now === 'CHECKED'">
                <div class="ev-datetime-menu__offsets__item">
                    <ev-label size="10" secondary bold>YYYY :</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <dv-datetime-counter-number v-model="offset['YYYY']"></dv-datetime-counter-number>
                </div>

                <div class="ev-datetime-menu__offsets__item">
                    <ev-label size="10" secondary bold>MM :</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <dv-datetime-counter-number v-model="offset['MM']"></dv-datetime-counter-number>
                </div>

                <div class="ev-datetime-menu__offsets__item">
                    <ev-label size="10" secondary bold>DD :</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <dv-datetime-counter-number v-model="offset['DD']"></dv-datetime-counter-number>
                </div>

                <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

                <div class="ev-datetime-menu__offsets__item">
                    <ev-label size="10" secondary bold>hh :</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <dv-datetime-counter-number v-model="offset['hh']"></dv-datetime-counter-number>
                </div>

                <div class="ev-datetime-menu__offsets__item">
                    <ev-label size="10" secondary bold>mm :</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <dv-datetime-counter-number v-model="offset['mm']"></dv-datetime-counter-number>
                </div>

                <div class="ev-datetime-menu__offsets__item">
                    <ev-label size="10" secondary bold>ss :</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <dv-datetime-counter-number v-model="offset['ss']"></dv-datetime-counter-number>
                </div>
            </div>

            <ev-popup-menu-divider :label="$t('customDatetime')" v-if="value.now === 'UNCHECKED'"></ev-popup-menu-divider>

            <div class="ev-datetime-menu__custom-datetime" v-if="value.now === 'UNCHECKED'">
                <dv-datetime-fractional-number :digits="4" v-model="customDatetime['YYYY']"></dv-datetime-fractional-number>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="10" secondary bold>-</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <dv-datetime-fractional-number v-model="customDatetime['MM']"></dv-datetime-fractional-number>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="10" secondary bold>-</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <dv-datetime-fractional-number v-model="customDatetime['DD']"></dv-datetime-fractional-number>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <dv-datetime-fractional-number v-model="customDatetime['hh']"></dv-datetime-fractional-number>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="10" secondary bold>:</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <dv-datetime-fractional-number v-model="customDatetime['mm']"></dv-datetime-fractional-number>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="10" secondary bold>:</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <dv-datetime-fractional-number v-model="customDatetime['ss']"></dv-datetime-fractional-number>
            </div>
        </div>

        <ev-dynamic-variable-preview :value="datetime"></ev-dynamic-variable-preview>
    </div>
</template>

<script>
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvRadio from '@/components/form/EvRadio'
    import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import DvDatetimeFractionalNumber from '@/components/dynamic-variable/datetime/DvDatetimeFractionalNumber'
    import EvLabel from '@/components/typography/EvLabel'
    import DvDatetimeCounterNumber from '@/components/dynamic-variable/datetime/DvDatetimeCounterNumber'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvDynamicVariablePreview from '@/components/dynamic-variable/components/EvDynamicVariablePreview'
    import GHCDynamicVariableDatetimeRender from '@/components/dynamic-variable/datetime/GHCDynamicVariableDatetimeRender'
    import EvCheckbox from '@/components/button/EvCheckbox.vue'

    export default {
        name: "EvDatetimeMenu",

        components: {
            EvCheckbox,
            EvDynamicVariablePreview,
            EvHorizonGutter,
            DvDatetimeCounterNumber,
            EvLabel,
            DvDatetimeFractionalNumber,
            EvBorderlessInput,
            EvVerticalGutter,
            EvPopupMenuRadioItem,
            EvRadio,
            EvPopupMenuDivider
        },

        created() {
            this.datetime = new GHCDynamicVariableDatetimeRender().render(this.value)
        },

        props: {
            value: Object,
        },

        data() {
            return {
                format: "ISO-8601",

                datetime: ''
            }
        },

        watch: {
            value: {
                deep: true,
                handler: function () {
                    this.datetime = new GHCDynamicVariableDatetimeRender().render(this.value)
                }
            }
        },

        computed: {
            offset() {
                return this.value.offset
            },

            customDatetime() {
                return this.value.customDatetime
            },
        },

        methods: {
            xxx() {
                // Math.floor(121).toFixed()
            },
        },

        i18n: {
            messages: {
                en: {
                    currentTime: "Current or Custom",

                    formats: "Formats",

                    offsets: "Offsets",

                    customDatetime: "Custom Datetime"
                },
                zh: {
                    currentTime: "当前时间",

                    formats: "格式选择",

                    offsets: "偏移量",

                    customDatetime: "自定义日期时间"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-datetime-menu {
        display: flex;

        flex-direction: column;

        //max-height: 320px;

        min-height: 72px;

        min-width: 1px;

        background-color: #F1F1F1;

        border: 1px solid #D8D8D8;

        border-radius: 5px;

        overflow-y: auto;

        //padding: 4px;

        &__offsets {
            display: flex;

            flex-direction: column;

            width: 100%;

            padding-top: 4px;

            &__item {
                display: flex;

                justify-content: space-between;

                width: 96px;

                margin-bottom: 4px;
            }
        }

        &__custom-datetime {
            display: flex;

            align-items: center;

            justify-content: center;

            padding-top: 4px;

            padding-bottom: 4px;

            &__input {
                height: 20px;

                width: 160px;

                border: 1px solid #e0e0e0;

                border-radius: 3px;

                background-color: white;

                font-size: 11px;

                color: $PRIMARY_FONT_COLOR;
            }
        }
    }
</style>
