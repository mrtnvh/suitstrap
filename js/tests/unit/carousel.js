$(function() {
	'use strict';

	module('carousel plugin')

	test('should be defined on jQuery object', function() {
		ok($(document.body).carousel, 'carousel method is defined')
	})

	module('carousel', {
		setup: function() {
			// Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
			$.fn.suitstrapCarousel = $.fn.carousel.noConflict()
		},
		teardown: function() {
			$.fn.carousel = $.fn.suitstrapCarousel
			delete $.fn.suitstrapCarousel
		}
	})

	test('should provide no conflict', function() {
		strictEqual($.fn.carousel, undefined, 'carousel was set back to undefined (orig value)')
	})

	test('should return jquery collection containing the element', function() {
		var $el = $('<div/>')
		var $carousel = $el.suitstrapCarousel()
		ok($carousel instanceof $, 'returns jquery collection')
		strictEqual($carousel[0], $el[0], 'collection contains element')
	})

	test('should not fire slid when slide is prevented', function() {
		stop()
		$('<div class="Carousel"/>')
			.on('slide.bs.carousel', function(e) {
				e.preventDefault()
				ok(true, 'slide event fired')
				start()
			})
			.on('slid.bs.carousel', function() {
				ok(false, 'slid event fired')
			})
			.suitstrapCarousel('next')
	})

	test('should reset when slide is prevented', function() {
		var carouselHTML = '<div id="carousel-example-generic" class="Carousel Slide">'
				+ '<ol class="Carousel-indicators">'
					+ '<li data-target="#carousel-example-generic" data-slide-to="0" class="is-active"/>'
					+ '<li data-target="#carousel-example-generic" data-slide-to="1"/>'
					+ '<li data-target="#carousel-example-generic" data-slide-to="2"/>'
				+ '</ol>'
				+ '<div class="Carousel-inner">'
					+ '<div class="Carousel-item is-active">'
						+ '<div class="Carousel-caption"/>'
					+ '</div>'
					+ '<div class="Carousel-item">'
						+ '<div class="Carousel-caption"/>'
					+ '</div>'
					+ '<div class="Carousel-item">'
						+ '<div class="Carousel-caption"/>'
					+ '</div>'
				+ '</div>'
				+ '<a class="carousel-control--left carousel-control" href="#carousel-example-generic" data-slide="prev"/>'
				+ '<a class="carousel-control--right carousel-control" href="#carousel-example-generic" data-slide="next"/>'
			+ '</div>'
		var $carousel = $(carouselHTML)

		stop()
		$carousel
			.one('slide.bs.carousel', function(e) {
				e.preventDefault()
				setTimeout(function() {
					ok($carousel.find('.Carousel-item:eq(0)').is('.is-active'), 'first item still is-active')
					ok($carousel.find('.Carousel-indicators li:eq(0)').is('.is-active'), 'first indicator still is-active')
					$carousel.suitstrapCarousel('next')
				}, 0)
			})
			.one('slid.bs.carousel', function() {
				setTimeout(function() {
					ok(!$carousel.find('.Carousel-item:eq(0)').is('.is-active'), 'first item still is-active')
					ok(!$carousel.find('.Carousel-indicators li:eq(0)').is('.is-active'), 'first indicator still is-active')
					ok($carousel.find('.Carousel-item:eq(1)').is('.is-active'), 'second item is-active')
					ok($carousel.find('.Carousel-indicators li:eq(1)').is('.is-active'), 'second indicator is-active')
					start()
				}, 0)
			})
			.suitstrapCarousel('next')
	})

	test('should fire slide event with direction', function() {
		var carouselHTML = '<div id="myCarousel" class="Carousel Clide">'
				+ '<div class="Carousel-inner">'
					+ '<div class="Carousel-item is-active">'
							+ '<img alt="">'
						+ '<div class="Carousel-caption">'
							+ '<h4>First Thumbnail label</h4>'
							+ '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
							+ 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
							+ 'ultricies vehicula ut id elit.</p>'
						+ '</div>'
					+ '</div>'
					+ '<div class="Carousel-item">'
						+ '<img alt="">'
						+ '<div class="Carousel-caption">'
							+ '<h4>Second Thumbnail label</h4>'
							+ '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
							+ 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
							+ 'ultricies vehicula ut id elit.</p>'
						+ '</div>'
					+ '</div>'
					+ '<div class="Carousel-item">'
						+ '<img alt="">'
						+ '<div class="Carousel-caption">'
							+ '<h4>Third Thumbnail label</h4>'
							+ '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
							+ 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
							+ 'ultricies vehicula ut id elit.</p>'
						+ '</div>'
					+ '</div>'
				+ '</div>'
		    	+ '<a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>'
		    	+ '<a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>'
		    + '</div>'
		var $carousel = $(carouselHTML)

		stop()

		$carousel
			.one('slide.bs.carousel', function(e) {
				ok(e.direction, 'direction present on next')
				strictEqual(e.direction, 'left', 'direction is left on next')

				$carousel
					.one('slide.bs.carousel', function(e) {
						ok(e.direction, 'direction present on prev')
						strictEqual(e.direction, 'right', 'direction is right on prev')
						start()
					})
					.suitstrapCarousel('prev')
			})
			.suitstrapCarousel('next')
	})

	test('should fire slid event with direction', function() {
		var carouselHTML = '<div id="myCarousel" class="Carousel slide">' + '<div class="Carousel-inner">' + '<div class="Carousel-item is-active">' + '<img alt="">' + '<div class="Carousel-caption">' + '<h4>First Thumbnail label</h4>' + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ' + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ' + 'ultricies vehicula ut id elit.</p>' + '</div>' + '</div>' + '<div class="Carousel-item">' + '<img alt="">' + '<div class="Carousel-caption">' + '<h4>Second Thumbnail label</h4>' + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ' + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ' + 'ultricies vehicula ut id elit.</p>' + '</div>' + '</div>' + '<div class="Carousel-item">' + '<img alt="">' + '<div class="Carousel-caption">' + '<h4>Third Thumbnail label</h4>' + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ' + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ' + 'ultricies vehicula ut id elit.</p>' + '</div>' + '</div>' + '</div>' + '<a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>' + '<a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>' + '</div>'
		var $carousel = $(carouselHTML)

		stop()

		$carousel
			.one('slid.bs.carousel', function(e) {
				ok(e.direction, 'direction present on next')
				strictEqual(e.direction, 'left', 'direction is left on next')

				$carousel
					.one('slid.bs.carousel', function(e) {
						ok(e.direction, 'direction present on prev')
						strictEqual(e.direction, 'right', 'direction is right on prev')
						start()
					})
					.suitstrapCarousel('prev')
			})
			.suitstrapCarousel('next')
	})

	test('should fire slide event with relatedTarget', function() {
		var template = '<div id="myCarousel" class="Carousel Slide">'
			+ '<div class="Carousel-inner">'
					+ '<div class="Carousel-item is-active">'
						+ '<img alt="">'
						+ '<div class="Carousel-caption">'
							+ '<h4>First Thumbnail label</h4>'
							+ '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
							+ 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
							+ 'ultricies vehicula ut id elit.</p>'
						+ '</div>'
					+ '</div>'
					+ '<div class="Carousel-item">'
						+ '<img alt="">'
						+ '<div class="Carousel-caption">'
							+ '<h4>Second Thumbnail label</h4>'
							+ '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
							+ 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
							+ 'ultricies vehicula ut id elit.</p>'
						+ '</div>'
					+ '</div>'
					+ '<div class="Carousel-item">'
						+ '<img alt="">'
						+ '<div class="Carousel-caption">'
							+ '<h4>Third Thumbnail label</h4>'
							+ '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
							+ 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
							+ 'ultricies vehicula ut id elit.</p>'
						+ '</div>'
					+ '</div>'
				+ '</div>'
				+ '<a class="Carousel-control--left Carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>'
				+ '<a class="Carousel-control--right Carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>'
			+ '</div>'

		stop()

		$(template)
			.on('slide.bs.carousel', function(e) {
				ok(e.relatedTarget, 'relatedTarget present')
				ok($(e.relatedTarget).hasClass('Carousel-item'), 'relatedTarget has class "item"')
				start()
			})
			.suitstrapCarousel('next')
	})

	test('should fire slid event with relatedTarget', function() {
		var template = '<div id="myCarousel" class="Carousel Slide">'
			+ '<div class="Carousel-inner">'
					+ '<div class="Carousel-item is-active">'
						+ '<img alt="">'
						+ '<div class="Carousel-caption">'
							+ '<h4>First Thumbnail label</h4>'
							+ '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
							+ 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
							+ 'ultricies vehicula ut id elit.</p>'
						+ '</div>'
					+ '</div>'
					+ '<div class="Carousel-item">'
						+ '<img alt="">'
						+ '<div class="Carousel-caption">'
							+ '<h4>Second Thumbnail label</h4>'
							+ '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
							+ 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
							+ 'ultricies vehicula ut id elit.</p>'
						+ '</div>'
					+ '</div>'
					+ '<div class="Carousel-item">'
						+ '<img alt="">'
						+ '<div class="Carousel-caption">'
							+ '<h4>Third Thumbnail label</h4>'
							+ '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
							+ 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
							+ 'ultricies vehicula ut id elit.</p>'
						+ '</div>'
					+ '</div>'
				+ '</div>'
				+ '<a class="Carousel-control--left Carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>'
				+ '<a class="Carousel-control--right Carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>'
			+ '</div>'

		stop()

		$(template)
			.on('slid.bs.carousel', function(e) {
				ok(e.relatedTarget, 'relatedTarget present')
				ok($(e.relatedTarget).hasClass('Carousel-item'), 'relatedTarget has class "item"')
				start()
			})
			.suitstrapCarousel('next')
	})

	test('should set interval from data attribute', function() {
		var templateHTML = '<div id="myCarousel" class="Carousel slide">' + '<div class="Carousel-inner">' + '<div class="Carousel-item is-active">' + '<img alt="">' + '<div class="Carousel-caption">' + '<h4>First Thumbnail label</h4>' + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ' + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ' + 'ultricies vehicula ut id elit.</p>' + '</div>' + '</div>' + '<div class="Carousel-item">' + '<img alt="">' + '<div class="Carousel-caption">' + '<h4>Second Thumbnail label</h4>' + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ' + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ' + 'ultricies vehicula ut id elit.</p>' + '</div>' + '</div>' + '<div class="Carousel-item">' + '<img alt="">' + '<div class="Carousel-caption">' + '<h4>Third Thumbnail label</h4>' + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ' + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ' + 'ultricies vehicula ut id elit.</p>' + '</div>' + '</div>' + '</div>' + '<a class="Carousel-control--left Carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>' + '<a class="Carousel-control--right Carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>' + '</div>'
		var $carousel = $(templateHTML)
		$carousel.attr('data-interval', 1814)

		$carousel.appendTo('body')
		$('[data-slide]').first().click()
		equal($carousel.data('bs.carousel').options.interval, 1814)
		$carousel.remove()

		$carousel.appendTo('body').attr('data-modal', 'foobar')
		$('[data-slide]').first().click()
		equal($carousel.data('bs.carousel').options.interval, 1814, 'even if there is an data-modal attribute set')
		$carousel.remove()

		$carousel.appendTo('body')
		$('[data-slide]').first().click()
		$carousel.attr('data-interval', 1860)
		$('[data-slide]').first().click()
		equal($carousel.data('bs.carousel').options.interval, 1814, 'attributes should be read only on initialization')
		$carousel.remove()

		$carousel.attr('data-interval', false)
		$carousel.appendTo('body')
		$carousel.suitstrapCarousel(1)
		strictEqual($carousel.data('bs.carousel').options.interval, false, 'data attribute has higher priority than default options')
		$carousel.remove()
	})

	test('should skip over non-items when using item indices', function() {
		var templateHTML = '<div id="myCarousel" class="Carousel" data-interval="1814">' + '<div class="Carousel-inner">' + '<div class="Carousel-item is-active">' + '<img alt="">' + '</div>' + '<script type="text/x-metamorph" id="thingy"/>' + '<div class="Carousel-item">' + '<img alt="">' + '</div>' + '<div class="Carousel-item">' + '</div>' + '</div>' + '</div>'
		var $template = $(templateHTML)

		$template.suitstrapCarousel()

		strictEqual($template.find('.Carousel-item')[0], $template.find('.is-active')[0], 'first Carousel-item is-active')

		$template.suitstrapCarousel(1)

		strictEqual($template.find('.Carousel-item')[1], $template.find('.is-active')[0], 'second Carousel-item is-active')
	})

	test('should skip over non-items when using next/prev methods', function() {
		var templateHTML = '<div id="myCarousel" class="Carousel" data-interval="1814">' + '<div class="Carousel-inner">' + '<div class="Carousel-item is-active">' + '<img alt="">' + '</div>' + '<script type="text/x-metamorph" id="thingy"/>' + '<div class="Carousel-item">' + '<img alt="">' + '</div>' + '<div class="Carousel-item">' + '</div>' + '</div>' + '</div>'
		var $template = $(templateHTML)

		$template.suitstrapCarousel()

		strictEqual($template.find('.Carousel-item')[0], $template.find('.is-active')[0], 'first Carousel-item is-active')

		$template.suitstrapCarousel('next')

		strictEqual($template.find('.Carousel-item')[1], $template.find('.is-active')[0], 'second Carousel-item is-active')
	})
})
