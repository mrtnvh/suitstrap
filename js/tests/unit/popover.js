$(function () {
	'use strict';

	module('popover plugin')

	test('should be defined on jquery object', function () {
		ok($(document.body).popover, 'popover method is defined')
	})

	module('popover', {
		setup: function () {
			// Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
			$.fn.suitstrapPopover = $.fn.popover.noConflict()
		},
		teardown: function () {
			$.fn.popover = $.fn.suitstrapPopover
			delete $.fn.suitstrapPopover
		}
	})

	test('should provide no conflict', function () {
		strictEqual($.fn.popover, undefined, 'popover was set back to undefined (org value)')
	})

	test('should return jquery collection containing the element', function () {
		var $el = $('<div/>')
		var $popover = $el.suitstrapPopover()
		ok($popover instanceof $, 'returns jquery collection')
		strictEqual($popover[0], $el[0], 'collection contains element')
	})

	test('should render popover element', function () {
		var $popover = $('<a href="#" title="mdo" data-content="http://twitter.com/mdo">@mdo</a>')
			.appendTo('#qunit-fixture')
			.suitstrapPopover('show')

		notEqual($('.Popover').length, 0, 'popover was inserted')
		$popover.suitstrapPopover('hide')
		equal($('.Popover').length, 0, 'popover removed')
	})

	test('should store popover instance in popover data object', function () {
		var $popover = $('<a href="#" title="mdo" data-content="http://twitter.com/mdo">@mdo</a>').suitstrapPopover()

		ok($popover.data('bs.popover'), 'popover instance exists')
	})

	test('should store popover trigger in popover instance data object', function () {
		var $popover = $('<a href="#" title="ResentedHook">@ResentedHook</a>')
			.appendTo('#qunit-fixture')
			.suitstrapPopover()

		$popover.suitstrapPopover('show')

		ok($('.Popover').data('bs.popover'), 'popover trigger stored in instance data')
	})

	test('should get title and content from options', function () {
		var $popover = $('<a href="#">@fat</a>')
			.appendTo('#qunit-fixture')
			.suitstrapPopover({
				title: function () {
					return '@fat'
				},
				content: function () {
					return 'loves writing tests （╯°□°）╯︵ ┻━┻'
				}
			})

		$popover.suitstrapPopover('show')

		notEqual($('.Popover').length, 0, 'popover was inserted')
		equal($('.Popover .Popover-title').text(), '@fat', 'title correctly inserted')
		equal($('.Popover .Popover-content').text(), 'loves writing tests （╯°□°）╯︵ ┻━┻', 'content correctly inserted')

		$popover.suitstrapPopover('hide')
		equal($('.Popover').length, 0, 'popover was removed')
	})

	test('should not duplicate HTML object', function () {
		var $div = $('<div/>').html('loves writing tests （╯°□°）╯︵ ┻━┻')

		var $popover = $('<a href="#">@fat</a>')
			.appendTo('#qunit-fixture')
			.suitstrapPopover({
				content: function () {
					return $div
				}
			})

		$popover.suitstrapPopover('show')
		notEqual($('.Popover').length, 0, 'popover was inserted')
		equal($('.Popover .Popover-content').html(), $div, 'content correctly inserted')

		$popover.suitstrapPopover('hide')
		equal($('.Popover').length, 0, 'popover was removed')

		$popover.suitstrapPopover('show')
		notEqual($('.Popover').length, 0, 'popover was inserted')
		equal($('.Popover .Popover-content').html(), $div, 'content correctly inserted')

		$popover.suitstrapPopover('hide')
		equal($('.Popover').length, 0, 'popover was removed')
	})

	test('should get title and content from attributes', function () {
		var $popover = $('<a href="#" title="@mdo" data-content="loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻" >@mdo</a>')
			.appendTo('#qunit-fixture')
			.suitstrapPopover()
			.suitstrapPopover('show')

		notEqual($('.Popover').length, 0, 'popover was inserted')
		equal($('.Popover .Popover-title').text(), '@mdo', 'title correctly inserted')
		equal($('.Popover .Popover-content').text(), 'loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻', 'content correctly inserted')

		$popover.suitstrapPopover('hide')
		equal($('.Popover').length, 0, 'popover was removed')
	})


	test('should get title and content from attributes ignoring options passed via js', function () {
		var $popover = $('<a href="#" title="@mdo" data-content="loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻" >@mdo</a>')
			.appendTo('#qunit-fixture')
			.suitstrapPopover({
				title: 'ignored title option',
				content: 'ignored content option'
			})
			.suitstrapPopover('show')

		notEqual($('.Popover').length, 0, 'popover was inserted')
		equal($('.Popover .Popover-title').text(), '@mdo', 'title correctly inserted')
		equal($('.Popover .Popover-content').text(), 'loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻', 'content correctly inserted')

		$popover.suitstrapPopover('hide')
		equal($('.Popover').length, 0, 'popover was removed')
	})

	test('should respect custom template', function () {
		var $popover = $('<a href="#">@fat</a>')
			.appendTo('#qunit-fixture')
			.suitstrapPopover({
				title: 'Test',
				content: 'Test',
				template: '<div class="Popover foobar"><div class="Arrow"></div><div class="inner"><h3 class="Popover-title"/><div class="Popover-content"><p/></div></div></div>'
			})

		$popover.suitstrapPopover('show')

		notEqual($('.Popover').length, 0, 'popover was inserted')
		ok($('.Popover').hasClass('foobar'), 'custom class is present')

		$popover.suitstrapPopover('hide')
		equal($('.Popover').length, 0, 'popover was removed')
	})

	test('should destroy popover', function () {
		var $popover = $('<div/>')
			.suitstrapPopover({
				trigger: 'hover'
			})
			.on('click.foo', $.noop)

		ok($popover.data('bs.popover'), 'popover has data')
		ok($._data($popover[0], 'events').mouseover && $._data($popover[0], 'events').mouseout, 'popover has hover event')
		equal($._data($popover[0], 'events').click[0].namespace, 'foo', 'popover has extra click.foo event')

		$popover.suitstrapPopover('show')
		$popover.suitstrapPopover('destroy')

		ok(!$popover.hasClass('is-in'), 'popover is hidden')
		ok(!$popover.data('popover'), 'popover does not have data')
		equal($._data($popover[0], 'events').click[0].namespace, 'foo', 'popover still has click.foo')
		ok(!$._data($popover[0], 'events').mouseover && !$._data($popover[0], 'events').mouseout, 'popover does not have any events')
	})

})
