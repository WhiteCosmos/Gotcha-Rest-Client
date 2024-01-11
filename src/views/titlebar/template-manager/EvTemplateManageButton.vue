<template>
    <div class="ev-project-export-button" @click="doExport">
        <ev-export-icon></ev-export-icon>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-label size="11" bold secondary>{{ $t('label') }}</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvExportIcon from '@/views/http-client/icon/ev-export-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    export default {
        name: "EvTemplateManageButton",

        components: {
            EvVerticalGutter,
            EvExportIcon,
            EvLabel
        },

        methods: {
            doExport() {
                this.$emit('export')
            },
        },

        i18n: {
            messages: {
                en: {
                    label: "Template Manage",
                },
                zh: {
                    label: "模板管理",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-export-button {
        display: flex;

        align-items: center;

        width: fit-content;

        height: 28px;

        padding-left: 8px;

        padding-right: 8px;

        user-select: none;

        @include component-shadow;

        @include white-background-gradient;

        border-radius: 5px;

        padding-top: 1px;
    }
</style>
