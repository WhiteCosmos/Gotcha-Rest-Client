<template>
    <div class="tag d-flex">
        <div class="key-tag d-flex align-center">
            <span class="key-style">{{ k }}</span>
        </div>

        <div class="value-tag d-flex align-center">
            <span class="value-style text-truncate">{{ v }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EvKVTag",

        props: {
            k: {
                type: String,

                default: "Key"
            },

            v: {
                type: String,

                default: "Value"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .tag {
        height: 20px;

        user-select: none;
    }

    .key-tag {
        background: rgb(0, 122, 255);

        background: linear-gradient(0deg, rgba(0, 122, 255, 1) 0%, rgb(100, 172, 250) 100%);

        padding-left: 8px;

        padding-right: 8px;

        border-radius: 2px 0 0 2px;
    }

    .value-tag {
        padding-left: 12px;

        padding-right: 12px;

        background: rgb(241, 241, 241);

        background: linear-gradient(0deg, rgba(241, 241, 241, 1) 0%, rgba(250, 250, 250, 1) 100%);

        border-radius: 0 2px 2px 0;

        max-width: 320px;
    }

    .key-style {
        font-size: 11px;

        color: white;

        font-weight: bold;
    }

    .value-style {
        font-size: 11px;

        color: $PRIMARY_COLOR;

        font-weight: bold;
    }
</style>
