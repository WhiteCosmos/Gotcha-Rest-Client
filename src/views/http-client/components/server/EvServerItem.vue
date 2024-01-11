<template>
    <div class="ev-server-item">
        <div class="ev-server-item__row" style="border-bottom: 1px solid #E0E0E0">
            <!--            <ev-icon-wrapper>-->
            <ev-drag-icon class="ev-server-item-drag-handler"></ev-drag-icon>
            <!--            </ev-icon-wrapper>-->

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <div class="d-flex" style="flex: 1">
                <ev-basic-input :placeholder="$t('placeholder')" v-model="server.name"></ev-basic-input>
            </div>

            <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>

            <div class="ev-icon-wrapper" @click="$emit('remove')">
                <ev-remove-icon></ev-remove-icon>
            </div>
        </div>

        <div class="ev-server-item__row" style="border-bottom: 1px solid #E0E0E0">
            <ev-export-check-box v-model="server.isBindEnvironment"></ev-export-check-box>

            <!--            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

            <!--            <ev-label size="11" bold secondary>{{ $t('bindEnvironment') }}</ev-label>-->

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-selector :values="environments"
                         value-key="name"
                         v-model="selectedEnvironment"
                         :disabled="!isBindEnvironment"
                         :disabled-message="$t('disabledMessage')"></ev-selector>
        </div>

        <div class="ev-server-item__row" v-if="isRequestUrlAvailable">
            <div class="d-flex" style="flex: 1">
                <ev-basic-input placeholder="httpbin.org" v-model="requestUrl.host"></ev-basic-input>
            </div>

            <ev-label size="11" bold secondary style="margin-left: 2px; margin-right: 2px">:</ev-label>

            <div style="width: 40px">
                <ev-basic-input placeholder="80" v-model="requestUrl.port"></ev-basic-input>
            </div>

            <ev-label size="11" bold secondary style="margin-left: 2px; margin-right: 2px">/</ev-label>

            <div style="width: 64px">
                <ev-basic-input placeholder="path" v-model="requestUrl.basePath"></ev-basic-input>
            </div>
        </div>

        <div class="ev-server-item__row" v-else>
            <ev-label size="11" grey bold>没有可用的环境</ev-label>
        </div>
    </div>
</template>

<script>
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider.vue'
    import EvBasicInput from '@/components/input/EvBasicInput.vue'
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvDeleteIcon from '@/views/http-client/icon/ev-delete-icon.vue'
    import EvRemoveIcon from '@/components/icon/ev-remove-icon.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox.vue'
    import EvSelector from '@/components/selector/EvSelector.vue'
    import EvStoreMixin from '@/mixins/EvStoreMixin.vue'
    import RabiHttpRequestUrl from '@/data/gotcha/http-operation/RabiHttpRequestUrl'
    import EvIconWrapper from '@/components/layout/EvIconWrapper.vue'
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon.vue'

    export default {
        name: "EvServerItem",

        components: {
            EvDragIcon,
            EvIconWrapper,
            EvSelector,
            EvExportCheckBox,
            EvVerticalGutter,
            EvRemoveIcon,
            EvDeleteIcon,
            EvLabel,
            EvBasicInput,
            EvHorizonDivider
        },

        mixins: [
            EvStoreMixin,
        ],

        created() {
            this.initialize()
        },

        props: {
            server: Object,
        },

        computed: {
            requestUrl() {
                if (this.isBindEnvironment) {
                    let requestUrls = this.server.requestUrls

                    let requestUrl = requestUrls[this.selectedEnvironment.uid]

                    if (requestUrl) {
                        return requestUrl
                    } else {
                        requestUrl = new RabiHttpRequestUrl()

                        this.$set(requestUrls, this.selectedEnvironment.uid, requestUrl)

                        return requestUrl
                    }
                } else {
                    return this.server.requestUrl
                }
            },

            isRequestUrlAvailable() {
                return !this.isBindEnvironment || !_.isEmpty(this.environments)
            },

            environments() {
                return this.currentEnvironments.environments
            },

            isBindEnvironment() {
                return this.server && this.server.isBindEnvironment === 'CHECKED'
            },
        },

        watch: {
            // isBindEnvironment(newVal) {
            //     if (newVal === 'CHECKED') {
            //
            //     }
            // },
        },

        data() {
            return {
                selectedEnvironment: undefined,
            }
        },

        methods: {
            initialize() {
                let environments = this.environments

                if (!_.isEmpty(environments)) {
                    this.selectedEnvironment = environments[0]
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    bindEnvironment: "Bind",

                    disabledMessage: "No Binding Environment",

                    placeholder: "Server Name",
                },
                zh: {
                    bindEnvironment: "绑定环境",

                    disabledMessage: "未绑定环境",

                    placeholder: "服务器名称",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-server-item {
        display: flex;

        flex-direction: column;

        width: 300px;

        height: 120px;

        background-color: #F5F5F5;

        @include mac-shadow;

        border-radius: 5px;

        //margin-left: 8px;

        margin-bottom: 12px;

        margin-right: 12px;

        &__row {
            display: flex;

            align-items: center;

            height: 40px;

            //border-top: 1px solid #E0E0E0;

            padding-left: 8px;

            padding-right: 8px;
        }
    }

    .ev-icon-wrapper {
        @include full-center;

        width: 20px;

        height: 20px;

        transition: background-color 100ms;

        border-radius: 2px;

        &:hover {
            background-color: #ffe6e6;
        }
    }

    .ev-server-item-drag-handler {

    }
</style>
