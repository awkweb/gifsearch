<template>
  <div class="masonry-grid">
    <div
      v-if="items.length > 0"
      class="masonry-grid__container">
      <masonry-grid-cell
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :src="item.images.fixed_width.url"
        :smallSrc="item.images.downsized_still.url"
        :data="item"
        @onSelect="onSelect">
      </masonry-grid-cell>
    </div>

    <div
      v-else-if="error"
      class="masonry-grid__empty">
      Error fetching GIFs.
      <div>Try again later :(</div>
    </div>
    
    <div
      v-else
      class="masonry-grid__empty">
      {{ emptyMessage }}
      <div>Try searching for
        <router-link :to="{ name: 'search-results', params: { searchTerm: 'pusheen' }}">pusheen</router-link> or
        <router-link :to="{ name: 'search-results', params: { searchTerm: 'gladiator' }}">gladiator</router-link>.
      </div>
    </div>

    <canvas class="fireworks"></canvas>
  </div>
</template>

<script>
import MasonryGridCell from './MasonryGridCell.vue'

export default {
  name: 'masonry-grid',

  props: [
    'error',
    'searchTerm',
    'items'
  ],

  components: {
    MasonryGridCell
  },

  computed: {
    emptyMessage () {
      return this.searchTerm ? `No results for '${this.searchTerm}.'` : `No favorites! Let's add your first one.`
    }
  },

  methods: {
    onSelect (gridCellId) {
      this.$emit('onSelect', gridCellId)
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';
@import '../../scss/_functions.scss';

.masonry-grid {
  min-height: calc(100vh - 76px);
  padding: {
    top: 4.75rem;
    right: .5rem;
    left: .5rem;
  }

  &__container {
    columns: 15rem;
    column-gap: .5rem;
  }

  &__empty {
    margin-top: 4rem;
    text-align: center;
    color: palette(black);
    font: {
      family: $sans-serif;
      size: 1.35rem;
      weight: 600;
    }

    @media screen and (max-width: screen(small)) {
      margin-top: 2rem;
    }

    div {
      font: {
        family: $sans-serif;
        size: 1.15rem;
        weight: 500;
      }
    }

    a {
      color: palette(gray);
      text-decoration-color: palette(gray);
    }
  }
}
</style>
