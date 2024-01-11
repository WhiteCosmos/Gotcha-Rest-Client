<template>
    <div class="column-block">
        <div class="d-flex">
            <div class="d-flex flex-shrink-0">
                <span class="column-block-title column-block-title__example">{{ $t('JavaColumnDescription.exampleValue') }} : </span>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span class="column-block-value">{{ exampleValue }}</span>
        </div>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvKVTag from '@/components/typography/EvKVTag'

    export default {
        name: "java-column-example-value-block",

        components: {
            EvKVTag,
            EvVerticalGutter,
            EvHorizonGutter
        },

        props: {
            exampleValue: [String, Number, Array, Object, Boolean],
        },

        computed: {}
    }
</script>

<style lang="scss" scoped>
    @import "java-column-block";

</style>
