import hljs
    from 'highlightjs'

onmessage = function (event) {
    let value = hljs.highlightAuto(event.data).value
    postMessage(value)
}