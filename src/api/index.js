import axios from 'axios'
import '../settings'

const instance = axios.create({
  baseURL: 'https://api.giphy.com/v1/'
})

function fetch (endpoint) {
	return instance.get(endpoint)
}

export default {
	search (searchTerm, limit = 20) {
	  return fetch(`/gifs/search?q=${searchTerm}&limit=${limit}&api_key=${ENV.giphy.apiKey}`)
	},
	getGifById (gifId) {
	  return fetch(`/gifs/${gifId}?api_key=${ENV.giphy.apiKey}`)
	}
}
