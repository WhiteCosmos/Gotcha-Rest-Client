<template>
    <div class="d-flex justify-center align-center mock-client-request-navigation-bar">
        <div class="d-flex mock-client-request-navigation-bar__item" @click="doSwitch('HEADERS')">
            <span :class="getItemClasses('HEADERS')">Headers</span>
        </div>

        <div class="d-flex mock-client-request-navigation-bar__item" @click="doSwitch('URL_PARAMS')">
            <span :class="getItemClasses('URL_PARAMS')">URL Params</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EvMockClientRequestNavigationBar",

        data() {
            return {
                currentView: "URL_PARAMS"
            }
        },

        methods: {
            doSwitch(val) {
                this.currentView = val

                this.$emit('select', val)
            },

            getItemClasses(val) {
                if (val === this.currentView) {
                    return [
                        'mock-client-request-navigation-bar__item__label',
                        'mock-client-request-navigation-bar__item__label--selected'
                    ]
                } else {
                    return [
                        'mock-client-request-navigation-bar__item__label',
                        'mock-client-request-navigation-bar__item__label--unselected'
                    ]
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .mock-client-request-navigation-bar {
        width: 100%;

        height: 40px;

        background-color: #FAFAFA;

        padding-right: 36px;

        &__item {
            width: 96px;

            user-select: none;

            justify-content: center;

            &__label {
                font-size: 11px;

                font-weight: normal;

                color: #CCC;

                &--selected {
                    color: $PRIMARY_COLOR;

                    font-weight: bold;
                }

                &--unselected {

                }
            }
        }
    }
</style>
