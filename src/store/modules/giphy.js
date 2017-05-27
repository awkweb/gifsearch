import Vue from 'vue'
import axios from 'axios'
import ls from 'local-storage'

import api from '../../api'
import {
	SET_SEARCH_RESULTS, SET_ACTIVE_RESULT_INDEX, SET_ACTIVE_RESULT,
	SET_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE
} from '../constants'

const state = {
	searchResults: [],
	activeResultIndex: null,
	activeResult: null,
	favorites: {}
}

const actions = {
  SEARCH: ({ state, commit, rootState }, searchTerm) => {
    return api.search(searchTerm)
    	.then(res => commit(SET_SEARCH_RESULTS, res.data.data))
  },
  FETCH_FAVORITES: ({ state, commit, rootState }) => {
  	const favoriteIds = Object.keys(state.favorites)
  	const promises = favoriteIds.map(favoriteId => api.getGifById(favoriteId))
    return axios.all(promises)
    	.then(res => {
    		const favorites = res.map(r => r.data.data)
    		console.log(favorites)
    		commit(SET_FAVORITES, favorites)
    	})
  }
}

const mutations = {
	[SET_SEARCH_RESULTS] (state, searchResults) {
		state.searchResults = searchResults
	},
	[SET_ACTIVE_RESULT] (state, activeResultId) {
		const activeResult = state.searchResults.find(searchResult => searchResult.id === activeResultId)
		state.activeResult = activeResult
	},
	[SET_ACTIVE_RESULT_INDEX] (state, activeResultId) {
		const activeResultIndex = state.searchResults.findIndex(searchResult => searchResult.id === activeResultId)
		state.activeResultIndex = activeResultIndex
	},
	[SET_FAVORITES] (state, favorites) {
		if (!favorites)
			favorites = ls.get('favorites') || {}
		state.favorites = favorites
	},
	[ADD_FAVORITE] (state, favoriteId) {
		Vue.set(state.favorites, favoriteId, 1)
  	ls.set('favorites', state.favorites)
	},
	[REMOVE_FAVORITE] (state, favoriteId) {
		Vue.delete(state.favorites, favoriteId)
  	ls.set('favorites', state.favorites)
	}
}

const getters = {
  searchResults: state => {
    return state.searchResults
  },
  activeResult: state => {
    return state.activeResult
  },
  activeResultIndex: state => {
    return state.activeResultIndex
  },
  favorites: state => {
    return state.favorites
  }
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}