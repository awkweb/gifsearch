<template>
  <div
    :id="`masonry-grid-cell-${id}`"
    class="masonry-grid-cell"
    @mouseenter="showFavorite = true"
    @mouseleave="showFavorite = false">

    <button
      v-if="isFavorited || showFavorite"
      class="masonry-grid-cell__favorite"
      :class="isFavorited ? 'hearted' : 'heart'"
      @click="onFavorite($event)">
    </button> 
    
    <div 
      v-if="currentSrc == null"
      class="image-container">
      <img 
        :src="smallSrc"
        @click="onSelect"
        class="blur">
    </div>

    <div 
      v-else
      class="image-container">
      <img
        :src="src"
        @click="onSelect">
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { animeMixin } from '../../mixins'

export default {
  name: 'masonry-grid-cell',

  data: () => ({
    currentSrc: null,
    showFavorite: false,
  }),

  mixins: [animeMixin],

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

    onFavorite (event) {
      if (this.id in this.favoritesLookup) {
        this.REMOVE_FAVORITE(this.id)
      } else {
        this.ADD_FAVORITE(this.data)
        this.fireworks(event)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';
@import '../../scss/_functions.scss';

.masonry-grid-cell {
  break-inside: avoid;
  page-break-inside: avoid;
  padding-bottom: .5rem;
  position: relative;

  .image-container {
    overflow: hidden;
  }

  .blur {
    filter: blur(10px);
  }

  img {
    border-radius: $border-radius;
    cursor: pointer;
    width: 100%;
    height: auto;
    vertical-align: top;
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
        image: url("../../assets/icons/heart.svg");
      }
      border-color: palette(red);
    }

    &.hearted {
      background: {
        color: palette(red);
        image: url("../../assets/icons/hearted.svg");
      }
      border-color: palette(white);
    }

    &:focus {
      outline: 0;
    }
  }
}
</style>
