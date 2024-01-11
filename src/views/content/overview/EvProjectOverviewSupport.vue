<template>
    <div class="ev-project-overview-support">
        <!--        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>-->

        <div class="d-flex">
            <div class="ev-project-overview-support__icon">
                <v-icon size="11" color="#007AFF">fa-file</v-icon>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="12" blue>
                <a href="https://github.com/WhiteCosmos/Gotcha-HTTP-Client-Support">
                    Documentation & Guides
                </a>
            </ev-label>
        </div>

        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <div class="d-flex">
            <div class="ev-project-overview-support__icon">
                <v-icon size="11" color="#007AFF">fa-question-circle</v-icon>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="12" blue>
                <a href="https://github.com/WhiteCosmos/Gotcha-HTTP-Client-Support/issues">
                    Feedback
                </a>
            </ev-label>
        </div>

        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <!--        <div class="d-flex">-->
        <!--            <div class="ev-project-overview-support__icon">-->
        <!--                <v-icon size="11" color="#007AFF">fa-twitter</v-icon>-->
        <!--            </div>-->

        <!--            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>-->

        <!--            <ev-label size="12" blue>Twitter</ev-label>-->
        <!--        </div>-->

        <!--        <span>Feedback</span>-->
        <!--        <span>QQ Group(China User): </span>-->
        <!--        <span>Twitter</span>-->
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvProjectOverviewSupport",

        components: {
            EvHorizonGutter,
            EvVerticalGutter,
            EvLabel
        },

        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-overview-support {
        position: fixed;

        display: flex;

        flex-direction: column;

        width: 196px;

        height: calc(100% - 144px);

        top: 144px;

        right: 16px;

        padding-left: 8px;

        //background-color: #FF8282;

        //opacity: 0.5;

        //border-left: 1px solid #F1F1F1;

        &__icon {
            @include full-center;

            width: 16px;

            height: 16px;
        }
    }
</style>
