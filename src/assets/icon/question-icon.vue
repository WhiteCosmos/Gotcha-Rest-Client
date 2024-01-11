<template>
  <div class="question d-flex align-center justify-center">
    <span class="question__font">?</span>
  </div>
</template>

<script>
export default {
  name: "question-icon",
}
</script>

<style lang="scss" scoped>
.question {
    height: 12px;

    width: 12px;

    border: 1px solid #007AFF;

    border-radius: 22px;

    user-select: none;

    padding-top: 1px;

    background-color: #FAFAFA;
}

.question__font {
    font-size: 10px;

    line-height: 12;

    font-weight: normal;

    font-family: "Source Code Pro ", sans-serif;

    text-align: center;

    color: #007AFF;
}
</style>
