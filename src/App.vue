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
  color: palette(black);
  font: {
    family: $sans-serif;
    size: 20px;
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  text-rendering: optimizeLegibility;
}

.fireworks {
  bottom: 0;
  left: 0;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 20;
}
</style>
