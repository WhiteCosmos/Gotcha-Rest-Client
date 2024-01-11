<script>
    export default {
        name: "EvModelMixin",

        methods: {
            /**
             * Add 'contentTabCache'
             *
             * @since 1.5.0
             * @see GHCModule
             */
            addContentTabCache(module) {
                if (module.contentTabCache) {
                    return module.contentTabCache
                }

                this.$set(module, 'contentTabCache', {})

                return module.contentTabCache
            },
        }
    }
</script>
