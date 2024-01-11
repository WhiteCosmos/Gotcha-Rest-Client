<!-- 处理与字段类型相关的逻辑 -->

<script>
    import JsonStructFieldMixin from '@/components/java-viewer/mixins/JsonStructFieldMixin'

    export default {
        name: "JsonStructTypeMixin",

        mixins: [
            // JsonStructFieldMixin,
        ],

        props: {
            jsonStruct: Object
        },

        methods: {
            // 具体类型判断，用于颜色展示

            checkHttpCode2XX(fieldName) {
                return fieldName.startsWith("2")
            },

            checkHttpCode3XX(fieldName) {
                return fieldName.startsWith("3")
            },

            checkHttpCode4XX(fieldName) {
                return fieldName.startsWith("4")
            },

            checkHttpCode5XX(fieldName) {
                return fieldName.startsWith("5")
            },

            checkObjectType(fieldName) { // 字段名和字段类型相同说明是一个对象类型
                return fieldName === this.fieldType
            },

            checkIsArrayType() {

            },

            checkStringType(fieldName) {
                return [
                    "String",
                    "Character",
                    "char"
                ].includes(fieldName)
            },

            checkNumberType(fieldName) {
                return [
                    "Long",
                    "long",
                    "Integer",
                    "int",
                    "Short",
                    "short",
                    "Double",
                    "double",
                    "Float",
                    "float",
                    "BigDecimal",
                    "BigInteger",
                    "Number",
                ].includes(fieldName)
            },

            checkDateTimeType(fieldName) {
                return [
                    "Date",
                    "LocalDateTime",
                    "LocalDate",
                    "LocalTime",
                    "Timestamp",
                ].includes(fieldName)
            },

            checkAnyType(fieldName) {
                return [
                    "Object",
                    "T"
                ].includes(fieldName)
            },

            checkBooleanType(fieldName) {
                return [
                    "boolean",
                    "Boolean",
                ].includes(fieldName)
            },

            checkEnumValue(jsonStruct) {
                return jsonStruct.isEnumValue
            }
        },

        computed: {
            isStructType() {
                return this.jsonStruct && this.jsonStruct.isStructType
            },

            isArrayType() {
                return this.jsonStruct && this.jsonStruct.isArrayType
            },

            isSetType() {
                return this.jsonStruct && this.jsonStruct.isArrayType
            },

            isMapType() {
                return this.jsonStruct && this.jsonStruct.isMapType
            },

            isMapKey() {
                return this.jsonStruct && this.jsonStruct.isMapKey
            },

            isMapValue() {
                return this.jsonStruct && this.jsonStruct.isMapValue
            },

            isEnumType() {
                return this.jsonStruct && this.jsonStruct.isEnumType
            },

            isEnumValue() {
                return this.jsonStruct && this.jsonStruct.isEnumValue
            },

            isRecursiveType() {
                return this.jsonStruct && this.jsonStruct.isRecursive
            },

            isTypeNotFound() { // 类型在该项目中不存在
                return this.jsonStruct && this.jsonStruct.notExists
            },

            isTypeEmpty() { // 没有字段的空类型
                return this.jsonStruct && (!this.jsonStruct.children || this.jsonStruct.children.length === 0)
            },

            // 具体类型判断，用于颜色展示

            isStringType() {
                return [
                    "String",
                    "Character",
                    "char"
                ].includes(this.fieldType)
            },

            isNumberType() {
                return [
                    "Long",
                    "long",
                    "Integer",
                    "int",
                    "Short",
                    "short",
                    "Double",
                    "double",
                    "Float",
                    "float",
                    "BigDecimal",
                    "BigInteger",
                    "Number"
                ].includes(this.fieldType)
            },

            isDateTimeType() {
                return [
                    "Date",
                    "LocalDateTime",
                    "LocalDate",
                    "LocalTime",
                    "Timestamp",
                ].includes(this.fieldType)
            },

            isAnyType() {
                return [
                    "Object",
                    "T"
                ].includes(this.fieldType)
            },

            isBooleanType() {
                return [
                    "boolean",
                    "Boolean",
                ].includes(this.fieldType)
            },
        },
    }
</script>