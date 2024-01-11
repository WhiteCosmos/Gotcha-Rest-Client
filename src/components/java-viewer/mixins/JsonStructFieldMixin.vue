<!-- 字段模板相关逻辑 -->

<script>
    import JsonStructHelper from '@/core/evalon4j/JsonStructHelper'

    import _ from 'lodash'

    export default {
        name: "JsonStructFieldMixin",

        mixins: [],

        props: {
            jsonStruct: Object,
        },

        computed: {
            fieldName() {
                if (!this.jsonStruct) {
                    return
                }

                if (this.jsonStruct.isEnumValue) {
                    return '\"' + this.jsonStruct.fieldName + '\"'
                }

                return this.jsonStruct.fieldName
            },

            fieldType() {
                if (!this.jsonStruct) {
                    return
                }

                return this.jsonStruct.fieldType
            },

            fieldFormat() {
                if (!_.isEmpty(this.jsonStruct.fieldFormat)) {
                    return "(" + this.jsonStruct.fieldFormat + ")"
                }

                if (this.jsonStruct.anyOf) {
                    return "( One Of )"
                }

                if (this.jsonStruct.anyOf) {
                    return "( Any Of )"
                }

                return ""
            },

            summary() {
                if (!_.isEmpty(this.jsonStruct.summary)) {
                    return this.jsonStruct.summary
                }

                return "/"
            },

            description() {
                if (!_.isEmpty(this.jsonStruct.description)) {
                    return this.jsonStruct.description
                }

                return ""
            },

            parameterType() {

            },

            fieldParameterType() {
                return JsonStructHelper.getParameterType(this.jsonStruct)
            },

            fieldComment() {
                return JsonStructHelper.getFieldDescription(this.jsonStruct)
            },

            isRequired() {
                return JsonStructHelper.isFieldRequired(this.jsonStruct)
            },

            isRecursive() {
                return this.jsonStruct.isRecursive
            },

            hasFieldSummary() {
                return !_.isEmpty(this.jsonStruct.summary) || !_.isEmpty(this.jsonStruct.fieldSummary)
            },

            hasConstraint() {
                return !_.isEmpty(this.jsonStruct.constraint)
            },

            hasDefaultValue() {
                return !_.isEmpty(this.jsonStruct.defaultValue)
            },

            hasExampleValue() {
                return this.jsonStruct.exampleValue
            },

            constraint() {
                return this.jsonStruct.constraint
            },

            defaultValue() {
                return this.jsonStruct.defaultValue
            },

            exampleValue() {
                return this.jsonStruct.exampleValue
            },
        },

        methods: {
            findParamAnnotation(annotationField) {
                if (!annotationField) {
                    return undefined
                }

                let existsParamAnnotation = undefined

                for (let name in annotationField) {
                    if (annotationField[name]) {
                        existsParamAnnotation = annotationField[name]
                    }
                }

                return existsParamAnnotation
            }
        }
    }
</script>

