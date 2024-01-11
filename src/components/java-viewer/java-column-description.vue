<template>
    <div class="field-description-column" :class="columnOnHoverClass">
        <java-column-constraint-block :json-constraint="constraint" v-if="hasConstraint"></java-column-constraint-block>

        <java-column-default-value-block :default-value="defaultValue" v-if="hasDefaultValue"></java-column-default-value-block>

        <java-column-example-value-block :example-value="exampleValue" v-if="hasExampleValue"></java-column-example-value-block>

        <java-column-summary-block :value="summary" v-if="hasFieldSummary"></java-column-summary-block>

        <java-column-summary-placeholder v-if="usingFieldSummaryPlaceholder"></java-column-summary-placeholder>
    </div>
</template>

<script>
    import JsonStructMixin from "./JsonStructMixin"
    import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import JavaColumnConstraintBlock from '@/components/java-viewer/blocks/java-column-constraint-block'
    import JavaColumnDefaultValueBlock from '@/components/java-viewer/blocks/java-column-default-value-block'
    import JavaColumnExampleValueBlock from '@/components/java-viewer/blocks/java-column-example-value-block'
    import JavaColumnSummaryBlock from '@/components/java-viewer/blocks/java-column-summary-block'
    import JavaColumnSummaryPlaceholder from '@/components/java-viewer/blocks/java-column-summary-placeholder'

    export default {
        name: "java-column-description",

        components: {
            JavaColumnSummaryPlaceholder,
            JavaColumnSummaryBlock,
            JavaColumnExampleValueBlock,
            JavaColumnDefaultValueBlock,
            JavaColumnConstraintBlock,
            EvHorizonGutter,
            EvVerticalGutter,
        },

        mixins: [
            JsonStructMixin
        ],

        computed: {
            usingFieldSummaryPlaceholder() {
                return !this.hasFieldSummary
                    && !this.hasExampleValue
                    && !this.hasDefaultValue
                    && !this.hasConstraint
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./java-viewer";

    .field-description-column {
        display: flex;

        flex-direction: column;

        flex: 1;

        min-height: 27px;

        min-width: 0;

        padding-right: 8px;

        border-bottom: 1px solid #F1F1F1;

        user-select: text;
    }

    .java-comment {
        word-break: break-word;

        font-size: 11px;

        font-weight: bold;

        color: $SECONDARY_FONT_COLOR;

        line-height: 16px;
    }
</style>
