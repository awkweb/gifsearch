<template>
  <div class="not-found">
    <h1>
      This isn't the page you're looking for.
    </h1>

    <img src="../assets/images/droids.gif">

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

.not-found {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: {
    top: 0;
    right: auto;
    bottom: 0;
    left: auto;
  }
  max-width: screen(medium);
  padding: 1rem;

  h1 {
    text-align: center;
  }

  img {
    border-radius: $border-radius;
    margin-bottom: 3rem;
    max-width: 100%;
  }

  a {
    border-bottom: {
      color: palette(blue);
      style: solid;
      width: 5px;
    }
    color: palette(purple);
    font: {
      family: $sans-serif;
      size: 20px;
      weight: 500;
    }
    text-decoration: none;
    transition: color $transition, border-color $transition;

    &:hover {
      color: palette(blue, x-dark);
      border-color: palette(purple);
    }
  }
}
</style>
