// $(document).ready(function(){
//    $('.scrollbar-macosx').scrollbar();
// });
function anchor(i) {
	$('html, body').animate({
		scrollTop: $(i).offset().top
	}, 600);
};
$(function() {
	function detectWindow() {
		var ww = $('.wrapper').width(),
			wh = $(window).height(),
			ratio = ww / wh;
		$('.index .title').css('top', (wh - $('.index .title').height()) / 2);
		$('.index').height(wh);
		$('.wave').width(ww * 1.5).height(ww * 1.5);
		if (ww < 650) {
			var	t1 = (ww / 650 * 28 > 22) ? (ww / 650 * 28) : 22;
			$('.c_title').css({
				'font': t1 + 'px'
			});
			if (ww > 430) {
				$('.c_title h2:last-child a').css(
					'width', $('.c_title h2').width() - 155 + 'px'
				);
			} else {
				$('.c_title h2:last-child a').removeAttr('style');
			}
		} else {
			$('.c_title').css({
				'font': 28 + 'px',
				'line-height': 34 + 'px'
			});
			$('.c_title h2:last-child a').removeAttr('style');
		};
	}
	function photoRWD() {
		$('.photo').each(function(){
			$(this).height($(this).width() * 0.51);
		});
	};
	detectWindow();
	photoRWD();
	var mn = true;
	$('.m_menu').click(function() {
		$('.m_menu>div').toggleClass('active');
		$('.menufilter').toggle();
		mn = !mn;
		if (mn) {
			$('nav').slideUp(400, function() {
				$(this).removeAttr('style')
			});
		} else {
			$('nav').slideDown();
		};
	});
	$('.menufilter').click(function() {
		$('.m_menu').click();
	});
	$('.arrow_down').click(function() {
		$('html, body').animate({
			scrollTop: $(window).height()
		}, 800);
	});
	$(window).resize(function() {
		detectWindow();
		photoRWD();
	});
	function windowVisible(o) {
		var windowTop = $(window).scrollTop(),
			windowBottom = windowTop + $(window).height(),
			targetTop = $(o).offset().top,
			targetBottom = targetTop + $(o).height();
		if (windowBottom <= targetTop || windowTop >= targetBottom) {
			return false;
		} else {
			return true;
		}
	}
	$(window).scroll(function() {
		if (windowVisible('.skill')) {
			if (!$('.skill').hasClass('active')) {
				$('.skill').addClass('active');
				$('.skills canvas').each(function() {
					$(this).skills($(this).attr('data-name'), $(this).attr('data-number'));
				});
			}
		} else {
			$('.skill').removeClass('active');
			$('.skills canvas').each(function() {
				$(this).clone().appendTo($(this).parent());
				$(this).remove();
			});
		}
	});
});
$.fn.skills = function(name, number, settings) {
	var config = {
		size: 200,
		barWidth: 10,
		duration: 2000
	};
	if (settings) $.extend(config, settings);
	var c = this[0],
		ctx = c.getContext("2d"),
		r = config.size / 2,
		startPosition = - Math.PI / 2,
		endPosition,
		keyFrame,
		time = 0,
		timer;
	c.width = config.size;
	c.height = config.size;
	var grd = ctx.createLinearGradient(config.size, 0, 0, config.size);
	grd.addColorStop(0, '#fddb92');
	grd.addColorStop(1, '#d1fdff');
	function startDraw() {
		time += 33;
		keyFrame = time / config.duration > 1 ? 1 : time / config.duration;
		endPosition = Math.PI * number / 50 * keyFrame  - Math.PI / 2;
		ctx.clearRect(0, 0, config.size, config.size);
		ctx.fillStyle = grd;
		ctx.globalAlpha = 0.3;
		ctx.beginPath();
		ctx.arc(r, r, r, 0, 2 * Math.PI);
		ctx.arc(r, r, r - config.barWidth, 2 * Math.PI, 0, true);
		ctx.fill();
		ctx.closePath();
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.arc(r, r, r, startPosition, endPosition);
		ctx.arc(r, r, r - config.barWidth, endPosition, startPosition, true);
		ctx.fill();
		ctx.closePath();
		ctx.fillStyle = '#8b8788';
		ctx.font = '32px Quicksand';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(number + '%', r, r - 20);
		ctx.fillText(name, r, r + 20);
		if (time > config.duration) {
			clearInterval(timer);
		}
	}
	timer = setInterval(startDraw, 33);
};