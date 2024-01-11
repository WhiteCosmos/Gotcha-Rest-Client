<template>
    <div class="ev-project-tag">
        <span class="ev-project-tag__label"><slot></slot></span>
    </div>
</template>

<script>
    export default {
        name: "EvProjectTag",

        props: {
            project: Object
        },

        computed: {}
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-tag {
        display: flex;

        align-items: center;

        width: fit-content;

        padding-left: 4px;

        padding-right: 4px;

        background-color: #f2f7eb;

        border-radius: 2px;

        height: 16px;

        user-select: none;

        &--java-project {

        }

        &--swagger-project {

        }

        &__label {
            font-size: 10px;

            line-height: 16px;

            font-weight: 500;

            color: $GREEN_COLOR;
        }
    }
</style>
