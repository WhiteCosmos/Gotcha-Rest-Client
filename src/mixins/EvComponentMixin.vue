<!-- 组件通用样式与颜色 -->

<script>
    export default {
        name: "EvComponentMixin",

        props: {
            color: {
                type: String,

                default: "primary"
            }
        },

        data() {
            return {
                primaryColor: "#007AFF",

                secondaryColor: "#4DA2FF",

                primaryBorderColor: "#cce5ff",

                primaryBackgroundColor: "#e6f2ff",

                greenColor: "#87b35b",

                greenBorderColor: "#87b35b",

                greenBackgroundColor: "#f8fff2",

                yellowColor: "#f3d23e",

                yellowBorderColor: "#f3d23e",

                yellowBackgroundColor: "#fffdf2",

                orangeColor: "#f3ab3e",

                orangeBorderColor: "#f3ab3e",

                orangeBackgroundColor: "#FFFAE6",

                redColor: "#FF8282",

                redBorderColor: "#FFCCCC",

                redBackgroundColor: "#FFE6E6",

                purpleColor: "#8f70cc",

                purpleBorderColor: "",

                purpleBackgroundColor: "",

                greyColor: "#CCCCCC",

                greyBorderColor: "#CCCCCC",

                greyBackgroundColor: "#FAFAFA",

                // Font Color

                primaryFontColor: "#626a73",

                secondaryFontColor: "#77828c",
            }
        },

        computed: {
            containerStyle() {
                let backgroundColor = this.getBackgroundColor()

                let borderColor = this.getBorderColor()

                return {
                    'background-color': backgroundColor,

                    'border': '1px solid ' + borderColor,
                }
            },

            borderStyle() {
                let borderColor = this.getBorderColor()

                return {
                    'border': '1px solid ' + borderColor,
                }
            },

            colorStyle() {
                let color = this.getColor()

                return {
                    'color': color
                }
            },
        },

        methods: {
            getColor() {
                return this[this.color + 'Color']
            },

            getBorderColor() {
                return this[this.color + 'BorderColor']
            },

            getBackgroundColor() {
                return this[this.color + 'BackgroundColor']
            }
        }
    }
</script>