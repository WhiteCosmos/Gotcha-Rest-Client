<template>
    <div class="d-flex align-center http-client-navigation">
        <!--        <span class="http-client-navigation__input">Default Request</span>-->

        <div class="http-client-navigation__input-wrapper">
            <input type="text" class="http-client-navigation__input"
                   v-model="httpOperation.name"
                   @focus="autofocus"
                   @blur="onInputComplete">

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <!--            <v-icon size="9" color="#4DA2FF">fa-pen</v-icon>-->
            <v-icon size="9" color="#D8D8D8">fa-pen</v-icon>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <!--            <v-divider vertical inset></v-divider>-->

            <!--            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>-->


            <!--            <v-icon size="9" color="#007AFF">fa-bars</v-icon>-->

            <!--            <ev-popup-menu>-->
            <!--                <template v-slot:icon>-->
            <!--                    <v-icon size="9" color="#007AFF">fa-bars</v-icon>-->
            <!--                </template>-->

            <!--                <template v-slot:items>-->
            <!--                    <ev-popup-menu-item @click.native="doDuplicateHttpOperation">Duplicate</ev-popup-menu-item>-->

            <!--                    <ev-popup-menu-divider></ev-popup-menu-divider>-->

            <!--                    <ev-popup-menu-item warn @click.native="doDeleteHttpOperation">Delete</ev-popup-menu-item>-->
            <!--                </template>-->
            <!--            </ev-popup-menu>-->
        </div>

        <!--        <v-divider vertical></v-divider>-->

        <!--        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

        <!--        <ev-list-icon></ev-list-icon>-->
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvListIcon from '@/components/icon/EvListIcon'
    import EvHttpOperationMixin from '@/mixins/EvHttpOperationMixin'
    import _ from 'lodash'
    import EvPopupMenu from '@/components/menu/EvPopupMenu'
    import EvPopupMenuItem from '@/components/menu/EvPopupMenuItem'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import {EvJsonTreeViewEventBus, EvJsonTreeViewEvents} from '@/components/java-tree/EvJsonTreeViewEventBus'

    export default {
        name: "EvHttpClientNavigation",

        components: {
            EvPopupMenuDivider,
            EvPopupMenuItem,
            EvPopupMenu,
            EvListIcon,
            EvVerticalGutter
        },

        mixins: [
            EvHttpOperationMixin
        ],

        props: {
            jsonMethod: Object,

            httpOperation: Object
        },

        methods: {
            autofocus(event) {
                event.target.select()
            },

            onInputComplete() {
                if (_.isEmpty(this.httpOperation.name)) {
                    this.httpOperation.name = "New Http Operation"
                }

                this.updateHttpOperation(this.httpOperation)
            },

            doDuplicateHttpOperation() {
                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents.DUPLICATE_HTTP_OPERATION, this.jsonMethod, this.httpOperation)
            },

            doDeleteHttpOperation() {
                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents.DELETE_HTTP_OPERATION, this.jsonMethod, this.httpOperation)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-navigation {
        border-radius: 3px;

        width: fit-content;

        user-select: none;

        &__input-wrapper {
            display: flex;

            align-items: center;

            border: 1px solid $SECONDARY_COLOR;

            border-radius: 3px;

            height: 22px;

            @include white-background-gradient;

            //@include component-shadow;

            width: 160px;

            padding-left: 4px;

            padding-right: 4px;
        }

        &__input {
            //display: flex;

            //flex: 1;

            width: 100%;

            outline: none;

            border: none;

            font-size: 10px;

            height: 20px;

            line-height: 16px;

            font-weight: bold;

            color: $PRIMARY_COLOR;

            text-overflow: ellipsis;
        }
    }
</style>
