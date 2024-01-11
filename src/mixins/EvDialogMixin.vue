<!-- 弹窗设置 -->

<script>
    export default {
        name: "EvDialogMixin",

        data() {
            return {
                dialog_config: { // 常用弹窗设置
                    'width': 720,

                    'overlay-opacity': 0.6,

                    'overlay-color': '#FAFAFA',

                    'transition': "fade-transition",

                    'scrollable': true,

                    'no-click-animation': true,

                    'persistent': true,
                },

                purchase_dialog_config: { // 购买页弹窗设置
                    'width': 800,

                    'overlay-opacity': 0.1,

                    'transition': "slide-y-transition",

                    'no-click-animation': true,

                    'persistent': true,
                },

                export_dialog_config: {
                    'width': 480,

                    'overlay-opacity': 0.6,

                    'overlay-color': '#FAFAFA',

                    'transition': "fade-transition",

                    'scrollable': false,

                    'no-click-animation': true,

                    'persistent': true,
                },

                project_config_dialog: {
                    'width': 960,

                    'overlay-opacity': 0.6,

                    'overlay-color': '#FAFAFA',

                    'transition': "fade-transition",

                    'scrollable': false,

                    'no-click-animation': true,

                    'persistent': true,
                },

                modalConfig: {
                    'overlay-opacity': 0.6,

                    'overlay-color': '#FAFAFA',

                    'transition': "fade-transition",

                    'scrollable': false,

                    'no-click-animation': true,

                    'persistent': true,
                },

                modal_config_960: {
                    'overlay-opacity': 0.6,

                    'overlay-color': '#FAFAFA',

                    'transition': "fade-transition",

                    'scrollable': false,

                    'no-click-animation': true,

                    'persistent': true,

                    'width': 960,
                },

                menu_config: { // 常用菜单设置
                    'offset-y': true,

                    'close-on-content-click': true,

                    'transition': 'dummy', // 不使用动效

                    'nudge-bottom': 1,
                },

                showDialog: false,
            }
        },

        computed: {
            hotkey() {
                return {
                    'esc': this.closeDialog,
                }
            },
        },

        methods: {
            openDialog() {
                this.showDialog = true
            },

            closeDialog() {
                this.showDialog = false
            },

            close() {
                this.$emit('close')
            }
        }
    }
</script>

