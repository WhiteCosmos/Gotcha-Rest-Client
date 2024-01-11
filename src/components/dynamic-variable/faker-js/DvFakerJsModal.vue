<template>
    <div class="dv-faker-js-modal">
        <div class="dv-faker-js-modal__header">
            <ev-circle-close-button @click.native="doClose" style="position: absolute; left: 12px"></ev-circle-close-button>

            <ev-label size="12" bold secondary>{{ $t('title') }}</ev-label>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-question-icon @click.native.stop="openExternalLink" style="margin-top: 1px"></ev-question-icon>
        </div>

        <!--        <div class="dv-faker-js-modal__panel">-->
        <!--            <ev-basic-input v-model="search" placeholder="搜索..."></ev-basic-input>-->

        <!--            &lt;!&ndash;            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>&ndash;&gt;-->

        <!--            <v-spacer></v-spacer>-->

        <!--            <ev-label size="11" secondary>全部展开</ev-label>-->

        <!--            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

        <!--            <ev-label size="11" secondary>全部收起</ev-label>-->
        <!--        </div>-->

        <div class="dv-faker-js-modal__content">
            <dv-faker-js-expression-tree-view @select="handleSelectExpression"></dv-faker-js-expression-tree-view>
        </div>

        <div class="dv-faker-js-modal__footer">
            <div class="ev-input-wrapper">
                <ev-borderless-input :dense="true" :size="11" v-model="value.expression" placeholder="faker.name.fullName"></ev-borderless-input>
            </div>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <ev-label size="12" bold secondary @click.native="doClose">{{ $t('confirm') }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import EvLabel from '@/components/typography/EvLabel'
    import DvFakerJsExpressionTreeView from '@/components/dynamic-variable/faker-js/DvFakerJsExpressionTreeView'
    import EvBasicInput from '@/components/input/EvBasicInput'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvQuestionIcon from '@/assets/icon/ev-question-icon.vue'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput.vue'

    export default {
        name: "DvFakerJsModal",

        components: {
            EvBorderlessInput,
            EvQuestionIcon,
            EvVerticalGutter,
            EvBasicInput,
            DvFakerJsExpressionTreeView,
            EvLabel,
            EvCircleCloseButton
        },

        mixins: [],

        props: {
            value: Object
        },

        data() {
            return {
                search: "",
            }
        },

        methods: {
            doClose() {
                this.$emit('close')
            },

            handleSelectExpression(group, item) {
                this.value.expression = `faker.${group.name}.${item.name}`
            },

            expandAll() {

            },

            collapseAll() {

            },

            openExternalLink() {
                require("electron").shell.openExternal('https://fakerjs.dev/api')
            },
        },

        i18n: {
            messages: {
                en: {
                    title: "Faker.js Expression",

                    confirm: "Confirm",
                },
                zh: {
                    title: "Faker.js 表达式",

                    confirm: "确认",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    $PADDING: 12px;

    .dv-faker-js-modal {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        height: calc(100vh - 240px);

        width: 480px;

        background-color: #F1F1F1;

        &__header {
            position: relative;

            display: flex;

            align-items: center;

            justify-content: center;

            height: 40px;

            padding-left: $PADDING;

            padding-right: 16px;

            border-bottom: 1px solid #EAEAEA;
        }

        &__panel {
            display: flex;

            align-items: center;

            height: 28px;

            border-bottom: 1px solid #EAEAEA;

            background-color: white;

            padding-left: 16px;

            padding-right: 16px;
        }

        &__content {
            position: relative;

            display: flex;

            flex-direction: column;

            min-height: 1px;

            min-width: 1px;

            flex: 1;

            padding: $PADDING;

            background-color: #FCFCFC;

            overflow-y: scroll;

            &__selected-request {
                display: flex;

                align-items: center;

                padding-left: 20px;

                border-top: 1px solid #EAEAEA;

                background-color: #F1F1F1;
            }
        }

        &__footer {
            position: relative;

            display: flex;

            //flex-direction: column;

            align-items: center;

            height: 40px;

            border-top: 1px solid #E0E0E0;

            background-color: #F1F1F1;

            padding-left: 16px;

            padding-right: $PADDING;
        }

        &__button-wrapper {
            display: flex;

            align-items: center;

            justify-content: center;

            width: fit-content;

            height: 20px;

            background-color: #007AFF;

            padding-left: 12px;

            padding-right: 12px;

            border-radius: 3px;
        }
    }

    .ev-input-wrapper {
        display: flex;

        align-items: center;

        flex: 1;

        border: 1px solid #E0E0E0;

        border-radius: 3px;

        background-color: #FFF;

        overflow: hidden;
    }
</style>
