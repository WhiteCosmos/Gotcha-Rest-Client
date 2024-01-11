<template>
    <div class="ev-export__item" @click="toggleItemCheckedStatus(jsonMethod)">
        <div class="ev-export__icon" style="width: 56px">
            <ev-export-check-box v-model="jsonMethod.checkedStatus" @click.native.stop=""></ev-export-check-box>
        </div>

        <div class="ev-export__body">
            <div class="d-flex align-center">
                <ev-http-method-tag :request-method="methodTitlePrefix" v-if="methodTitlePrefix"></ev-http-method-tag>

                <ev-vertical-gutter :gutter="4" v-if="methodTitlePrefix"></ev-vertical-gutter>

                <span class="service-name text-truncate">{{ methodTitle }}</span>
            </div>

            <span class="service-comment text-truncate">{{ methodSubtitle }}</span>
        </div>
    </div>
</template>

<script>
    import EvExportTypeToggleButton from '@/modals/export-project/export-type/EvExportTypeToggleButton'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvHttpMethodTag from '@/components/typography/EvHttpMethodTag'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvExportFilterMixin from '@/modals/export-project/export-filter/EvExportFilterMixin'

    export default {
        name: "EvExportMethodItem",

        components: {
            EvVerticalGutter,
            EvHttpMethodTag,
            EvExportCheckBox,

            EvExportTypeToggleButton
        },

        mixins: [
            EvExportFilterMixin,
        ],

        watch: {
            'jsonMethod.checkedStatus'() {
                this.watchMethodCheckedStatus(this.jsonMethod)
            }
        },

        computed: {
            methodTitle() {
                let jsonMethod = this.jsonMethod

                if (jsonMethod.isJavaService) {
                    return jsonMethod.methodName
                }

                if (this.jsonMethod.isHttpService) {
                    return jsonMethod.requestPath
                }
            },

            methodTitlePrefix() {
                if (this.jsonMethod.isHttpService) {
                    return this.jsonMethod.requestMethod
                }
            },

            methodSubtitle() {
                let jsonMethod = this.jsonMethod

                if (jsonMethod.isJavaService) {
                    return jsonMethod.summary || "/"
                }

                if (jsonMethod.isHttpService) {
                    return jsonMethod.summary || jsonMethod.methodName
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "export-filter";

    .service-name {
        font-size: 12px;

        line-height: 24px;

        font-weight: bold;

        color: $SECONDARY_FONT_COLOR;

        width: 160px;
    }

    .service-comment {
        font-size: 12px;

        line-height: 24px;

        color: $SECONDARY_FONT_COLOR;

        width: 160px;
    }
</style>
