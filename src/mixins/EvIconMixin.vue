<script>
    export default {
        name: "EvIconMixin",

        props: {
            active: {
                type: Boolean,

                default: false,
            },

            activeColor: {
                type: String,

                default: "#007AFF"
            },

            inactiveColor: {
                type: String,

                default: "#AABBCC"
            },

            color: {
                type: String,
                default: "#555"
            }
        },

        computed: {}
    }
</script>
