<template>
    <div class="ev-dot-tag">
        <div class="ev-dot-wrapper" :class="styles"></div>
    </div>
</template>

<script>
    export default {
        name: "EvDotTag",

        props: {
            green: Boolean,

            red: Boolean,

            grey: Boolean,
        },

        computed: {
            styles() {
                if (this.green) {
                    return ['ev-dot-wrapper--green']
                }

                if (this.red) {
                    return ['ev-dot-wrapper--red']
                }

                if (this.grey) {
                    return ['ev-dot-wrapper--grey']
                }

                return ['ev-dot-wrapper--green']
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-dot-tag {
        @include full-center;

        width: 14px;

        height: 14px;
    }

    .ev-dot-wrapper {
        width: 6px;

        height: 6px;

        border-radius: 6px;

        &--green {
            background-color: $GREEN_COLOR;
        }

        &--red {
            background-color: $RED_COLOR;
        }

        &--yellow {
            background-color: $YELLOW_COLOR;
        }

        &--grey {
            border: 1px solid $PLACEHOLDER_FONT_COLOR;
        }
    }

    .ev-dot {

    }
</style>
