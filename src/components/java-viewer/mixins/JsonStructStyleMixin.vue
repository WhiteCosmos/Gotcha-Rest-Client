<!-- 处理与字段展示样式有关的逻辑 -->

<script>
    import EvComponentMixin from '@/mixins/EvComponentMixin'
    import JsonStructTypeMixin from '@/components/java-viewer/mixins/JsonStructTypeMixin'
    import JsonStructFieldMixin from '@/components/java-viewer/mixins/JsonStructFieldMixin'

    export default {
        name: "JsonStructStyleMixin",

        mixins: [
            EvComponentMixin,
            // JsonStructTypeMixin,
            // JsonStructFieldMixin,
        ],

        computed: {
            fieldNameColorStyle() {
                let color = this.primaryFontColor

                if (this.jsonStruct && (this.jsonStruct.fieldName === this.jsonStruct.fieldType)) {
                    return this.fieldTypeColorStyle
                }

                if (this.isEnumValue) {
                    color = this.orangeColor
                }

                return {
                    'color': color
                }
            },

            fieldTypeColorStyle() {
                let color = this.primaryColor

                if (this.isStructType) {
                    color = this.primaryColor
                }

                if (this.isArrayType) {
                    color = this.purpleColor
                }

                if (this.isStringType) {
                    color = this.greenColor
                }

                if (this.isNumberType) {
                    color = this.yellowColor
                }

                if (this.isDateTimeType) {
                    color = this.purpleColor
                }

                if (this.isBooleanType) {
                    color = this.redColor
                }

                if (this.isEnumType) {
                    color = this.primaryColor
                }

                if (this.isEnumValue) {
                    color = this.orangeColor
                }

                return {
                    'color': color
                }
            }
        }
    }
</script>