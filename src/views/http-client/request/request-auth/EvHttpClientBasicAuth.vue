<template>
    <div class="d-flex flex-column">
        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" bold secondary>Basic Auth</ev-label>
            </div>
            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>Username</ev-label>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input sizie="12" dense placeholder="username" v-model="value.username"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>Password</ev-label>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input size="12" dense password placeholder="password" v-model="value.password"></ev-borderless-input>
            </div>
        </div>

        <!--        <div class="ev-row">-->
        <!--            <div class="ev-row__key-part">-->
        <!--                <ev-label size="12" primary>Encoding</ev-label>-->
        <!--            </div>-->

        <!--            <div class="ev-row__value-part">-->
        <!--                <ev-borderless-input size="12" dense placeholder="UTF-8"></ev-borderless-input>-->
        <!--            </div>-->
        <!--        </div>-->
    </div>

    <!--    <div class="ev-http-client-basic-auth">-->
    <!--        <div class="d-flex align-center">-->
    <!--            <ev-label size="11" :width="72" blue>Username :</ev-label>-->

    <!--            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

    <!--            <div class="ev-http-client-basic-auth__input-container">-->
    <!--                <ev-borderless-input dense v-model="basicAuth.username" placeholder="username"></ev-borderless-input>-->
    <!--            </div>-->
    <!--        </div>-->

    <!--        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>-->

    <!--        <div class="d-flex align-center">-->
    <!--            <ev-label size="11" :width="72" blue>Password :</ev-label>-->

    <!--            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

    <!--            <div class="ev-http-client-basic-auth__input-container">-->
    <!--                <ev-borderless-input dense v-model="basicAuth.password" placeholder="password"></ev-borderless-input>-->
    <!--            </div>-->
    <!--        </div>-->

    <!--        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>-->

    <!--        <div class="d-flex align-center">-->
    <!--            <ev-label size="11" :width="72" blue>Encoding :</ev-label>-->

    <!--            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>-->

    <!--            <ev-label size="11" grey>UTF-8</ev-label>-->
    <!--        </div>-->
    <!--    </div>-->


</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'

    export default {
        name: "EvHttpClientBasicAuth",

        components: {
            EvBorderlessInput,
            EvVerticalGutter,
            EvHorizonGutter,
            EvLabel,
        },

        props: {
            value: {
                type: Object,
                return: () => {
                    return {
                        username: "",
                        password: "",
                    }
                }
            }
        },

        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "EvHttpClientAuthLayout";

    .ev-http-client-basic-auth {
        display: flex;

        flex-direction: column;

        width: 100%;

        min-width: 1px;

        min-height: 1px;

        height: calc(100vh - 244px);

        user-select: none;

        padding: 32px;

        &__input-container {
            display: flex;

            align-items: center;

            flex: 1;

            min-height: 1px;

            min-width: 1px;

            height: 24px;

            padding-left: 4px;

            border: 1px solid $SECONDARY_COLOR;

            border-radius: 3px;

            background-color: #FCFCFC;
        }
    }
</style>
