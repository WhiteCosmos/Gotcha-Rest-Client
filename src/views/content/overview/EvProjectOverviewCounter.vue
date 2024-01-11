<template>
    <div class="project-overview-counter">
        <span class="project-overview-counter__number-label">{{ count }}</span>

        <span class="project-overview-counter__text-label">{{ label }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvProjectOverviewCounter",

        props: {
            count: {
                type: Number,

                default: 0,
            },

            label: {
                type: String,

                default: "Label"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .project-overview-counter {
        width: 128px;

        height: 128px;

        background-color: #FAFAFA;

        border: 1px solid #F1F1F1;

        border-radius: 8px;

        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: center;

        user-select: none;

        box-shadow: 0 2px 8px -4px #E0E0E0;

        &__number-label {
            font-size: 32px;

            font-weight: bolder;

            color: $SECONDARY_COLOR;
        }

        &__text-label {
            font-size: 11px;

            //font-weight: bolder;

            color: #AABBCC;
        }
    }
</style>
