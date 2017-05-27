import Vue from 'vue'
import Vuex from 'vuex'

import giphy from './modules/giphy'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},

  modules: {
    giphy
  },

  actions: {},

  mutations: {},

  getters: {}
})

export default store