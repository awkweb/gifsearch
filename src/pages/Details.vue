<template>
  <div
    id="details"
    class="details">
    <div v-if="loading">Loading...</div>
    <div v-if="activeResult">
      <button
        @click="closeDetails">
        Close
      </button>
      
      <img
        :src="activeResult.images.fixed_height.url"
        @dblclick="onFavorite">
      
      <result-info
        :result="activeResult">
      </result-info>

      <button
        @click="onFavorite">
        Favorite
      </button>

      <div>
        <button
          v-show="activeResultIndex > 0"
          @click="getPreviousResult">
          Previous
        </button>

        <button
          v-show="activeResultIndex < searchResults.length - 1"
          @click="getNextResult">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import keyboard from 'keyboardjs'
import ResultInfo from '../components/ResultInfo.vue'

export default {
  name: 'details',

  data: () => ({
    loading: false,
    error: null
  }),

  components: {
    ResultInfo
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
      'activeResultIndex',
      'activeResult',
      'favorites'
    ])
  },

  methods: {
    ...mapActions('giphy', [
      'SEARCH',
    ]),
    ...mapMutations('giphy', [
      'SET_ACTIVE_RESULT_INDEX',
      'SET_ACTIVE_RESULT',
      'ADD_FAVORITE',
      'REMOVE_FAVORITE'
    ]),

    setUpHotKeys () {
      keyboard.bind('right', () => this.getNextResult())
      keyboard.bind('left', () => this.getPreviousResult())
      keyboard.bind('esc', () => this.closeDetails())
    },

    getDetails () {
      if (this.searchResults.length > 0) {
        this.getResult()
      } else {
      this.SEARCH(this.$route.params.searchTerm)
        .then(() => {
          this.getResult()
          this.loading = false
        })
        .catch(err => this.error = err)
      }
      this.setUpHotKeys()
    },

    getResult () {
      const resultId = this.$route.params.resultId
      this.SET_ACTIVE_RESULT_INDEX(resultId)
      this.SET_ACTIVE_RESULT(resultId)
    },

    onFavorite () {
      const favoriteId = this.activeResult.id
      if (favoriteId in this.favorites) {
        this.REMOVE_FAVORITE(favoriteId)
      } else {
        this.ADD_FAVORITE(favoriteId)
      }
    },

    getNextResult () {
      if (this.activeResultIndex < this.searchResults.length - 1) {
        const nextIndex = this.activeResultIndex + 1
        const nextResult = this.searchResults[nextIndex]
        this.SET_ACTIVE_RESULT_INDEX(nextResult.id)
        this.SET_ACTIVE_RESULT(nextResult.id)
      }      
    },

    getPreviousResult () {
      if (this.activeResultIndex > 0) {
        const nextIndex = this.activeResultIndex - 1
        const nextResult = this.searchResults[nextIndex]
        this.SET_ACTIVE_RESULT_INDEX(nextResult.id)
        this.SET_ACTIVE_RESULT(nextResult.id)
      }
    },

    closeDetails () {
      this.$router.push({
        name: 'search-results',
        params: {searchTerm: this.$route.params.searchTerm }
      })
    }
  },

  head: {
    title: {
      inner: 'Results'
    }
  }
}
</script>

<style lang="scss">
  @import '../scss/_variables.scss';
  @import '../scss/_functions.scss';
</style>
