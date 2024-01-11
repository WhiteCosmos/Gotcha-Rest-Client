import Vue
    from 'vue'
import App
    from './App.vue'
import vuetify
    from './plugins/vuetify'
import store
    from './store'
import VueI18n
    from 'vue-i18n'
import messages
    from '@/i18n/messages'
import VueVirtualScroller
    from 'vue-virtual-scroller'
import VueHotkey
    from 'v-hotkey'

import VueHighlightJS
    from 'vue-highlightjs'
import HScroll
    from '@/plugins/v-hscroll'
import ElectronEventBus
    from '@/ElectronEventBus'

// or other highlight.js theme

// import '@/styles/highlightjs.css'
// import 'highlight.js/styles/hybrid.css'

Vue.config.productionTip = false

Vue.use(VueVirtualScroller)

Vue.use(VueI18n)

Vue.use(VueHotkey)

Vue.use(VueHighlightJS)

Vue.directive('hscroll', HScroll)

const {app} = require('electron').remote

let electronLocale = app.getLocale()

let locale

if (electronLocale.startsWith("zh")) {
    locale = 'zh'
} else {
    locale = 'en'
}

let appLocale = localStorage.getItem('app_locale')

if (appLocale) {
    locale = appLocale
}

const i18n = new VueI18n({
    locale: locale, // 设置地区
    messages, // 设置地区信息
    silentTranslationWarn: true
})

/* eslint-disable no-new */
new Vue({
    vuetify,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')

ElectronEventBus.onChangeAppLocale((event, locale) => {
    i18n.locale = locale
    localStorage.setItem('app_locale', locale)
})

export default i18n