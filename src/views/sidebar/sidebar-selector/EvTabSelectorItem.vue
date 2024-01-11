<template>
    <div class="tab-menu__item">
        <ev-api-tag v-if="isApiType"></ev-api-tag>

        <ev-bean-tag v-if="isBeanType"></ev-bean-tag>

        <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>

        <span class="tab-menu__item__font" :class="treeTypeColor">{{ treeTypeName }}</span>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-count :count="treeTypeCount"></ev-count>
        <!--        <div class="d-flex align-center">-->
        <!--            <span class="tab-menu__count">[{{ treeTypeCount }}]</span>-->
        <!--        </div>-->
    </div>
</template>

<script>
    import EvBeanTag from '@/views/sidebar/sidebar-selector/EvBeanTag'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCount from '@/components/tag/EvCount'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvTabSelectorMixin from '@/views/sidebar/sidebar-selector/EvTabSelectorMixin'
    import EvApiTag from '@/views/sidebar/sidebar-selector/EvApiTag'
    import EvLightIcon from '@/components/icon/ev-light-icon'

    export default {
        name: "EvTabSelectorItem",

        components: {EvLightIcon, EvApiTag, EvCount, EvVerticalGutter, EvBeanTag},

        mixins: [
            EvStoreMixin,
            EvTabSelectorMixin,
        ],

        props: {
            treeType: String,

            hover: Boolean,
        },

        computed: {
            isApiType() {
                switch (this.treeType) {
                    case this.treeTypes.RESTFUL_APIS:
                        return true
                    case this.treeTypes.JAVA_SERVICES:
                        return true
                    default:
                        return false
                }
            },

            isBeanType() {
                switch (this.treeType) {
                    case this.treeTypes.RESTFUL_MODELS:
                        return true
                    case this.treeTypes.JAVA_MODELS:
                        return true
                    default:
                        return false
                }
            },

            treeTypeName() {
                switch (this.treeType) {
                    case this.treeTypes.RESTFUL_APIS:
                        return this.$t("EvTabSelector.restfulApis")
                    case this.treeTypes.RESTFUL_MODELS:
                        return this.$t("EvTabSelector.restfulModels")
                    case this.treeTypes.JAVA_SERVICES:
                        return this.$t("EvTabSelector.javaServices")
                    case this.treeTypes.JAVA_MODELS:
                        return this.$t("EvTabSelector.javaModels")
                }
            },

            treeTypeCount() {
                switch (this.treeType) {
                    case this.treeTypes.RESTFUL_APIS:
                        return this.restfulApis.length
                    case this.treeTypes.RESTFUL_MODELS:
                        return this.restfulModels.length
                    case this.treeTypes.JAVA_SERVICES:
                        return this.javaServices.length
                    case this.treeTypes.JAVA_MODELS:
                        return this.javaModels.length
                }
            },

            treeTypeColor() {
                switch (this.treeType) {
                    case this.treeTypes.RESTFUL_APIS:
                        return "tab-menu__item__font--blue"
                    case this.treeTypes.RESTFUL_MODELS:
                        return "tab-menu__item__font--green"
                    case this.treeTypes.JAVA_SERVICES:
                        return "tab-menu__item__font--blue"
                    case this.treeTypes.JAVA_MODELS:
                        return "tab-menu__item__font--green"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .tab-menu__item {
        width: 100%;

        height: 32px;

        display: flex;

        align-items: center;

        padding-left: 8px;
    }

    .tab-menu__item__font {
        font-size: 12px;

        font-weight: bold;

        &--blue {
            color: $PRIMARY_COLOR;
        }

        &--green {
            color: #74994e;
        }

        &--yellow {
            color: #e6c63c;
        }

        &--orange {
            color: #f3ab3e;
        }
    }

    .tab-menu__count {
        font-size: 10px;

        line-height: 16px;

        //font-family: "Source Code Pro", sans-serif;
        font-family: monospace;

        color: #aabbcc;
    }
</style>
