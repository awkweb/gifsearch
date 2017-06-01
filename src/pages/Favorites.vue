<template>
  <div>
    <navbar>
    </navbar>

    <masonry-grid
      :items="favorites"
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
    loading: false,
    error: null
  }),

  components: {
    Navbar,
    MasonryGrid
  },

  computed: {
    ...mapGetters('giphy', [
      'favorites'
    ])
  },

  methods: {
    onSelect (gifId) {
      this.$router.push({ name: 'favorite-details', params: { gifId: gifId }}) 
    }
  },

  head: {
    title: {
      inner: 'Results'
    }
  }
}
</script>
