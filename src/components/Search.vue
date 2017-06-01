<template>
  <div
    id="search"
    class="search"
    v-click-outside="clickOutside"
    :class="{active: isActive}"
    @click="onClick">
    <input
      :value="searchTerm"
      :autofocus="focusSearch"
      @input="onInput($event.target.value)"
      @keyup.enter="onSearch"
      @focus="isActive = true"
      @blur="isActive = false"
      placeholder="Search for sushi, soccer, spaceships, etc."
      class="search__input"
      spellcheck="false"
      type="text">
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'search',

  data: () => ({
    isActive: false
  }),

  props: [
    'searchTerm',
    'focusSearch'
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
    },

    clickOutside () {
      this.isActive = false
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.search {
  position: relative;
  cursor: text;
  background: {
    color: palette(gray, x-light);
    image: url("../assets/icons/search.svg");
    size: 1.65rem;
    position: 99% center;
    repeat: no-repeat;
  }
  border: 0;
  display: flex;
  border-radius: $border-radius;

  &__input {
    background-color: transparent;
    border: 0;
    font: {
      family: $sans-serif;
      size: 1rem;
      weight: 600;
    }
    padding: {
      left: .65rem;
      right: 2.35rem;
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
