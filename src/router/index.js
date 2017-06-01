import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'

import Home from '../pages/Home.vue'
import Favorites from '../pages/Favorites.vue'
import SearchResults from '../pages/SearchResults.vue'
import Details from '../pages/Details.vue'
import NotFound from '../pages/NotFound.vue'

Vue.use(VueHead)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
    	path: '/',
    	name: 'home',
    	component: Home
   	},
		{
			path: '/favorites/',
			name: 'favorites',
			component: Favorites
		},
		{
			path: '/favorites/:gifId/',
			name: 'favorite-details',
			component: Details
		},
		{
			path: '/g/:searchTerm/',
			name: 'search-results',
			component: SearchResults
		},
		{
			path: '/g/:searchTerm/:gifId/',
			name: 'details',
			component: Details
		},
		{
			path: '*',
			name: 'notfound',
			component: NotFound
		}
  ],
  scrollBehavior (to, from, savedPosition) {
	  if (savedPosition) {
	    return savedPosition
	  } else {
	    return { x: 0, y: 0 }
	  }
	}
})

export default router
