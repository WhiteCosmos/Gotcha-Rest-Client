<script>
    import JsonStructFieldMixin from '@/components/java-viewer/mixins/JsonStructFieldMixin'
    import JsonStructTypeMixin from '@/components/java-viewer/mixins/JsonStructTypeMixin'
    import JsonStructStyleMixin from '@/components/java-viewer/mixins/JsonStructStyleMixin'

    export default {
        name: "JsonStructMixin",

        created() {

        },

        mixins: [
            JsonStructFieldMixin,
            JsonStructTypeMixin,
            JsonStructStyleMixin,
        ],

        props: {
            jsonStruct: {type: Object},

            isHover: {type: Boolean, default: false},

            currentLayer: {
                type: Number,
                default: -1
            },
        },

        data() {
            return {
                hover_: false,

                expand_: true, // 默认展开所有字段
            }
        },

        computed: {
            columnOnHoverClass() {
                return {
                    "column-on-hover": this.isHover
                }
            },

            isContainerNode() {
                return this.jsonStruct && !_.isEmpty(this.jsonStruct.children)
            },
        },

        methods: {
            checkIsContainerNode(jsonStruct) {
                return jsonStruct && !_.isEmpty(jsonStruct.children)
            }
        },

        watch: {
            jsonStruct() {
                // this.expand_ = this.expand // reset expand
            },
            expand(newVal) {
                // this.expand_ = newVal
            }
        }
    }
</script>
