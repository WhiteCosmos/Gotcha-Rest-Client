<template>
    <div class="http-client-response-container-menu-item">
        <ev-label bold blue size="11" v-if="isSelectedItem">{{ menuLabel }}</ev-label>

        <ev-label bold secondary size="11" v-else>{{ menuLabel }}</ev-label>

        <ev-counter-label :value="item.counter" v-if="hasCounter" style="margin-left: 3px;"></ev-counter-label>

        <div class="http-client-response-container-menu-item__badge" :class='badgeClasses' v-if="hasBadge"></div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvRadio from '@/components/form/EvRadio'
    import EvHttpClientResponseViewerSelector from '@/views/http-client/response/response-body/EvHttpClientResponseViewerSelector'
    import EvCounterLabel from '@/components/label/EvCounterLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvHttpClientResponseContainerMenuItem",

        components: {
            EvVerticalGutter,
            EvCounterLabel,
            EvHttpClientResponseViewerSelector,
            EvRadio,
            EvLabel
        },

        props: {
            item: Object,

            selectedItem: Object,

            payload: Object,
        },

        computed: {
            menuLabel() {
                switch (this.item.name) {
                    case 'Summary':
                        return this.$t('EvHttpClientResponse.summary')
                    case 'Headers':
                        return this.$t('EvHttpClientResponse.headers')
                    case 'Body':
                        return this.$t('EvHttpClientResponse.body')
                    case 'Tests':
                        return this.$t('EvHttpClientResponse.tests')
                }
            },

            isSelectedItem() {
                return this.item.type === this.selectedItem.type
            },

            isBodyMenu() {
                return this.item && this.item.name === "Body"
            },

            hasCounter() {
                return this.item.counter !== undefined
            },

            badgeClasses() {
                if (this.item.badge && this.item.badge === 'green') {
                    return ['http-client-response-container-menu-item__badge--green']
                }

                if (this.item.badge && this.item.badge === 'red') {
                    return ['http-client-response-container-menu-item__badge--red']
                }

                return ['http-client-response-container-menu-item__badge--none']
            },

            hasBadge() {
                return this.item.badge !== undefined
            },
        },

        data() {
            return {
                json: [
                    'text',
                    'json',
                ],

                html: [
                    'text',
                    'web',
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-response-container-menu-item {
        position: relative;

        display: flex;

        align-items: center;

        justify-content: center;

        margin-right: 12px;

        padding-left: 6px;

        padding-right: 6px;

        &__badge {
            position: absolute;

            @include full-center;

            top: 4px;

            right: -4px;

            width: 6px;

            height: 6px;

            border-radius: 6px;

            &--none {
                border: 1px solid #AABBCC;
            }

            &--red {
                border: 1px solid #e67575;

                background-color: $RED_COLOR;
            }

            &--green {
                border: 1px solid #9acc68;

                background-color: #ade675;
            }
        }
    }
</style>
