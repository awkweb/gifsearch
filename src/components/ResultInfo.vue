<template>
  <div
    id="result-info"
    class="result-info">
    <span>{{ result.import_datetime }} (use moment.js to format)</span>
    <span>Source {{ result.source }}</span>
    <span>Rating {{ result.rating }}</span>
    <span>User {{ result.username }}</span>
    <span>Embed {{ result.embed_url }}</span>
    <span>Copy URLs</span>
  </div>
</template>

<script>
export default {
  name: 'result-info',

  props: [
    'result'
  ]
}
</script>

<style lang="scss" scoped>
  span {
    display: block;
  }
</style>