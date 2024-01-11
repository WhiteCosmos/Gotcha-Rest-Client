<template>
    <v-menu v-model="show" v-bind="menuConfig" transition="dummy">
        <template v-slot:activator="{ on }">
            <div class="ev-environment-selector" v-on="on">
                <div class="ev-environment-selector__icon-container">
                    <ev-environment-variable-icon color="#555"></ev-environment-variable-icon>
                </div>

                <span class="ev-environment-selector__label">{{ environmentName }}</span>

                <v-spacer></v-spacer>

                <div class="ev-environment-selector__icon-container">
                    <v-icon size="10" color="#999" v-if="show">fa-caret-down</v-icon>

                    <v-icon size="10" color="#999" v-else>fa-caret-left</v-icon>
                </div>
            </div>
        </template>

        <ev-http-client-environment-menu
            :current-environments="currentEnvironments"
            @close="doClose"></ev-http-client-environment-menu>
    </v-menu>
</template>

<script>
    import SelectIcon from '@/components/icon/select-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvEnvironmentIcon from '@/views/http-client/icon/ev-environment-icon'
    import EvHttpClientEnvironmentMenu from '@/views/http-client/components/environment/EvHttpClientEnvironmentMenu'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvEnvironmentVariableIcon from '@/views/http-client/icon/ev-environment-variable-icon'
    import EvDialogMixin from '@/mixins/EvDialogMixin'

    export default {
        name: "EvHttpClientEnvironmentSelector",

        components: {
            EvEnvironmentVariableIcon,
            EvHttpClientEnvironmentMenu,
            EvEnvironmentIcon,
            EvVerticalGutter,
            SelectIcon
        },

        mixins: [
            EvStoreMixin,
            EvDialogMixin,
        ],

        data() {
            return {
                show: false,
            }
        },

        computed: {
            environmentName() {
                let selectedEnvironment = this.currentEnvironment

                if (!selectedEnvironment) {
                    return `- ${this.$t('EvHttpClientEnvironmentSelector.noEnvironment')} -`
                } else {
                    return selectedEnvironment.name
                }
            },

            menuConfig() {
                return {
                    'offset-y': true,

                    'close-on-content-click': true,

                    'nudge-bottom': 1,
                }
            },
        },

        methods: {
            doClose() {
                this.show = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-environment-selector {
        display: flex;

        align-items: center;

        user-select: none;

        width: 160px;

        height: 24px;

        &__icon-container {
            @include full-center;

            width: 24px;

            height: 24px;
        }

        &__label {
            font-size: 10px;

            padding-top: 1px;

            color: $SECONDARY_FONT_COLOR;

            font-weight: bold;
        }
    }
</style>
