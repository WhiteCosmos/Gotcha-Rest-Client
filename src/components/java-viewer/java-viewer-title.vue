<template>
    <div class="java-viewer-title">
        <div class="java-viewer-title__column">
            <div class="java-viewer-title__icon" @click="toggle">
                <v-icon v-if="flag" color="primary" x-small>fa-compress</v-icon>

                <v-icon v-else color="primary" x-small>fa-expand</v-icon>
            </div>

            <span class="java-viewer-title__label">{{ $t("content.fieldName") }}</span>

            <ev-sort-button @toggle="sortByFieldName"></ev-sort-button>
        </div>

        <div class="java-viewer-title__column">
            <span class="java-viewer-title__label">{{ $t("content.fieldType") }}</span>

            <!--            <ev-sort-button @toggle="sortByFieldType"></ev-sort-button>-->
        </div>

        <div class="java-viewer-title__column">
            <span class="java-viewer-title__label">{{ $t("content.fieldComment") }}</span>
        </div>
    </div>
</template>

<script>
    import EvSortButton from '@/components/button/EvSortButton'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "java-viewer-title",

        components: {
            EvVerticalGutter,
            EvSortButton
        },

        data() {
            return {
                flag: true
            }
        },

        methods: {
            toggle() {
                this.flag = !this.flag

                if (this.flag) {
                    this.$emit("expand-all")
                } else {
                    this.$emit("collapse-all")
                }
            },

            sortByFieldName(order) {
                this.$emit("sort-by-field-name", order)
            },

            sortByFieldType(order) {
                this.$emit("sort-by-field-type", order)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "java-viewer";

    .java-viewer-title {
        display: flex;

        height: 28px;

        border-bottom: 1px solid #cce5ff;

        &__column {
            display: flex;

            align-items: center;

            flex: 1;

            min-width: 0;
        }

        &__icon {
            height: 28px;

            width: 24px;

            display: flex;

            align-items: center;

            justify-content: center;

            &:hover {
                cursor: pointer;
            }
        }

        &__label {
            font-size: 10px;

            font-weight: bold;

            color: $PRIMARY_COLOR;

            user-select: none;
        }
    }
</style>
