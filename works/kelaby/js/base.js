function detectWindow() {
	var ww = $('.wrapper').width();

	if (ww < 650) {
		var	t1 = (ww / 650 * 48 > 32) ? (ww / 650 * 48) : 32,
			t2 = (ww / 650 * 42 > 27) ? (ww / 650 * 42) : 27,
			t3 = (ww / 650 * 40 > 26) ? (ww / 650 * 40) : 26,
		 	t4 = (ww / 650 * 36 > 24) ? (ww / 650 * 36) : 24;
		$('.item_title').css({
			'font-size': t4 + 'px',
			'line-height': t2 + 'px'
		})
		$('.carousel_wrap div p').css({
			'font-size': t3 + 'px',
			'line-height': t1 + 'px'
		});
	} else {
		$('.item_title').css({
			'font-size': 36 + 'px',
			'line-height': 42 + 'px'
		});
		$('.carousel_wrap div p').css({
			'font-size': 40 + 'px',
			'line-height': 48 + 'px'
		});
	};
};

function anchor(i) {
	$('html, body').animate({
		scrollTop: $(i).offset().top - 51
	}, 600);
};

function photoRWD() {
	$('.main_6 .photo').each(function(){
		$(this).height($(this).width() * 0.6875);
	});
}

$(function() {
	$('.m_menu').click(function() {
		$(this).toggleClass('active');
		$('.menufilter').toggle();
		if ($(this).hasClass('active')) {
			$('nav').stop().slideDown();
		} else {
			$('nav').stop().slideUp(400, function() {
				$(this).removeAttr('style')
			});
		};
	});
	$('.menufilter').click(function() {
		$('.m_menu').click();
	});
	detectWindow();
	photoRWD();
});

$(window).resize(function() {
	detectWindow();
	photoRWD();
});

$(window).scroll(function() {
	if ($(this).scrollTop() > $('.main_2').offset().top) {
		$('.header_top').addClass('active');
	} else {
		$('.header_top').removeClass('active');
	}
});