<template>
  <div>
    <h1>
      Looking for something?
    </h1>

    <router-link :to="{ name: 'home'}">
      Back to safety
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'notfound',

    head: {
      title: {
        inner: 'Merp! Not Found'
      }
    }
  }
</script>

<style lang="scss">
  @import '../scss/_variables.scss';
  @import '../scss/_functions.scss';
</style>
