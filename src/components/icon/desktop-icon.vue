<template>
    <div class="desktop-icon">
        <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Advance" transform="translate(-34.000000, -33.000000)">
                    <g id="Group" transform="translate(34.000096, 33.000000)">
                        <path d="M22.299584,1 C22.4859417,1 22.6546111,1.08964159 22.7954667,1.21964155 C23.0005894,1.40895557 23.1499149,1.6836449 23.2320175,2.00327436 L23.2320175,2.00327436 L26.9323374,16.4087978 C26.9772986,16.5838339 26.9999039,16.7668509 26.9999039,16.950978 L26.9999039,16.950978 L26.9999039,23.1053101 C26.9999039,24.3866039 26.9293818,24.9681944 26.7578493,25.452348 C26.5116201,26.0435064 26.2644063,26.4088243 25.923976,26.6483862 C25.4507201,26.9263702 25.0393231,27 24.1540761,27 L24.1540761,27 L3.84573168,27 C2.98660912,27 2.57809594,26.9430546 2.24796682,26.7577523 C1.78757639,26.4443075 1.51447492,26.1076427 1.33006523,25.6769466 C1.09282536,25.0308029 1.01385554,24.5013786 1.0015301,23.4062954 L1.0015301,23.4062954 L1,16.9513717 C1,16.7669886 1.0225421,16.5837055 1.06756643,16.4084236 L1.06756643,16.4084236 L4.76779021,2.00327436 C4.84989283,1.6836449 4.99921838,1.40895557 5.20434103,1.21964155 C5.34519662,1.08964159 5.51386601,1 5.70022378,1 L5.70022378,1 Z" id="Path" stroke="#555" stroke-width="2"></path>
                        <circle id="Oval" fill="#555" cx="22.4999039" cy="22.5" r="1.5"></circle>
                        <circle id="Oval" fill="#555" cx="17.4999039" cy="22.5" r="1.5"></circle>
                        <circle id="Oval" fill="#555" cx="12.4999039" cy="22.5" r="1.5"></circle>
                        <rect id="Rectangle" fill="#555" x="0.999903878" y="16" width="26" height="3"></rect>
                    </g>
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
    import EvIconMixin from '@/mixins/EvIconMixin'

    export default {
        name: "desktop-icon",

        mixins: [
            EvIconMixin
        ]
    }
</script>

<style lang="scss" scoped>
    .desktop-icon {
        width: 14px;

        height: 14px;

        display: flex;

        justify-content: center;

        align-items: center;
    }
</style>
