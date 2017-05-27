import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as directives from './directives'

const app = new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
})