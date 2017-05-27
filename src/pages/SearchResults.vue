<template>
  <div>
    <h1>Results</h1>
    <search
      v-model="searchTerm"
      @onSearch="onSearch">
    </search>

    <search-result
      v-for="searchResult in searchResults"
      :key="searchResult.id"
      :id="searchResult.id"
      :src="searchResult.images.fixed_height.url"
      @onResultSelect="onResultSelect">
    </search-result>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Search from '../components/Search.vue'
import SearchResult from '../components/SearchResult.vue'

export default {
  name: 'home',

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

  watch: {
    '$route': 'fetchResults'
  },

  computed: {
    ...mapGetters('giphy', [
      'searchResults'
    ])
  },

  methods: {
    ...mapActions('giphy', [
      'SEARCH',
    ]),

    fetchResults () {
      this.error = null
      this.loading = true
      this.searchTerm = this.$route.params.searchTerm
      this.SEARCH(this.searchTerm)
        .then(() => {
          this.loading = false
          console.log(this.searchResults)
        })
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
