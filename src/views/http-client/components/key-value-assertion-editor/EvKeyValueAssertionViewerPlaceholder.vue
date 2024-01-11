<template>
    <div class="ev-key-value-assertion-viewer-placeholder">
        <div class="ev-key-value-assertion-editor__name-column">
        </div>

        <div class="ev-key-value-assertion-editor__value-column">
            <ev-label size="10" secondary bold>{{ $t('noTests') }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvKeyValueAssertionViewerPlaceholder",

        components: {
            EvLabel
        },

        i18n: {
            messages: {
                en: {
                    noTests: "No Tests"
                },
                zh: {
                    noTests: "没有设置断言"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvKeyValueAssertionEditor";

    .ev-key-value-assertion-viewer-placeholder {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 24px;

        padding-right: 16px;

        border-bottom: 1px solid #EAEAEA;

        user-select: none;
    }
</style>
