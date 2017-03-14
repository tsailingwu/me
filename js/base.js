$(function (){
	function detectWindow() {
		var ww = $('.wrapper').width(),
			wh = $(window).height(),
			ratio = ww / wh;
			
		console.log(ww);
		console.log(wh);
		console.log($('.wave').width());

		$('.index .title').css('top', (wh - $('.index .title').height()) / 2);
		$('.index').height(wh);
		$('.wave').width(ww * 1.5).height(ww * 1.5);
	}
	detectWindow();
	$(window).resize(function(){
		detectWindow();
	});

	$('.arrow_down').click(function() {
		$('html, body').animate({
			scrollTop: $(window).height()
		}, 800);
	});
});
