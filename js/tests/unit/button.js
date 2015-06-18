$(function() {
	'use strict';

	module('button plugin')

	test('should be defined on jquery object', function() {
		ok($(document.body).button, 'button method is defined')
	})

	module('button', {
		setup: function() {
			// Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
			$.fn.suitstrapButton = $.fn.button.noConflict()
		},
		teardown: function() {
			$.fn.button = $.fn.suitstrapButton
			delete $.fn.suitstrapButton
		}
	})

	test('should provide no conflict', function() {
		strictEqual($.fn.button, undefined, 'button was set back to undefined (org value)')
	})

	test('should return jquery collection containing the element', function() {
		var $el = $('<div/>')
		var $button = $el.suitstrapButton()
		ok($button instanceof $, 'returns jquery collection')
		strictEqual($button[0], $el[0], 'collection contains element')
	})

	test('should return set state to loading', function() {
		var $btn = $('<button class="Button" data-loading-text="fat">mdo</button>')
		equal($btn.html(), 'mdo', 'btn text equals mdo')
		$btn.suitstrapButton('loading')
		equal($btn.html(), 'fat', 'btn text equals fat')
		stop()
		setTimeout(function() {
			ok($btn[0].hasAttribute('disabled'), 'btn is disabled')
			ok($btn.hasClass('is-disabled'), 'btn has disabled class')
			start()
		}, 0)
	})

	test('should return reset state', function() {
		var $btn = $('<button class="Button" data-loading-text="fat">mdo</button>')
		equal($btn.html(), 'mdo', 'btn text equals mdo')
		$btn.suitstrapButton('loading')
		equal($btn.html(), 'fat', 'btn text equals fat')
		stop()
		setTimeout(function() {
			ok($btn[0].hasAttribute('disabled'), 'btn is disabled')
			ok($btn.hasClass('is-disabled'), 'btn has disabled class')
			start()
			stop()
			$btn.suitstrapButton('reset')
			equal($btn.html(), 'mdo', 'btn text equals mdo')
			setTimeout(function() {
				ok(!$btn[0].hasAttribute('disabled'), 'btn is not disabled')
				ok(!$btn.hasClass('is-disabled'), 'btn does not have disabled class')
				start()
			}, 0)
		}, 0)
	})

	test('should work with an empty string as reset state', function() {
		var $btn = $('<button class="Button" data-loading-text="fat"/>')
		equal($btn.html(), '', 'btn text equals ""')
		$btn.suitstrapButton('loading')
		equal($btn.html(), 'fat', 'btn text equals fat')
		stop()
		setTimeout(function() {
			ok($btn[0].hasAttribute('disabled'), 'btn is disabled')
			ok($btn.hasClass('is-disabled'), 'btn has disabled class')
			start()
			stop()
			$btn.suitstrapButton('reset')
			equal($btn.html(), '', 'btn text equals ""')
			setTimeout(function() {
				ok(!$btn[0].hasAttribute('disabled'), 'btn is not disabled')
				ok(!$btn.hasClass('is-disabled'), 'btn does not have disabled class')
				start()
			}, 0)
		}, 0)
	})

	test('should toggle active', function() {
		var $btn = $('<button class="Button">mdo</button>')
		ok(!$btn.hasClass('is-active'), 'btn does not have active class')
		$btn.suitstrapButton('toggle')
		ok($btn.hasClass('is-active'), 'btn has class active')
	})

	test('should toggle active when btn children are clicked', function() {
		var $btn = $('<button class="Button" data-toggle="button">mdo</button>')
		var $inner = $('<i/>')
		$btn
			.append($inner)
			.appendTo('#qunit-fixture')
		ok(!$btn.hasClass('is-active'), 'btn does not have active class')
		$inner.click()
		ok($btn.hasClass('is-active'), 'btn has class active')
	})

	test('should toggle active when btn children are clicked within ButtonGroup', function() {
		var $btngroup = $('<div class="ButtonGroup" data-toggle="buttons"/>')
		var $btn = $('<button class="Button">fat</button>')
		var $inner = $('<i/>')
		$btngroup
			.append($btn.append($inner))
			.appendTo('#qunit-fixture')
		ok(!$btn.hasClass('is-active'), 'btn does not have active class')
		$inner.click()
		ok($btn.hasClass('is-active'), 'btn has class active')
	})

	test('should check for closest matching toggle', function() {
		var groupHTML = '<div class="ButtonGroup" data-toggle="buttons">'
		  + '<label class="Button Button--primary is-active">'
		  + '<input type="radio" name="options" id="option1" checked="true"> Option 1'
		  + '</label>'
		  + '<label class="Button Button--primary">'
		  + '<input type="radio" name="options" id="option2"> Option 2'
		  + '</label>'
		  + '<label class="Button Button--primary">'
		  + '<input type="radio" name="options" id="option3"> Option 3'
		  + '</label>'
		  + '</div>'
		var $group = $(groupHTML).appendTo('#qunit-fixture')

		var $btn1 = $group.children().eq(0)
		var $btn2 = $group.children().eq(1)

		ok($btn1.hasClass('is-active'), 'btn1 has active class')
		ok($btn1.find('input').prop('checked'), 'btn1 is checked')
		ok(!$btn2.hasClass('is-active'), 'btn2 does not have active class')
		ok(!$btn2.find('input').prop('checked'), 'btn2 is not checked')
		$btn2.find('input').click()
		ok(!$btn1.hasClass('is-active'), 'btn1 does not have active class')
		ok(!$btn1.find('input').prop('checked'), 'btn1 is checked')
		ok($btn2.hasClass('is-active'), 'btn2 has active class')
		ok($btn2.find('input').prop('checked'), 'btn2 is checked')

		$btn2.find('input').click() // clicking an already checked radio should not un-check it
		ok(!$btn1.hasClass('is-active'), 'btn1 does not have active class')
		ok(!$btn1.find('input').prop('checked'), 'btn1 is checked')
		ok($btn2.hasClass('is-active'), 'btn2 has active class')
		ok($btn2.find('input').prop('checked'), 'btn2 is checked')
	})

})
