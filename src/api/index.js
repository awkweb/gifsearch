import axios from 'axios'
import '../settings'
import * as dogs from '../dogs.json'

const instance = axios.create({
  baseURL: 'https://api.giphy.com/v1/'
})

function fetch (endpoint) {
	// return instance.get(endpoint)
  return new Promise((resolve, reject) => resolve({ data: dogs }))
}

export default {
	search (searchTerm, limit = 20) {
	  return fetch(`/gifs/search?q=${searchTerm}&limit=${limit}&api_key=${ENV.giphy.apiKey}`)
	}
}
