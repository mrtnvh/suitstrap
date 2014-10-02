$(function() {

	module("alert")

	test("should provide no conflict", function() {
		var alert = $.fn.alert.noConflict()
		ok(!$.fn.alert, 'alert was set back to undefined (org value)')
		$.fn.alert = alert
	})

	test("should be defined on jquery object", function() {
		ok($(document.body).alert, 'alert method is defined')
	})

	test("should return element", function() {
		ok($(document.body).alert()[0] == document.body, 'document.body returned')
	})

	test("should fade element out on clicking .Close", function() {
		var alertHTML = '<div class="Alert Alert-message is-warning Animation--fade is-in">' + '<a class="Close" href="#" data-dismiss="alert">×</a>' + '<p><strong>Holy guacamole!</strong> Best check yo self, you\'re not looking too good.</p>' + '</div>',
			alert = $(alertHTML).alert()

		alert.find('.Close').click()

		ok(!alert.hasClass('is-in'), 'remove .is-in class on .Close click')
	})

	test("should remove element when clicking .close", function() {
		$.support.transition = false

		var alertHTML = '<div class="Alert Alert-message is-warning Animation--fade is-in">' + '<a class="Close" href="#" data-dismiss="alert">×</a>' + '<p><strong>Holy guacamole!</strong> Best check yo self, you\'re not looking too good.</p>' + '</div>',
			alert = $(alertHTML).appendTo('#qunit-fixture').alert()

		ok($('#qunit-fixture').find('.Alert-message').length, 'element added to dom')

		alert.find('.Close').click()

		ok(!$('#qunit-fixture').find('.Alert-message').length, 'element removed from dom')
	})

	test("should not fire closed when close is prevented", function() {
		$.support.transition = false
		stop();
		$('<div class="Alert"/>')
			.on('close.bs.alert', function(e) {
				e.preventDefault();
				ok(true);
				start();
			})
			.on('closed.bs.alert', function() {
				ok(false);
			})
			.alert('close')
	})

})
