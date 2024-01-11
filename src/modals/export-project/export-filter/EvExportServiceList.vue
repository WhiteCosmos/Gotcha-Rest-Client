<template>
    <div class="service-list">
        <div class="service-list__title" @click="toggle">
            <div class="service-list__title__icon">
                <v-icon color="#007AFF" x-small v-if="expand_">fa-angle-down</v-icon>

                <v-icon color="#E0E0E0" x-small v-else>fa-angle-right</v-icon>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span class="service-list__text">{{ name }}</span>

            <div style="display: flex; flex: 1; padding-left: 8px; padding-right: 16px">
                <ev-horizon-divider></ev-horizon-divider>
            </div>
        </div>

        <ev-export-service-item v-if="expand_"
                                v-for="jsonService in jsonServices"
                                :selected-json-module="selectedJsonModule"
                                :selected-json-service="selectedJsonService"
                                :json-service="jsonService"
                                @click.native="doSelectJsonService(jsonService)"></ev-export-service-item>
    </div>
</template>

<script>
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvExportServiceItem from '@/modals/export-project/export-filter/EvExportServiceItem'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import _ from 'lodash'
    import EvExportFilterProps from '@/modals/export-project/export-filter/EvExportFilterProps'

    export default {
        name: "EvExportServiceList",

        components: {
            EvVerticalGutter,
            EvExportServiceItem,
            EvHorizonDivider
        },

        mixins: [
            EvExportFilterProps,
        ],

        props: {
            name: String,
        },

        mounted() {
            if (_.isEmpty(this.jsonServices)) {
                this.expand_ = false
            }
        },

        data() {
            return {
                expand_: false,
            }
        },

        methods: {
            toggle() {
                if (_.isEmpty(this.jsonServices)) {
                    return
                }

                this.expand_ = !this.expand_
            }
        },
        watch: {
            jsonServices(newVal) {
                this.expand_ = !_.isEmpty(newVal)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .service-list {
        width: 100%;

        display: flex;

        flex-direction: column;
    }

    .service-list__title {
        display: flex;

        height: 32px;

        align-items: center;

        &__icon {
            width: 24px;

            height: 24px;

            @include full-center;
        }
    }

    .service-list__text {
        font-size: 12px;

        color: #AABBCC;

        font-weight: normal;

        &__expand {
            color: $PRIMARY_COLOR;

            font-weight: bold;
        }
    }
</style>
