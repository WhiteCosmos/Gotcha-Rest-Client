function scrollHorizontally(e) {
    e = window.event || e

    let element = e.target
    while (!element.getAttribute("v-hscroll-main"))
        element = element.parentNode

    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
    element.scrollLeft -= (delta * 40)

    if ((delta > 0 && element.scrollLeft > 0) ||
        (delta < 0 && element.offsetWidth + element.scrollLeft < element.scrollWidth)) {
        e.preventDefault()
    }
}

const HScroll = {
    bind(el, bindings, vn) {
        el.setAttribute("v-hscroll-main", "1")
        el.addEventListener('wheel', scrollHorizontally, false)
    },

    unbind(el, bindings, vn) {
        el.removeEventListener('wheel', scrollHorizontally, false)
    }
}

export default HScroll
