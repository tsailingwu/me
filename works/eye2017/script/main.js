$.fn.touchwipe = function(n) {
	var t = {
		min_move_x: 20,
		min_move_y: 20,
		wipeLeft: function() {},
		wipeRight: function() {},
		wipeUp: function() {},
		wipeDown: function() {},
		preventDefaultEvents: !1
	};
	return n && $.extend(t, n), this.each(function() {
		function r() {
			this.removeEventListener("touchmove", u);
			n = null;
			i = !1
		}
		function u(u) {
			if (t.preventDefaultEvents && u.preventDefault(), i) {
				var s = u.touches[0].pageX,
					h = u.touches[0].pageY,
					e = n - s,
					o = f - h;
				Math.abs(e) >= t.min_move_x ? (r(), e > 0 ? t.wipeLeft() : t.wipeRight()) : Math.abs(o) >= t.min_move_y && (r(), o > 0 ? t.wipeDown() : t.wipeUp())
			}
		}
		function e(t) {
			t.touches.length == 1 && (n = t.touches[0].pageX, f = t.touches[0].pageY, i = !0, this.addEventListener("touchmove", u, !1))
		}
		var n, f, i = !1;
		"ontouchstart" in document.documentElement && this.addEventListener("touchstart", e, !1)
	}), this
};
function anchor(i) {
	if ($('.wrapper').width()>640) {
		$('html, body').animate({
			scrollTop: $(i).offset().top - 80
		}, 600);
	} else {
		$('html, body').animate({
			scrollTop: $(i).offset().top - 40
		}, 600);
	}
	$('.menu').trigger('click');
};
$(function() {
	$('.menu').on('click', function() {
		if (!$('.menu').hasClass('active')) {
			$(this).addClass('active');
			$('nav').fadeIn();
			$('.mask').show();
		} else {
			$(this).removeClass('active');
			$('nav').fadeOut();
			$('.mask').hide();
		}
	});
	$('.mask').on('click', function() {
		$('.menu').trigger('click');
	});
	$('.keyPage').addClass('active');

	var carouselIndex = 1,
		ciWidth = $('.carousel_item').width();
	$('.carousel_arrow_l').on('click', function() {
		carouselIndex--;
		var before = carouselIndex;
		if (carouselIndex <= 0) {
			carouselIndex = 3;
		}
		$(".carousel_dot div").eq(carouselIndex - 1).addClass('active').siblings().removeClass('active');
		$('.carousel_content').stop().animate({
			'left': before * ciWidth* -1
		}, 600, 'swing', function() {
			if (before === 0) {
				$('.carousel_content').css({
					'left': ciWidth* -3
				});
			}
		});
	});
	$('.carousel_arrow_r').on('click', function() {
		carouselIndex++;
		var before = carouselIndex;
		if (carouselIndex >= 4) {
			carouselIndex = 1;
		}
		$(".carousel_dot div").eq(carouselIndex - 1).addClass('active').siblings().removeClass('active');
		$('.carousel_content').stop().animate({
			'left': before * ciWidth* -1
		}, 600, 'swing', function() {
			if (before === 4) {
				$('.carousel_content').css({
					'left': ciWidth* -1
				});
			}
		});
	});
	$(".carousel_dot div").click(function() {
		var beIndex = $(".carousel_dot .active").index(),
			afIndex = $(this).index();
		if (beIndex != afIndex) {
			if (beIndex - afIndex === 1 || beIndex - afIndex === -2) {
				$('.carousel_arrow_l').trigger('click');
			} else {
				$('.carousel_arrow_r').trigger('click');
			}
		}
	});
	function RWD() {
		$('header').width($('.wrapper').width());
	}
	$('.arrow_down_index').on('click', function() {
		$('html, body').animate({
			scrollTop: $(window).scrollTop() + $(window).height()
		}, 800);
		$(this).fadeOut();
		setTimeout(function() {
			if (!windowVisible('.sec02')) {
				$('.arrow_down_index').fadeIn();
			}
		}, 1000);
	});
	$('.sec01').touchwipe({
		wipeRight: function() {
			$(".carousel_arrow_l").click()
		},
		wipeLeft: function() {
			$(".carousel_arrow_r").click()
		}
	});
	// rule
	$('.rule.btn, .nav_rule').on('click', function() {
		$('.rule_mask').show();
		$('section.rule').fadeIn();
		$('body').css('overflow', 'hidden');
	});
	$('.nav_rule').on('click', function() {
		$('.menu').trigger('click');
	});
	$('section.rule .close').on('click', function() {
		$(this).parent().fadeOut(200);
		$('body').removeAttr('style');
		$('.rule_mask').hide();
	});
	$('.rule_mask').on('click', function() {
		$('section.rule .close').trigger('click');
	});
	$('.rule .arrow_down').on('click', function() {
		var sc = $('.scroll_content')[0].scrollHeight;
		$(this).siblings('.scroll_content').animate({
			scrollTop: sc * 0.1
		}, 1000);
	});
	$('.rule .scroll_content').on('scroll', function() {
		$('.rule .arrow_down').fadeOut();
	});
	function windowVisible(o) {
		var windowTop = $(window).scrollTop(),
			windowBottom = windowTop + $(window).height() / 2,
			targetTop = $(o).offset().top,
			targetBottom = targetTop + $(o).height();
		if (windowBottom < targetTop || windowTop > targetBottom) {
			return false;
		} else {
			return true;
		}
	}
	function sec02Animate() {
		if (windowVisible('.sec02')) {
			$('.sec02').addClass('active');
			$('.arrow_down_index').fadeOut();
			$(window).off('scroll');
		}
	}
	$(window).on('resize',function() {
		RWD();
	});
	$(window).on('scroll',function() {
		sec02Animate();
	});
	RWD();
	sec02Animate();
});