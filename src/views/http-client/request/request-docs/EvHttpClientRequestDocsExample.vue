<template>
    <div class="ev-http-client-request-docs-example">
        <div class="ev-http-client-request-docs-example__subtitle">
            <ev-label size="11" bold secondary>Response Body Example</ev-label>
        </div>
        <p>
            {{ GHCJson.beautify(example) }}
        </p>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import GHCJson from '../../../../core/json/GHCJson'

    export default {
        name: "EvHttpClientRequestDocsExample",
        computed: {
            GHCJson() {
                return GHCJson
            }
        },
        components: {EvLabel},
        data() {
            return {
                example: "{\n" +
                    "    \"args\": {\n" +
                    "        \"aaa\": \"bbb\",\n" +
                    "        \"ccc\": \"ddd\",\n" +
                    "        \"fs\": \"fsfsf\",\n" +
                    "        \"fsfa\": \"fsf\",\n" +
                    "        \"hhh\": \"参参参参参\"\n" +
                    "    },\n" +
                    "    \"headers\": {\n" +
                    "        \"Accept-Encoding\": \"gzip, deflate, br\",\n" +
                    "        \"Fsaf\": \"asfsdfss\",\n" +
                    "        \"Fsf\": \"safs\",\n" +
                    "        \"Host\": \"httpbin.org\",\n" +
                    "        \"Safasf\": \"afsaf\",\n" +
                    "        \"User-Agent\": \"got (https://github.com/sindresorhus/got)\",\n" +
                    "        \"X-Amzn-Trace-Id\": \"Root=1-61d99baf-739214e65a6aa6f626f130f0\"\n" +
                    "    },\n" +
                    "    \"origin\": \"103.156.242.83\",\n" +
                    "    \"url\": \"http://httpbin.org/get?aaa=bbb&ccc=ddd&hhh=参参参参参&fsfa=fsf&fs=fsfsf\"\n" +
                    "}"
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-docs-example {
        display: flex;

        flex-direction: column;

        min-height: 160px;

        width: 100%;

        &__subtitle {
            display: flex;

            align-items: center;

            height: 28px;

            border-bottom: 1px solid #EAEAEA;
        }

        p {
            padding: 8px;

            background-color: #FCFCFC;

            font-size: 10px;

            color: #999;
        }
    }
</style>
