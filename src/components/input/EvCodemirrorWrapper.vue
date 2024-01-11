<template>
    <div class="ev-codemirror-wrapper">
        <textarea ref="codemirror-textarea"></textarea>
    </div>
</template>

<script>
    import 'codemirror/lib/codemirror.css'
    import '@/styles/codemirror-rabiapi-theme.css'

    import 'codemirror/addon/scroll/simplescrollbars'
    import 'codemirror/addon/scroll/simplescrollbars.css'

    import 'codemirror/addon/edit/closebrackets'
    import 'codemirror/addon/edit/matchbrackets'
    import 'codemirror/addon/selection/active-line'
    // import 'codemirror/addon/display/autorefresh' // Memory Leak

    // Mode

    import 'codemirror/mode/javascript/javascript'
    import 'codemirror/mode/yaml/yaml'
    import 'codemirror/mode/xml/xml'
    import 'codemirror/mode/htmlmixed/htmlmixed'
    import 'codemirror/mode/css/css'
    import 'codemirror/mode/http/http'

    // Linting

    import 'codemirror/addon/lint/lint'
    import 'codemirror/addon/lint/json-lint'
    import 'codemirror/addon/lint/lint.css'

    require('script-loader!jsonlint') // WTF ???

    // Folding

    import 'codemirror/addon/fold/foldcode'
    import 'codemirror/addon/fold/foldgutter'
    import 'codemirror/addon/fold/foldgutter.css'
    import 'codemirror/addon/fold/brace-fold'
    import 'codemirror/addon/fold/indent-fold'
    import 'codemirror/addon/fold/xml-fold'

    // GraphQL

    import 'codemirror/addon/hint/show-hint'
    import 'codemirror/addon/lint/lint'
    import 'codemirror-graphql/hint'
    import 'codemirror-graphql/lint'
    import 'codemirror-graphql/mode'

    // Search

    // import 'codemirror/addon/search/search'
    import './CodemirrorSearch'
    import 'codemirror/addon/search/searchcursor'
    import 'codemirror/addon/scroll/annotatescrollbar'
    import 'codemirror/addon/search/matchesonscrollbar'
    import 'codemirror/addon/search/matchesonscrollbar.css'
    import 'codemirror/addon/search/match-highlighter'
    // import 'codemirror/addon/dialog/dialog'
    // import 'codemirror/addon/dialog/dialog.css'

    import _ from 'lodash'
    import CodeMirror from 'codemirror'
    import GHCJson from '@/core/json/GHCJson'

    export default {
        name: "EvCodemirrorWrapper",

        created() {
            this.initialize()
        },

        mounted() {
            this.loadCodemirror()
        },

        beforeDestroy() {
            this.editor.off('change', this.handleValueChange)

            this.editor.off('cursorActivity', this.handleCursorActivity)

            this.editor.off('searchComplete', this.handleSearchComplete)

            this.editor.off('renderLine', this.handleRenderLine)

            this.editor.toTextArea()

            clearTimeout(this.timeoutId)
        },

        model: {
            prop: 'text',

            event: 'change'
        },

        props: {
            text: String,

            options: {
                type: Object,
                default: () => {
                    return {}
                }
            },

            readOnly: {
                type: Boolean,
                default: false
            },

            mode: { // text | json | yaml | html | xml | http ...
                type: String,
                default: 'json'
            }
        },

        data() {
            return {
                editor: undefined,

                options_: {
                    tabSize: 4,
                    theme: 'gotcha',
                    lineNumbers: true,
                    line: true,
                    lineWrapping: true,
                    styleActiveLine: true,
                    styleActiveSelected: true,
                    autoFocus: true,
                    autoRefresh: true,
                    autoCloseBrackets: true,
                    matchBrackets: false,
                    indentUnit: 4,
                    scrollbarStyle: 'simple',
                    lint: false, // Modified
                    foldGutter: false, // Modified
                    // gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    mode: {
                        // name: 'javascript',
                        // json: true
                    },
                },

                timeoutId: -1,
            }
        },

        computed: {
            modeOptions() {
                if (!this.mode) {
                    return {}
                }

                if (this.isTextMode) {
                    return {
                        mode: 'text'
                    }
                }

                if (this.isJsonMode) {
                    return {
                        lint: true,
                        foldGutter: true,
                        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                        mode: {
                            name: 'javascript',
                            json: true
                        },
                    }
                }

                if (this.isYamlMode) {
                    return {
                        foldGutter: true,
                        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                        mode: 'yaml'
                    }
                }

                if (this.isHtmlMode) {
                    return {
                        foldGutter: true,
                        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                        mode: 'htmlmixed'
                    }
                }

                if (this.isXmlMode) {
                    return {
                        foldGutter: true,
                        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                        mode: 'xml'
                    }
                }

                if (this.isGraphqlMode) {
                    return {
                        mode: 'graphql' // TODO schema
                    }
                }

                if (this.isHttpMode) {
                    return {
                        styleActiveLine: false,
                        mode: 'message/http'
                    }
                }
            },

            isTextMode() {
                return this.mode === 'text'
            },

            isJsonMode() {
                return this.mode === 'json'
            },

            isYamlMode() {
                return this.mode === 'yaml'
            },

            isHtmlMode() {
                return this.mode === 'html'
            },

            isXmlMode() {
                return this.mode === 'xml'
            },

            isGraphqlMode() {
                return this.mode === 'graphql'
            },

            isHttpMode() {
                return this.mode === 'http'
            },
        },

        watch: {
            text(newVal, oldVal) {
                if (newVal === oldVal) {
                    return
                }

                if (this.readOnly) {
                    // this.$nextTick(() => {
                    //     this.refresh(newVal)
                    // })
                    this.editor.setValue(newVal)
                }
            },

            mode() {
                if (this.isTextMode) {
                    this.editor.setOption('mode', 'text')
                    this.editor.setOption('lint', false)
                    this.editor.setOption('foldGutter', false)
                }

                if (this.isJsonMode) {
                    this.editor.setOption('mode', {
                        name: 'javascript',
                        json: true
                    })
                    this.editor.setOption('lint', true)
                    this.editor.setOption('foldGutter', true)
                }

                if (this.isYamlMode) {
                    this.editor.setOption('mode', 'yaml')
                    this.editor.setOption('lint', true)
                    this.editor.setOption('foldGutter', true)
                }

                if (this.isHtmlMode) {
                    this.editor.setOption('mode', 'htmlmixed')
                    this.editor.setOption('lint', true)
                    this.editor.setOption('foldGutter', true)
                }

                if (this.isXmlMode) {
                    this.editor.setOption('mode', 'xml')
                    this.editor.setOption('lint', true)
                    this.editor.setOption('foldGutter', true)
                }
            }
        },

        methods: {
            initialize() {
                Object.assign(this.options_, this.options)

                Object.assign(this.options_, this.modeOptions)

                if (this.readOnly) {
                    this.options_.readOnly = true
                }
            },

            loadCodemirror() {
                let textarea = this.$refs['codemirror-textarea']

                this.editor = CodeMirror.fromTextArea(textarea, this.options_)

                this.editor.setSize('100%', '100%')

                this.editor.on('change', this.handleValueChange)

                this.editor.on('cursorActivity', this.handleCursorActivity)

                this.editor.on('searchComplete', this.handleSearchComplete)

                this.indentWrappedLine()

                this.editor.setValue(this.text)
            },

            search(keyword) {
                if (!this.editor) {
                    return
                }

                if (_.isEmpty(keyword)) {
                    this.editor.execCommand('clearSearch')
                    return
                }

                function SearchState() {
                    this.posFrom = null
                    this.posTo = null
                    this.lastQuery = null
                    this.query = null
                    this.overlay = null
                }

                if (!this.editor.state.search) {
                    this.editor.state.search = new SearchState()
                }

                this.editor.state.search.query = keyword

                this.editor.execCommand('find_')
            },

            findPrevious() {
                this.editor.execCommand('findPrev_')
            },

            findNext() {
                this.editor.execCommand('findNext_')
            },

            handleValueChange(cm) {
                this.$emit('change', cm.getValue())
            },

            indentWrappedLine() {
                let readOnly = this.editor.getOption("readOnly")

                if (readOnly && this.isJsonMode) {
                    this.editor.on("renderLine", this.handleRenderLine)
                }
            },

            handleRenderLine(cm, line, elt) {
                let charWidth = this.editor.defaultCharWidth()

                let basePadding = 4

                let off = (CodeMirror.countColumn(line.text, null, cm.getOption("tabSize")) + 1) * charWidth

                elt.style.textIndent = "-" + off + "px"

                elt.style.paddingLeft = (basePadding + off) + "px"
            },

            handleCursorActivity() {
                let cursor = this.editor.getCursor()

                this.$emit('cursor-activity', cursor)
            },

            handleSearchComplete(state) {
                this.$emit('search-complete', state)
            },

            refresh(value) {
                if (value) {
                    this.editor.setValue(value)
                } else {
                    this.editor.setValue(this.text)
                }

                this.editor.refresh()
            },

            reload() {
                this.loadCodemirror()
            },

            beautify() {
                // mode

                if (!this.isJsonMode) {
                    return
                }

                try {
                    let jsonStr = GHCJson.beautify(this.text)

                    this.editor.setValue(jsonStr)
                } catch (ignore) {
                    // Format Error
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-codemirror-wrapper {
        position: relative;

        width: 100%;

        height: 100%;
    }
</style>
