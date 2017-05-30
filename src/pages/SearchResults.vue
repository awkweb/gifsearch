<template>
  <div>
    <navbar>
    </navbar>

    <masonry-grid
      :items="searchResults"
      @onSelect="onSelect">
    </masonry-grid>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Navbar from '../components/Navbar.vue'
import MasonryGrid from '../components/MasonryGrid.vue'

export default {
  name: 'home',

  data: () => ({
    searchTerm: '',
    loading: false,
    error: null
  }),

  components: {
    Navbar,
    MasonryGrid
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
      'SEARCH'
    ]),

    fetchResults () {
      this.error = null
      this.loading = true
      this.searchTerm = this.$route.params.searchTerm
      this.SEARCH(this.searchTerm)
        .then(() => this.loading = false)
        .catch(err => this.error = err)
    },

    onSelect (gifId) {
      this.$router.push({ name: 'details', params: { searchTerm: this.searchTerm, gifId: gifId }}) 
    }
  },

  head: {
    title: {
      inner: 'Results'
    }
  }
}
</script>
