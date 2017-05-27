import Vue from 'vue'

import api from '../../api'
import { SET_SEARCH_RESULTS, SET_ACTIVE_RESULT } from '../constants'

const state = {
	searchResults: [],
	activeResult: null
}

const actions = {
  SEARCH: ({ state, commit, rootState }, searchTerm) => {
    return api.search(searchTerm)
    	.then(res => commit(SET_SEARCH_RESULTS, res.data.data))
  }
}

const mutations = {
	[SET_SEARCH_RESULTS] (state, searchResults) {
		state.searchResults = searchResults
	},
	[SET_ACTIVE_RESULT] (state, activeResultId) {
		const activeResult = state.searchResults.find(searchResult => searchResult.id === activeResultId)
		state.activeResult = activeResult
	}
}

const getters = {
  searchResults: state => {
    return state.searchResults
  },
  activeResult: state => {
    return state.activeResult
  }
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}