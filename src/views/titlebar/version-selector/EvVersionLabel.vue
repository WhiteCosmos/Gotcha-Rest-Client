<template>
    <div class="ev-version-label d-flex align-center" v-on="events">
        <div class="d-flex align-center">
<!--            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

            <!--            <ev-list-icon></ev-list-icon>-->

<!--            <EvVerticalGutter :gutter="8"></EvVerticalGutter>-->

            <!--            <ev-label size="11" bold secondary>{{ versionName }}</ev-label>-->
        </div>

        <!--        <v-spacer></v-spacer>-->

        <v-menu offset-y attach=".ev-version-label"
                nudge-bottom="6"
                nudge-left="26" v-model="showBranchLabelMenu" v-if="!isSingleVersion">
            <template v-slot:activator="{ on }">
                <ev-dot-button :events="on"></ev-dot-button>
            </template>

            <div class="label-menu d-flex align-center justify-center" @click.stop="doRemoveVersion">
                <span class="label-menu__font">delete</span>
            </div>
        </v-menu>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <select-icon v-if="!isSingleVersion"></select-icon>

        <EvVerticalGutter :gutter="8"></EvVerticalGutter>
    </div>
</template>

<script>
    import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
    import EvPlusButton from "@/components/button/EvPlusButton"
    import SelectIcon from '@/components/icon/select-icon'
    import EvBranchIcon from '@/components/icon/EvBranchIcon'
    import BranchIcon from '@/components/icon/branch-icon'
    import EvDotButton from '@/components/button/EvDotButton'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvListIcon from '@/components/icon/EvListIcon'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvVersionLabel",

        components: {
            EvLabel,
            EvListIcon,
            EvDotButton,
            BranchIcon,
            EvBranchIcon,
            SelectIcon,
            EvPlusButton,
            EvVerticalGutter
        },

        mixins: [
            EvStoreMixin,
        ],

        props: {
            events: Object,

            version: Object,

            versions: Array,
        },

        computed: {
            versionName() {
                return this.version ? this.version.name : ""
            },

            canShowBranchLabelMenu() {
                return this.versions && this.versions.length > 1
            },

            isSingleVersion() {
                return this.versions && this.versions.length === 1
            },
        },

        data() {
            return {
                showDocumentCreateModal: false,

                showBranchLabelMenu: false,
            }
        },

        methods: {
            doRemoveVersion() {
                this.showBranchLabelMenu = false

                AppEventBus.$emit(AppEvents.REMOVE_VERSION)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .ev-version-label {
        width: 1px;

        height: 28px;
    }

    .branch-label {
        width: 240px;

        height: 28px;
    }

    .label-menu {
        padding: 0px 16px;

        user-select: none;

        background-color: white;
    }

    .label-menu__font {
        line-height: 24px;

        font-size: 11px;

        font-weight: bold;

        color: #ff8080;

        &:hover {
            color: #ff5050;
        }
    }
</style>
