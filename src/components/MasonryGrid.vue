<template>
  <div class="masonry-grid">
    <div class="masonry-grid__container">
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
  </div>
</template>

<script>
import MasonryGridCell from './MasonryGridCell.vue'

export default {
  name: 'masonry-grid',

  data: () => ({
    autoPlay: true
  }),

  props: [
    'items'
  ],

  components: {
    MasonryGridCell
  },

  methods: {
    onSelect (resultId) {
      this.$emit('onSelect', resultId)
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';
.masonry-grid {
  min-height: 100vh;
  padding: {
    top: 4.75rem;
    right: .5rem;
    left: .5rem;
  }

  &__container {
    columns: 15rem;
    -moz-columns: 15rem;
    -webkit-columns: 15rem;
    column-gap: .5rem;
    -moz-column-gap: .5rem;
    -webkit-column-gap: .5rem;
  }
}
</style>
