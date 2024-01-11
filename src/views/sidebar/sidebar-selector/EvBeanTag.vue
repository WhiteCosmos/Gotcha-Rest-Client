<template>
    <div class="api-tag d-flex align-center justify-center">
        <span class="api-tag__font">{ ... }</span>
    </div>
</template>

<script>
    export default {
        name: "EvBeanTag",
    }
</script>

<style lang="scss" scoped>

    @import "../../../styles/sidebar";

    .api-tag {
        height: 16px;

        //padding-left: 4px;

        //padding-right: 4px;

        border-radius: 2px;

        border: 1px solid #87b35b;

        background-color: #ebf2e6;
    }

    .api-tag__font {
        width: 28px;

        text-align: center;

        font-size: 11px;

        line-height: 16px;

        font-weight: bold;

        color: #74994e;
    }

</style>
