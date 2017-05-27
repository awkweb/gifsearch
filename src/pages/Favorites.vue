<template>
  <div>
    <h1>{{searchTerm}}</h1>
    <search
      v-model="searchTerm"
      :searchTerm="searchTerm"
      @onSearch="onSearch">
    </search>

    <search-result
      v-for="favorite in favorites"
      :key="favorite.id"
      :id="favorite.id"
      :src="favorite.images.fixed_height.url"
      @onResultSelect="onResultSelect">
    </search-result>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Search from '../components/Search.vue'
import SearchResult from '../components/SearchResult.vue'

export default {
  name: 'favorites',

  data: () => ({
    searchTerm: '',
    loading: false,
    error: null
  }),

  components: {
    Search,
    SearchResult
  },

  created () {
    this.fetchResults()
  },

  computed: {
    ...mapGetters('giphy', [
      'favorites'
    ])
  },

  methods: {
    ...mapActions('giphy', [
      'FETCH_FAVORITES'
    ]),

    fetchResults () {
      this.error = null
      this.loading = true
      this.FETCH_FAVORITES(this.searchTerm)
        .then(() => this.loading = false)
        .catch(err => this.error = err)
    },

    onSearch () {
      this.$router.push({ name: 'search-results', params: { searchTerm: this.searchTerm }})
    },

    onResultSelect (resultId) {
      this.$router.push({ name: 'details', params: { searchTerm: this.searchTerm, resultId: resultId }}) 
    }
  },

  head: {
    title: {
      inner: 'Results'
    }
  }
}
</script>

<style lang="scss">
  @import '../scss/_variables.scss';
  @import '../scss/_functions.scss';
</style>
