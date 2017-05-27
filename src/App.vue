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
body {
  margin: 0;
}

#app {
  font: {
    family: 'Avenir', Helvetica, Arial, sans-serif;
    size: 20px;
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
