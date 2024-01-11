<template>
    <div class="ev-app-content-placeholder">
        <div class="ev-app-content-placeholder__container">
            <ev-label secondary bold size="14">{{ $t('EvAppContentPlaceholder.getStarted') }}</ev-label>

            <ev-horizon-gutter :gutter="12"></ev-horizon-gutter>

            <div class="d-flex justify-space-between" style="width: 240px">
                <ev-label primary size="12">{{ $t('EvAppContentPlaceholder.newRequest') }}</ev-label>

                <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

                <ev-label grey size="12">⌃⌘N</ev-label>
            </div>

            <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

            <div class="d-flex justify-space-between" style="width: 240px">
                <ev-label primary size="12">{{ $t('EvAppContentPlaceholder.newGroup') }}</ev-label>

                <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

                <ev-label grey size="12">⇧⌘N</ev-label>
            </div>

            <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

            <div class="d-flex justify-space-between" style="width: 240px">
                <ev-label primary size="12">{{ $t('EvAppContentPlaceholder.importFromFile') }}</ev-label>

                <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

                <ev-label grey size="12">⇧⌘O</ev-label>
            </div>

            <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

            <div class="d-flex justify-space-between" style="width: 240px">
                <ev-label primary size="12">{{ $t('EvAppContentPlaceholder.tip_1') }}</ev-label>
            </div>

            <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

            <div class="d-flex justify-space-between" style="width: 240px">
                <ev-label primary size="12">{{ $t('EvAppContentPlaceholder.tip_2') }}</ev-label>
            </div>

            <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

            <ev-label secondary bold size="14">{{ $t('EvAppContentPlaceholder.help') }}</ev-label>

            <ev-horizon-gutter :gutter="12"></ev-horizon-gutter>

            <ev-label primary size="12">
                <a href="https://github.com/WhiteCosmos/Gotcha-HTTP-Client-Support">{{ $t('EvAppContentPlaceholder.userGuides') }}</a>
            </ev-label>

            <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

            <ev-label primary size="12">
                <a href="https://apps.apple.com/cn/app/gotcha-http-client/id1524200727?l=en&mt=12&action=write-review">{{ $t('EvAppContentPlaceholder.reviewOnAppstore')
                    }}</a>
            </ev-label>

            <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

            <ev-label primary size="12">
                <a href="https://twitter.com/whitecosm0s">{{ $t('EvAppContentPlaceholder.twitter') }}</a>
            </ev-label>

            <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

            <ev-label primary size="12">
                <a href="mailto:support@gotcha.rest">support@gotcha.rest</a>
            </ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvAppContentPlaceholder",

        components: {
            EvVerticalGutter,
            EvHorizonGutter,
            EvLabel
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-app-content-placeholder {
        @include full-center;

        background-color: #FAFAFA;

        width: 100%;

        height: calc(100% - 40px);

        //border-top: 1px solid #e0e0e0;

        &__container {
            display: flex;

            flex-direction: column;

            width: 320px;

            height: 240px;

            margin-bottom: 96px;
        }
    }
</style>
