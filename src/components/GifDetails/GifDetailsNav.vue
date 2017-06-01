<template>
  <div class="details__nav">
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
</template>

<script>
export default {
	name: 'gif-details-nav',

  props: [
    'searchTerm'
  ],

  methods: {
    onRandomGif () {
      this.$emit('onRandomGif')
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';
@import '../../scss/_functions.scss';

.details__nav {
  display: flex;
  justify-content: space-between;
  margin: {
    top: .25rem;
    bottom: .35rem;
  }
  max-width: 100%;
  width: screen(medium);

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
</style>
