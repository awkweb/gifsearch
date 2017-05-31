<template>
	<div class="field">
    <div class="field__label__container">
    	<label>{{ label }}</label>
    	<span>{{ helpText }}</span>
    </div>
    <div class="field__input__container">
      <input
      	:value="url"
      	@focus="selectUrl"
      	type="text"
      	readonly="true">
      <button @click="onAction">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script>
export default {
	name: 'field',

	props: [
		'label',
		'helpText',
		'url',
		'buttonText'
	],

	methods: {
		onAction () {
			this.$emit('onAction')
		},

		selectUrl () {
			this.$el.getElementsByTagName('input')[0].select()
    }
	}
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.field {
	display: flex;
	flex-direction: column; 
	flex: 1;
	margin-bottom: 10px;
	transition: border-color $transition;
	&.active {
	  border-color: palette(purple);
	}
	&__label__container {
		display: flex;
		justify-content: space-between;
	  margin-bottom: 1px;
		font: {
			family: $sans-serif;
			size: .8rem;
		}
		label {
	  	color: palette(black);
		  font-weight: 600;
	  }

	  span {
	  	color: palette(black);
		  font-weight: 500;
	  }
	}
	&__input__container {
		display: flex;
	  border: {
	    width: 1px;
	    style: solid;
	    color: #e6e6e6;
	    radius: $border-radius;
	  }
	  padding: {
	  	top: 4px;
	  	left: 6px;
	  	right: 4px;
	  	bottom: 4px;
	  }
		input {
			flex: 1;
		  border: 0;
		  padding: 0;
		  color: palette(black);
		  background-color: transparent;
		  font: {
		    family: $sans-serif;
		    size: .9rem;
		  }
		  outline: 0;
		  &::placeholder {
		    color: palette(gray);  
		  }
		  margin-right: .25rem;
		}

		button {
			cursor: pointer;
			color: palette(white);
			border: {
	    	width: 1px;
	    	style: solid;
	    	color: palette(purple, dark);
	    	radius: $border-radius;
	  	}
		  background-color: palette(purple);
		  font: {
		    family: $sans-serif;
		    size: .9rem;
		    weight: 700;
		  }
		  outline: 0;
		  transition: border-color $transition;

		  &:hover {
		  	border-color: palette(purple, x-dark);
		  }
		}
	}
}
</style>
