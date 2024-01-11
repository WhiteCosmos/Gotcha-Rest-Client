<script>
    import EvCheckedStatusMixin from '@/mixins/EvCheckedStatusMixin'
    import GHCHttpRequestSender from '@/views/http-client/core/GHCHttpRequestSender'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import _ from 'lodash'
    import GHCEnvironmentVariablesNunjucksRender from '@/data/gotcha/http-operation/environment/GHCEnvironmentVariablesNunjucksRender'
    import GHCDynamicVariableRender from '@/components/dynamic-variable/GHCDynamicVariableRender'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'

    export default {
        name: "EvHttpClientSendRequestMixin",

        mixins: [
            EvCheckedStatusMixin,
            EvStoreMixin,
        ],

        data() {
            return {}
        },

        methods: {
            doSendHttpRequest(httpRequest) {
                // this._appendDefaultHost(httpRequest) 会导致直接复制URL并发起请求时，使用默认Host

                let sender = new GHCHttpRequestSender(httpRequest,
                    this.currentCookieJar,
                    this.dynamicVariableRender)

                sender.sendHttpRequest()
            },

            _appendDefaultHost(httpRequest) {
                let requestUrl = httpRequest.requestUrl

                if (_.isEmpty(requestUrl.host)) {
                    requestUrl.host = "httpbin.org"
                }
            },
        }
    }
</script>