<template>
  <div
    :id="`masonry-grid-cell-${id}`"
    class="masonry-grid-cell"
    @mouseenter="showFavorite = true"
    @mouseleave="showFavorite = false">

    <button
      v-if="showFavorite"
      class="masonry-grid-cell__favorite"
      :class="isFavorited ? 'hearted' : 'heart'"
      @click="onFavorite">
    </button> 
    
    <img 
      v-if="currentSrc == null"
      :src="smallSrc"
      @click="onSelect">
    
    <img
      :src="src"
      @click="onSelect"
      v-else>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'masonry-grid-cell',

  data: () => ({
    currentSrc: null,
    showFavorite: false,
  }),

  computed: {
    ...mapGetters('giphy', [
      'favoritesLookup'
    ]),
    isFavorited () {
      return this.id in this.favoritesLookup
    }
  },

  props: [
    'id',
    'src',
    'smallSrc',
    'data'
  ],

  mounted: function () {
    let hiResImg = new Image()
    hiResImg.onload = () => {
      this.currentSrc = this.src
    }
    hiResImg.src = this.src
  },

  methods: {
    ...mapMutations('giphy', [
      'ADD_FAVORITE',
      'REMOVE_FAVORITE'
    ]),

    onSelect () {
      this.$emit('onSelect', this.id)
    },

    onFavorite () {
      if (this.id in this.favoritesLookup) {
        this.REMOVE_FAVORITE(this.id)
      } else {
        this.ADD_FAVORITE(this.data)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.masonry-grid-cell {
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  position: relative;
  border-radius: $border-radius;

  img {
    border-radius: $border-radius;
    cursor: pointer;
    width: 100%;
    height: auto;
  }

  &__favorite {
    top: 10px;
    left: 10px;
    position: absolute;
    border: {
      style: solid;
      width: 1px;
      radius: 50%;
    }

    height: 35px;
    width: 35px;
    background: {
      position: center center;
      size: 30px;
      repeat: no-repeat;
    }
    cursor: pointer;
    transition: background $transition, border-color $transition;
    
    &.heart {
      background: {
        color: palette(white);
        image: url("../assets/images/heart.svg");
      }
      border-color: palette(red);
    }

    &.hearted {
      background: {
        color: palette(red);
        image: url("../assets/images/hearted.svg");
      }
      border-color: palette(white);
    }

    &:focus {
      outline: 0;
    }
  }
}
</style>
