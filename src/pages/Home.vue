<template>
  <div
    id="home"
    class="home">
    <h1 class="home__headline">
      Gifsearch
    </h1>

    <search
      v-model="searchTerm"
      :searchTerm="searchTerm"
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
      inner: 'Search GIFs'
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.home {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: {
    top: 0;
    right: auto;
    bottom: 0;
    left: auto;
  }
  max-width: screen(small);
  padding: 1rem;

  &__headline {
    color: palette(purple);
    font: {
      size: 5rem;
      weight: 900;
    }
    text-shadow: -3px 3px #FDD9FF;
  }

  .search {
  }
}
</style>
