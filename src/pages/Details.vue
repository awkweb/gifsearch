<template>
  <div
    id="details"
    class="details"
    @keyup.right="onKeyUpRight"
    @keyup.left="onKeyUpLeft">
    <div v-if="loading">Loading...</div>
    <div v-if="activeResult">
      <img :src="activeResult.images.fixed_height.url">
      <result-info
        :result="activeResult">
      </result-info>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
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

  watch: {
    '$route': 'getDetails'
  },

  computed: {
    ...mapGetters('giphy', [
      'searchResults',
      'activeResult'
    ])
  },

  methods: {
    ...mapActions('giphy', [
      'SEARCH',
    ]),
    ...mapMutations('giphy', [
      'SET_ACTIVE_RESULT',
    ]),

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
    },

    getResult () {
      const resultId = this.$route.params.resultId
      this.SET_ACTIVE_RESULT(resultId)
    },

    onKeyUpRight () {
      console.log('right')
    },

    onKeyUpLeft () {
      console.log('left')
    }

    // onEscape () {
    //   this.$router.push({ name: 'search-results', params: { searchTerm: this.searchTerm }}) 
    // }
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
