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
  margin: {
    top: 0;
    right: auto;
    bottom: 0;
    left: auto;
  }
  max-width: screen(medium);
  padding: 1rem;

  &__headline {
    color: palette(purple);
    font: {
      size: 5rem;
      weight: 900;
    }
    text-shadow: -3px 3px #FDD9FF;
    margin: {
      top: 8rem;
      bottom: 1rem;
    }

    @media screen and (max-width: screen(medium)) {
      margin-top: 6rem;
      font-size: 4rem;
    }

    @media screen and (max-width: screen(small)) {
      margin-top: 4rem;
      font-size: 3rem;
    }
  }

  .search {
    height: 60px;
    width: 100%;
    background: {
      size: 2rem;
      position: 98% center;
    }
    box-shadow: 0 4px 6px RGBA(0, 0, 0, 0.35); 

    &__input {
      font-size: 1.25rem;
      padding-left: 1rem;
    }

    @media screen and (max-width: screen(medium)) {
      height: 55px;      
      &__input { font-size: 1.1rem; }
    }

    @media screen and (max-width: screen(small)) {
      height: 45px;
      background-size: 1.8rem;
      box-shadow: 0 2px 4px RGBA(0, 0, 0, 0.35); 
      &__input { font-size: 1.025rem; }
    }
  }
}
</style>
