<template>
    <div class="ev-query-parameters-array-format-label">
        <ev-label bold secondary size="11">{{ $t('arrayFormat') }}:</ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-label bold secondary size="11">{{ arrayFormat }}</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvQueryParametersArrayFormatLabel",

        components: {
            EvVerticalGutter,
            EvLabel
        },

        props: {
            arrayFormat: String
        },

        i18n: {
            messages: {
                en: {
                    arrayFormat: "Array Format"
                },
                zh: {
                    arrayFormat: "数组格式"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";


    .ev-query-parameters-array-format-label {
        display: flex;

        align-items: center;

        width: fit-content;
    }
</style>
