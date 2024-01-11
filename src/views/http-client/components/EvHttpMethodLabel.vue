<template>
    <div class="http-method-label">
        <span class="http-method-label__label" :class="labelClasses">{{ value }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvHttpMethodLabel",

        props: {
            value: String
        },

        computed: {
            labelClasses() {
                if (['get', 'head'].includes(this.value.toLowerCase())) {
                    return [
                        'http-method-label__label--get'
                    ]
                }

                if (['post', 'put', 'patch'].includes(this.value.toLowerCase())) {
                    return [
                        'http-method-label__label--put'
                    ]
                }

                if (this.value.toLowerCase() === "delete") {
                    return [
                        'http-method-label__label--delete'
                    ]
                }

                if (['trace', 'options'].includes(this.value.toLowerCase())) {
                    return [
                        'http-method-label__label--special'
                    ]
                }

                return ['http-method-label__label--custom']
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-method-label {
        display: flex;

        align-items: center;

        height: 28px;

        width: fit-content;

        padding-left: 12px;

        padding-right: 12px;

        user-select: none;

        padding-top: 2px;

        &__label {
            font-size: 12px;

            line-height: 16px;

            font-weight: bold;

            &--get {
                color: $SYSTEM_GREEN_DARK;
            }

            &--head {
                color: $SYSTEM_GREEN_DARK;
            }

            &--put {
                color: $ORANGE_COLOR;
            }

            &--post {
                color: $ORANGE_COLOR;
            }

            &--patch {
                color: $ORANGE_COLOR;
            }

            &--delete {
                color: $RED_COLOR;
            }

            &--special {
                color: #8f70cc;
            }

            &--custom {
                color: #635dff
            }

            &--default {
                color: $PRIMARY_COLOR;
            }
        }
    }
</style>
