import Vue from 'vue'
import Vuex from 'vuex'

import giphy from './modules/giphy'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    giphy
  }
})

export default store