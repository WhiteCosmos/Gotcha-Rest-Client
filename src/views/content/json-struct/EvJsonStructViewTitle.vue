<template>
    <div class="document-api-title d-flex flex-column">
        <span class="service-comment">{{ fieldComment || '\xa0' }}</span>

        <div class="d-flex align-center">

            <span class="api-comment">{{ fieldType }}</span>

            <EvVerticalGutter :gutter="16"></EvVerticalGutter>

            <ev-square-tag color="green">{{ jsonStruct.isEnumType ? 'ENUM' : 'MODEL' }}</ev-square-tag>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-square-tag color="grey" v-if="jsonStruct.isDeprecated">Deprecated</ev-square-tag>

            <EvVerticalGutter :gutter="8"></EvVerticalGutter>

            <v-spacer></v-spacer>

            <ev-export-button></ev-export-button>
        </div>

        <!--        <span class="api-service">{{ structContent.fieldName }}</span>-->

        <span class="api-service">{{ jsonStruct.fieldQualifiedName }}</span>

        <EvHorizonGutter :gutter="16"></EvHorizonGutter>

        <div class="d-flex" v-if="jsonStruct.javadocTags">
            <EvVerticalGutter :gutter="4"></EvVerticalGutter>

            <div class="d-flex" v-for="tag in jsonStruct.javadocTags">
                <EvKVTag :k="tag.tagName" :v="tag.tagValue" v-if="tag.tagValue"></EvKVTag>

                <EvVerticalGutter :gutter="16" v-if="tag.tagValue"></EvVerticalGutter>
            </div>
        </div>
    </div>
</template>

<script>
    import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
    import EvHorizonGutter from "@/components/layout/EvHorizonGutter"
    import EvKVTag from "@/components/typography/EvKVTag"
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import JsonStructFieldMixin from '@/components/java-viewer/mixins/JsonStructFieldMixin'
    import EvSquareTag from '@/components/tag/EvSquareTag'
    import EvExportButton from '@/views/content/EvExportButton'

    export default {
        name: "EvJsonStructViewTitle",

        components: {EvExportButton, EvSquareTag, EvKVTag, EvHorizonGutter, EvVerticalGutter},

        mixins: [
            EvStoreMixin,
            JsonStructFieldMixin
        ],
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .document-api-title {
        width: 100%;
    }

    .api-comment {
        font-size: 28px;

        line-height: 40px;

        font-weight: bold;

        color: #007AFF;
    }

    .api-service {
        font-size: 16px;

        line-height: 40px;

        font-weight: bolder;

        color: $SECONDARY_FONT_COLOR;

        text-indent: 2px;
    }

    .service-comment {
        font-size: 12px;

        line-height: 40px;

        font-weight: normal;

        color: #AABBCC;

        text-indent: 4px;
    }
</style>
