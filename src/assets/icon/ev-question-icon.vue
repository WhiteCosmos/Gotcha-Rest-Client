<template>
    <div class="question d-flex align-center justify-center">
        <span class="question__font">?</span>
    </div>
</template>

<script>
    export default {
        name: "EvQuestionIcon",
    }
</script>

<style lang="scss" scoped>
    @import "@/styles/rabiapi.scss";

    .question {
        height: 15px;

        width: 15px;

        border-radius: 8px;

        user-select: none;

        background-color: $YELLOW_COLOR;

        padding-top: 1px;
    }

    .question__font {
        font-size: 12px;

        font-family: "Source Code Pro ", sans-serif;

        text-align: center;

        color: black;
    }
</style>
