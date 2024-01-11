<template>
    <div class="ev-http-client-environment-container" v-hscroll>
        <div class="ev-http-client-environment-manager__table-header" v-if="environments_.length === 0">
            <div class="d-flex" style="padding-left: 8px">
                <ev-label size="11" grey>{{ $t('noEnvironmentHint') }}</ev-label>
            </div>
        </div>

        <draggable v-else
                   v-model="environments_"
                   v-bind="dragOptions"
                   @update="emitUpdateEnvironments"
                   class="ev-http-client-environment-manager__table-header">
            <ev-http-client-environment-header-item :environment="environment"
                                                    :key="environment.uid"
                                                    :ref="environment.uid"
                                                    @contextmenu.native="emitShowContextMenu(environment, $event)"
                                                    v-for="environment in environments_"></ev-http-client-environment-header-item>
        </draggable>

        <div class="ev-http-client-environment-manager__table-wrapper" ref="environment-manager-content">
            <div class="d-flex flex-column" v-for="group in groups">
                <div class="ev-http-client-environment-manager__table-row" style="align-items: center; padding-left: 8px; background-color: #F5F5F5">
                    <ev-label size="10" primary bold>{{ group.default ? $t('defaultGroup') : group.name }}</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <ev-counter-label :value="group.variables.length"></ev-counter-label>
                </div>

                <div class="ev-http-client-environment-manager__table-row"
                     v-for="variable in group.variables"
                     v-if="group.expand && variable.match">
                    <ev-http-client-environment-cell :variable='variable'
                                                     :environment='environment'
                                                     :key="environment.uid"
                                                     v-for="environment in environments_"></ev-http-client-environment-cell>
                </div>
            </div>

            <div class="d-flex flex-shrink-0" style="height: 16px"></div>
        </div>
    </div>
</template>

<script>
    import EvHttpClientEnvironmentCell from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentCell'
    import EvHttpClientEnvironmentHeaderItem from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentHeaderItem'
    import draggable from 'vuedraggable'
    import EvLabel from '@/components/typography/EvLabel'
    import EvCounterLabel from '@/components/label/EvCounterLabel'
    import EvApiTreeView from '@/components/api-tree/EvApiTreeView'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCounter from '@/components/tag/EvCounter'

    export default {
        name: "EvHttpClientEnvironmentContainer",

        components: {
            EvCounter,
            EvVerticalGutter,
            EvApiTreeView,
            EvCounterLabel,
            EvLabel,
            EvHttpClientEnvironmentHeaderItem,
            EvHttpClientEnvironmentCell,
            draggable,
        },

        created() {
            this.environments_ = this.environments
        },

        props: {
            environments: Array,

            group: Object,

            groups: Array,
        },

        watch: {
            environments(newVal) {
                this.environments_ = newVal
            },
        },

        data() {
            return {
                environments_: []
            }
        },

        computed: {
            variables() {
                return this.group.variables
            },

            dragOptions() {
                return {
                    animation: 200,
                    disabled: false,
                    direction: 'horizontal',
                    swapThreshold: 1.5,
                    // 'drag-class': 'ev-http-client-environment-manager__dragging'
                    'drag-class': 'ev-http-client-environment-header-item__wrapper'
                }
            }
        },

        methods: {
            rename(environment) {
                let refs = this.$refs[environment.uid]

                refs && refs[0].rename()
            },

            emitShowContextMenu(environment, event) {
                this.$emit('show-context-menu', environment, event)
            },

            emitUpdateEnvironments() {
                this.$emit('update-environments', this.environments_)
            },

            scrollTo(scrollTop) {
                this.$refs['environment-manager-content'].scrollTop = scrollTop
            }
        },

        i18n: {
            messages: {
                en: {
                    noEnvironmentHint: "No environment, please click + to add one.",

                    defaultGroup: "Default Group",
                },
                zh: {
                    noEnvironmentHint: "没有环境，请点击『 + 』创建。",

                    defaultGroup: "默认分组",
                },
                jp: {
                    newGroup: "グループを作成する",

                    newEnvironment: "環境を作成する",

                    importEnvironments: "環境をインポートする"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-environment-container {
        display: flex;

        flex-direction: column;

        flex: 1;

        min-width: 1px;

        min-height: 1px;

        overflow-x: overlay;
    }

    .ev-http-client-environment-manager {
        display: flex;

        background-color: #FCFCFC;

        width: 960px;

        height: 640px;

        border-radius: 5px;

        &__draggable {
            display: flex;

            flex: 1;

            min-width: 1px;

            min-height: 1px;

            flex-direction: row;
        }

        &__dragging {
            height: 32px;

            border-radius: 5px;
        }

        &__table-header {
            display: flex;

            align-items: center;

            flex-shrink: 0;

            height: 32px;

            width: fit-content;

            min-width: 100%;

            background-color: #F1F1F1;

            border-bottom: 1px solid #E0E0E0;
        }

        &__table-row {
            display: flex;

            flex-direction: row;

            height: 32px;

            background-color: #FCFCFC;

            border-bottom: 1px solid #E0E0E0;
        }

        &__table-wrapper {
            display: flex;

            flex-direction: column;

            width: fit-content;

            min-width: 100%;

            min-height: 1px;

            height: 100%;

            overflow-y: hidden;
        }
    }

    // Horizontal Scroll Bar

    ::-webkit-scrollbar:horizontal {
        width: 12px;

        border: none;
    }

    ::-webkit-scrollbar-thumb:horizontal {
        border: 4px solid transparent;
        background-clip: padding-box;
        -webkit-border-radius: 16px;
        background-color: #D8D8D8;
    }

    ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
        display: none;
    }
</style>
