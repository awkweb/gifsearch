<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'app',

  created () {
    this.SET_FAVORITES()
  },

  methods: {
    ...mapMutations('giphy', [
      'SET_FAVORITES'
    ])
  }
}
</script>

<style lang="scss">
@import './scss/_variables.scss';
@import './scss/_functions.scss';

body {
  margin: 0;
}

#app {
  font: {
    family: $sans-serif;
    size: 20px;
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: palette(black);
  min-height: 100vh;
}
</style>
