<template>
    <div class="branch-selector-menu d-flex flex-column">
        <div class="filter-container">
            <EvFilter ref="version-filter" v-model="keyword"></EvFilter>
        </div>

        <EvSubtitle2 :indent="16">Versions</EvSubtitle2>

        <ev-version-menu-item v-for="version in versions"
                              v-if="checkIsKeywordMatch(version)"
                              :version="version"
                              :selected-version="selectedVersion"
                              @click.native="doSelectVersion(version)"></ev-version-menu-item>
    </div>
</template>

<script>
    import EvSubtitle2 from "@/components/typography/EvSubtitle-2"
    import EvFilter from "@/components/input/EvFilter"
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvVersionMenuItem from '@/views/titlebar/version-selector/EvVersionMenuItem'

    const {app} = require('electron').remote

    export default {
        name: "EvVersionMenu",

        components: {
            EvVersionMenuItem,
            EvFilter,
            EvSubtitle2
        },

        mixins: [
            EvDialogMixin,
            EvStoreMixin,
        ],

        mounted() {
            let versionFilter = this.$refs['version-filter']

            versionFilter && versionFilter.clear()
        },

        props: {
            active: {
                type: Boolean,
                default: false,
            },

            versions: Array,

            selectedVersion: Object,
        },

        data() {
            return {
                keyword: "",
            }
        },

        computed: {
            label() {
                return this.$t('EvBranchMenu.versionLabel')
            }
        },

        methods: {
            doSelectVersion(version) {
                this.$emit('select-version', version)

                this.$emit('cancel')
            },

            checkIsKeywordMatch(version) {
                // return version && version.name.includes(this.keyword)
                return true
            }
        },

        watch: {
            active(newVal) {
                let versionFilter = this.$refs['version-filter']

                newVal && versionFilter && versionFilter.clear()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./project-selector";
</style>
