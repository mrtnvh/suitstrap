$(function () {
	'use strict';

	module('dropdowns plugin')

	test('should be defined on jquery object', function () {
		ok($(document.body).dropdown, 'dropdown method is defined')
	})

	module('dropdowns', {
		setup: function () {
			// Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
			$.fn.suitstrapDropdown = $.fn.dropdown.noConflict()
		},
		teardown: function () {
			$.fn.dropdown = $.fn.suitstrapDropdown
			delete $.fn.suitstrapDropdown
		}
	})

	test('should provide no conflict', function () {
		strictEqual($.fn.dropdown, undefined, 'dropdown was set back to undefined (org value)')
	})

	test('should return jquery collection containing the element', function () {
		var $el = $('<div/>')
		var $dropdown = $el.suitstrapDropdown()
		ok($dropdown instanceof $, 'returns jquery collection')
		strictEqual($dropdown[0], $el[0], 'collection contains element')
	})

	test('should not open dropdown if target is disabled via attribute', function () {
		var dropdownHTML = '<ul class="Tabs">'
				+ '<li class="Dropdown">'
					+ '<button disabled href="#" class="Button Dropdown-toggle" data-toggle="dropdown">Dropdown</button>'
					+ '<ul class="Dropdown-menu">'
						+ '<li><a href="#">Secondary link</a></li>'
						+ '<li><a href="#">Something else here</a></li>'
						+ '<li class="Divider"/>'
						+ '<li><a href="#">Another link</a></li>'
					+ '</ul>'
				+ '</li>'
			+ '</ul>'
		var $dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').suitstrapDropdown().click()

		ok(!$dropdown.parent('.Dropdown').hasClass('is-open'), '"is-open" class added on click')
	})

	test('should not open dropdown if target is disabled via class', function () {
		var dropdownHTML = '<ul class="Tabs">'
				+ '<li class="Dropdown">'
					+ '<button href="#" class="Button Dropdown-toggle is-disabled" data-toggle="dropdown">Dropdown</button>'
						+ '<ul class="Dropdown-menu">'
							+ '<li><a href="#">Secondary link</a></li>'
							+ '<li><a href="#">Something else here</a></li>'
							+ '<li class="Divider"/>'
							+ '<li><a href="#">Another link</a></li>'
						+ '</ul>'
					+ '</li>'
				+ '</ul>'
		var $dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').suitstrapDropdown().click()

		ok(!$dropdown.parent('.Dropdown').hasClass('is-open'), '"is-open" class added on click')
	})

	test('should add class open to menu if clicked', function () {
		var dropdownHTML = '<ul class="Tabs">'
				+ '<li class="Dropdown">'
					+ '<a href="#" class="Dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
					+ '<ul class="Dropdown-menu">'
						+ '<li><a href="#">Secondary link</a></li>'
						+ '<li><a href="#">Something else here</a></li>'
						+ '<li class="Divider"/>'
						+ '<li><a href="#">Another link</a></li>'
					+ '</ul>'
				+ '</li>'
			+ '</ul>'
		var $dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').suitstrapDropdown().click()

		ok($dropdown.parent('.Dropdown').hasClass('is-open'), '"is-open" class added on click')
	})

	test('should test if element has a # before assuming it\'s a selector', function () {
		var dropdownHTML = '<ul class="Tabs">'
				+ '<li class="Dropdown">'
					+ '<a href="/foo/" class="Dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
					+ '<ul class="Dropdown-menu">'
						+ '<li><a href="#">Secondary link</a></li>'
						+ '<li><a href="#">Something else here</a></li>'
						+ '<li class="Divider"/>'
						+ '<li><a href="#">Another link</a></li>'
					+ '</ul>'
				+ '</li>'
			+ '</ul>'
		var $dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').suitstrapDropdown().click()

		ok($dropdown.parent('.Dropdown').hasClass('is-open'), '"is-open" class added on click')
	})


	test('should remove "is-open" class if body is clicked', function () {
		var dropdownHTML = '<ul class="Tabs">'
				+ '<li class="Dropdown">'
					+ '<a href="#" class="Dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
					+ '<ul class="Dropdown-menu">'
						+ '<li><a href="#">Secondary link</a></li>'
						+ '<li><a href="#">Something else here</a></li>'
						+ '<li class="Divider"/>'
						+ '<li><a href="#">Another link</a></li>'
					+ '</ul>'
				+ '</li>'
			+ '</ul>'
		var $dropdown = $(dropdownHTML)
			.appendTo('#qunit-fixture')
			.find('[data-toggle="dropdown"]')
			.suitstrapDropdown()
			.click()

		ok($dropdown.parent('.Dropdown').hasClass('is-open'), '"is-open" class added on click')
		$(document.body).click()
		ok(!$dropdown.parent('.Dropdown').hasClass('is-open'), '"is-open" class removed')
	})

	test('should remove "is-open" class if body is clicked, with multiple dropdowns', function () {
		var dropdownHTML = '<ul class="nav">'
				+ '<li><a href="#menu1">Menu 1</a></li>'
				+ '<li class="Dropdown" id="testmenu">'
					+ '<a class="Dropdown-toggle" data-toggle="dropdown" href="#testmenu">Test menu <span class="Caret"/></a>'
					+ '<ul class="Dropdown-menu" role="menu">'
						+ '<li><a href="#sub1">Submenu 1</a></li>'
					+ '</ul>'
				+ '</li>'
			+ '</ul>'
			+ '<div class="Button-group">'
				+ '<button class="Button">Actions</button>'
				+ '<button class="Button Dropdown-toggle" data-toggle="dropdown"><span class="Caret"/></button>'
				+ '<ul class="Dropdown-menu">'
					+ '<li><a href="#">Action 1</a></li>'
				+ '</ul>'
			+ '</div>'
		var $dropdowns = $(dropdownHTML).appendTo('#qunit-fixture').find('[data-toggle="dropdown"]')
		var $first = $dropdowns.first()
		var $last = $dropdowns.last()

		strictEqual($dropdowns.length, 2, 'two dropdowns')

		$first.click()
		strictEqual($first.parents('.is-open').length, 1, '"is-open" class added on click')
		strictEqual($('#qunit-fixture .is-open').length, 1, 'only one dropdown is open')
		$(document.body).click()
		strictEqual($('#qunit-fixture .is-open').length, 0, '"is-open" class removed')

		$last.click()
		strictEqual($last.parent('.is-open').length, 1, '"is-open" class added on click')
		strictEqual($('#qunit-fixture .is-open').length, 1, 'only one dropdown is open')
		$(document.body).click()
		strictEqual($('#qunit-fixture .is-open').length, 0, '"is-open" class removed')
	})

	test('should fire show and hide event', function () {
		var dropdownHTML = '<ul class="Tabs">'
				+ '<li class="Dropdown">'
					+ '<a href="#" class="Dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
					+ '<ul class="Dropdown-menu">'
						+ '<li><a href="#">Secondary link</a></li>'
						+ '<li><a href="#">Something else here</a></li>'
						+ '<li class="Divider"/>'
						+ '<li><a href="#">Another link</a></li>'
					+ '</ul>'
				+ '</li>'
			+ '</ul>'
		var $dropdown = $(dropdownHTML)
			.appendTo('#qunit-fixture')
			.find('[data-toggle="dropdown"]')
			.suitstrapDropdown()

		stop()

		$dropdown
			.parent('.Dropdown')
			.on('show.bs.dropdown', function () {
				ok(true, 'show was fired')
			})
			.on('hide.bs.dropdown', function () {
				ok(true, 'hide was fired')
				start()
			})

		$dropdown.click()
		$(document.body).click()
	})


	test('should fire shown and hidden event', function () {
		var dropdownHTML = '<ul class="Tabs">'
				+ '<li class="Dropdown">'
					+ '<a href="#" class="Dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
					+ '<ul class="Dropdown-menu">'
						+ '<li><a href="#">Secondary link</a></li>'
						+ '<li><a href="#">Something else here</a></li>'
						+ '<li class="Divider"/>'
						+ '<li><a href="#">Another link</a></li>'
					+ '</ul>'
				+ '</li>'
			+ '</ul>'
		var $dropdown = $(dropdownHTML)
			.appendTo('#qunit-fixture')
			.find('[data-toggle="dropdown"]')
			.suitstrapDropdown()

		stop()

		$dropdown
			.parent('.Dropdown')
			.on('shown.bs.dropdown', function () {
				ok(true, 'shown was fired')
			})
			.on('hidden.bs.dropdown', function () {
				ok(true, 'hidden was fired')
				start()
			})

		$dropdown.click()
		$(document.body).click()
	})

})
