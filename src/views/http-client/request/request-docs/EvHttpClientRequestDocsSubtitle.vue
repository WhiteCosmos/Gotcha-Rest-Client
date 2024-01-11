<template>
    <div class="ev-http-client-subtitle">
        <div class="ev-text-wrapper">
            <div class="ev-http-client-subtitle__cylinder"></div>
            <span class="ev-http-client-subtitle__text"><slot></slot></span>
        </div>

        <v-spacer></v-spacer>

        <div class="ev-label-wrapper" v-if="showAddButton" @click="$emit('add-item')">
            <ev-label size="11" bold primary>+ {{ $t('addResponse') }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvHttpClientRequestDocsSubtitle",

        components: {
            EvLabel
        },

        props: {
            showAddButton: false,
        },

        i18n: {
            messages: {
                en: {
                    addResponse: "Add Response"
                },
                zh: {
                    addResponse: "添加响应"
                },
                zh_TW: {
                    addResponse: "添加響應"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-subtitle {
        display: flex;

        align-items: center;

        user-select: none;

        &__cylinder {
            position: absolute;

            display: flex;

            width: 100%;

            background-color: #ffec99;

            height: 6px;

            bottom: 2px;
        }

        &__text {
            display: inline-block;

            font-size: 14px;

            font-weight: bold;

            color: $PRIMARY_FONT_COLOR;

            z-index: 1;
        }
    }

    .ev-text-wrapper {
        position: relative;

        display: flex;

        align-items: center;

        width: fit-content;

        height: 20px;

        padding-left: 2px;

        padding-right: 2px;
    }

    .ev-label-wrapper {
        display: flex;

        align-items: center;

        width: fit-content;

        padding-left: 8px;

        padding-right: 8px;

        border: 1px solid #999;

        border-radius: 3px;

        transition: 100ms;

        &:hover {
            border: 1px solid #555;
        }
    }
</style>
