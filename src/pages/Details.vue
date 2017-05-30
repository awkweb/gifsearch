<template>
  <div
    id="details"
    class="details">
    <navbar>
    </navbar>

    <div class="details__container" v-if="activeGif">
      <div
        @mouseenter="showNavigationButtons = true"
        @mouseleave="showNavigationButtons = false"
        class="details__image">
        <img
          :src="activeGif.images.original.url"
          @dblclick="onFavorite">

        <template v-if="showNavigationButtons">
          <button
            v-show="activeGifIndex > 0"
            @click="getPreviousGif"
            class="details__image__button previous">
          </button>

          <button
            v-show="activeGifIndex < searchResults.length - 1"
            @click="getNextGif"
            class="details__image__button next">
          </button>
        </template>
      </div>
      
      <div class="details__info">
        <div class="details__info__header">
          <div class="details__info__header__buttons">
            <button
              @click="onFavorite"
              class="details__info__header__button"
              :class="isFavorited ? 'hearted' : 'heart'">
            </button>
          </div>
          
          <span>Posted {{ activeGif.import_datetime | prettyDate }}</span>
        </div>

        <span>Source {{ activeGif.source_tld }}</span>
        <span>Rating {{ activeGif.rating }}</span>
        <span>Embed {{ activeGif.embed_url }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Navbar from '../components/Navbar.vue'
import keyboard from 'keyboardjs'

export default {
  name: 'details',

  data: () => ({
    loading: false,
    error: null,
    searchTerm: '',
    gifId: '',
    showNavigationButtons: false
  }),

  components: {
    Navbar
  },

  created () {
    this.getDetails()
  },

  beforeDestroy () {
    keyboard.reset()
  },

  watch: {
    '$route': 'getDetails'
  },

  computed: {
    ...mapGetters('giphy', [
      'searchResults',
      'favorites',
      'favoritesLookup',
      'activeGif',
      'activeGifIndex'
    ]),

    isFavorited () {
      return this.activeGif.id in this.favoritesLookup
    }
  },

  methods: {
    ...mapActions('giphy', [
      'SEARCH',
    ]),

    ...mapMutations('giphy', [
      'SET_ACTIVE_GIF',
      'SET_ACTIVE_GIF_INDEX',
      'ADD_FAVORITE',
      'REMOVE_FAVORITE'
    ]),

    setUpHotKeys () {
      keyboard.bind('right', () => this.getNextGif())
      keyboard.bind('left', () => this.getPreviousGif())
      keyboard.bind('esc', () => this.onBack())
    },

    getDetails () {
      this.searchTerm = this.$route.params.searchTerm
      this.gifId = this.$route.params.gifId
      const isFavoriteDetails = this.searchTerm === 'favorites'
      if (!isFavoriteDetails && this.searchResults.length == 0) {
        this.SEARCH(this.searchTerm)
          .then(() => {
            this.getResult(this.gifId, false)
            this.loading = false
          })
          .catch(err => this.error = err)
      } else {
        this.getResult(this.gifId, isFavoriteDetails)
      }
      this.setUpHotKeys()
    },

    getResult (gifId, isFavoriteDetails) {
      const gifs = isFavoriteDetails ? this.favorites : this.searchResults
      const activeGif = gifs.find(gif => gif.id === gifId)
      this.SET_ACTIVE_GIF(activeGif)
    },

    onFavorite () {
      const favoriteId = this.activeGif.id
      if (favoriteId in this.favoritesLookup) {
        this.REMOVE_FAVORITE(favoriteId)
      } else {
        this.ADD_FAVORITE(this.activeGif)
      }
    },

    getNextGif () {
      const gifs = this.searchTerm === 'favorites' ? this.favorites : this.searchResults
      if (this.activeGifIndex < gifs.length - 1) {
        const nextIndex = this.activeGifIndex + 1
        const nextGif = gifs[nextIndex]
        
        this.SET_ACTIVE_GIF_INDEX(nextIndex)
        this.SET_ACTIVE_GIF(nextGif)
      }      
    },

    getPreviousGif () {
      const gifs = this.searchTerm === 'favorites' ? this.favorites : this.searchResults
      if (this.activeGifIndex > 0) {
        const previousIndex = this.activeGifIndex - 1
        const previousGif = gifs[previousIndex]
        
        this.SET_ACTIVE_GIF_INDEX(previousIndex)
        this.SET_ACTIVE_GIF(previousGif)
      }
    },

    onBack () {
      this.$router.push({
        name: 'search-results',
        params: { searchTerm: this.searchTerm }
      })
    }
  },

  head: {
    title: {
      inner: this.activeGif ? this.activeGif.id : ''
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.details {
  min-height: 100vh;

  &__container {
    display: flex;

    padding: {
      top: 4.5rem;
      right: .5rem;
      left: .5rem;
    }

    @media screen and (max-width: screen(medium)) {
      flex-direction: column;
    }
  }

  &__image, &__info {
    flex: 1;    
  }

  &__image {
    position: relative;
    img {
      width: 100%;
      height: auto;
    }

    &__button {
      outline: 0;
      cursor: pointer;
      position: absolute;
      top: 40%;
      width: 4rem;
      height: 4rem;
      background: {
        color: palette(purple);
        size: 4rem;
        position: center;
        repeat: no-repeat;
      }
      border: {
        style: solid;
        width: 1px;
        color: palette(purple, dark);
      }
      transition: border-color $transition;

      &:hover {
        border-color: palette(purple, x-dark);
      }

      &.previous {
        left: 0;
        background-image: url("../assets/images/chevron-left.svg");
      }
      &.next {
        right: 0;
        background-image: url("../assets/images/chevron-right.svg");
      }
    }
  }

  &__info {
    padding-left: 1rem;
    @media screen and (max-width: screen(medium)) {
      padding: 0;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      border-bottom: {
        style: solid;
        width: 1px;
        color: palette(gray, light);
      }

      &__buttons {
        display: flex;
      }

      &__button, span {
        font: {
          size: 1rem;
          family: $sans-serif;
        }
      }

      &__button {
        cursor: pointer;
        border: 0;
        padding: 0;
        background-color: transparent;
      }

      &__button {
        height: 35px;
        width: 35px;
        background: {
          color: transparent;
          size: cover;
          repeat: no-repeat;
        }
        border: 0;
        cursor: pointer;
        transition: background-image $transition;

        &.share {
          background-image: url("../assets/images/share.svg");
        }

        &.heart {
          background-image: url("../assets/images/heart.svg");
        }

        &.hearted {
          background-image: url("../assets/images/hearted.svg");
        }

        &:focus {
          outline: 0;
        }
      }

      span {
        color: palette(black);
      }
    }
  }
}
</style>
