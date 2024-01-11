<script>
    export default {
        name: "EvTreeViewNodeDragMixin",

        data() {
            return {
                dragging: false,

                position: {
                    clientX: 0,
                    clientY: 0,
                },

                movement: {
                    movementX: 0,
                    movementY: 0,
                },

                threshold: 3,

                mousemove: undefined,
            }
        },

        methods: {
            resetDrag() {
                this.dragging = false
            },

            handleDragStart(event, callback, element) {
                if (element) {
                    event.dataTransfer.setDragImage(element, -16, 8)
                }

                this.dragging = true

                callback()
            },

            handleDrag(event) {

            },

            handleDragEnd(event) {
                this.dragging = false
            }
        }
    }
</script>