<template>
    <div class="d-flex flex-column">
        <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

<!--        <span class="column-block-title column-block-title__example">{{ $t('JavaColumnDescription.constraint') }}</span>-->

        <ul>
            <li v-for="constraint in constraints">{{ constraint.constraintName }} : {{ constraint.constraintValue }}</li>
        </ul>

        <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "java-column-constraint-block",
        components: {EvHorizonGutter},
        props: {
            jsonConstraint: Object
        },

        computed: {
            constraints() {
                let constraints = []

                for (let constraintName in this.jsonConstraint) {
                    constraints.push({
                        constraintName: this.$t('JavaColumnConstraintBlock.' + constraintName),
                        constraintValue: this.jsonConstraint[constraintName]
                    })
                }

                return constraints
            },
        },

        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import "java-column-block";

    ul {
        li {
            width: fit-content;

            padding-left: 4px;

            padding-right: 4px;

            font-size: 10px;

            line-height: 16px;

            font-weight: 500;

            margin-bottom: 4px;

            margin-left: -8px;

            color: rgba(50, 50, 159, 0.9);

            background-color: rgba(104, 104, 207, 0.05);

            border-radius: 3px;
        }
    }
</style>
