<template>
    <div class="project-overview">
        <div class="project-overview__title-container">
            <span class="project-overview__title-container__label">{{ name }}</span>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <span class="project-overview__title-container__version-label">{{ version }}</span>
        </div>

        <!--  Swagger Base Url -->

        <div class="project-overview__url-container d-flex align-center">
            <span class="project-overview__url-container__label" v-if="baseUrl">[ Base URL : {{ baseUrl }} ]</span>
        </div>

        <div class="d-flex flex-column">
            <ev-row style="height: 28px" v-if="termsOfService">
                <a :href="termsOfService">Terms Of Service</a>
            </ev-row>

            <ev-row style="height: 28px" v-if="hasContact">
                <a :href="contactUrl">{{ contactName }}</a>

                <div class="d-flex" style="height: 16px; margin-left: 8px; margin-right: 8px" v-if="contactName && contactEmail">
                    <ev-vertical-divider></ev-vertical-divider>
                </div>

                <a :href="'mailto:' + contactEmail" v-if="contactEmail">Contact The Developer</a>

                <!--                <span style="font-size: 11px; font-weight: normal; color: #AABBCC" v-if="contactEmail">Email : {{ contactEmail }}</span>-->
            </ev-row>

            <ev-row style="height: 28px" v-if="hasLicense">
                <a :href="licenseUrl">{{ licenseName }}</a>
            </ev-row>

            <!--            <ev-row style="height: 28px">-->
            <!--                <a href="https://swagger.io/">Find out more about Swagger</a>-->
            <!--            </ev-row>-->
        </div>

        <div class="markdown-container" v-html="description"></div>

        <!--        <ev-project-overview-service :json-service="service" v-for="service in services"></ev-project-overview-service>-->

        <!--        <div class="project-overview__counter-container">-->
        <!--            <ev-project-overview-counter :count="3" label="Services"></ev-project-overview-counter>-->

        <!--            <ev-vertical-gutter :gutter="64"></ev-vertical-gutter>-->

        <!--            <ev-project-overview-counter :count="23" label="APIs"></ev-project-overview-counter>-->

        <!--            <ev-vertical-gutter :gutter="64"></ev-vertical-gutter>-->

        <!--            <ev-project-overview-counter :count="12" label="Models"></ev-project-overview-counter>-->
        <!--        </div>-->

        <ev-project-overview-support></ev-project-overview-support>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvProjectOverviewCounter from '@/views/content/overview/EvProjectOverviewCounter'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import MarkdownIt from 'markdown-it'
    import EvProjectOverviewService from '@/views/content/overview/EvProjectOverviewService'
    import EvRow from '@/components/layout/EvRow'
    import EvRoundTag from '@/components/tag/EvRoundTag'
    import EvVerticalDivider from '@/components/layout/EvVerticalDivider'
    import EvProjectOverviewSupport from '@/views/content/overview/EvProjectOverviewSupport'

    export default {
        name: "EvProjectOverview",

        components: {
            EvProjectOverviewSupport,
            EvVerticalDivider,
            EvRoundTag,
            EvRow,
            EvProjectOverviewService,
            EvHorizonGutter,
            EvProjectOverviewCounter,
            EvVerticalGutter,
        },

        mixins: [
            EvStoreMixin,
        ],

        data() {
            return {
                playground: 'Playground is a default project created by Gotcha, and the version will always be \'1.0.0\'.\n' +
                    '\n' +
                    'You can test any feature with [https://httpbin.org](https://httpbin.org/).\n'
            }
        },

        computed: {
            name() {
                return this.currentProject ? this.currentProject.name : ""
            },

            version() {
                return this.currentVersion ? this.currentVersion.name : ""
            },

            description() {
                let md = new MarkdownIt({
                    html: true,
                    linkify: true,
                    typographer: true
                })

                if (this.name === 'Playground') { // TODO more elegant
                    return md.render(this.playground)
                }

                let version = this.currentVersion

                if (!version) {
                    return undefined
                }

                if (version.swagger) {
                    return md.render(version.swagger.description)
                }

                if (version.openapi) {
                    return md.render(version.openapi.description)
                }
            },

            services() {
                let module = this.currentModule

                if (!module) {
                    return
                }

                return module.restfulApis ? module.restfulApis : []
            },

            baseUrl() {
                let version = this.currentVersion

                if (!version) {
                    return undefined
                }

                return version.baseUrl
            },

            termsOfService() {
                let version = this.currentVersion

                if (version.swagger) {
                    let swagger = version.swagger

                    return swagger.termsOfService
                }

                if (version.openapi) {
                    let openapi = version.openapi

                    return openapi.termsOfService
                }
            },

            hasContact() {
                let version = this.currentVersion

                if (version.swagger) {
                    let swagger = version.swagger

                    return swagger.contact
                }

                if (version.openapi) {
                    let openapi = version.openapi

                    return openapi.contact
                }

                return false
            },

            contactName() {
                let version = this.currentVersion

                if (version.swagger) {
                    let swagger = version.swagger

                    return swagger.contact.name
                }

                if (version.openapi) {
                    let openapi = version.openapi

                    return openapi.contact.name
                }
            },

            contactUrl() {
                let version = this.currentVersion

                if (version.swagger) {
                    let swagger = version.swagger

                    return swagger.contact.url
                }

                if (version.openapi) {
                    let openapi = version.openapi

                    return openapi.contact.url
                }
            },

            contactEmail() {
                let version = this.currentVersion

                if (version.swagger) {
                    let swagger = version.swagger

                    return swagger.contact.email
                }

                if (version.openapi) {
                    let openapi = version.openapi

                    return openapi.contact.email
                }
            },

            hasLicense() {
                let version = this.currentVersion

                if (version.swagger) {
                    let swagger = version.swagger

                    return swagger.license
                }

                if (version.openapi) {
                    let openapi = version.openapi

                    return openapi.license
                }

                return false
            },

            licenseName() {
                let version = this.currentVersion

                if (version.swagger) {
                    let swagger = version.swagger

                    return swagger.license.name
                }

                if (version.openapi) {
                    let openapi = version.openapi

                    return openapi.license.name
                }
            },

            licenseUrl() {
                let version = this.currentVersion

                if (version.swagger) {
                    let swagger = version.swagger

                    return swagger.license.name
                }

                if (version.openapi) {
                    let openapi = version.openapi

                    return openapi.license.name
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/sidebar.scss";

    @import "~@/styles/markdown.scss";

    .project-overview {
        position: relative;

        padding-left: 72px;

        padding-right: 72px;

        padding-top: 32px;

        background-color: white;

        height: calc(100vh - 128px + 32px);

        overflow-y: scroll;

        &__title-container {
            height: 56px;

            display: flex;

            align-items: center;

            user-select: none;

            &__label {
                font-size: 40px;

                font-weight: bolder;

                color: $PRIMARY_FONT_COLOR;
            }

            &__version-label {
                font-size: 12px;

                font-weight: bolder;

                color: $GREEN_COLOR;

                align-self: flex-start;
            }
        }

        &__url-container {
            display: flex;

            align-items: center;

            height: 40px;

            &__label {
                font-size: 12px;

                //font-weight: bolder;

                color: #007AFF;
            }
        }

        &__link-container {
            min-height: 56px;

            max-width: 720px;
        }

        &__counter-container {
            display: flex;

            align-items: center;

            height: 196px;
        }
    }

    a {
        &:link {
            font-size: 12px;

            color: $SECONDARY_COLOR;

            text-decoration: none;
        }

        &:hover {
            color: $PRIMARY_COLOR;
        }
    }
</style>
