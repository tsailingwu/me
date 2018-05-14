$(function() {
	var	ww = $(window).width(),
		wh = $(window).height(),
		img,
		Limg,
		title,
		text,
		place,
		imgIndex = [];

	$('.giftbox_item>div>div').on('click', function() {
		$('.lightbox_content').removeAttr('style').removeClass('b c d');
		imgIndex = [$(this).parent().index(), $(this).index()];
		img = $(this).find('img').attr('data-src');
		title = $(this).find('img').attr('data-title');
		text = $(this).find('img').attr('data-text');
		place = $(this).find('img').attr('data-place');
		$('.lightbox').addClass('active');
		switch(imgIndex[0]) {
			case 1:
				$('.lightbox_content').addClass('b');
				break;
			case 2:
				$('.lightbox_content').addClass('c');
				break;
			case 3:
				$('.lightbox_content').addClass('d');
				break;
			default:
				break;
		}
		$('.lightbox_img').html('<img src="' + img + '">');
		$('.loading').hide();
		$('.lightbox_content').find('.lightbox_title').html(title);
		$('.lightbox_content').find('.lightbox_text').html(text);
		$('.lightbox_content').find('.lightbox_place span').html(place);
		if (wh - ww < 56) $('.lightbox_close_m').css({'margin-top': '6%'});
	});
	$('.lightbox_arrow_l').on('click', function() {
		if (imgIndex[1] - 1 < 0) {
			imgIndex[1] = $('.giftbox_item>div').eq(imgIndex[0]).children().length - 1;
		} else {
			imgIndex[1]--;
		}
		lightbox_arrow();
	});
	$('.lightbox_arrow_r').on('click', function() {
		if (imgIndex[1] + 1 >= $('.giftbox_item>div').eq(imgIndex[0]).children().length) {
			imgIndex[1] = 0;
		} else {
			imgIndex[1]++;
		}
		lightbox_arrow();
	});
	function lightbox_arrow() {
		$('.lightbox_img').html('<div class="loading"></div>');
		$('.lightbox_img, .lightbox_title, .lightbox_text, .lightbox_place span').html('');
		var img = $('.giftbox_item>div').eq(imgIndex[0]).children().eq(imgIndex[1]).find('img');
		Limg = img.attr('data-src');
		title = img.attr('data-title');
		text = img.attr('data-text');
		place = img.attr('data-place');
		$('.lightbox_img').html('<img src="' + Limg + '">');
		$('.lightbox_content').find('.lightbox_title').html(title);
		$('.lightbox_content').find('.lightbox_text').html(text);
		$('.lightbox_content').find('.lightbox_place span').html(place);
	}
	$('.lightbox_close, .lightbox_close_m').on('click', function() {
		$('.loading').show();
		$('.lightbox_img, .lightbox_title, lightbox_text, .lightbox_place span').html('');
		$('.lightbox').removeClass('active');
	});
	$('.lightbox_mask').on('click', function() {
		$('.lightbox_close').trigger( "click" );
	});
	function resize() {
		if (wh - ww < 56) $('.lightbox_close_m').css({'margin-top': '6%'});
	}
	$(window).on('resize', function() {
		resize();
	});
});