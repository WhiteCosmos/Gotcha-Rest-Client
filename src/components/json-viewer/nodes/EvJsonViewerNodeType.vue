<template>
    <div class="d-flex">
        <ev-data-type-object-icon v-if="type === 'object'" :color="color"></ev-data-type-object-icon>

        <ev-data-type-array-icon v-if="type === 'array'" :color="color"></ev-data-type-array-icon>

        <ev-data-type-string-icon v-if="type === 'string'" :color="color"></ev-data-type-string-icon>

        <ev-data-type-number-icon v-if="type === 'number'" :color="color"></ev-data-type-number-icon>

        <ev-data-type-boolean-icon v-if="type === 'boolean'" :color="color"></ev-data-type-boolean-icon>

        <ev-data-type-null-icon v-if="type === 'null'" :color="color"></ev-data-type-null-icon>
    </div>
</template>

<script>
    import EvDataTypeObjectIcon from '@/assets/icons/EvDataTypeObjectIcon'
    import EvDataTypeArrayIcon from '@/assets/icons/EvDataTypeArrayIcon'
    import EvDataTypeStringIcon from '@/assets/icons/EvDataTypeStringIcon'
    import EvDataTypeNumberIcon from '@/assets/icons/EvDataTypeNumberIcon'
    import EvDataTypeBooleanIcon from '@/assets/icons/EvDataTypeBooleanIcon'
    import EvDataTypeNullIcon from '@/assets/icons/EvDataTypeNullIcon'

    export default {
        name: "EvJsonViewerNodeType",

        components: {
            EvDataTypeNullIcon,
            EvDataTypeBooleanIcon,
            EvDataTypeNumberIcon,
            EvDataTypeStringIcon,
            EvDataTypeArrayIcon,
            EvDataTypeObjectIcon
        },

        props: {
            type: String
        },

        computed: {
            color() {
                return '#333'
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>
