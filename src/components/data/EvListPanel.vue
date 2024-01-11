<template>
    <div class="ev-list-panel">
        <div class="ev-list-panel__title">
            <span class="ev-list-panel__title__font">{{ title }}</span>
        </div>

        <div class="ev-list-panel__item" v-for="item in items">
            <slot name="item" v-bind:item="item"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EvListPanel",

        props: {
            title: {
                type: String,
                default: "项目信息"
            },

            items: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../style/common";
</style>
