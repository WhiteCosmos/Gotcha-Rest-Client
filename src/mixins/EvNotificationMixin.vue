<script>
    export default {
        name: "EvNotificationMixin",

        methods: {
            sendNotification(title, body) {
                new Notification(title, {body: body, timeoutType: 'default'})
            }
        }
    }
</script>

