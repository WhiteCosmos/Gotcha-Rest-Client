import {v4} from 'uuid'
import RabiHttpParameterSource
    from '@/data/gotcha/http-operation/RabiHttpParameterSource'
import RabiHttpParameterRelationship
    from '@/data/gotcha/http-operation/RabiHttpParameterRelationship'
import RabiHttpParameterType
    from '@/data/gotcha/http-operation/RabiHttpParameterType'

/**
 * Same as JsonStruct, only contains fields needed in http parameter.
 *
 * @see JsonStruct
 */
class RabiHttpParameter {
    constructor(props) {
        !props && (props = {})

        //=======================
        // Data Fields
        //=======================

        this.fieldName = props.fieldName

        this.fieldType = props.fieldType

        this.fieldFormat = props.fieldFormat

        /**
         * Relationship between fieldName & fieldValue
         *
         * @type {string}
         */
        this.fieldRelationship = RabiHttpParameterRelationship.EQUALS

        /**
         * @type {Object|RabiFileValue}
         */
        this.fieldValue = props.fieldValue

        /**
         * HEADER COOKIE PATH QUERY
         *
         * @type {string}
         */
        this.parameterType = props.parameterType

        this.summary = props.summary

        this.description = props.description

        this.defaultValue = props.defaultValue

        this.exampleValue = props.exampleValue

        /**
         * 'TEMPLATE' means this field can be updated
         *
         * 'CUSTOM' field will not changed after refresh
         *
         * @type {string}
         */
        this.source = "TEMPLATE" // TEMPLATE | CUSTOM

        this.constraint = props.constraint

        /**
         * Type like enum will have children
         *
         * @type {JsonStruct[]}
         */
        this.children = []

        //=======================
        // Control Fields
        //=======================

        this.isRequired = props.isRequired

        this.isDeprecated = props.isDeprecated

        //=======================
        // UI Control Fields
        //=======================

        this.uid = v4()

        this.checkedStatus = "CHECKED"
    }

    static PATH_PARAMETER() {
        let param = new RabiHttpParameter()

        param.fieldType = "String"

        param.source = RabiHttpParameterSource.CUSTOM

        param.parameterType = RabiHttpParameterType.PATH

        return param
    }

    static QUERY_PARAMETER() {
        let param = new RabiHttpParameter()

        param.fieldType = "String"

        param.source = RabiHttpParameterSource.CUSTOM

        param.parameterType = RabiHttpParameterType.QUERY

        return param
    }

    static HEADER_PARAMETER() {
        let param = new RabiHttpParameter()

        param.fieldType = "String"

        param.source = RabiHttpParameterSource.CUSTOM

        param.parameterType = RabiHttpParameterType.HEADER

        return param
    }

    static COOKIE_PARAMETER() {
        let param = new RabiHttpParameter()

        param.fieldType = "String"

        param.source = RabiHttpParameterSource.CUSTOM

        param.parameterType = RabiHttpParameterType.COOKIE

        return param
    }

    static FORM_PARAMETER() {
        let param = new RabiHttpParameter()

        param.fieldType = "String"

        param.source = RabiHttpParameterSource.CUSTOM

        param.parameterType = RabiHttpParameterType.FORM

        return param
    }
}

export default RabiHttpParameter