<template>
  <div
    id="details"
    class="details">
    <navbar>
    </navbar>

    <spinner v-if="loading"></spinner>
    
    <div
      v-if="!loading && activeGif"
      class="details__nav">

      <router-link
        v-if="searchTerm"
        :to="{ name: 'search-results', params: { searchTerm: searchTerm }}">
        Back to Results
      </router-link>
      <router-link
        v-else
        :to="{ name: 'favorites' }">
        Back to Favorites
      </router-link>

      <span @click="onRandomGif">Random GIF</span>
    </div>
    
    <article
      v-if="!loading && activeGif"
      class="details__container">
      <header class="details__header">
        <div>
            <a
              v-if="activeGif.user"
              :href="activeGif.user.profile_url"
              class="image-link">
            <img
              :src="activeGif.user.avatar_url">
            </a>
            <div
              v-else
              class="image-link">
            </div>

          <div class="user-info">
            <a
              v-if="activeGif.user"
              :href="activeGif.user.profile_url"
              class="username">
              {{ activeGif.user.username }}
            </a>
            <span
              v-else
              class="username">
              Posted by Unknown
            </span>

            <span class="posted-time">{{ activeGif.import_datetime | prettyDate }}</span>
          </div>
        </div>

        <div class="header-buttons">
          <button class="header-button previous" @click="getPreviousGif"></button>
          <button class="header-button next" @click="getNextGif"></button>
        </div>
      </header>

      <div class="details__image">
        <img
          :src="activeGif.images.original.url"
          @dblclick="onFavorite">
      </div>

      <gif-details-body
        :isFavorited="isFavorited"
        :isFavoriteDetails="this.searchTerm == null"
        @onSelect="onSelect"
        @onFavorite="onFavorite">
      </gif-details-body>
    </article>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Navbar from '../components/Navbar.vue'
import Spinner from '../components/Spinner.vue'
import GifDetailsBody from '../components/GifDetails/GifDetailsBody.vue'

export default {
  name: 'gif-details',

  data: () => ({
    loading: false,
    error: null,
    searchTerm: '',
    gifId: ''
  }),

  components: {
    Navbar,
    Spinner,
    GifDetailsBody
  },

  created () {
    this.getDetails()
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
      'activeGifIndex',
    ]),

    isFavorited () {
      return this.activeGif.id in this.favoritesLookup
    },

    tags () {
      let tags = this.activeGif.slug.split('-')
      tags.pop()
      tags.push(this.activeGif.rating.toUpperCase())
      if (this.activeGif.source_tld.length > 0)
        tags.push(this.activeGif.source_tld)
      return tags
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

    getDetails () {
      this.searchTerm = this.$route.params.searchTerm
      this.gifId = this.$route.params.gifId
      const isFavoriteDetails = this.searchTerm == null
      if (!isFavoriteDetails && this.searchResults.length == 0) {
        this.loading = true
        this.SEARCH(this.searchTerm)
          .then(() => {
            this.getResult(this.gifId, false)
            this.loading = false
          })
          .catch(err => this.error = err)
      } else {
        this.getResult(this.gifId, isFavoriteDetails)
      }
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

    onExternalLink () {
      window.open(this.activeGif.url)
    },

    onRandomGif () {
      const gifs = this.searchTerm == null ? this.favorites : this.searchResults
      const randomIndex = Math.floor(Math.random() * gifs.length)
      const randomGif = gifs[randomIndex]
      this.SET_ACTIVE_GIF_INDEX(randomIndex)
      this.routeToGif(this.$route.params.searchTerm, randomGif.id)
    },

    getNextGif () {
      const gifs = this.searchTerm == null ? this.favorites : this.searchResults
      const nextIndex = this.activeGifIndex < gifs.length - 1 ? this.activeGifIndex + 1 : 0
      const nextGif = gifs[nextIndex]
      this.SET_ACTIVE_GIF_INDEX(nextIndex)
      this.routeToGif(this.$route.params.searchTerm, nextGif.id)
    },

    getPreviousGif () {
      const gifs = this.searchTerm == null ? this.favorites : this.searchResults
      const previousIndex = this.activeGifIndex > 0 ? this.activeGifIndex - 1 : gifs.length - 1
      const previousGif = gifs[previousIndex]
      this.SET_ACTIVE_GIF_INDEX(previousIndex)
      this.routeToGif(this.$route.params.searchTerm, previousGif.id)
    },

    onSelect (gifId) {
      const gifs = this.searchTerm == null ? this.favorites : this.searchResults
      const index = gifs.findIndex(gif => gif.id === gifId)
      this.SET_ACTIVE_GIF_INDEX(index)
      this.routeToGif(this.searchTerm, gifId)
    },

    routeToGif (searchTerm, gifId) {
      if (searchTerm) {
        this.$router.push({ name: 'details', params: { searchTerm: searchTerm, gifId: gifId}})
      } else {
        this.$router.push({ name: 'favorite-details', params: { gifId: gifId}})
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
      inner: 'GIF Details'
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.details {
  &__nav {
    width: screen(medium);
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    margin: {
      top: .25rem;
      bottom: .35rem;
    }

    a, span {
      cursor: pointer;
      color: palette(gray);
      font: {
        family: $sans-serif;
        size: .9rem;
        weight: 500;
      }
    }

    a {
      text-decoration: none;
    }

    @media screen and (max-width: screen(medium)) {
      max-width: 95%;
    }
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 4.75rem);
  background-color: palette(white, dark);
  padding: {
    top: 4.75rem;
  }

  &__container {
    background-color: palette(white);
    display: flex;
    flex-direction: column;
    border: {
      width: 1px;
      style: solid;
      color: #e6e6e6;
      top-right-radius: $border-radius;
      top-left-radius: $border-radius;
    }
    width: screen(medium);
    max-width: 100%;
    height: 90%;
    margin-bottom: 2rem;
    @media screen and (max-width: screen(medium)) {
      max-width: 95%;
    }
  }

  &__image {
    img {
      cursor: pointer;
      width: 100%;
      height: auto;
    }

    @media screen and (max-width: screen(small)) {
      max-width: 100%;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: {
      left: 1rem;
      right: 1rem;
      top: 1rem;
      bottom: .75rem;
    }
    border-bottom: {
      width: 1px;
      style: solid;
      color: #e6e6e6;
      radius: $border-radius;
    }

    div {
      display: flex;
      align-items: center;
    }

    .image-link {
      align-items: center;
      background-color: palette(gray, light);
      border-radius: 50%;
      display: flex;
      margin-right: .75rem;
      height: 30px;
      width: 30px;
    }

    img {
      border-radius: 50%;
      height: 100%;
      width: 100%;
    }

    .user-info {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      line-height: 1.2;
      font: {
        family: $sans-serif;
        size: .95rem;
      }
    }

    .username {
      color: palette(black);
      text-transform: capitalize;
      text-decoration: none;
      font-weight: 700;
    }

    .posted-time {
      text-transform: capitalize;
      font-weight: 500;
    }

    .header-buttons {
      border: {
        width: 1px;
        style: solid;
        color: #e6e6e6;
        radius: $border-radius;
      }
    }

    .header-button {
      outline: 0;
      height: 30px;
      width: 30px;
      cursor: pointer;
      border: 0;
      padding: 0;
      background: {
        color: transparent;
        size: 2.5rem;
        position: center;
        repeat: no-repeat;
      }

      &.previous {
        background-image: url("../assets/images/chevron-left.svg");
      }

      &.next {
        background-image: url("../assets/images/chevron-right.svg");
      }
    }
  }
}
</style>
