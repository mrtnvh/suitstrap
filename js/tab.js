/* ========================================================================
 * Suitstrap: tab.js v0.2.1
 * http://suitstrap.maartenvanhoof.be/javascript/#tab
 * Licensed under MIT (https://github.com/vanhoofmaarten/suitstrap/blob/master/LICENSE)
 * ========================================================================
 *
 * Forked from:
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+ function($) {
	"use strict";

	// TAB CLASS DEFINITION
	// ====================

	var Tab = function(element) {
		this.element = $(element)
	}

	Tab.VERSION = '3.2.0'

	Tab.TRANSITION_DURATION = 150

	Tab.prototype.show = function() {
		var $this = this.element
		var $ul = $this.closest('ul:not(.Dropdown-menu)')
		var selector = $this.data('target')

		if (!selector) {
			selector = $this.attr('href')
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
		}

		if ($this.parent('li').hasClass('is-active')) return

		var previous = $ul.find('.is-active:last a')[0]
		var e = $.Event('show.bs.tab', {
			relatedTarget: previous
		})

		$this.trigger(e)

		if (e.isDefaultPrevented()) return

		var $target = $(selector)

		this.activate($this.closest('li'), $ul)
		this.activate($target, $target.parent(), function() {
			$this.trigger({
				type: 'shown.bs.tab',
				relatedTarget: previous
			})
		})
	}

	Tab.prototype.activate = function(element, container, callback) {
		var $active = container.find('> .is-active')
		var transition = callback && $.support.transition && (($active.length && $active.hasClass('Animation--fade')) || !!container.find('> .Animation--fade').length)

		function next() {
			$active
				.removeClass('is-active')
				.find('> .Dropdown-menu > .is-active')
				.removeClass('is-active')

			element.addClass('is-active')

			if (transition) {
				element[0].offsetWidth // reflow for transition
				element.addClass('is-in')
			} else {
				element.removeClass('Animation--fade')
			}

			if (element.parent('.Dropdown-menu')) {
				element.closest('li.Dropdown').addClass('is-active')
			}

			callback && callback()
		}

		$active.length && transition ?
			$active
			.one('bsTransitionEnd', next)
			.emulateTransitionEnd(Tab.TRANSITION_DURATION) :
			next()

		$active.removeClass('is-in')
	}


	// TAB PLUGIN DEFINITION
	// =====================

	function Plugin(option) {
		return this.each(function() {
			var $this = $(this)
			var data = $this.data('bs.tab')

			if (!data) $this.data('bs.tab', (data = new Tab(this)))
			if (typeof option == 'string') data[option]()
		})
	}

	var old = $.fn.tab

	$.fn.tab = Plugin
	$.fn.tab.Constructor = Tab


	// TAB NO CONFLICT
	// ===============

	$.fn.tab.noConflict = function() {
		$.fn.tab = old
		return this
	}


	// TAB DATA-API
	// ============

	$(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
		e.preventDefault()
		Plugin.call($(this), 'show')
	})

}(jQuery);
