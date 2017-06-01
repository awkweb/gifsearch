<template>
  <header class="details__header">
    <div>
        <a
          v-if="gif.user"
          :href="gif.user.profile_url"
          class="details__image-link">
        <img
          :src="gif.user.avatar_url">
        </a>
        <div
          v-else
          class="details__image-link">
        </div>

      <div class="details__user">
        <a
          v-if="gif.user"
          :href="gif.user.profile_url"
          class="username">
          {{ gif.user.username }}
        </a>
        <span
          v-else
          class="username">
          Posted by Unknown
        </span>

        <span class="posted">{{ gif.import_datetime | prettyDate }}</span>
      </div>
    </div>

    <div class="details__buttons">
      <button class="details__buttons--button previous" @click="getPreviousGif"></button>
      <button class="details__buttons--button next" @click="getNextGif"></button>
    </div>
  </header>
</template>

<script>
export default {
	name: 'gif-details-header',

  props: [
    'gif'
  ],

  methods: {
    onRandomGif () {
      this.$emit('onRandomGif')
    },

    getPreviousGif () {
      this.$emit('getPreviousGif')
    },

    getNextGif () {
      this.$emit('getNextGif')
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';
@import '../../scss/_functions.scss';

.details {
  &__header {
    align-items: center;
    border-bottom: {
      width: 1px;
      style: solid;
      color: palette(gray, border);
      radius: $border-radius;
    }
    display: flex;
    justify-content: space-between;
    padding: {
      left: 1rem;
      right: 1rem;
      top: 1rem;
      bottom: .75rem;
    }

    & > div {
      display: flex;
      align-items: center;
    }
  }

  &__user {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    font: {
      family: $sans-serif;
      size: .95rem;
    }
    line-height: 1.2;

    .username {
      color: palette(black);
      text-transform: capitalize;
      text-decoration: none;
      font-weight: 700;
    }

    .posted {
      text-transform: capitalize;
      font-weight: 500;
    }
  }

  &__image-link {
    align-items: center;
    background-color: palette(gray, light);
    border-radius: 50%;
    display: flex;
    height: 30px;
    margin-right: .75rem;
    width: 30px;

    img {
      border-radius: 50%;
      height: 100%;
      width: 100%;
    }
  }

  &__buttons {
    border: {
      width: 1px;
      style: solid;
      color: palette(gray, border);
      radius: $border-radius;
    }

    &--button {
      outline: 0;
      height: 30px;
      width: 30px;
      cursor: pointer;
      border: 0;
      padding: 0;
      background: {
        color: transparent;
        size: 2.5rem;
        position: center;
        repeat: no-repeat;
      }
      transition: background-color $transition;

      &:hover {
        background-color: palette(gray, border);
      }

      &.previous {
        background-image: url("../../assets/icons/chevron-left.svg");
      }

      &.next {
        background-image: url("../../assets/icons/chevron-right.svg");
      }
    }
  }
}
</style>
