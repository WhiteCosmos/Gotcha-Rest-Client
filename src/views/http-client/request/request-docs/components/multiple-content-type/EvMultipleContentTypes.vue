<template>
    <div class="ev-multiple-content-types">
        <ev-multiple-content-type-item v-for="(type, idx) in contentTypes"
                                       @remove="removeContentType(idx)"
                                       :value="type"></ev-multiple-content-type-item>

        <div class="ev-input-wrapper">
            <ev-borderless-input ref="ev-borderless-input"
                                 placeholder="Content-Type..."
                                 @blur="addContentType"></ev-borderless-input>
        </div>
    </div>
</template>

<script>
    import EvMultipleContentTypeItem from '@/views/http-client/request/request-docs/components/multiple-content-type/EvMultipleContentTypeItem'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'

    export default {
        name: "EvMultipleContentTypes",

        components: {
            EvBorderlessInput,
            EvMultipleContentTypeItem
        },

        props: {
            contentTypes: Array
        },

        created() {
            this.initialize()
        },

        data() {
            return {}
        },

        methods: {
            initialize() {
                if (this.contentTypes.length === 0) {
                    this.contentTypes.push('application/json')
                }
            },

            addContentType(value) {
                if (!value) {
                    return
                }

                let ref = this.$refs['ev-borderless-input']

                this.contentTypes.push(value)

                ref.clear()
            },

            removeContentType(idx) {
                this.contentTypes.splice(idx, 1)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-multiple-content-types {
        display: flex;

        //flex-direction: row;

        align-items: center;

        flex-wrap: wrap;

        min-height: 28px;

        width: 100%;

        padding-left: 8px;

        padding-right: 8px;

        //background-color: #FF8282;

        border-bottom: 1px solid #F1F1F1;
    }

    .ev-input-wrapper {
        height: 20px;

        margin-left: 8px;

        margin-top: 4px;

        margin-bottom: 4px;
    }
</style>
