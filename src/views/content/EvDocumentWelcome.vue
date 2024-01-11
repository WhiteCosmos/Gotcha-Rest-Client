<template>
    <div class="document-welcome d-flex align-center justify-center" id="document-welcome" ref="document-welcome">
        <div class="welcome-container d-flex flex-column align-start justify-start" style="user-select: none">
            <div class="d-flex flex-column">
                <div class="d-flex align-center">
                    <div class="welcome__indicator"></div>

                    <span class="welcome__title">{{ $t("welcome.addProject.title") }}</span>
                </div>

                <!--                <span class="welcome__body">{{ $t("welcome.addProject.subtitle") }}</span>-->
                <span class="welcome__body">
                 {{ $t("welcome.addProject.subtitle_1") }}   <ev-plus-button></ev-plus-button> {{ $t("welcome.addProject.subtitle_2") }}
                </span>

                <span class="welcome__comment">{{ $t("welcome.addProject.ps") }}</span>
            </div>

            <ev-horizon-gutter :gutter="24"></ev-horizon-gutter>

            <div class="d-flex flex-column">
                <div class="d-flex align-center">
                    <div class="welcome__indicator"></div>

                    <span class="welcome__title">{{ $t("welcome.addBranch.title") }}</span>
                </div>

                <span class="welcome__body">{{ $t("welcome.addBranch.subtitle") }}</span>

                <span class="welcome__comment">{{ $t("welcome.addBranch.ps") }}</span>
            </div>

            <ev-horizon-gutter :gutter="24"></ev-horizon-gutter>

            <div class="d-flex flex-column">
                <div class="d-flex align-center">
                    <div class="welcome__indicator"></div>

                    <span class="welcome__title">{{ $t("welcome.supportedFrameworks.title") }}</span>
                </div>

                <span class="welcome__body">{{ $t("welcome.supportedFrameworks.subtitle") }}</span>

                <span class="welcome__comment">{{ $t("welcome.supportedFrameworks.ps") }}</span>
            </div>

            <EvHorizonGutter :gutter="24"></EvHorizonGutter>

            <EvHorizonDivider></EvHorizonDivider>

            <EvHorizonGutter :gutter="24"></EvHorizonGutter>

            <div class="d-flex align-center">
                <div class="d-flex qrcode">
                    <img src="./qrcode.png" width=112 height=112 alt="" style="border-radius: 8px">
                </div>

                <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

                <div class="d-flex align-center">
                    <ul style="margin-left: -8px; user-select: text">
                        <li>{{ $t("welcome.info.userGuideA") }} <a @click="openLink(USER_GUIDE_URL)">{{ $t("welcome.info.userGuideB") }}</a> 😁</li>

                        <li>{{ $t("welcome.info.reportBugA") }}<a @click="openLink(ISSUE_URL)">{{ $t("welcome.info.reportBugB") }}</a> 😱</li>

                        <li>{{ $t("welcome.info.contactA") }}</li>
                        <!--                        <li>扫一扫，加入QQ产品交流群</li>-->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EvHorizonDivider from "@/components/layout/EvHorizonDivider"
    import EvHorizonGutter from "@/components/layout/EvHorizonGutter"
    import EvPlusButton from '@/components/button/EvPlusButton'
    import ProjectIcon from '@/components/icon/project-icon'
    import BranchIcon from '@/components/icon/branch-icon'
    import ModuleIcon from '@/components/icon/module-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvDocumentWelcome",

        components: {
            EvVerticalGutter,
            ModuleIcon,
            BranchIcon,
            ProjectIcon,
            EvPlusButton,
            EvHorizonGutter,
            EvHorizonDivider
        },

        data() {
            return {
                USER_GUIDE_URL: "https://github.com/RabiAPI/RabiAPI-Support/wiki",

                ISSUE_URL: "https://github.com/RabiAPI/RabiAPI-Support/issues"
            }
        },

        methods: {
            openLink(url) {
                const {shell} = require('electron')

                shell.openExternal(url)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .document-welcome {
        position: relative;

        @include absolute-center;

        //width: calc(100vw - 320px);

        //height: calc(100vh - 88px);

        background: white;

        height: 100%;

        padding-bottom: 72px;
    }

    .welcome__indicator {
        width: 8px;

        height: 16px;

        background-color: $PRIMARY_COLOR;
    }

    .welcome__title {
        font-size: 20px;

        font-weight: normal;

        color: $PRIMARY_COLOR;

        line-height: 40px;

        text-indent: 8px;
    }

    .welcome__body {
        font-size: 14px;

        line-height: 32px;

        color: $SECONDARY_FONT_COLOR;

        font-weight: normal;
    }

    .welcome__comment {
        font-size: 12px;

        line-height: 16px;

        color: #b7b7b7;

        font-weight: normal;
    }

    .welcome-container {
        width: 720px;

        //background-color: #eee;

        border-radius: 8px;
    }

    li {
        width: 100%;

        line-height: 40px;

        color: $SECONDARY_FONT_COLOR;

        font-size: 13px;

        font-weight: normal;

        user-select: none;
    }

    a {

    }

    a:hover {
        text-decoration: underline;
    }

    .email {
        user-select: auto;

        font-size: 12px;

        font-weight: normal;

        color: $PRIMARY_COLOR;
    }

    .qrcode {
        @include full-center;

        width: 120px;

        height: 120px;

        background-color: #FAFAFA;

        border-radius: 8px;
    }

    img {
        -webkit-user-drag: none;
    }
</style>
