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

$.fn.carousel = function(settings) {
	var config = {
		groupA: [3, 2, 1],
		groupB: [800, 480],
		animateSpeed: 800,
		autoplaySpeed: 8000,
		autoplay: false,
		positionDisplay: true,
		arrowDisplay: false
	};

	if (settings) $.extend(config, settings);

	function carouselResize(ww) {
		if (ww >= 800) {
			$('.skill .content, .skills .carousel').css('width', 660);
		} else if (480 <= ww && ww < 800) {
			$('.skill .content, .skills .carousel').css('width', 440);
		} else {
			$('.skill .content, .skills .carousel').css('width', 220);
		};
	};

	var $this = this,
		array = [],
		arrayDiv = $this.find('.carousel_scroll>div'),
		arrayLength = arrayDiv.length,
		$carousel = $this.find('.carousel'),
		$slides = $carousel.find('.carousel_scroll'),
		$position = $carousel.find('.position');

	for (var i = 0; i < arrayLength; ++i) {
		array.push(arrayDiv.eq(i).html());
	};

	function carouselStart(ww) {
		$slides.html(function() {
			var sc = '<div class="carousel_item">';
			for (var i = 0, j = 0; i < arrayLength; ++i) {
				sc += '<div>' + array[i] + '</div>';
				++j;
				if (j == group && i != arrayLength - 1) {
					j = 0;
					sc += '</div><div class="carousel_item">';
				} else if (i == arrayLength - 1) {
					sc += '</div>'
					break;
				};
			};
			return sc;
		});

		var $slide = $slides.children('div'),
			$index = $slide.length - 1,
			$width = $slide.innerWidth();

		$position.html(function() {
			var pc = '';
			for (var i = 0; i <= $index; ++i) {
				pc += '<li></li>';
			};
			return pc;
		});

		if ($index > 0) {
			if (config.positionDisplay) {
				$this.find('.position').show();
			};
			if (config.arrowDisplay) {
				$this.find('.position_prev').show();
				$this.find('.position_next').show();
			};
		} else {
			$this.find('.position').hide();
			$this.find('.position_prev').hide();
			$this.find('.position_next').hide();
		};
		if ($index > 1) {
			$slide.slice($index).clone().prependTo($slides);
			$slide.slice(0, 1).clone().appendTo($slides);
		};

		$slides.css('left', -$width);

		var $numberLi = $position.find('li');
		$numberLi.click(function() {
			var _index = $numberLi.filter('.on').index(),
				$width = $slide.innerWidth();
			$(this).addClass('on').siblings('.on').removeClass('on');
			if ($index > 1) {
				if (_index == $index && $(this).index() == 0) {
					$slides.stop().animate({
						left: $width * (-$index - 2)
					}, config.animateSpeed, function() {
						$slides.css('left', -$width);
					});
				} else if (_index == 0 && $(this).index() == $index) {
					$slides.stop().animate({
						left: 0
					}, config.animateSpeed, function() {
						$slides.css('left', $width * (-$index - 1));
					});
				} else {
					$slides.stop().animate({
						left: $width * ($(this).index() + 1) * -1
					}, config.animateSpeed);
				};
			} else {
				$slides.stop().animate({
					left: $width * ($(this).index()) * -1
				}, config.animateSpeed);
			};
		}).eq(0).click();

		$carousel.find('.position_prev').click(function() {
			var _index = $numberLi.filter('.on').index();
			$numberLi.eq((_index - 1 + $numberLi.length) % $numberLi.length).click();
		});
		$carousel.find('.position_next').click(function() {
			var _index = $numberLi.filter('.on').index();
			$numberLi.eq((_index + 1) % $numberLi.length).click();
		});

		carouselResize(ww);
	};
	var ww = $('.wrapper').width(), //扣除scrollbar width
		group = config.groupA[0],
		_group = group;
	for (var i = 0; i < config.groupB.length; ++i) {
		if (ww < config.groupB[i]) {
			group = config.groupA[i + 1];
		};
	};
	carouselStart(ww);
	$(window).resize(function() {
		ww = $('.wrapper').width();
		_group = config.groupA[0];
		for (var i = 0; i < config.groupB.length; ++i) {
			if (ww < config.groupB[i]) {
				_group = config.groupA[i + 1];
			};
		};
		if (group != _group) {
			group = _group;
			carouselStart(ww);
		}
	});

	if (config.autoplay) {
		var ak = true;
		$(window).scroll(function() {
			if (ak && $(window).scrollTop() >= $this.offset().top) {
				ak = false;
				var $next = $this.find('.position_next'),
					timer = setInterval(function() {
						$next.click();
					}, config.autoplaySpeed);
				$this.hover(function() {
					clearInterval(timer);
				}, function() {
					timer = setInterval(function() {
						$next.click();
					}, config.autoplaySpeed);
				});
			};
		});
	};
};