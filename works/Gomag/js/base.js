function detectWindow() {
	var ww = $('.wrapper').width(),
		wh = $(window).height(),
		ratio = ww / wh;

	if (ww > 800) {
		$('.menu a').removeClass('active');
	};

	if (ww < 650) {
		var t1 = (ww / 650 * 40 > 26) ? (ww / 650 * 40) : 26,
			t2 = (ww / 650 * 28 > 20) ? (ww / 650 * 28) : 20,
			t3 = (ww / 650 * 24 > 18) ? (ww / 650 * 24) : 18;
		$('.p1 .title p').eq(0).css({
			'font-size': t1 + 'px'
		});
		$('.p1 .title p').eq(1).css({
			'font-size': t1 + 'px'
		});
		$('.p1 .title p').eq(-1).css({
			'font-size': t3 + 'px',
			'line-height': t2 + 'px'
		});
	} else {
		$('.p1 .title p').eq(0).css({
			'font-size': 40 + 'px'
		});
		$('.p1 .title p').eq(1).css({
			'font-size': 40 + 'px'
		});
		$('.p1 .title p').eq(-1).css({
			'font-size': 24 + 'px',
			'line-height': 28 + 'px'
		});
	};
};

$(window).resize(function() {
	detectWindow();
});

$(function() {
	detectWindow();
	$('.m_menu').click(function() {
		$(this).toggleClass('active');
		$('.menu').toggleClass('active');
		$('.menufilter').toggle();
	});
	$('.menu a').click(function() {
		if ($(this).attr('class') != 'active') {
			$(this).addClass('active');
			$(this).siblings('.submenu, .submenu_s').slideDown(400, 'linear');
		} else {
			$(this).removeClass('active');
			$(this).siblings('.submenu, .submenu_s').slideUp(400, 'linear', function(){
				$(this).removeAttr('style');
				// $(this).find('.active').removeClass('active').siblings().slideUp(400, 'linear', function(){
				// 	$(this).removeAttr('style');
				// });
				$(this).find('.active').each(function(){
					$(this).removeClass('active').siblings('.submenu_s').slideUp(400, 'linear', function(){
						$(this).removeAttr('style');
					});
				});
			});
		};
	});
	$('.menufilter').click(function() {
		$('.m_menu').click();
	});
});