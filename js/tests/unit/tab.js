$(function () {
	'use strict';

	module('tabs plugin')

	test('should be defined on jquery object', function () {
		ok($(document.body).tab, 'tabs method is defined')
	})

	module('tabs', {
		setup: function () {
			// Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
			$.fn.suitstrapTab = $.fn.tab.noConflict()
		},
		teardown: function () {
			$.fn.tab = $.fn.suitstrapTab
			delete $.fn.suitstrapTab
		}
	})

	test('should provide no conflict', function () {
		strictEqual($.fn.tab, undefined, 'tab was set back to undefined (org value)')
	})

	test('should return jquery collection containing the element', function () {
		var $el = $('<div/>')
		var $tab = $el.suitstrapTab()
		ok($tab instanceof $, 'returns jquery collection')
		strictEqual($tab[0], $el[0], 'collection contains element')
	})

	test('should activate element by tab id', function () {
		var tabsHTML = '<ul class="Tabs">'
				+ '<li><a href="#home">Home</a></li>'
				+ '<li><a href="#profile">Profile</a></li>'
			+ '</ul>'

		$('<ul><li id="home"/><li id="profile"/></ul>').appendTo('#qunit-fixture')

		$(tabsHTML).find('li:last a').suitstrapTab('show')
		equal($('#qunit-fixture').find('.is-active').attr('id'), 'profile')

		$(tabsHTML).find('li:first a').suitstrapTab('show')
		equal($('#qunit-fixture').find('.is-active').attr('id'), 'home')
	})

	test('should activate element by tab id', function () {
		var pillsHTML = '<ul class="Pills">'
				+ '<li><a href="#home">Home</a></li>'
				+ '<li><a href="#profile">Profile</a></li>'
			+ '</ul>'

		$('<ul><li id="home"/><li id="profile"/></ul>').appendTo('#qunit-fixture')

		$(pillsHTML).find('li:last a').suitstrapTab('show')
		equal($('#qunit-fixture').find('.is-active').attr('id'), 'profile')

		$(pillsHTML).find('li:first a').suitstrapTab('show')
		equal($('#qunit-fixture').find('.is-active').attr('id'), 'home')
	})

	test('should not fire shown when show is prevented', function () {
		stop()

		$('<div class="tab"/>')
			.on('show.bs.tab', function (e) {
				e.preventDefault()
				ok(true, 'show event fired')
				start()
			})
			.on('shown.bs.tab', function () {
				ok(false, 'shown event fired')
			})
			.suitstrapTab('show')
	})

	test('show and shown events should reference correct relatedTarget', function () {
		stop()

		var dropHTML = '<ul class="drop">'
				+ '<li class="Dropdown"><a data-toggle="dropdown" href="#">1</a>'
					+ '<ul class="dropdown-menu">'
						+ '<li><a href="#1-1" data-toggle="tab">1-1</a></li>'
						+ '<li><a href="#1-2" data-toggle="tab">1-2</a></li>'
					+ '</ul>'
				+ '</li>'
			+ '</ul>'

		$(dropHTML)
			.find('ul > li:first a')
				.suitstrapTab('show')
			.end()
			.find('ul > li:last a')
				.on('show.bs.tab', function (e) {
					equal(e.relatedTarget.hash, '#1-1', 'references correct element as relatedTarget')
					start()
				})
				.on('shown.bs.tab', function (e) {
					equal(e.relatedTarget.hash, '#1-1', 'references correct element as relatedTarget')
				})
				.suitstrapTab('show')
	})

})
