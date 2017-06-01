<template>
	<div class="field">
    <div class="field__label__container">
    	<label>{{ label }}</label>
    	<span>{{ helpText }}</span>
    </div>
    <div class="field__input__container">
      <input
      	:value="text"
      	@focus="selectUrl"
      	type="text"
      	readonly="true">
      <button :data-clipboard-text="text">{{ active ? activeButtonText : buttonText }}</button>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'

export default {
	name: 'field',

	data: () => ({
    active: false
  }),

	props: [
		'label',
		'helpText',
		'url',
		'buttonText',
		'activeButtonText',
		'type'
	],

	computed: {
		text () {
			let copyText = this.url
			if (this.type === 'embed') {
				copyText = `<iframe src="https://giphy.com/embed/ruHx7nLAmQMbm" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="${this.url}">via GIPHY</a></p>`
			}
			return copyText
		}
	},

	mounted () {
    const button = this.$el.getElementsByTagName('button')[0]
    const clipboard = new Clipboard(button)
    clipboard.on('success', (e) => {
    	this.active = true
    	setTimeout(() => {
    		this.active = false
    	}, 400)
    })
  },

	methods: {
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
	flex: 1;
	flex-direction: column;
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
	  border: {
	    width: 1px;
	    style: solid;
	    color: palette(gray, border);
	    radius: $border-radius;
	  }
		display: flex;
	  padding: {
	  	top: 4px;
	  	left: 6px;
	  	right: 4px;
	  	bottom: 4px;
	  }

		input {
		  border: 0;
		  background-color: transparent;
		  color: palette(black);
			flex: 1;
		  font: {
		    family: $sans-serif;
		    size: .9rem;
		  }
		  margin-right: .25rem;
		  outline: 0;
		  padding: 0;

		  &::placeholder {
		    color: palette(gray);  
		  }
		}

		button {
		  background-color: palette(purple);
			border: {
	    	width: 1px;
	    	style: solid;
	    	color: palette(purple, dark);
	    	radius: $border-radius;
	  	}
	  	color: palette(white);
			cursor: pointer;
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
