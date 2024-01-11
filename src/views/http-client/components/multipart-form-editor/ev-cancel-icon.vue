<template>
    <svg width="6px" height="6px" viewBox="0 0 6 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="RabiAPI-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
            <g id="Icons" transform="translate(-54.000000, -152.000000)" :stroke="color">
                <path d="M59.5,152.5 L54.5,157.5 M54.5,152.5 L59.5,157.5" id="Combined-Shape"></path>
            </g>
        </g>
    </svg>
</template>

<script>
    import EvComponentMixin from '@/mixins/EvComponentMixin'

    export default {
        name: "ev-cancel-icon",

        props: {
            color: {
                type: String,
                default: "#AABBCC"
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
