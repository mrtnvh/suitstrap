// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

	$(function(){

	// IE10 viewport hack for Surface/desktop Windows 8 bug
	//
	// See Getting Started docs for more information
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style");
		msViewportStyle.appendChild(
			document.createTextNode(
				"@-ms-viewport{width:auto!important}"
				)
			);
		document.getElementsByTagName("head")[0].
		appendChild(msViewportStyle);
	}


	var $window = $(window)
	var $body   = $(document.body)

	var navHeight = $('.bs-docs-nav').outerHeight(true) + 10

	$body.scrollspy({
		target: '.bs-sidebar',
		offset: navHeight
	})

	$window.on('load', function () {
		$body.scrollspy('refresh')
	})

	$('.bs-docs-container [href=#]').click(function (e) {
		e.preventDefault()
	})

	// back to top
	setTimeout(function () {
		var $sideBar = $('.bs-sidebar')

		$sideBar.affix({
			offset: {
				top: function () {
					var offsetTop      = $sideBar.offset().top
					var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10)
					var navOuterHeight = $('.bs-docs-nav').height()

					return (this.top = offsetTop - navOuterHeight - sideBarMargin)
				}
				, bottom: function () {
					return (this.bottom = $('.bs-footer').outerHeight(true))
				}
			}
		})
	}, 100)

	setTimeout(function () {
		$('.bs-top').affix()
	}, 100)

	// tooltip demo
	$('.tooltip-demo').tooltip({
		selector: "[data-toggle=tooltip]",
		container: "body"
	})

	$('.tooltip-test').tooltip()
	$('.popover-test').popover()

	$('.bs-docs-navbar').tooltip({
		selector: "a[data-toggle=tooltip]",
		container: ".bs-docs-navbar .nav"
	})

	$('a[href^="#"]').on("click", function(a) {
		a.preventDefault()
		var b = this.hash,
			c = $(b)
		$("html, body").stop().animate({
			scrollTop: c.offset().top - $(".Navbar--fixed--top").height() - 25
		}, 400, "swing", function() {
			window.location.hash = b
		})
	})

	// popover demo
	$("[data-toggle=popover]").popover()

	// button state demo
	$('#fat-button').click(function () {
		var btn = $(this)
		btn.button('loading')
		setTimeout(function () {
			btn.button('reset')
		}, 3000)
	})
})

}(window.jQuery)
