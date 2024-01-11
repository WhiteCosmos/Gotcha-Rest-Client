<script>
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import _ from 'lodash'
    import EvComponentMixin from '@/mixins/EvComponentMixin'

    export default {
        name: "EvDocumentApiTitleMixin",

        mixins: [
            EvStoreMixin,
            EvComponentMixin,
        ],

        computed: {
            apiParentTitle() {
                let currentService = this.currentService

                if (_.isEmpty(currentService.summary)) {
                    return currentService.serviceName
                } else {
                    return currentService.summary
                }
            },

            apiTitle() {
                let jsonMethodContent = this.jsonMethodContent

                if (_.isEmpty(jsonMethodContent.summary)) {
                    return jsonMethodContent.methodName
                } else {
                    return jsonMethodContent.summary
                }
            },

            apiTitleTag() {
                let jsonMethodContent = this.jsonMethodContent

                if (jsonMethodContent.isHttpService) {
                    return "Restful API"
                }

                if (jsonMethodContent.isJavaService) {
                    return "Java Interface"
                }
            },

            apiSubtitle() {
                let jsonMethodContent = this.jsonMethodContent

                if (jsonMethodContent.isJavaService) {
                    return jsonMethodContent.serviceName + "." + jsonMethodContent.methodName
                }

                if (jsonMethodContent.isHttpService) {
                    return jsonMethodContent.fullRequestPath || "/"
                }
            },

            apiSubtitleTag() {
                let jsonMethodContent = this.jsonMethodContent

                if (jsonMethodContent.isHttpService) {
                    return jsonMethodContent.requestMethod
                }
            },

            apiSubtitleTagColor() {
                let requestMethod = this.apiSubtitleTag
            },

            apiTagPairs() {
                let jsonMethodContent = this.jsonMethodContent

                if (!jsonMethodContent) {
                    return undefined
                }

                if (!_.isEmpty(jsonMethodContent.tags)) {
                    return jsonMethodContent.tags
                }

                return undefined
            },

            isDeprecated() {
                let jsonMethodContent = this.jsonMethodContent

                if (!jsonMethodContent) {
                    return false
                }

                return jsonMethodContent.isDeprecated
            }
        }
    }
</script>
