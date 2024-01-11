<template>
    <div class="struct-title-block">
        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <div class="block-container">
            <span class="title-label">{{ fieldName }}</span>
        </div>

        <div class="block-container">
            <span class="subtitle-label">{{ fieldQualifiedName }}</span>
        </div>

        <div class="block-container" v-if="jsonStruct.tags">
            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <div class="d-flex" v-for="tag in jsonStruct.tags">
                <EvKVTag :k="tag.tagName" :v="tag.tagValue"></EvKVTag>

                <EvVerticalGutter :gutter="16" v-if="tag.tagValue"></EvVerticalGutter>
            </div>
        </div>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvKVTag from '@/components/typography/EvKVTag'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvStructTitleBlock",
        components: {EvHorizonGutter, EvKVTag, EvVerticalGutter},
        props: {
            jsonStruct: Object,
        },

        computed: {
            fieldName() {
                return this.jsonStruct.fieldName
            },

            fieldQualifiedName() {
                return this.jsonStruct.qualifiedName
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .struct-title-block {
        display: flex;

        flex-direction: column;

        min-height: 80px;

        .block-container {
            max-width: 70%;

            height: 40px;

            .title-label {
                font-size: 28px;

                line-height: 32px;

                font-weight: bold;

                color: $PRIMARY_COLOR;
            }

            .subtitle-label {
                font-size: 16px;

                line-height: 40px;

                font-weight: bolder;

                color: $SECONDARY_FONT_COLOR;

                text-indent: 2px;
            }
        }
    }
</style>
