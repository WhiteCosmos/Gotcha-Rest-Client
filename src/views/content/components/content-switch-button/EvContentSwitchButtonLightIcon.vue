<template>
    <svg width="8px" height="12px" viewBox="0 0 8 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="RabiAPI-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group-11" transform="translate(-310.000000, -30.000000)" :fill="color" class="icon-transition">
                <g id="Group-10" transform="translate(106.000000, 6.000000)">
                    <path d="M208.415259,24.1088618 L207.288466,28.4332342 C207.267078,28.515317 207.321067,28.5955758 207.413674,28.6314873 L207.479804,28.6482676 L211.804007,29.2241287 C211.93255,29.2412469 212.018735,29.3353743 211.996507,29.4343682 C211.990082,29.4629842 211.974853,29.4899996 211.952095,29.5131553 L205.612065,35.963934 C205.5727,36.0039861 205.498629,36.0118791 205.446622,35.9815635 C205.408685,35.9594501 205.391684,35.921965 205.403492,35.8864705 L207.046387,30.9478553 C207.075408,30.8606158 207.017172,30.7701543 206.909441,30.7351283 L204.144396,29.8361472 C204.044247,29.8035863 203.988461,29.7240592 204.002009,29.6448938 L204.024874,29.5874046 L208.197301,24.0453422 C208.23002,24.001888 208.302286,23.9870885 208.35871,24.0122865 C208.402471,24.0318292 208.425212,24.0706655 208.415259,24.1088618 Z" id="Rectangle"></path>
                </g>
            </g>
        </g>
    </svg>
</template>

<script>
    import EvIconMixin from '@/mixins/EvIconMixin'

    export default {
        name: "EvContentSwitchButtonLightIcon",

        mixins: [
            EvIconMixin,
        ]
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .xxx {
        transition: .15s;
    }
</style>
