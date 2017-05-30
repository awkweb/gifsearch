<template>
  <div
    id="search"
    class="search"
    :class="{active: isActive}"
    @click="onClick">
    <input
      :value="searchTerm"
      @input="onInput($event.target.value)"
      @keyup.enter="onSearch"
      @focus="isActive = true"
      @blur="isActive = false"
      placeholder="Search for sushi, soccer, spaceships, etc."
      class="search__input"
      spellcheck="false"
      type="text"
      autofocus>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'search',

  data: () => ({
    isActive: true
  }),

  props: [
    'searchTerm'
  ],

  methods: {
    ...mapMutations([
      'SET_QUERY'
    ]),

    onClick () {
      const input = this.$el.children[0]
      input.focus()
    },

    onInput (searchTerm) {
      this.$emit('input', searchTerm)
    },

    onSearch () {
      this.$emit('onSearch')
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.search {
  height: 40px;
  cursor: text;
  background: {
    color: palette(gray, x-light);
    image: url("../assets/images/search.svg");
    size: 1.65rem;
    position: 99% center;
    repeat: no-repeat;
  }
  border: 0;
  display: flex;
  padding: {
    left: .65rem;
    right: 2.35rem;
  }
  transition: border-color $transition;
  width: 30%;
  border-radius: $border-radius;
  transition: width $transition;

  &.active {
    width: 100%; 
  }

  &__input {
    background-color: transparent;
    border: 0;
    font: {
      family: $sans-serif;
      size: 1rem;
      weight: 600;
    }
    outline: 0;
    line-height: 1.5rem;
    color: palette(black);  
    width: 100%;

    &::placeholder {
      color: palette(gray, dark);  
    }
  }
}
</style>
