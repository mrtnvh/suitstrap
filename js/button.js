/* ========================================================================
 * Suitstrap: buttons.js v0.2.1
 * http://suitstrap.maartenvanhoof.be/javascript/#buttons
 * Licensed under MIT (https://github.com/vanhoofmaarten/suitstrap/blob/master/LICENSE)
 * ========================================================================
 *
 * Forked from:
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+ function($) {
	'use strict';

	// BUTTON PUBLIC CLASS DEFINITION
	// ==============================

	var Button = function(element, options) {
		this.$element = $(element)
		this.options = $.extend({}, Button.DEFAULTS, options)
		this.isLoading = false
	}

	Button.VERSION = '3.2.0'

	Button.DEFAULTS = {
		loadingText: 'loading...'
	}

	Button.prototype.setState = function(state) {
		var d = 'disabled'
		var c = 'is-disabled'
		var $el = this.$element
		var val = $el.is('input') ? 'val' : 'html'
		var data = $el.data()

		state = state + 'Text'

		if (data.resetText == null) $el.data('resetText', $el[val]())

		$el[val](data[state] == null ? this.options[state] : data[state])

		// push to event loop to allow forms to submit
		setTimeout($.proxy(function() {
			if (state == 'loadingText') {
				this.isLoading = true
				$el.addClass(c).attr(d, d)
			} else if (this.isLoading) {
				this.isLoading = false
				$el.removeClass(c).removeAttr(d)
			}
		}, this), 0)
	}

	Button.prototype.toggle = function() {
		var changed = true
		var $parent = this.$element.closest('[data-toggle="buttons"]')

		if ($parent.length) {
			var $input = this.$element.find('input')
			if ($input.prop('type') == 'radio') {
				if ($input.prop('checked') && this.$element.hasClass('is-active')) changed = false
				else $parent.find('.is-active').removeClass('is-active')
			}
			if (changed) $input.prop('checked', !this.$element.hasClass('is-active')).trigger('change')
		}

		if (changed) this.$element.toggleClass('is-active')
	}


	// BUTTON PLUGIN DEFINITION
	// ========================

	function Plugin(option) {
		return this.each(function() {
			var $this = $(this)
			var data = $this.data('bs.button')
			var options = typeof option == 'object' && option

			if (!data) $this.data('bs.button', (data = new Button(this, options)))

			if (option == 'toggle') data.toggle()
			else if (option) data.setState(option)
		})
	}

	var old = $.fn.button

	$.fn.button = Plugin
	$.fn.button.Constructor = Button


	// BUTTON NO CONFLICT
	// ==================

	$.fn.button.noConflict = function() {
		$.fn.button = old
		return this
	}


	// BUTTON DATA-API
	// ===============

	$(document)
		.on('click.bs.button.data-api', '[data-toggle^="button"]', function(e) {
			var $btn = $(e.target)
			if (!$btn.hasClass('Button')) $btn = $btn.closest('.Button')
			Plugin.call($btn, 'toggle')
			e.preventDefault()
		})
		.on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function(e) {
			$(e.target).closest('.Button').toggleClass('focus', e.type == 'focus')
		})

}(jQuery);
