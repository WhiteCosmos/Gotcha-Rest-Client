<template>
    <div class="search-input-container d-flex">
        <div style="width: 32px; height: 32px" class="d-flex justify-center align-center">
            <v-icon x-small color="#CCC">fa-search</v-icon>
        </div>

        <input type="text" class="search-input" v-model="value_" ref="input">

        <!--        <div style="width: 32px; height: 32px" class="d-flex justify-center align-center">-->
        <!--            <v-icon x-small color="#CCC" v-show="value_">fa-times-circle</v-icon>-->
        <!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: "EvFilter",

        mounted() {
            this.clear()
        },

        model: {
            prop: 'value',
            event: 'change'
        },

        props: {
            value: String,
        },

        data() {
            return {
                value_: ""
            }
        },

        methods: {
            clear() {
                this.value_ = ""

                setTimeout(() => { // WTF???
                    this.$refs['input'].focus()
                }, 100)
            },
        },

        watch: {
            value_(newVal) {
                this.$emit('change', newVal)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .search-input-container {
        width: 100%;

        height: 28px;

        background-color: #e0e0e0;

        border-radius: 5px;
    }

    .search-input {
        border: none;

        outline: none;

        background-color: transparent;

        width: 100%;

        font-size: 12px;

        line-height: 24px;

        color: $SECONDARY_FONT_COLOR;
    }
</style>
