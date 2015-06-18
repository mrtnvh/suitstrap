/* ========================================================================
 * Suitstrap: dropdown.js v0.2.1
 * http://suitstrap.maartenvanhoof.be/javascript/#dropdown
 * Licensed under MIT (https://github.com/vanhoofmaarten/suitstrap/blob/master/LICENSE)
 * ========================================================================
 *
 * Forked from:
 * Suitstrap: dropdown.js v3.2.0
 * http://suitstrap.maartenvanhoof.be/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+ function($) {
	"use strict";

	// DROPDOWN CLASS DEFINITION
	// =========================

	var backdrop = '.Dropdown-backdrop'
	var toggle = '[data-toggle=dropdown]'
	var Dropdown = function(element) {
		var $el = $(element).on('click.bs.dropdown', this.toggle)
	}

	Dropdown.VERSION = '3.2.0'

	Dropdown.prototype.toggle = function(e) {
		var $this = $(this)

		if ($this.is('.is-disabled, :disabled')) return

		var $parent = getParent($this)
		var isActive = $parent.hasClass('is-open')

		clearMenus()

		if (!isActive) {
			if ('ontouchstart' in document.documentElement && !$parent.closest('.Navbar-nav').length) {
				// if mobile we use a backdrop because click events don't delegate
				$('<div class="Dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
			}

			var relatedTarget = {
				relatedTarget: this
			}
			$parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

			if (e.isDefaultPrevented()) return

			$this
				.trigger('focus')
				.attr('aria-expanded', 'true')

			$parent
				.toggleClass('is-open')
				.trigger('shown.bs.dropdown', relatedTarget)
		}

		return false
	}

	Dropdown.prototype.keydown = function(e) {
		if (!/(38|40|27)/.test(e.keyCode)) return

		var $this = $(this)

		e.preventDefault()
		e.stopPropagation()

		if ($this.is('.is-disabled, :disabled')) return

		var $parent = getParent($this)
		var isActive = $parent.hasClass('is-open')

		if (!isActive || (isActive && e.keyCode == 27)) {
			if (e.which == 27) $parent.find(toggle).focus()
			return $this.click()
		}

		var desc = ' li:not(.Divider):visible a'
		var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

		if (!$items.length) return

		var index = $items.index($items.filter(':focus'))

		if (e.keyCode == 38 && index > 0) index-- // up
			if (e.keyCode == 40 && index < $items.length - 1) index++ // down
				if (!~index) index = 0

		$items.eq(index).trigger('focus')
	}

	function clearMenus(e) {
		if (e && e.which === 3) return
		$(backdrop).remove()
		$(toggle).each(function() {
			var $this = $(this)
			var $parent = getParent($this)
			var relatedTarget = {
				relatedTarget: this
			}

			if (!$parent.hasClass('is-open')) return

			$parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

			if (e.isDefaultPrevented()) return

			$this.attr('aria-expanded', 'false')
			$parent.removeClass('is-open').trigger('hidden.bs.dropdown', relatedTarget)
		})
	}

	function getParent($this) {
		var selector = $this.attr('data-target')

		if (!selector) {
			selector = $this.attr('href')
			selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
		}

		var $parent = selector && $(selector)

		return $parent && $parent.length ? $parent : $this.parent()
	}


	// DROPDOWN PLUGIN DEFINITION
	// ==========================

	function Plugin(option) {
		return this.each(function() {
			var $this = $(this)
			var data = $this.data('bs.dropdown')

			if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
			if (typeof option == 'string') data[option].call($this)
		})
	}

	var old = $.fn.dropdown

	$.fn.dropdown = Plugin
	$.fn.dropdown.Constructor = Dropdown


	// DROPDOWN NO CONFLICT
	// ====================

	$.fn.dropdown.noConflict = function() {
		$.fn.dropdown = old
		return this
	}


	// APPLY TO STANDARD DROPDOWN ELEMENTS
	// ===================================

	$(document)
		.on('click.bs.dropdown.data-api', clearMenus)
		.on('click.bs.dropdown.data-api', '.Dropdown form', function(e) {
			e.stopPropagation()
		})
		.on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
		.on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);
