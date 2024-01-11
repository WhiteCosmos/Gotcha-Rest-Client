<template>
    <v-menu v-model="showPopupMenu" v-bind="menu_config" offset-y>
        <template v-slot:activator="{ on }">
            <div class="ev-http-client-request-template" v-on="on">
                <ev-request-template-icon></ev-request-template-icon>

                <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>

                <ev-label size="11" secondary bold>{{ $t('saveAsTemplate') }}</ev-label>
            </div>
        </template>

        <div class="ev-menu">
            <div class="d-flex align-center" style="flex: 1">
                <ev-borderless-input ref="ev-borderless-input"
                                     placeholder="模板名称"
                                     v-model="templateName"
                                     @enter="saveAsTemplate"></ev-borderless-input>
            </div>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-label size="12" primary bold @click.native="saveAsTemplate">{{ $t('confirm') }}</ev-label>
        </div>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvRequestTemplateIcon from '@/assets/icon/ev-request-template-icon.vue'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput.vue'
    import EvStoreMixin from '@/mixins/EvStoreMixin.vue'
    import GHCRequestTemplate from '@/data/gotcha/GHCRequestTemplate'
    import RabiHttpOperationStatus from '@/data/gotcha/http-operation/RabiHttpOperationStatus'
    import EvProTag from '@/components/tag/EvProTag.vue'

    export default {
        name: "EvHttpClientRequestTemplate",

        components: {
            EvProTag,
            EvBorderlessInput,
            EvRequestTemplateIcon,
            EvVerticalGutter,
            EvLabel
        },

        mixins: [
            EvStoreMixin,
        ],

        props: {
            contentTab: Object,
        },

        data() {
            return {
                showPopupMenu: false,

                templateName: ""
            }
        },

        watch: {
            showPopupMenu(newVal) {
                if (newVal === true) {
                    this.templateName = this.contentTab.name

                    setTimeout(() => { // 临时方法
                        this.$refs['ev-borderless-input'].focus()
                    }, 100)
                } else {
                    this.templateName = ''
                }
            },
        },

        computed: {
            menu_config() {
                return {
                    'transition': "dummy",

                    'nudge-bottom': 8,

                    // 'close-on-click': false,

                    'close-on-content-click': false,
                }
            }
        },

        methods: {
            openPopupMenu() {
                this.showPopupMenu = true
            },

            closePopupMenu() {
                this.showPopupMenu = false
            },

            saveAsTemplate() {
                let httpOperation = this.contentTab.httpRequest

                let template = new GHCRequestTemplate()

                let clonedHttpOperation = _.cloneDeep(httpOperation)

                delete clonedHttpOperation.id

                let name = this.templateName || 'My Template'

                clonedHttpOperation.name = name

                clonedHttpOperation.httpResponse = undefined

                clonedHttpOperation.httpError = undefined

                clonedHttpOperation.histories = []

                clonedHttpOperation.status = RabiHttpOperationStatus.NONE

                template.name = name

                template.httpOperation = clonedHttpOperation

                this.currentProject.requestTemplates.push(template)

                this.closePopupMenu()
            },
        },

        i18n: {
            messages: {
                en: {
                    saveAsTemplate: "Save as Template",

                    confirm: "Done"
                },
                zh: {
                    saveAsTemplate: "保存为请求模板",

                    confirm: "确认"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-template {
        display: flex;

        align-items: center;

        width: fit-content;

        height: 24px;

        padding-left: 8px;

        padding-right: 8px;

        background-color: #F1F1F1;

        border-radius: 3px;

        margin-right: 8px;

        box-shadow: inset 0 1px 2px -1px $SHADOW_COLOR;

        &:hover {
            background-color: #EAEAEA;
        }
    }

    .ev-menu {
        display: flex;

        align-items: center;

        width: 100%;

        height: 32px;

        background-color: #F1F1F1;

        border-radius: 3px;

        padding-left: 8px;

        padding-right: 16px;
    }
</style>
