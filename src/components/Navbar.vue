<template>
  <nav id="navbar" class="navbar">
    <div class="navbar__container">
      <div class="navbar__left">
        <router-link
          v-show="!showSearch"
          :to="{ name: 'home'}"
          class="navbar__logo">
          Gifsearch
        </router-link>

        <search
          v-if="showSearch || windowWidth > 544"
          v-model="searchTerm"
          :searchTerm="searchTerm"
          :focusSearch="false"
          @onSearch="onSearch">
        </search>

        <button
          v-if="showSearch"
          @click="showSearch = false"
          class="search-cancel">
          Cancel
        </button>
      </div>

      <div class="navbar__right">
        <template v-if="!showSearch">
          <button
            class="search-toggle"
            @click="showSearch = true">
          </button>

          <router-link
            :to="{ name: 'favorites'}"
            class="navbar__link favorites">
            <span>Favorites</span>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import Search from './Search.vue'

export default {
  name: 'navbar',

  data: () => ({
    searchTerm: '',
    showSearch: false,
    windowWidth: 0
  }),

  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth()
    })
  },

  created () {
    if (this.$route.params.searchTerm) {
      this.searchTerm = this.$route.params.searchTerm.replace(/\+/g, ' ');
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },

  components: {
    Search
  },

  methods: {
    onSearch () {
      const searchTerm = this.searchTerm.replace(/\s/g, '+')
      this.$router.push({ name: 'search-results', params: { searchTerm: searchTerm }})
    },

    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.navbar {
  height: 65px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  border-bottom: {
    style: solid;
    width: 1px;
    color: palette(gray, light);
  }
  background-color: palette(white);
  position: fixed;
  top: 0;
  width: 100vw;

  &__container {
    display: flex;
    align-items: center;
    margin: {
      right: auto;
      left: auto;
    }
    padding: {
      right: .75rem;
      left: .75rem;
    }
    width: 100%;
  }

  &__left, &__right {
    display: flex;
    align-items: center;
  }

  &__left {
    flex: 1;
  }

  &__logo {
    color: palette(purple);
    font: {
      family: $sans-serif;
      size: 1.5rem;
      weight: 900;
    }
    margin-right: 1rem;
    outline: 0;
    text-decoration: none;
    text-shadow: -2px 2px #FDD9FF;
    transition: color $transition, text-shadow $transition;

    &:hover {
      color: palette(blue, x-dark);
      text-shadow: -2px 2px palette(blue, light); 
    }
  }

  &__link {
    color: palette(black);
    cursor: pointer;
    border: 0;
    background-color: transparent;
    font: {
      family: $sans-serif;
      size: 1rem;
      weight: 700;
    }
    text-decoration: none;
    transition: color $transition;

    @media screen and (max-width: screen(medium)) {
      &.favorites {
        span {
          display: none;
        }
        border: {
          style: solid;
          width: 1px;
          radius: 50%;
        }

        height: 34px;
        width: 34px;
        background: {
          color: palette(red);
          image: url("../assets/icons/hearted.svg");
          position: center center;
          size: 30px;
          repeat: no-repeat;
        }
        border-color: palette(red, dark);
        transition: border-color $transition;
        
        &:hover {
          border-color: palette(red, x-dark);
        }
      }
    }
  }

  .search-toggle {
    display: none;

    @media screen and (max-width: screen(medium)) {
      cursor: pointer;
      outline: 0;
      display: block;
      border: {
        style: solid;
        width: 1px;
        radius: 50%;
      }

      height: 36px;
      width: 36px;
      background: {
        color: palette(blue);
        image: url("../assets/icons/search-white.svg");
        position: center center;
        size: 30px;
        repeat: no-repeat;
      }
      border-color: palette(blue, dark);
      margin-right: .5rem;
      transition: border-color $transition;

      &:hover {
        border-color: palette(blue, x-dark);
      }
    }
  }

  .search-cancel {
    outline: 0;
    color: palette(blue, dark);
    cursor: pointer;
    border: 0;
    padding: 0;
    background-color: transparent;
    font: {
      family: $sans-serif;
      size: 1rem;
      weight: 700;
    }
  }

  .search {
    height: 40px;
    margin-right: 1rem;
    width: 355px;
    transition: width $transition;

    @media screen and (max-width: screen(large)) {
      width: 100%;
      margin-right: .5rem;
    }

    &.active {
      width: 100%; 
    }
  }
}
</style>
