<template>
    <div class="project-delete-button">
        <v-icon size="12" color="#AABBCC">fa-trash-alt</v-icon>
    </div>
</template>

<script>
    export default {
        name: "EvProjectDeleteButton",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .project-delete-button {
        height: 16px;

        width: 16px;

        @include full-center;
    }
</style>
