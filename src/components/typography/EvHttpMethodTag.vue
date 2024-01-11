<template>
    <div class="http-method" :class="httpMethodStyle">
        <span class="http-method__font" :class="httpMethodFontStyle">{{ httpMethodName }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvHttpMethodTag",

        props: {
            requestMethod: String
        },

        computed: {
            httpMethodStyle() {
                return {
                    'http-method__GET': this.requestMethod === "GET",
                    'http-method__PUT': this.requestMethod === "PUT",
                    'http-method__POST': this.requestMethod === "POST",
                    'http-method__DELETE': this.requestMethod === "DELETE",
                    'http-method__OTHER': this.isOtherHttpMethod,
                }
            },
            httpMethodFontStyle() {
                if (!this.selected)
                    return {
                        'http-method__font__GET': this.requestMethod === "GET",
                        'http-method__font__PUT': this.requestMethod === "PUT",
                        'http-method__font__POST': this.requestMethod === "POST",
                        'http-method__font__DELETE': this.requestMethod === "DELETE",
                        'http-method__font__OTHER': this.isOtherHttpMethod,
                    }
            },
            httpMethodName() {
                if (this.requestMethod === "DELETE") {
                    return "DEL"
                }

                return this.requestMethod
            },
            isOtherHttpMethod() {
                return this.requestMethod !== "GET"
                    && this.requestMethod !== "PUT"
                    && this.requestMethod !== "POST"
                    && this.requestMethod !== "DELETE"
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "../style/common";

    .http-method {
        height: 16px;

        padding-left: 4px;

        padding-right: 4px;

        border-radius: 2px;

        padding-top: 1px;

        display: flex;

        justify-content: center;

        align-items: center;

        user-select: none;

        &__GET {
            border: 1px solid #87b35b;

            background-color: #f8fff2;
        }

        &__PUT {
            border: 1px solid #f3d23e;

            background-color: #fffdf2;
        }

        &__POST {
            border: 1px solid #f3ab3e;

            background-color: #fffaf2;
        }

        &__DELETE {
            border: 1px solid #FF8282;

            background-color: #fff2f2;
        }

        &__OTHER {
            border: 1px solid #007AFF;

            background-color: #f2f8ff;
        }
    }

    .http-method__font {
        font-size: 10px;

        line-height: 16px;

        font-weight: bold;

        &__GET {
            color: #87b35b;
        }

        &__PUT {
            color: #f3d23e;
        }

        &__POST {
            color: #f3ab3e;
        }

        &__DELETE {
            color: #FF8282;
        }

        &__OTHER {
            color: #007AFF;
        }
    }

</style>
