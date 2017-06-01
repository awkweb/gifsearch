import Vue from 'vue'
import axios from 'axios'
import ls from 'local-storage'

import api from '../../api'
import {
	SET_SEARCH_RESULTS, SET_ACTIVE_GIF, SET_ACTIVE_GIF_INDEX,
	SET_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE
} from '../constants'

const state = {
	searchResults: [],
	favorites: [],
	favoritesLookup: {},
	activeGif: null,
	activeGifIndex: 0
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

	[SET_ACTIVE_GIF] (state, activeGif) {
		state.activeGif = activeGif
	},

	[SET_ACTIVE_GIF_INDEX] (state, activeGifIndex) {
		state.activeGifIndex = activeGifIndex
	},

	[SET_FAVORITES] (state) {
		const favoritesLookup = ls.get('favoritesLookup') || {}
		let favorites = []
		Object.keys(favoritesLookup).forEach(key => {
			const favorite = favoritesLookup[key]
			favorites.push(favorite)
		})
		state.favorites = favorites
		state.favoritesLookup = favoritesLookup
	},

	[ADD_FAVORITE] (state, favorite) {
		state.favorites.push(favorite)
		Vue.set(state.favoritesLookup, favorite.id, favorite)
  	ls.set('favoritesLookup', state.favoritesLookup)
	},

	[REMOVE_FAVORITE] (state, favoriteId) {
		state.favorites = state.favorites.filter(favorite => favorite.id !== favoriteId)
		Vue.delete(state.favoritesLookup, favoriteId)
  	ls.set('favoritesLookup', state.favoritesLookup)
	}
}

const getters = {
  searchResults: state => {
    return state.searchResults
  },

  favorites: state => {
    return state.favorites
  },

  favoritesLookup: state => {
    return state.favoritesLookup
  },

  activeGif: state => {
    return state.activeGif
  },

  activeGifIndex: state => {
    return state.activeGifIndex
  }
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
