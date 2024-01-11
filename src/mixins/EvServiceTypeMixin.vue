<script>
export default {
    name: "EvServiceTypeMixin",

    props: {
        service: Object,

        method: Object,
    },

    computed: {
        isJavaInterface() {
            return this.service.serviceType === "INTERFACE"
        },

        isHttpService() {
            return this.isSpringRestfulService || this.isJaxRSService
        },

        isSpringRestfulService() {
            return this.service.serviceType === "SPRING-MVC"
        },

        isJaxRSService() {
            return this.service.serviceType === "JAX-RS"
        },

        serviceRequestPath() {
            if (this.isSpringRestfulService) {
                return this.service.springRestfulService.path
            }

            if (this.isJaxRSService) {
                return this.service.jaxRSService.path
            }

            return undefined
        },

        methodRequestPath() {
            if (this.isSpringRestfulService) {
                let m = this.method.springRestfulMethod

                return m.paths ? this.method.springRestfulMethod.paths[0] : ""
            }

            if (this.isJaxRSService) {
                return this.method.jaxRSMethod.path
            }
        },

        methodRequestType() {
            if (this.isSpringRestfulService) {
                return this.method.springRestfulMethod.requestMethods[0]
            }

            if (this.isJaxRSService) {
                return this.method.jaxRSMethod.requestMethods[0]
            }
        },

        documentContent() {
            return this.$store.state.documentContent
        },

        isJavaInterfaceContent() {
            let s = this.documentContent.springRestfulMethod

            let r = this.documentContent.jaxRSMethod

            return !s && !r
        },

        isHttpServiceContent() {
            let s = this.documentContent.springRestfulMethod

            let r = this.documentContent.jaxRSMethod

            return s || r
        },

        httpRequestMethod() {
            let s = this.documentContent.springRestfulMethod

            let r = this.documentContent.jaxRSMethod

            if (s) {
                return s.requestMethods[0]
            }

            if (r) {
                return r.requestMethods[0]
            }

            return ""
        },

        httpRequestPath() {
            let s = this.documentContent.springRestfulMethod

            let r = this.documentContent.jaxRSMethod

            if (s) {
                return (s.parentPath || "") + (s.paths[0] || "")
            }

            if (r) {
                return (r.parentPath || "") + (r.path || "")
            }

            return ""
        }
    }
}
</script>

