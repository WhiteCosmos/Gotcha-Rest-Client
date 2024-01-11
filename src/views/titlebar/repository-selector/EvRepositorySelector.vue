<template>
    <div class="repository-selector" @click="onGithubClick">
        <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>

        <github-icon></github-icon>

        <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>

        <ev-label size="11" primary bold>Github</ev-label>

        <v-spacer></v-spacer>

        <ev-label size="11" secondary bold>{{ star_count }} Star</ev-label>
    </div>
</template>

<script>
import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
import EvHorizonDivider from "@/components/layout/EvHorizonDivider"
import DesktopIcon from '@/components/icon/desktop-icon'
import EvStoreMixin from '@/mixins/EvStoreMixin'
import EvLabel from '@/components/typography/EvLabel'
import GithubIcon from "@/components/icon/github-icon.vue";
import got from 'got'
import {shell} from "electron";

export default {
    name: "EvRepositorySelector",

    components: {
        GithubIcon,
        EvLabel,
        DesktopIcon,
        EvHorizonDivider,
        EvVerticalGutter
    },

    mixins: [
        EvStoreMixin,
    ],

    mounted() {
        this.getGithubRepo()
    },

    data() {
        return {
            onClick: false,

            showRepositoryOptions: false,

            star_count: 0,
        }
    },

    methods: {
        async getGithubRepo() {
            const data = await got.get('https://api.github.com/repos/WhiteCosmos/Gotcha-Rest-Client').json()

            this.star_count = data['stargazers_count'] || 0
        },

        onGithubClick() {
            const {shell} = require('electron')

            shell.openExternal('https://github.com/WhiteCosmos/Gotcha-Rest-Client')
        }
    }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .repository-selector {
        display: flex;

        align-items: center;

        width: 192px;

        height: 28px;

        padding-right: 8px;

        user-select: none;

        margin-left: 80px;

        @include component-shadow;

        @include white-background-gradient;

        border-radius: 5px;
    }

    .repository-selector__font {
        font-size: 11px;

        font-weight: bold;

        color: $PRIMARY_FONT_COLOR;
    }
</style>
