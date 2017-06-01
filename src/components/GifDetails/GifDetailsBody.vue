<template>
  <div class="details__body">
    <div class="details__toolbar">
      <div>
        <button
          @click="onFavorite($event)"
          :class="isFavorited ? 'hearted' : 'heart'"
          class="details__button">
        </button>
        <button
          @click="onExternalLink"
          class="details__button external-link">
        </button>
      </div>

      <div class="details__tags">
        <span
          v-for="tag in tags"
          @click="onClickTag(tag)"
          class="details__tag">
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="details__section">
      <h2>Links</h2>
      <field
        v-for="field in fields"
        :key="field.label"
        :label="field.label"
        :helpText="field.helpText"
        :url="activeGif.url"
        :buttonText="field.buttonText"
        :activeButtonText="field.activeButtonText"
        :type="field.type"></field>
    </div>

    <div class="details__section" v-show="relatedGifs.length == 3">
      <h2>Related</h2>
      <div class="details__related">
        <related-gif
          v-for="gif in relatedGifs"
          :key="gif.id"
          :gif="gif"
          @onSelect="onSelect"></related-gif>
      </div>
    </div>
  </div>	
</template>

<script>
import { mapGetters } from 'vuex'
import Field from '../Field.vue'
import RelatedGif from './RelatedGif.vue'

export default {
	name: 'gif-details-body',

  data: () => ({
    fields: [
      {
        'label': 'Giphy',
        'helpText': 'Link to the GIF image on Giphy',
        'label': 'Giphy',
        'buttonText': 'Copy',
        'activeButtonText': 'Copied'
      },
      {
        'label': 'Embed',
        'helpText': 'GIF Embed Code',
        'buttonText': 'Copy',
        'activeButtonText': 'Copied',
        'type': 'embed'
      }
    ]
  }),

	components: {
    Field,
    RelatedGif
  },

  props: [
    'gifs',
    'isFavorited',
    'isFavoriteDetails'
  ],

  computed: {
    ...mapGetters('giphy', [
      'activeGif'
    ]),

    tags () {
      let tags = this.activeGif.slug.split('-')
      tags.pop()
      tags.push(this.activeGif.rating.toUpperCase())
      if (this.activeGif.source_tld.length > 0)
        tags.push(this.activeGif.source_tld)
      return tags
    },

    relatedGifs () {
      let related = []
      this.gifs.some((gif, index) => {
        if (gif.id != this.activeGif.id) {
          related.push(gif)
        }
        return related.length == 3
      })
      return related
    }
  },

  methods: {
  	onFavorite (event) {
      this.$emit('onFavorite', event)
    },

    onExternalLink () {
      window.open(this.activeGif.url)
    },

    onClickTag (tag) {
      this.$router.push({ name: 'search-results', params: { searchTerm: tag }})
    },

    onSelect (gifId) {
      this.$emit('onSelect', gifId)
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';
@import '../../scss/_functions.scss';

.details {
	&__body {
    padding: {
      top: .5rem;
      right: 1rem;
      bottom: 1rem;
      left: 1rem;
    }
  }

  &__toolbar {
    align-items: flex-end;
    border-bottom: {
      width: 1px;
      style: solid;
      color: palette(gray, border);
    }
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;
    padding-bottom: .5rem;
  }

  &__button {
    width: 32px;
    height: 28px;
    border: 0;
    cursor: pointer;
    background: {
      color: palette(white);
      position: center 1%;
      size: 35px;
      repeat: no-repeat;
    }
    transition: color $transition, background-color $transition;
    
    &.heart {
      background-image: url("../../assets/icons/heart-black.svg");
    }

    &.hearted {
      background-image: url("../../assets/icons/heart.svg");
    }

    &.external-link {
      background-image: url("../../assets/icons/external-link.svg");
    }

    &:focus {
      outline: 0;
    }
  }

  &__tags {
    height: 30px;
    max-width: 80%;
    overflow-x: auto;
    white-space: nowrap;

    @media screen and (max-width: screen(medium)) {
      max-width: 70%;
    }
  }

  &__tag {
    cursor: pointer;
    border: {
      width: 1px;
      style: solid;
      color: palette(gray, border);
      radius: $border-radius;
    }
    font: {
      family: $sans-serif;
      size: .9rem;
      weight: 700;
    }
    margin-right: .25rem;
    padding: {
      top: .25rem;
      right: .5rem;
      bottom: .25rem;
      left: .5rem;
    }
    transition: color $transition, border-color $transition;

    &:hover {
      color: palette(purple);
      border-color: palette(purple);
    }
    
    &:last-child {
      margin-right: 0;
    }
  }

  &__section {
    display: flex;
    flex-direction: column;
    margin-bottom: .25rem;

    h2 {
      font-size: 1.4rem;
      border-bottom: {
        width: 1px;
        style: solid;
        color: palette(gray, border);
      }
      margin: {
        top: .5rem;
        bottom: 1rem;
      }
      padding-bottom: .35rem;
    }
  }

  &__related {
    columns: 3;
    column-gap: .5rem;
    height: 10rem;
  }
}
</style>
