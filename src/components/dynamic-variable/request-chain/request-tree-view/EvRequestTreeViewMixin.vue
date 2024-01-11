<script>
    import EvStoreMixin from '@/mixins/EvStoreMixin'

    import _ from 'lodash'

    export default {
        name: "EvExportTreeViewMixin",

        mixins: [
            EvStoreMixin,
        ],

        computed: {
            exportConfigWrapper() {
                return this.currentProject.exportConfig
            },

            exportConfigs() { // 不包括默认配置
                let exportConfig = this.currentProject.exportConfig

                if (!exportConfig) {
                    return []
                }

                return exportConfig.configs
            },

            defaultExportConfig() {
                let exportConfig = this.currentProject.exportConfig

                if (!exportConfig) {
                    return
                }

                return exportConfig.configs.find(config => {
                    return config.isDefault
                })
            },

            selectedExportConfig() {
                let exportConfig = this.currentProject.exportConfig

                if (!exportConfig) {
                    return {
                        format: 'postman'
                    }
                }

                let selectedExportConfig = exportConfig.configs.find(config => {
                    return config.uid === exportConfig.selectedConfigId
                })

                !selectedExportConfig && (selectedExportConfig = exportConfig.configs[0])

                return selectedExportConfig
            },
        },

        methods: {
            treeNodeExportPredict(treeNode) {
                if (treeNode.isContainer) {
                    return !this.checkIsNoTreeNodeSelected(treeNode)
                } else {
                    return this.checkIsTreeNodeSelected(treeNode)
                }
            },

            checkIsTreeNodeSelected(treeNode) {
                let selectedExportConfig = this.selectedExportConfig

                let exportConfigs = treeNode.exportConfigs

                return exportConfigs.find(uid => {
                    return uid === selectedExportConfig.uid
                }) !== undefined
            },

            checkIsEveryTreeNodeSelected(treeNode) {
                let children = this.getChildren(treeNode)

                if (_.isEmpty(children)) {
                    return false
                }

                let results = children.filter(child => {
                    return this.checkIsTreeNodeSelected(child)
                })

                return results.length === children.length
            },

            checkIsAnyTreeNodeSelected(treeNode) {
                let children = this.getChildren(treeNode)

                if (_.isEmpty(children)) {
                    return false
                }

                let results = children.filter(child => {
                    return this.checkIsTreeNodeSelected(child)
                })

                return (results.length !== 0 && results.length < children.length)
            },

            checkIsNoTreeNodeSelected(treeNode) {
                let children = this.getChildren(treeNode)

                if (_.isEmpty(children)) {
                    return true
                }

                let results = children.filter(child => {
                    return this.checkIsTreeNodeSelected(child)
                })

                return results.length === 0
            },

            makeGroupTreeNodeSelected(treeNode) {
                let children = this.getChildren(treeNode)

                children.forEach(child => {
                    this.addExportConfig(child, this.selectedExportConfig)
                })
            },

            makeGroupTreeNodeUnselected(treeNode) {
                let children = this.getChildren(treeNode)

                children.forEach(child => {
                    this.removeExportConfig(child, this.selectedExportConfig)
                })
            },

            addExportConfig(treeNode, exportConfig) {
                if (exportConfig) {
                    treeNode.exportConfigs.push(exportConfig.uid)
                }
            },

            removeExportConfig(treeNode, exportConfig) {
                if (exportConfig) {
                    treeNode.exportConfigs.splice(treeNode.exportConfigs.indexOf(exportConfig.uid), 1)
                }
            },

            getChildren(treeNode) {
                return treeNode.children.filter(child => {
                    return !child.isContainer
                })
            },

            getSelectedChildren(treeNode) {
                let children = this.getChildren(treeNode)

                return children.filter(child => {
                    return this.checkIsTreeNodeSelected(child)
                })
            },
        }
    }
</script>
