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
		animateSpeed: 800,
		autoplaySpeed: 5000,
		autoplay: false,
		isGroup: false,
		showNum: false
	};

	if (settings) $.extend(config, settings);

	var $scroll = this.find('.carousel_scroll'),
		$position = this.children('.position'),
		$item = $scroll.children('.carousel_item'),
		$itemLength = $item.length,
		$numberLi,
		_index;

	if ($itemLength > 1) {
		if (!config.isGroup) {
			$item.slice($itemLength - 1).clone().prependTo($scroll);
			$item.slice(0,1).clone().appendTo($scroll);
		} else {
			$item.slice($itemLength - 4, $itemLength).clone().prependTo($scroll);
			$item.slice(0,4).clone().appendTo($scroll);
		}
	}

	function carouselStart(ww) {
		var $index = $itemLength,
			$width = $item.innerWidth(),
			$groupLength = 1;

		$position.html(function() {
			var pc = '';
			for (var i = 0; i < $index; ++i) {
				pc += '<li></li>';
			}
			return pc;
		}).children().eq(0).addClass('on');

		if (config.showNum) {
			$('.carousel_Num').children('.onNum').html(1);
			$('.carousel_Num').children('.sumNum').html($itemLength);
		}

		if (!config.isGroup) {
			$scroll.css('left', -$width);
		} else {
			$scroll.css('left', -$width * 4);
			$groupLength = 4;
		}

		$numberLi = $position.children('li');
		$numberLi.on('click', function() {
			_index = $numberLi.filter('.on').index();
			$('.carousel_Num').children('.onNum').html($(this).index() + 1);
			$(this).addClass('on').siblings('.on').removeClass('on');
			$scroll.stop();

			if ($index > 2) {
				if (_index === $index - 1 && $(this).index() === 0) {
					$scroll.animate({
						left: $width * ($index + $groupLength) * -1
					}, config.animateSpeed, function() {
						$scroll.css('left', -$width * $groupLength);
					});
				} else if (_index === 0 && $(this).index() === $index - 1) {
					$scroll.animate({
						left: $width * ($groupLength - 1) * -1
					}, config.animateSpeed, function() {
						$scroll.css('left', $width * ($index + $groupLength - 1) * -1);
					});
				} else {
					$scroll.animate({
						left: $width * ($(this).index() + $groupLength) * -1
					}, config.animateSpeed);
				}
			} else if ($index === 2) {
				$scroll.animate({
					left: $width * ($(this).index() + $groupLength) * -1
				}, config.animateSpeed);
			}
		});
	};
	var ww = $('.wrapper').width();
	carouselStart(ww);
	this.find('.carousel_arrow_l').click(function() {
		_index = $numberLi.filter('.on').index();
		$numberLi.eq((_index - 1 + $numberLi.length) % $numberLi.length).trigger('click');
	});
	this.find('.carousel_arrow_r').click(function() {
		_index = $numberLi.filter('.on').index();
		$numberLi.eq((_index + 1) % $numberLi.length).trigger('click');
	});
	$(window).on('resize', function() {
		ww = $('.wrapper').width();
		carouselStart(ww);
	});

	var $this = this.parent(),
		$next = $this.find('.carousel_arrow_r'),
		$prew = $this.find('.carousel_arrow_l'),
		timer;
	if (config.autoplay) {
		var ak = true;

		function autoClick() {
			if (ak && $this.hasClass('on')) {
				ak = false;
				timer = setTimeout(function() {
					$next.trigger('click');
					// console.log(new Date().getSeconds() + ': click');
				}, config.autoplaySpeed);
			} else {
				ak = true;
				clearInterval(timer);
				// console.log('clear');
			}
		}
		autoClick();
		// clickEvent
		$next.on('click', function() {
			clearInterval(timer);
			timer = setTimeout(function() {
				$next.trigger('click');
			}, config.autoplaySpeed);
		});
		$('.btnScroll, nav>div').on('click', function() {
			autoClick();
		});
		// MouseScrollEvent
		var _this = document.getElementById('wrapperPage');
		function mouseInit() {
			if (_this.addEventListener) {
				_this.addEventListener("mousewheel", MouseScroll, false);
				_this.addEventListener("DOMMouseScroll", MouseScroll, false);
			}
			else {
				if (_this.attachEvent) {
					_this.attachEvent("onmousewheel", MouseScroll);
				}
			}
		}
		mouseInit();
		function MouseScroll(event) {
			var rolled = 0;
			if ('wheelDelta' in event) {
				rolled = event.wheelDelta;
			}
			else {
				rolled = -40 * 3 * event.detail;
			}
			return scrollMove(rolled);
		}
		function scrollMove(rolled) {
			if (rolled < -50 || rolled > 50) {
				setTimeout(function() {
					autoClick();
				}, 33);
			}
		}
	};
	$this.touchwipe({
		wipeRight: function() {
			$next.trigger('click');
			clearInterval(timer);
			timer = setInterval(function() {
				$next.trigger('click');
			}, config.autoplaySpeed);
		},
		wipeLeft: function() {
			$prew.trigger('click');
			clearInterval(timer);
			timer = setInterval(function() {
				$next.trigger('click');
			}, config.autoplaySpeed);
		}
	});
};
$(function () {
	// loadNum
	paceOptions = {
		elements: true
	};
	function load(time){
		var x = new XMLHttpRequest()
		x.open('GET', "https://tsailingwu.github.io/me/works/2018tokyo/", true);
		x.send();
	};
	Pace.on('hide', function(){
		$('.loading').fadeOut();
		// #secUrl
		var hashUrl = window.location.hash;
		if (hashUrl === '#sec2') {
			pageMove(1);
		} else if (hashUrl === '#sec3') {
			pageMove(2);
		} else if (hashUrl === '#sec4') {
			pageMove(3);
		} else if (hashUrl === '#sec6') {
			pageMove(4);
		}
	});
	range.addEventListener('input', function(){
		document.querySelector('.pace').classList.remove('pace-inactive');
		document.querySelector('.pace').classList.add('pace-active');
		document.querySelector('.pace-progress').setAttribute('data-progress-text', range.value + '%');
		document.querySelector('.pace-progress').setAttribute('style', '-webkit-transform: translate3d(' + range.value + '%, 0px, 0px)');
	});

	var ww = $('.wrapper').width();
	// carousel
	$('.kv .carousel').carousel({
		autoplay: true
	});
	$('.sec2 .carousel').carousel({
		isGroup: true,
		showNum: true
	});

	// page
	var pl_before = $('.page.on').index(),
		pLi;
	function pageMove(i) {
		pl_before = $('.page.on').index();
		pLi = $('.page_position li');
		if (i - pl_before !== 0) {
			p.removeClass('off top bottom');
			pLi.removeClass('on').eq(i).addClass('on');
			$('nav').children().removeClass('on');
			$('.btnScroll').removeClass('on goBack');
			$('nav').children().eq(i).addClass('on');
			if (i - pl_before > 0) {
				p.eq(pl_before).removeClass('on').addClass('off top');
				p.eq(i).addClass('on bottom');
			} else {
				p.eq(pl_before).removeClass('on').addClass('off bottom');
				p.eq(i).addClass('on top');
			}
			switch(i) {
				case 4:
					$('.btnScroll').addClass('goBack');
					break;
				default:
					break;
			}
			if (ww < 960 && i === 4) {
				$('.btnScroll').addClass('mobile');
			} else {
				$('.btnScroll').removeClass('mobile');
			}
		}
	}
	var p = $('.wrapperPage').children('.page'),
		pl = p.length,
		pi = 0,
		pc = '',
		ps = true,
		timer;
	for (var i = 0; i < pl; i++) {
		pc += '<li>' + i + '</li>';
	}
	$('.page_position ul').html(pc).children().eq(pl_before).addClass('on');
	// pl_before - 1 !== -1 ? $('nav').children('div').eq(pl_before - 1).addClass('on'): '';
	$('.page_position li').on('click', function () {
		if (ps) {
			ps = false;
			timer = setTimeout(function () {
				ps = true;
			}, 2000);
			pageMove($(this).index());
		}
	});
	$('nav>div').on('click', function() {
		$('.page_position li').eq($(this).index()).trigger('click');
		if (ww < 960) {
			$('.m_menu').trigger('click');
		}
	});
	$('.btnScroll').on('click', function() {
		pl_before = $('.page.on').index();
		pLi = $('.page_position li');
		pLi.eq((pl_before + 1) % pLi.length).trigger('click');
	});

	// MouseScrollEvent
	var _this = document.getElementById('wrapperPage');
	function mouseInit() {
		if (_this.addEventListener) {
			_this.addEventListener("mousewheel", MouseScroll, false);
			_this.addEventListener("DOMMouseScroll", MouseScroll, false);
		}
		else {
			if (_this.attachEvent) {
				_this.attachEvent("onmousewheel", MouseScroll);
			}
		}
	}
	mouseInit();

	function MouseScroll(event) {
		var rolled = 0;
		if ('wheelDelta' in event) {
			rolled = event.wheelDelta;
		}
		else {
			rolled = -40 * 3 * event.detail;
		}
		return scrollMove(rolled);
	}
	function scrollMove(rolled) {
		pl_before = $('.page.on').index();
		pLi = $('.page_position li');
		if (rolled < -50) {
			pLi.eq((pl_before + 1) % pLi.length).trigger('click');
		} else if (rolled > 50) {
			pLi.eq(((pl_before - 1) % pLi.length != -1) ? (pl_before - 1) % pLi.length: '').trigger('click');
		}
	}
	// Touch
	$('.wrapperPage').on('touchstart', function(e1) {
		var oy = e1.touches[0].pageY,
			dy = 0;
		pl_before = $('.page.on').index();
		pLi = $('.page_position li');
		$(this).on('touchmove', function(e2) {
			dy = e2.touches[0].pageY - oy;
			if ( dy > 100) {
				$(this).off('touchmove');
				pLi.eq((pl_before - 1) % pLi.length).trigger('click');
			} else if ( dy < -100) {
				$(this).off('touchmove');
				pLi.eq((pl_before + 1) % pLi.length).trigger('click');
			}
		});
		$(this).on('touchend', function() {
			$(this).off('touchmove');
		});
	});
	// LightBox
	// lightbox(['secName','secSubName','title'],[['img':'圖片名稱.副檔名'],['text':'文字內容']]);
	var lb = $('.lightbox'),
		ll = '<p>第45回 東京モーターサイクルショー TOKYO MOTORCYCLE SHOW 2018</p><p class="secName"></p><p class="secSubName"></p><article><div class="title"></div><div class="content"><div class="btnBack2"><i class="icon-left"></i>回上一頁</div></div></article>',
		lbc = lb.children('.lightboxContent'),
		lbcc = lbc.find('.content'),
		secName,
		secSubName,
		title,
		cl,
		cr;

	function lightbox(array, item) {
		secName = array[0];
		secSubName = array[1];
		title = array[2];
		lbc.children('.secName').append(secName);
		lbc.children('.secSubName').append(secSubName);
		lbc.find('.title').append(title);

		for (var i = 0, l = item.length; i < l; i++) {
			var c = item[i][1];
			if (item[i][0] === 'img') {
				cl = '<div class="img"><img src="images/';
				cr = '"></div>';
			} else if (item[i][0] === 'text') {
				cl = '<p class="text">';
				cr = '</p>';
			}
			lbcc.append(cl + c + cr);
		}
		$('.wrapper').addClass('on');
	}
	$('.lightbox .close, .lightbox .btnBack2').on('click', function() {
		$('.wrapper').removeClass('on').scrollTop(0);
	})
	// lightbox(['secName','secSubName','title'],[['img','lb_item1.jpg'],['img','lb_item1.jpg'],['img','lb_item2.jpg'],['text','【2017年11月9日，台北訊】「KYMCO Noodoe車聯網」在2016年11月於義大利米蘭車展正式發表，並於今年在美國CES、日本東京、台灣台北、中國北京各地巡迴發表，所到之處皆受到各界高度矚目。KYMCO Noodoe是首創以「人」為出發點設計的車聯網全新體驗，透過旗艦紅牌重機AK 550與各款新機種的上市，截至今年9月，Noodoe App使用者註冊遍及全球75個國家、超過2萬名的顧客成為 「Noodoe」車聯網的愛用者，且共同創造出超過10萬種充滿個人風格與想像力的「Noodoe」個人化作品。<br><br>在各地巡迴發表的同時，KYMCO也從世界各地聽到消費者對於Noodoe車聯網不同功能的期待，其中，最為引頸期盼地莫過於導航功能。雖然目前Noodoe羅盤功能也能提供車主前往目的地的相對方位，但是無法直接導引或指出即將要轉向的路口，因此，導航功能的推出將會讓消費者在使用上更為便利。']]);
	// lightbox(['NEWS','最新消息','引頸期盼的「KYMCO Noodoe Navigation」導航功能即將問世'],[['img','lb_item1.jpg'],['text','【2017年11月9日，台北訊】「KYMCO Noodoe車聯網」在2016年11月於義大利米蘭車展正式發表，並於今年在美國CES、日本東京、台灣台北、中國北京各地巡迴發表，所到之處皆受到各界高度矚目。KYMCO Noodoe是首創以「人」為出發點設計的車聯網全新體驗，透過旗艦紅牌重機AK 550與各款新機種的上市，截至今年9月，Noodoe App使用者註冊遍及全球75個國家、超過2萬名的顧客成為 「Noodoe」車聯網的愛用者，且共同創造出超過10萬種充滿個人風格與想像力的「Noodoe」個人化作品。<br><br>在各地巡迴發表的同時，KYMCO也從世界各地聽到消費者對於Noodoe車聯網不同功能的期待，其中，最為引頸期盼地莫過於導航功能。雖然目前Noodoe羅盤功能也能提供車主前往目的地的相對方位，但是無法直接導引或指出即將要轉向的路口，因此，導航功能的推出將會讓消費者在使用上更為便利。'],['img','lb_item2.jpg'],['text','KYMCO董事長柯勝峯表示：「有鑑於二輪車的駕駛型態完全不同於四輪車，所以，騎乘安全是導航功能設計時最優先的考量；而此次導航升級對二輪機車產業來說，也是業界首創，因為以往每當傳統機車推出新功能時，消費者都必須換新車才能體驗新功能，但現在每一位Noodoe車聯網系統的現有車主，都可以像使用智慧型手機更新功能一般，未來只需透過更新手機上的Noodoe APP應用程式，即可在無須更動任何硬體設備的情況下，升級擁有Noodoe Navigation的強大導航功能。」<br><br>在2017義大利米蘭車展全新發表的XCITING S 400，已率先搭載全球首創專為機車騎士量身打造的機車導航功能–Noodoe Navigation，詳細而完整的導航功能預計將在2018年3月東京車展上向全世界正式發表，敬請所有車迷們拭目以待！']]);

	// Video
	var vp = $('.videoPosition').children('.video');
		iframeL = '<iframe src="',
		srcL = 'https://www.youtube.com/embed/',
		srcR = '?rel=0&autoplay=1',
		iframeR = '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
	function video(id) {
		vp.parent().fadeIn();
		vp.append(iframeL + srcL + id + srcR + iframeR);
	}
	$('.videoPosition .close').on('click', function() {
		vp.parent().fadeOut();
		vp.children().remove();
	});
	// video('1rqG7sPB0_U');

	// m_menu
	$('.m_menu').on('click', function() {
		if (!$('.m_menu').hasClass('active')) {
			$(this).addClass('active').fadeIn();
			$('nav, .m_lang').addClass('active').fadeIn();
		} else {
			$(this).removeClass('active').fadeTo(0);
			$('nav, .m_lang').removeClass('active').fadeOut();
		};
	});
	$(window).on('resize', function() {
		$('.m_menu, nav, .m_lang').removeClass('active');
		$('nav, .m_lang').removeAttr('style');
	});
});