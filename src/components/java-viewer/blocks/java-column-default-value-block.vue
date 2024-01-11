<template>
    <div class="column-block">
        <span class="column-block-title column-block-title__default">{{ $t('JavaColumnDescription.defaultValue') }} :</span>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <span class="column-block-value">{{ defaultValue }}</span>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "java-column-default-value-block",

        components: {
            EvVerticalGutter,
            EvHorizonGutter
        },

        props: {
            defaultValue: [String, Number, Object, Array, Boolean]
        }
    }
</script>

<style lang="scss" scoped>
    @import "java-column-block";

</style>
