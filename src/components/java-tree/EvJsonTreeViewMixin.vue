<script>
    import _ from 'lodash'

    export default {
        name: "EvJsonTreeViewMixin",

        methods: {
            replaceWithHighlight(text, keyword) {
                return text.replace(keyword, '<span class="highlight">' + keyword + '</span>')
            },

            replaceServiceQualifiedName(serviceQualifiedName) {
                return _.replace(serviceQualifiedName, /\./g, '_')
            },

            isJsonServiceMatch(s, jsonService) {
                if (!jsonService) {
                    return false
                }

                return jsonService.serviceName.includes(s) ||
                    (!_.isEmpty(jsonService.summary) && jsonService.summary.includes(s))
            },

            isJsonMethodMatch(s, jsonMethod) {
                if (!jsonMethod) {
                    return false
                }

                if (jsonMethod.isHttpService) {
                    return (!_.isEmpty(jsonMethod.summary) && jsonMethod.summary.includes(s)) ||
                        (!_.isEmpty(jsonMethod.fullRequestPath) && jsonMethod.fullRequestPath.includes(s))
                }

                if (jsonMethod.isJavaService) {
                    return jsonMethod.methodName.includes(s) ||
                        (!_.isEmpty(jsonMethod.summary) && jsonMethod.summary.includes(s))
                }
            },

            isCurrentView(key) {
                return this.$vnode.key === key
            }
        }
    }
</script>