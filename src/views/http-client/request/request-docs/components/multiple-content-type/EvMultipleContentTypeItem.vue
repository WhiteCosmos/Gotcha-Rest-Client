<template>
    <div class="ev-multiple-content-type-item">
        <ev-label size="11" bold>{{ value }}</ev-label>

        <div class="ev-icon-wrapper" @click="$emit('remove')">
            <ev-cancel-icon color="#000"></ev-cancel-icon>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvDeleteIcon from '@/views/http-client/icon/ev-delete-icon'
    import EvCancelIcon from '@/views/http-client/components/multipart-form-editor/ev-cancel-icon'

    export default {
        name: "EvMultipleContentTypeItem",

        components: {
            EvCancelIcon,
            EvDeleteIcon,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            value: String
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-multiple-content-type-item {
        display: flex;

        align-items: center;

        width: fit-content;

        padding-left: 6px;

        background-color: $YELLOW_COLOR;

        border-radius: 2px;

        height: 20px;

        margin-left: 8px;

        margin-top: 4px;

        margin-bottom: 4px;
    }

    .ev-icon-wrapper {
        @include square(20px, 3px)
    }

</style>
