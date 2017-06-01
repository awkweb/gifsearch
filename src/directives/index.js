import Vue from 'vue'

Vue.directive('click-outside', {
	bind: function (el, binding, vnode) {
		el.event = function (event) {
			if (!(el == event.target || el.contains(event.target))) {
				vnode.context[binding.expression](event)
			}
		}
		document.body.addEventListener('click', el.event)
	},
	unbind: function (el) {
		document.body.removeEventListener('click', el.event)
	}
});

Vue.directive('favorite-animation', {
	bind: function (el, binding, vnode) {

	},
	update: function (el) {

	},
	unbind: function (el) {
		document.body.removeEventListener('mousedown', el.event);
		document.body.removeEventListener('resize', el.event);
	}
});
