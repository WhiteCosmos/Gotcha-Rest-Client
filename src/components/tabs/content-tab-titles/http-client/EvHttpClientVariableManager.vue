<template>
    <div class="d-flex align-center http-client-variable-manager">
        <div class="d-flex align-center http-client-variable-manager__environment-variable">
            <v-icon x-small color="#007AFF">fa-globe</v-icon>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <!--            <span>ALPHA</span>-->

            <ev-label blue bold size="10">ALPHA</ev-label>

            <v-spacer></v-spacer>

            <select-icon></select-icon>
        </div>

        <!--        <v-divider vertical inset></v-divider>-->

        <!--        <div class="d-flex align-center http-client-variable-manager__fixed-variable">-->
        <!--            <v-icon x-small color="#007AFF">fa-square-root-alt</v-icon>-->

        <!--            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>-->

        <!--            &lt;!&ndash;            <span>ALPHA</span>&ndash;&gt;-->

        <!--            <ev-label blue bold size="10">Fixed Variable</ev-label>-->

        <!--            <v-spacer></v-spacer>-->

        <!--            <select-icon></select-icon>-->
        <!--        </div>-->
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLabel from '@/components/typography/EvLabel'
    import SelectIcon from '@/components/icon/select-icon'

    export default {
        name: "EvHttpClientVariableManager",
        components: {SelectIcon, EvLabel, EvVerticalGutter},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-variable-manager {
        height: 28px;

        background-color: #FAFAFA;

        border-radius: 3px;

        border: 1px solid $SECONDARY_COLOR;

        //@include white-background-gradient;

        //@include component-shadow;

        &__environment-variable {
            width: 200px;

            padding-left: 4px;

            padding-right: 8px;
        }

        &__fixed-variable {
            width: 120px;

            padding-left: 8px;

            padding-right: 4px;
        }
    }
</style>
