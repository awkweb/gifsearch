<template>
  <div
    id="search-result"
    class="search-result"
    @click="onClick">
    <img :src="src">
  </div>
</template>

<script>
export default {
  name: 'search-result',

  props: [
    'id',
    'src'
  ],

  methods: {
    onClick () {
      this.$emit('onResultSelect', this.id)
    }
  }
}
</script>