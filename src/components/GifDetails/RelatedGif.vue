<template>
	<div
		:style="getStyle(gif)"
		@click="onSelect(gif)"
		class="related-gif"/>
</template>

<script>
export default {
	name: 'related-gif',

	props: [
		'gif'
	],

	methods: {
		getStyle () {
			return {
				backgroundImage: `url(${this.gif.images.fixed_height_downsampled.url})`
			}
		},

		onSelect () {
			this.$emit('onSelect', this.gif.id)
		}
	}
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';
@import '../../scss/_functions.scss';

.related-gif {
	background: {
		color: palette(gray, light);
		position: center;
	}
	border-radius: $border-radius;
	break-inside: avoid;
	cursor: pointer;
	min-height: 100%;
	min-width: 50px;
	page-break-inside: avoid;
	position: relative;
}
</style>
