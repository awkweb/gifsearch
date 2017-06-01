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
import { mapGetters } from 'vuex'
import Navbar from '../components/Navbar.vue'
import MasonryGrid from '../components/MasonryGrid/MasonryGrid.vue'

export default {
  name: 'home',

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
      inner: 'Favorites'
    }
  }
}
</script>
