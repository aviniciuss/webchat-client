// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueSocketio from 'vue-socket.io'
import App from './App'

Vue.use(Vuetify)
Vue.use(VueSocketio, 'http://localhost:3000')
Vue.config.productionTip = false

Vue.storage = Vue.prototype.$storage = window.sessionStorage

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
