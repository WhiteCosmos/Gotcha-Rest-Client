<template>
    <div class="tree-view-node-wrapper">
        <ev-api-definition-node :parent-node="parentNode"
                                :node="node"
                                :layer="layer"></ev-api-definition-node>

        <!--        <ev-api-definition-node-divider label="HTTP Request"></ev-api-definition-node-divider>-->

        <!--        <ev-api-definition-node-divider label="HTTP Mock"></ev-api-definition-node-divider>-->

        <ev-http-operation-node-wrapper></ev-http-operation-node-wrapper>

        <ev-mock-operation-node-wrapper></ev-mock-operation-node-wrapper>
    </div>
</template>

<script>
    import EvApiDefinitionNode from '@/components/api-tree/node/EvApiDefinitionNode'
    import EvApiDefinitionNodeDivider from '@/components/api-tree/node/EvApiDefinitionNodeDivider'
    import EvHttpOperationNodeWrapper from '@/components/api-tree/node/EvHttpOperationNodeWrapper'
    import EvMockOperationNodeWrapper from '@/components/api-tree/node/EvMockOperationNodeWrapper'

    export default {
        name: "EvApiDefinitionNodeWrapper",

        components: {
            EvMockOperationNodeWrapper,
            EvHttpOperationNodeWrapper,
            EvApiDefinitionNodeDivider,
            EvApiDefinitionNode
        },

        mixins: [
        ]
    }
</script>

<style lang="scss" scoped>
    @import "../EvApiTreeView";

</style>
