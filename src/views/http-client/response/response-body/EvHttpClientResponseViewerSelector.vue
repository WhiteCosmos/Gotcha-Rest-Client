<template>
    <v-menu v-model="show" v-bind="config" v-if="hasMultipleTypes">
        <template v-slot:activator="{ on }">
            <div class="ev-http-client-response-viewer-selector" v-on="on">
                <ev-label size="10" secondary>{{ type }}</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <div class="d-flex flex-shrink-0">
                    <ev-small-select-icon></ev-small-select-icon>
                </div>
            </div>
        </template>

        <div class="ev-http-client-response-viewer-selector__menu">
            <div class="ev-http-client-response-viewer-selector__item" @click="doSelectViewerType(type)" v-for="type in types">
                <ev-label size="10" secondary>{{ type }}</ev-label>
            </div>
        </div>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvSmallSelectIcon from '@/views/http-client/icon/ev-small-select-icon'
    import EvPopupMenu from '@/components/menu/EvPopupMenu'
    import EvPopupMenuItem from '@/components/menu/EvPopupMenuItem'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'

    export default {
        name: "EvHttpClientResponseViewerSelector",

        components: {
            EvContextMenuItem,
            EvContextMenu,
            EvPopupMenuItem,
            EvPopupMenu,
            EvSmallSelectIcon,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            extension: {
                type: String,
                default: 'JSON'
            }
        },

        created() {
            // if (this.extension) {
            //     this.type = this.extension.toUpperCase()
            // }
        },

        data() {
            return {
                show: false,

                type: "TEXT", // default type

                config: {
                    'offset-y': true,

                    'nudge-left': 8,

                    'nudge-bottom': 4
                }
            }
        },

        computed: {
            types() {
                if (this.extension === 'json') {
                    return [
                        'TEXT',
                        'JSON',
                    ]
                }

                if (this.extension === 'html') {
                    return [
                        'TEXT',
                        'WEB',
                    ]
                }

                return []
            },

            hasMultipleTypes() {
                return this.extension === 'html' || this.extension === 'json'
            }
        },

        methods: {
            doSelectViewerType(type) {
                this.$emit('select-viewer-type', type)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-response-viewer-selector {
        position: absolute;

        display: flex;

        align-items: center;

        //justify-content: center;

        padding-left: 0px;

        padding-right: 8px;

        height: 12px;

        width: 40px;

        //background-color: #F1F1F1;

        border-radius: 3px;

        right: -12px;

        user-select: none;

        &__menu {
            display: flex;

            flex-direction: column;

            background-color: #F1F1F1;

            width: 56px;

            padding: 4px;
        }

        &__item {
            display: flex;

            align-items: center;

            height: 20px;

            border-radius: 3px;

            padding-left: 4px;

            &:hover {
                background-color: #EAEAEA;
            }
        }
    }
</style>
