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
      :focusSearch="true"
      @onSearch="onSearch"
      @onFocus="onFocus"
      @onBlur="onBlur">
    </search>

    <transition name="fade">
      <div v-show="searchActive" class="home__trending">
        <h2>Trending</h2>
        <ul>
          <li><router-link :to="{ name: 'search-results', params: { searchTerm: 'nycgifathon' }}">nycgifathon</router-link></li>
          <li><router-link :to="{ name: 'search-results', params: { searchTerm: 'pusheen' }}">pusheen</router-link></li>
          <li><router-link :to="{ name: 'search-results', params: { searchTerm: 'game+of+thrones' }}">game of thrones</router-link></li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import Search from '../components/Search.vue'

export default {
  name: 'home',

  data: () => ({
    searchTerm: '',
    searchActive: false
  }),

  components: {
    Search
  },

  methods: {
    onSearch () {
      if (this.searchTerm.length > 0) {
        const searchTerm = this.searchTerm.replace(/\s/g, '+')
        this.$router.push({ name: 'search-results', params: { searchTerm: searchTerm }})
      }
    },

    onFocus () {
      this.searchActive = true
    },

    onBlur () {
      this.searchActive = false
    }
  },

  head: {
    title: {
      inner: 'Search all the GIFs'
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
    margin: {
      top: 8rem;
      bottom: 1rem;
    }
    text-shadow: -3px 3px #FDD9FF;

    @media screen and (max-width: screen(medium)) {
      font-size: 4rem;
      margin-top: 6rem;
    }

    @media screen and (max-width: screen(small)) {
      font-size: 3rem;
      margin-top: 4rem;
    }
  }

  .search {
    background: {
      size: 2rem;
      position: 98% center;
    }
    box-shadow: 0 4px 6px RGBA(0, 0, 0, 0.35); 
    height: 60px;
    margin-bottom: 4rem;
    width: 100%;

    &__input {
      font-size: 1.25rem;
      padding-left: 1rem;

      @media screen and (max-width: screen(small)) {
        padding-left: .65rem;
      }
    }

    @media screen and (max-width: screen(medium)) {
      height: 55px;      

      &__input { font-size: 1.1rem; }
    }

    @media screen and (max-width: screen(small)) {
      background-size: 1.8rem;
      box-shadow: 0 2px 4px RGBA(0, 0, 0, 0.35); 
      height: 45px;
      margin-bottom: 1rem;

      &__input { font-size: 1.025rem; }
    }
  }

  &__trending {
    align-items: center;
    display: flex;

    @media screen and (max-width: screen(small)) {
      flex-direction: column;
    }

    h2 {
      color: palette(gray, dark);

      @media screen and (max-width: screen(small)) {
        font-size: 1.5rem;
        margin-bottom: .5rem;
      }
    }

    ul {
      margin: 0;
      list-style-type: none;

      @media screen and (max-width: screen(small)) {
        padding-left: 0;

        li {
          font-size: 1.1rem;
          text-align: center;
        }
      }

      a {
        color: palette(gray, dark);
        text-decoration-color: palette(gray, light);
        white-space: nowrap;
        transition: color $transition;

        &:hover {
          color: palette(purple);     
        }
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter, .fade-leave-to, .fade-leave-active {
  opacity: 0;
}
</style>
