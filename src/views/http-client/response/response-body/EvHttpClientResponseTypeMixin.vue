<script>
    export default {
        name: "EvHttpClientResponseTypeMixin",

        methods: {
            checkIsJsonType(payload) {
                if (!payload || !payload.contentType) {
                    return false
                }

                return payload.contentType.match(/application\/json.*/)
            },

            checkIsWebType(payload) {
                if (!payload || !payload.contentType) {
                    return false
                }

                return payload.contentType.match(/text\/html.*/)
            },

            checkIsImageType(payload) {
                if (!payload || !payload.contentType) {
                    return false
                }

                return payload.contentType.match(/image\/.*/)
            },
        }
    }
</script>

