<script>
    import _ from 'lodash'

    export default {
        name: "EvRpcBlockMixin",

        props: {
            jsonMethod: Object,
        },

        computed: {
            hasParameters() {
                return !_.isEmpty(this.jsonMethod.parameters)
            },

            parameters() {
                return this.jsonMethod.parameters
            },

            hasResponses() {
                return !_.isEmpty(this.jsonMethod.responses)
            },

            responses() {
                return this.jsonMethod.responses
            },

            hasExceptions() {
                return !_.isEmpty(this.jsonMethod.exceptions)
            },

            exceptions() {
                return this.jsonMethod.exceptions
            }
        }
    }
</script>
