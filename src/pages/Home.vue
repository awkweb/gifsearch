<template>
  <div
    id="home"
    class="home">
    <search
      v-model="searchTerm"
      @onSearch="onSearch">
    </search>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '../components/Search.vue'

export default {
  name: 'home',

  data: () => ({
    searchTerm: ''
  }),

  components: {
    Search
  },

  methods: {
    onSearch () {
      if (this.searchTerm.length > 0) {
        this.$router.push({ name: 'search-results', params: { searchTerm: this.searchTerm }})
      }
    }
  },

  head: {
    title: {
      inner: 'Search all the gifs'
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.home {
  display: flex;
  height: 100vh;
  justify-content: center;
  margin: {
    top: 0;
    right: auto;
    bottom: 0;
    left: auto;
  }
  max-width: screen(medium);
  padding: 1rem;

  .search {
    margin-top: 9rem;
  }
}
</style>
