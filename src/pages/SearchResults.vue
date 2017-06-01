<template>
  <div>
    <navbar></navbar>

    <spinner v-if="loading"></spinner>
    <masonry-grid
      v-else
      :error="error"
      :searchTerm="searchTerm"
      :items="searchResults"
      @onSelect="onSelect">
    </masonry-grid>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Navbar from '../components/Navbar.vue'
import Spinner from '../components/Spinner.vue'
import MasonryGrid from '../components/MasonryGrid/MasonryGrid.vue'

export default {
  name: 'home',

  data: () => ({
    searchTerm: '',
    loading: false
  }),

  components: {
    Navbar,
    Spinner,
    Error,
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
      this.$emit('updateHead')
      this.SEARCH(this.searchTerm)
        .then(() => this.loading = false)
        .catch(err => {
          this.error = err
          this.loading = false
        })
    },

    onSelect (gifId) {
      this.$router.push({ name: 'details', params: { searchTerm: this.searchTerm, gifId: gifId }}) 
    }
  },

  head: {
    title: function () {
      return { inner: this.searchTerm }
    }
  }
}
</script>
