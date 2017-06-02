<template>
  <div
    id="details"
    class="details">
    <navbar>
    </navbar>

    <spinner v-if="loading"></spinner>

    <div
      v-if="error"
      class="details__empty">
      Error fetching GIF details.
      <div>Try again later :(</div>
    </div>

    <gif-details-nav
      v-if="!loading && activeGif"
      :searchTerm="searchTerm"
      @onRandomGif="onRandomGif">
    </gif-details-nav>
    
    <article
      v-if="!loading && activeGif"
      class="details__container">
      <gif-details-header
        :gif="activeGif"
        @getNextGif="getNextGif"
        @getPreviousGif="getPreviousGif">
      </gif-details-header>

      <div 
        v-if="currentSrc == null"
        class="details__image">
        <img 
          :src="activeGif.images.downsized_still.url"
          @dblclick="onFavorite"
          class="blur">
      </div>

      <div 
        v-else
        class="details__image">
        <img 
          :src="activeGif.images.original.url"
          @dblclick="onFavorite($event)">
      </div>

      <gif-details-body
        :gifs="gifs"
        :isFavorited="isFavorited"
        :isFavoriteDetails="this.searchTerm == null"
        @onSelect="onSelect"
        @onFavorite="onFavorite">
      </gif-details-body>
    </article>

    <canvas class="fireworks"></canvas>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { animeMixin } from '../mixins'
import Navbar from '../components/Navbar.vue'
import Spinner from '../components/Spinner.vue'
import GifDetailsNav from '../components/GifDetails/GifDetailsNav.vue'
import GifDetailsHeader from '../components/GifDetails/GifDetailsHeader.vue'
import GifDetailsBody from '../components/GifDetails/GifDetailsBody.vue'

export default {
  name: 'gif-details',

  data: () => ({
    loading: false,
    error: null,
    searchTerm: '',
    gifId: '',
    currentSrc: null
  }),

  mixins: [animeMixin],

  components: {
    Navbar,
    Spinner,
    GifDetailsNav,
    GifDetailsHeader,
    GifDetailsBody
  },

  mounted: function () {
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

    gifs () {
      return this.$route.params.searchTerm ? this.searchResults : this.favorites
    },

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
      const activeGif = this.gifs.find(gif => gif.id === gifId)
      if (activeGif) {
        this.SET_ACTIVE_GIF(activeGif)
        let hiResImg = new Image()
        hiResImg.onload = () => {
          this.currentSrc = this.activeGif.images.original.url
        }
        hiResImg.src = this.activeGif.images.original.url
      } else {
        this.error = 'No gif'
      }
    },

    onFavorite (event) {
      const favoriteId = this.activeGif.id
      if (favoriteId in this.favoritesLookup) {
        this.REMOVE_FAVORITE(favoriteId)
      } else {
        this.ADD_FAVORITE(this.activeGif)
        this.fireworks(event)
      }
    },

    onExternalLink () {
      window.open(this.activeGif.url)
    },

    onRandomGif () {
      const randomIndex = Math.floor(Math.random() * this.gifs.length)
      this.routeToGif(randomIndex, this.searchTerm)
    },

    getNextGif () {
      const nextIndex = this.activeGifIndex < this.gifs.length - 1 ? this.activeGifIndex + 1 : 0
      this.routeToGif(nextIndex, this.searchTerm)
    },

    getPreviousGif () {
      const previousIndex = this.activeGifIndex > 0 ? this.activeGifIndex - 1 : this.gifs.length - 1
      this.routeToGif(previousIndex, this.searchTerm)
    },

    onSelect (gifId) {
      const index = this.gifs.findIndex(gif => gif.id === gifId)
      this.routeToGif(index, this.searchTerm)
    },

    routeToGif (index, searchTerm) {
      const gif = this.gifs[index]
      this.SET_ACTIVE_GIF_INDEX(index)
      if (searchTerm) {
        this.$router.push({ name: 'details', params: { searchTerm: searchTerm, gifId: gif.id}})
      } else {
        this.$router.push({ name: 'favorite-details', params: { gifId: gif.id}})
      }
    },

    onBack () {
      this.$router.push({ name: 'search-results', params: { searchTerm: this.searchTerm } })
    }
  },

  head: {
    title: {
      inner: 'Details'
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.details {
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
      color: palette(gray, border);
      top-right-radius: $border-radius;
      top-left-radius: $border-radius;
    }
    width: screen(medium);
    max-width: 100%;
    height: 90%;
    height: auto;
    margin-bottom: 2rem;
    @media screen and (max-width: screen(medium)) {
      max-width: 95%;
    }
  }

  &__image {
    overflow: hidden;

    .blur {
      filter: blur(10px);
    }
    
    img {
      cursor: pointer;
      height: auto;
      width: 100%;
      vertical-align: top;
    }

    @media screen and (max-width: screen(small)) {
      max-width: 100%;
    }
  }

  &__empty {
    margin-top: 4rem;
    text-align: center;
    color: palette(black);
    font: {
      family: $sans-serif;
      size: 1.35rem;
      weight: 600;
    }

    @media screen and (max-width: screen(small)) {
      margin-top: 2rem;
    }

    div {
      font: {
        family: $sans-serif;
        size: 1.15rem;
        weight: 500;
      }
    }

    a {
      color: palette(gray);
      text-decoration-color: palette(gray);
    }
  }
}
</style>
