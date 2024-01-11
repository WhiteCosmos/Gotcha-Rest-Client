<template>
    <div class="ev-server-item-placeholder">
        <ev-label size="12" bold grey>+ {{ $t('label') }}</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel.vue'

    export default {
        name: "EvServerItemPlaceholder",

        components: {
            EvLabel
        },

        i18n: {
            messages: {
                en: {
                    label: "Add Server"
                },
                zh: {
                    label: "添加服务器"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-server-item-placeholder {
        display: flex;

        align-items: center;

        justify-content: center;

        width: 300px;

        height: 120px;

        background-color: #F5F5F5;

        border: 1px dashed #E0E0E0;

        border-radius: 5px;

        margin-bottom: 12px;

        margin-right: 12px;

        transition: background-color 100ms;

        &:hover {
            background-color: #F1F1F1;
        }
    }
</style>
