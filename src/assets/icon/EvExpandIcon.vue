<template>
    <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M8.42874646,2.71457744 L10.5456513,6.24275212 C10.6877254,6.47954226 10.6109428,6.78667238 10.3741527,6.92874646 C10.296445,6.97537108 10.2075268,7 10.1169048,7 L5.88309519,7 C5.60695281,7 5.38309519,6.77614237 5.38309519,6.5 C5.38309519,6.40937803 5.40772411,6.32045982 5.45434873,6.24275212 L7.57125354,2.71457744 C7.71332762,2.47778731 8.02045774,2.40100477 8.25724788,2.54307885 C8.32762268,2.58530373 8.38652158,2.64420264 8.42874646,2.71457744 Z" id="Triangle" :fill="color"></path>
            <path d="M8.42874646,9.71457744 L10.5456513,13.2427521 C10.6877254,13.4795423 10.6109428,13.7866724 10.3741527,13.9287465 C10.296445,13.9753711 10.2075268,14 10.1169048,14 L5.88309519,14 C5.60695281,14 5.38309519,13.7761424 5.38309519,13.5 C5.38309519,13.409378 5.40772411,13.3204598 5.45434873,13.2427521 L7.57125354,9.71457744 C7.71332762,9.47778731 8.02045774,9.40100477 8.25724788,9.54307885 C8.32762268,9.58530373 8.38652158,9.64420264 8.42874646,9.71457744 Z" id="Triangle" :fill="color" transform="translate(8.000000, 11.500000) rotate(180.000000) translate(-8.000000, -11.500000) "></path>
            <rect id="Rectangle" :fill="color" x="0" y="0" width="16" height="1" rx="0.5"></rect>
            <rect id="Rectangle" :fill="color" x="0" y="15" width="16" height="1" rx="0.5"></rect>
        </g>
    </svg>
</template>

<script>
    import EvIconMixin from '@/mixins/EvIconMixin'

    export default {
        name: "EvExpandIcon",

        mixins: [
            EvIconMixin,
        ]
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>
