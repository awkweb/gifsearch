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
      <router-link :to="{ name: 'search-results', params: { searchTerm: searchTerm }}">Back to {{ searchTerm != 'favorites' ? 'Results' : 'Favorites' }}</router-link>

      <span @click="onRandomGif">Random GIF</span>
    </div>
    
    <article
      v-if="!loading && activeGif"
      class="details__container">
      <header class="details__header">
        <div>
          <img
            v-if="activeGif.user"
            :src="activeGif.user.avatar_url">
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
      <div class="details__body">
        <div class="details__body__toolbar">
          <div>
            <button
              @click="onFavorite"
              :class="activeGif.id in favoritesLookup ? 'hearted' : 'heart'"
              class="button">
            </button>

            <button
              @click="onExternalLink"
              class="button external-link">
            </button>
          </div>
          <div class="tags">
            <span v-for="tag in tags" class="tag">{{ tag }}</span>
          </div>
        </div>

        <div class="field-container">
          <h2>Links</h2>
          <field
            :label="'Giphy'"
            :helpText="'Link to the GIF image on Giphy'"
            :url="activeGif.url"
            :buttonText="'Copy'"></field>

          <field
            :label="'Embed'"
            :helpText="'GIF Embed Code'"
            :url="activeGif.url"
            :buttonText="'Copy'"></field>
        </div>

        <div class="field-container">
          <h2>Download</h2>
          <field
            :label="'Original'"
            :helpText="'Source file with no edits'"
            :url="activeGif.images.original.url"
            :buttonText="'Download'"></field>

          <field
            :label="'Small'"
            :helpText="'Optimized for file size'"
            :url="activeGif.images.original.url"
            :buttonText="'Download'"></field>

          <field
            :label="'MP4'"
            :helpText="'Video file'"
            :url="activeGif.images.original_mp4.mp4"
            :buttonText="'Download'"></field>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Navbar from '../components/Navbar.vue'
import Spinner from '../components/Spinner.vue'
import Field from '../components/Field.vue'

export default {
  name: 'details',

  data: () => ({
    loading: false,
    error: null,
    searchTerm: '',
    gifId: ''
  }),

  components: {
    Navbar,
    Spinner,
    Field
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
      const isFavoriteDetails = this.searchTerm === 'favorites'
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
      const gifs = this.searchTerm === 'favorites' ? this.favorites : this.searchResults
      const randomIndex = Math.floor(Math.random() * gifs.length)
      const randomGif = gifs[randomIndex]
      this.SET_ACTIVE_GIF_INDEX(randomIndex)
      this.$router.push({ name: 'details', params: { searchTerm: this.searchTerm, gifId: randomGif.id }})
    },

    getNextGif () {
      const gifs = this.searchTerm === 'favorites' ? this.favorites : this.searchResults
      const nextIndex = this.activeGifIndex < gifs.length - 1 ? this.activeGifIndex + 1 : 0
      const nextGif = gifs[nextIndex]
      this.SET_ACTIVE_GIF_INDEX(nextIndex)
      this.$router.push({ name: 'details', params: { searchTerm: this.searchTerm, gifId: nextGif.id }}) 
    },

    getPreviousGif () {
      const gifs = this.searchTerm === 'favorites' ? this.favorites : this.searchResults
      const previousIndex = this.activeGifIndex > 0 ? this.activeGifIndex - 1 : gifs.length - 1
      const previousGif = gifs[previousIndex]
      this.SET_ACTIVE_GIF_INDEX(previousIndex)
      this.$router.push({ name: 'details', params: { searchTerm: this.searchTerm, gifId: previousGif.id }})
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
  
  .field-container {
    display: flex;
    flex-direction: column;
    margin-bottom: .25rem;

    h2 {
      font-size: 1.4rem;
      margin: {
        top: .5rem;
        bottom: 1rem;
      }
      padding-bottom: .35rem;
      border-bottom: {
        width: 1px;
        style: solid;
        color: #e6e6e6;
      }
    }
  }

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

    img {
      height: 30px;
      width: 30px;
      margin-right: .5rem;
      border-radius: 50%;
      margin-right: .75rem;
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

  &__body {
    padding: {
      left: 1rem;
      right: 1rem;
      top: .5rem;
      bottom: .5rem;
    }

    &__toolbar {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: .5rem;
      margin-bottom: .5rem;
      border-bottom: {
        width: 1px;
        style: solid;
        color: #e6e6e6;
      }

      .tags {
        height: 30px;
        max-width: 80%;
        overflow-x: auto;
        
        @media screen and (max-width: screen(medium)) {
          max-width: 70%;
        }
      }

      .tag {
        padding: {
          left: .5rem;
          right: .5rem;
          top: .25rem;
          bottom: .25rem;
        }
        border: {
          width: 1px;
          style: solid;
          color: #e6e6e6;
          radius: $border-radius;
        }
        font: {
          family: $sans-serif;
          size: .9rem;
          weight: 700;
        }
        margin-right: .25rem;
        
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .button {
    width: 32px;
    height: 28px;
    border: 0;
    cursor: pointer;
    background: {
      color: palette(white);
      position: center 1%;
      size: 35px;
      repeat: no-repeat;
    }
    transition: color $transition, background-color $transition;
    
    &.heart {
      background-image: url("../assets/images/heart-black.svg");
    }

    &.hearted {
      background-image: url("../assets/images/heart.svg");
    }

    &.external-link {
      background-image: url("../assets/images/external-link.svg");
    }

    &:focus {
      outline: 0;
    }
  }
}
</style>
