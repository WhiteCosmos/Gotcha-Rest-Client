<template>
    <div class="toggle-button">
        <span class="toggle-button__font">详情</span>
    </div>
</template>

<script>
    export default {
        name: "EvTextToggleButton",

        props: {
            items: {
                type: Array,
                default: () => {
                    return ["before", "after"]
                }
            }
        },

        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .toggle-button {
        padding-left: 4px;

        padding-right: 4px;

        height: 16px;

        display: flex;

        align-items: center;

        user-select: none;
    }

    .toggle-button__font {
        font-size: 12px;

        font-weight: normal;

        color: #007AFF;
    }
</style>
