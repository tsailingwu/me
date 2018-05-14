$(function() {
	function IsPC() {
		if (navigator.userAgent.indexOf("Mobile") > 0) {
			return false; // mobile
		} else {
			return true; // pc
		}
	}
	function HorizontalView() {
		var Horizontal = $(window).width() > $(window).height();

		if (Horizontal) {
			$('.prompt').addClass('active');
			$('body').css('overflow', 'hidden');
		} else {
			$('.prompt').removeClass('active');
			$('body').removeAttr('style');
		}
	};
	$(window).on('resize', function() {
		IsPC() ? '' : HorizontalView();
	});
	IsPC() ? '' : HorizontalView();
});