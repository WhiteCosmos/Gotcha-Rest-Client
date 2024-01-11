<script>
    import _ from 'lodash'

    export default {
        name: "JavaViewerMixin",

        methods: {
            isContainerType(jsonStruct) { // 判断字段是否可以展开
                return jsonStruct && !_.isEmpty(jsonStruct.children)
            }
        }
    }
</script>
