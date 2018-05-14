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
$.fn.carousel = function(settings) {
	var config = {
		length: 3
	}
	if (settings) $.extend(config, settings);
	var index = config.length,
		item = this.find('.carousel_scroll>div').length,
		width = $('.wrapper').width()* 0.909375,
		ewidth = width / config.length,
		height = this.parents('.carousel').height();
	this.height(height);
	this.children('.carousel_scroll').height(height);
	this.find('.carousel_scroll>div').width(ewidth);
	this.children('.carousel_scroll').prepend(this.find('.carousel_scroll>div').slice(-3).clone());
	this.children('.carousel_scroll').append(this.find('.carousel_scroll>div').slice(3, 6).clone());
	this.children('.carousel_scroll').css('left', index * ewidth * -1);
	this.children('.carousel_arrow_l').on('click', function() {
		if (index <= 0) {
			index = item;
			$(this).siblings('.carousel_scroll').css('left', index * ewidth * -1);
		}
		index--;
		$(this).siblings('.carousel_scroll').stop().animate({
			'left': index * ewidth * -1
		}, 600);
	});
	this.children('.carousel_arrow_r').on('click', function() {
		if (index >= item) {
			index = 0;
			$(this).siblings('.carousel_scroll').css('left', 0);
		}
		index++;
		$(this).siblings('.carousel_scroll').stop().animate({
			'left': index * ewidth * -1
		}, 600);
	});
	var _this = this;
	this.touchwipe({
		wipeRight: function() {
			_this.children(".carousel_arrow_l").click()
		},
		wipeLeft: function() {
			_this.children(".carousel_arrow_r").click()
		}
	});
}
$(function() {
	// canvas
	var config = {
			hair: 0,
			eye: '0',
			lip: 'a',
			color: '4',
			eyeliner: 'a',
			top: '6',
			acc: [0, 0, 0, 0],
			bg: [0, 0, 0, 0]
		},
		step2 = false,
		eyeTime = 1,
		penTime = 1,
		boxTime = 1,
		img01 = new Image(),
		img02 = new Image(),
		img03 = new Image(),
		img04 = new Image(),
		img05 = new Image(),
		img06 = new Image(),
		img07 = new Image(),
		img08 = new Image(),
		img09 = new Image(),
		img10 = new Image(),
		img11 = new Image(),
		img12 = new Image(),
		img13 = new Image(),
		img14 = new Image(),
		img15 = new Image(),
		img16 = new Image(),
		img17 = new Image(),
		img18 = new Image(),
		img19 = new Image(),
		img20 = new Image(),
		img21 = new Image(),
		img22 = new Image(),
		img23 = new Image(),
		img24 = new Image(),
		time = 1,
		timer,
		c1 = document.getElementById('canvas'),
		c1tx = c1.getContext('2d'),
		c2 = document.getElementById('canvas2'),
		c2tx = c2.getContext('2d'),
		encoder = new GIFEncoder();
	c1.width = 640;
	c1.height = 640;
	c2.width = 640;
	c2.height = 640;
	function drawCanvas(ctx, time, u) {
		if (step2) {
			if (config.bg[0] != 0) {
				if (u) {
					img05.src = 'images/event_canvas/step02/item0'+config.bg[0]+'.png';
				}
				ctx.drawImage(img05, 0, 0);
			}
			if (config.bg[1] != 0) {
				if (u) {
					img06.src = 'images/event_canvas/step02/item1'+config.bg[1]+'.png';
				}
				ctx.drawImage(img06, 0, 0);
			}
			if (config.bg[2] != 0) {
				if (u) {
					img07.src = 'images/event_canvas/step02/item2'+config.bg[2]+'.png';
				}
				ctx.drawImage(img07, 0, 0);
			}
			if (config.bg[3] != 0) {
				if (u) {
					img08.src = 'images/event_canvas/step02/item3'+config.bg[3]+'.png';
				}
				ctx.drawImage(img08, 0, 0);
			}
		}
		if (u) {
			img01.src = 'images/event_canvas/model.png';
			img02.src = 'images/event_canvas/step01/hair0'+config.hair+'.png';
			img10.src = 'images/event_canvas/step02/top0'+config.top+'.png';
		}
		ctx.drawImage(img01, 0, 0);
		ctx.drawImage(img02, 0, 0);
		ctx.drawImage(img10, 0, 0);
		if (step2) {
			if (u) {
				img09.src = 'images/event_canvas/step02/box0'+config.color+'.png';
				img03.src = 'images/event_canvas/step02/box0'+config.color+'_'+config.lip+'.png';
			}
			ctx.drawImage(img09, 0, 0);
			ctx.drawImage(img03, 0, 0);
			if (u) {
				if (time === 9 || time === 10 || time === 13 || time === 14) {
					eyeTime = 2;
				} else {
					eyeTime = 1;
				}
				img04.src = 'images/event_canvas/gif/eye_'+config.eye+'/'+config.eyeliner+eyeTime+'.png';
				ctx.drawImage(img04, 0, 0);
			}
			if (config.acc[0] != 0) {
				if (u) {
					img11.src = 'images/event_canvas/step02/acc'+config.acc[0]+'.png';
				}
				ctx.drawImage(img11, 0, 0);
			}
			if (config.acc[1] != 0) {
				if (u) {
					img12.src = 'images/event_canvas/step02/acc'+config.acc[1]+'.png';
				}
				ctx.drawImage(img12, 0, 0);
			}
			if (config.acc[2] != 0) {
				if (u) {
					img13.src = 'images/event_canvas/step02/acc'+config.acc[2]+'.png';
				}
				ctx.drawImage(img13, 0, 0);
			}
			if (config.acc[3] != 0) {
				if (u) {
					img14.src = 'images/event_canvas/step02/acc'+config.acc[3]+'.png';
				}
				ctx.drawImage(img14, 0, 0);
			}
		} else {
			img03.src = 'images/event_canvas/step01/lip_'+config.lip+'.png';
			ctx.drawImage(img03, 0, 0);
			img04.src = 'images/event_canvas/step01/eye_'+config.eye+'.png';
			ctx.drawImage(img04, 0, 0);
		}
	}
	function canvasStart() {
		c1tx.clearRect(0, 0, 640, 640);
		drawCanvas(c1tx, time, true);
		time++;
		if (time === 17) {
			time = 1;
		}
	}
	timer = setInterval(canvasStart, 100);
	var loader = 0;
	function loaderFun(img) {
		img.src='';
		img.onload = function() {loader++;};
	}
	function exportStart() {
		clearInterval(timer);
		$('.loading').show();
		var today = new Date(),
			m = today.getMonth(),
			d = today.getDate();
		encoder.setRepeat(0);
		encoder.setSize(640, 640);
		encoder.setQuality(20);
		encoder.start();
		time = 1;
		c2tx.fillStyle = "rgb(255,255,255)";
		loaderFun(img01);
		img01.src = 'images/event_canvas/model.png';
		loaderFun(img02);
		img02.src = 'images/event_canvas/step01/hair0'+config.hair+'.png';
		loaderFun(img03);
		img03.src = 'images/event_canvas/step02/box0'+config.color+'_'+config.lip+'.png';
		if (config.bg[0] != 0) {
			loaderFun(img05);
			img05.src = 'images/event_canvas/step02/item0'+config.bg[0]+'.png';
		} else {
			loader++;
		}
		if (config.bg[1] != 0) {
			loaderFun(img06);
			img06.src = 'images/event_canvas/step02/item1'+config.bg[1]+'.png';
		} else {
			loader++;
		}
		if (config.bg[2] != 0) {
			loaderFun(img07);
			img07.src = 'images/event_canvas/step02/item2'+config.bg[2]+'.png';
		} else {
			loader++;
		}
		if (config.bg[3] != 0) {
			loaderFun(img08);
			img08.src = 'images/event_canvas/step02/item3'+config.bg[3]+'.png';
		} else {
			loader++;
		}
		loaderFun(img09);
		img09.src = 'images/event_canvas/step02/box0'+config.color+'.png';
		loaderFun(img10);
		img10.src = 'images/event_canvas/step02/top0'+config.top+'.png';
		if (config.acc[0] != 0) {
			loaderFun(img11);
			img11.src = 'images/event_canvas/step02/acc'+config.acc[0]+'.png';
		} else {
			loader++;
		}
		if (config.acc[1] != 0) {
			loaderFun(img12);
			img12.src = 'images/event_canvas/step02/acc'+config.acc[1]+'.png';
		} else {
			loader++;
		}
		if (config.acc[2] != 0) {
			loaderFun(img13);
			img13.src = 'images/event_canvas/step02/acc'+config.acc[2]+'.png';
		} else {
			loader++;
		}
		if (config.acc[3] != 0) {
			loaderFun(img14);
			img14.src = 'images/event_canvas/step02/acc'+config.acc[3]+'.png';
		} else {
			loader++;
		}
		loaderFun(img15);
		img15.src = 'images/event_canvas/bg.gif';
		loaderFun(img16);
		img16.src = 'images/event_canvas/pen_text_'+config.eyeliner+'.png';
		loaderFun(img17);
		img17.src = 'images/event_canvas/box_text0'+config.color+'.png';
		loaderFun(img19);
		img19.src = 'images/event_canvas/bg_gem.gif';
		loaderFun(img21);
		if (m === 8) {
			img21.src = 'images/event_canvas/date/m/sep.png';
		} else if (m === 9) {
			img21.src = 'images/event_canvas/date/m/oct.png';
		} else if (m === 10) {
			img21.src = 'images/event_canvas/date/m/nov.png';
		} else {
			img21.src = 'images/event_canvas/date/m/aug.png';
		}
		loaderFun(img22);
		if (d < 10) {
			img22.src = 'images/event_canvas/date/d/0ten.png';
		} else if (9 < d && d < 20) {
			img22.src = 'images/event_canvas/date/d/10.png';
		} else if (19 < d && d < 30) {
			img22.src = 'images/event_canvas/date/d/20.png';
		} else {
			img22.src = 'images/event_canvas/date/d/30.png';
		}
		loaderFun(img23);
		if (d < 10) {
			img23.src = 'images/event_canvas/date/d/'+d+'.png';
		} else {
			img23.src = 'images/event_canvas/date/d/'+d.toString().slice(1)+'.png';
		}
		drawGifStart();
	}
	function drawGifStart() {
		if (loader === 20) {
			drawGif();
		} else {
			setTimeout(drawGifStart, 50);
		}
	}
	var loader2 = 0;
	img18.onload = function() { loader2++; };
	img20.onload = function() { loader2++; };
	img24.onload = function() { loader2++; };
	function drawGif() {
		c2tx.fillRect(0, 0, 640, 640);
		c2tx.drawImage(img15, 0, 0);
		drawCanvas(c2tx, time, false);
		c2tx.drawImage(img16, 0, 0);
		c2tx.drawImage(img17, 0, 0);
		c2tx.drawImage(img19, 0, 0);
		c2tx.drawImage(img21, 0, 0);
		c2tx.drawImage(img22, 0, 0);
		c2tx.drawImage(img23, 0, 0);
		if (time === 8 || time === 10) {
			eyeTime = 2;
		} else {
			eyeTime = 1;
		}
		img04.src = 'images/event_canvas/gif/eye_'+config.eye+'/'+config.eyeliner+eyeTime+'.png';
		if (time === 1) {
			penTime = 1;
		} else if (time === 2) {
			penTime = 2;
		} else if (time === 3) {
			penTime = 3;
		} else if (time === 4) {
			penTime = 4;
		} else if (time === 5) {
			penTime = 5;
		} else {
			penTime = 6;
		}
		if (time === 10 || time === 12) {
			boxTime = 2;
		} else {
			boxTime = 1;
		}
		img18.src = '';
		img20.src = '';
		img24.src = '';
		loader2 = 0;
		img18.src = 'images/event_canvas/gif/box0'+config.color+'/0'+boxTime+'.png';
		img20.src = 'images/event_canvas/gif/pen_'+config.eyeliner+'/0'+penTime+'.png';
		img24.src = 'images/event_canvas/gif/eye_'+config.eye+'/'+config.eyeliner+eyeTime+'.png';
		drawGifStart2();
		function drawGifStart2() {
			if (loader2 >= 3) {
				c2tx.drawImage(img18, 0, 0);
				c2tx.drawImage(img20, 0, 0);
				c2tx.drawImage(img24, 0, 0);
				if (time === 13) {
					encoder.finish();
					encoder.download("download.gif");
				} else {
					if (time === 6) {
						encoder.setDelay(300);
					} else if (6 < time && time < 10) {
						encoder.setDelay(200);
					} else {
						encoder.setDelay(100);
					}
					encoder.addFrame(c2tx);
					$('.loading span').html(3+time*8+'%');
					time++;
					drawGif();
				}
			} else {
				setTimeout(drawGifStart2, 50);
			}
		}
	}
	// group
	$('.select01 .sort').on('click', function() {
		if (this.hasAttribute('data-sort')) {
			$('.previewArea .p3').addClass('active').siblings().removeClass('active');
		} else {
			$('.previewArea .text').removeClass('active');
		}
		$(this).addClass('active').siblings('.sort').removeClass('active');
		$(this).parent().siblings('.carousel').children().removeClass('active').eq($(this).index() - 1).addClass('active');
	});
	$('.select02 .sort').on('click', function() {
		if (this.hasAttribute('data-sort')) {
			if ($(this).attr('data-sort') === '1') {
				$('.previewArea .p1').addClass('active').siblings().removeClass('active');
			} else {
				$('.previewArea .p2_'+config.color).addClass('active').siblings().removeClass('active');
			}
		} else {
			$('.previewArea .text').removeClass('active');
		}
		$(this).addClass('active').siblings('.sort').removeClass('active');
		$(this).parent().siblings('.carousel').children().removeClass('active').eq($(this).index()).addClass('active');
	});
	// rule
	$('.rule.btn').on('click', function() {
		$('.rule_mask').show();
		$('section.rule').fadeIn();
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
	// start btn, back btn
	$('.select01 .back').on('click', function() {
		$('.wrapper').children().each(function() {
			if ($(this).index() === 0) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	});
	var carousel_switch = true;
	$('.step00 .start').on('click', function() {
		$('.wrapper').children().each(function() {
			if ($(this).index() === 1) {
				$(this).show();
				$('.canvas').css({
					'top': $('.previewArea').height() - $('.previewArea').width() * 1.1640625,
					'left': $('.previewArea').width() * -0.08203125
				});
				if (carousel_switch) {
					carousel_switch = false;
					// carousel
					$('.carousel_content').each(function() {
						$(this).carousel();
					});
					// item
					$('.item').on('click', function() {
						var value = $(this).attr('data-value'),
							key = $(this).parents('.carousel_config').attr('id');
						if (this.hasAttribute('data-text')) {
							$('.previewArea .'+$(this).attr('data-text')).addClass('active').siblings().removeClass('active');
						} else {
							$('.previewArea .text').removeClass('active');
						}
						if (this.hasAttribute('data-group')) {
							if ($(this).attr('data-group') === 'none') {
								config[key] = [0, 0, 0, 0];
								$(this).siblings().removeClass('active');
							} else {
								var group = $(this).attr('data-group');
								if ($(this).hasClass('active')) {
									config[key][group] = 0;
									$(this).removeClass('active');
									$(this).siblings('[data-group=' + $(this).attr('data-group') + ']').removeClass('active');
								} else {
									config[key][group] = value;
									$(this).addClass('active');
									$(this).siblings('[data-group=' + $(this).attr('data-group') + ']').each(function() {
										if ($(this).attr('data-value') === value) {
											$(this).addClass('active');
										} else {
											$(this).removeClass('active');
										}
									});
								}
							}
						} else {
							config[key] = value;
							$(this).addClass('active');
							$(this).siblings().each(function() {
								if ($(this).attr('data-value') === value) {
									$(this).addClass('active');
								} else {
									$(this).removeClass('active');
								}
							});
						}
					});
				}
			} else {
				$(this).hide();
			}
		});
	});
	$('.select01 .next').on('click', function() {
		$('.select01').removeClass('active');
		$('.select02').addClass('active');
		$('.previewArea .text').removeClass('active2');
		step2 = true;
		if (config.eye === '0') config.eye = 'a';
		if (config.hair === 0) config.hair = '1';
	});
	$('.select02 .back').on('click', function() {
		$('.select01').addClass('active');
		$('.select02').removeClass('active');
		$('.previewArea .text').removeClass('active2');
		step2 = false;
	});
	$('.select02 .next').on('click', function() {
		exportStart();
		$('.select02 .next').off('click');
	});
});