<!-- 返回当前订阅状态 -->

<script>
    import EvStoreMixin from '@/mixins/EvStoreMixin'

    import _ from 'lodash'

    export default {
        name: "EvSubscriptionMixin",

        mixins: [
            EvStoreMixin
        ],

        data() {
            return {
                maximum: 3
            }
        },

        computed: {
            isMaximumProjectsReached() {
                return false
                // return this.projects && this.projects.length >= (this.maximum + 1) && this.isInFreeMode
            },

            isFirstDownload() {
                let p = this.subscription

                return p && !p.subscribed && !p.expired && !p.freeMode && _.isEmpty(p.receipt)
            },

            isInFreeMode() {
                let p = this.subscription

                return p && !!p.freeMode
            },

            isInSubscription() {
                let p = this.subscription

                return p && !!p.subscribed
            },

            isInSubscriptionExpired() {
                let p = this.subscription

                return p && !!p.expired
            },

            isInSubscriptionFreeTrial() {
                let p = this.subscription

                return p && !!p.subscribed && !!p.freeTrial
            },
        }
    }
</script>

