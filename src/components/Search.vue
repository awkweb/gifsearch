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
      v-focus
      placeholder="Search all the gifs"
      class="search__input"
      spellcheck="false"
      type="text"
      autofocus>

    <button
      class="search__button" 
      @click="onSearch">
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'search',

  data: () => ({
    isActive: true
  }),

  props: ['searchTerm'],

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
  border: {
    color: palette(gray, light);
    radius: $border-radius;
    style: solid;
    width: 1px;
  }
  box-shadow: $box-shadow;
  display: flex;
  flex: 1;
  height: 2.75rem;
  max-width: screen(small);
  padding: {
    bottom: .25rem;
    right: .25rem;
    left: .65rem;
    top: .25rem;
  }
  transition: border-color $transition;

  &.active {
    // border-color: palette(green);
  }

  &__input {
    border: 0;
    flex: 9;
    font: {
      size: 1rem;
    }
    outline: 0;

    &::placeholder {
      color: palette(gray);  
    }
  }

  &__button {
    cursor: pointer;
    flex: 1;
    background: {
      color: palette(green);
      image: url("../assets/search.svg");
      size: 2rem;
      position: center;
      repeat: no-repeat;
    }
    border: {
      color: palette(green);
      radius: $border-radius;
      style: solid;
      width: 1px;
    }
    transition: border-color $transition;

    &:hover {
      border-color: palette(green, dark);
    }

    &:active {
      outline: 0;
    }
  }
}
</style>
