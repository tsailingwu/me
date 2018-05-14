var pxd = navigator.userAgent.toLowerCase().indexOf('mobile') > -1 ? 3: 1;
$.fn.line = function (settings) {
	var ww = $('.wrapper').width() + getScrollbarWidth();
	function getScrollbarWidth() {
		var outer = document.createElement("div"),
			widthNoScroll = outer.offsetWidth,
			inner = document.createElement("div"),
			widthWithScroll = inner.offsetWidth;
		outer.style.visibility = "hidden";
		outer.style.width = "100px";
		document.body.appendChild(outer);
		outer.style.overflow = "scroll";
		inner.style.width = "100%";
		outer.appendChild(inner);
		outer.parentNode.removeChild(outer);
		return widthNoScroll - widthWithScroll;
	}
	function numHandler2(n) {
		if (n < 100) {
			return Math.round(n)
		} else {
			return Math.floor(n/100)/10 + 'K'
		}
	}
	function addZero(v) {
		return v < 10 ? '0' + v : v;
	}
	function timeCal2(v) {
		return Math.floor(v / 3600) + ':' + addZero(Math.floor(v % 3600 / 60));
	}
	function timeCal4(v) {
		return Math.floor(v / 3600) + ':' + addZero(Math.floor(v % 3600 / 60)) + ':' + addZero(Math.floor(v % 60));
	}
	function xAxisSort() {
		config.data = config.data.sort(function (a, b) {
			return a[0] > b[0] ? 1 : -1;
		});
	}
	function filterRange(s) {
		config.xRange[3] = config.xRange[0] + config.xRange[2] * s[0];
		config.xRange[4] = config.xRange[0] + config.xRange[2] * s[1];
		config.xRange[5] = config.xRange[4] - config.xRange[3];
		for (var i = 0, l = config.data.length; i < l; i++) {
			if (config.xRange[3] <= config.data[i][0]) {
				if (config.xRange[4] < config.data[i][0]) {
					break;
				} else if (yFilterMax === undefined) {
					yFilterMax = yFilterMin = config.data[i][1];
				} else {
					yFilterMax = Math.max(yFilterMax, config.data[i][1]);
					yFilterMin = Math.min(yFilterMin, config.data[i][1]);
				}
			}
		}
		config.yRange[3] = yFilterMin;
		config.yRange[4] = yFilterMax;
		config.yRange[5] = yFilterMax - yFilterMin;
	}
	function xPosition(x) {
		return chartOrigin[0] + xWidth * (x - config.xRange[3]) / config.xRange[5];
	}
	function yPosition(y) {
		return chartOrigin[1] - yHeight * (y - config.yRange[3]) / config.yRange[5];
	}
	function XtoY(v) {
		var v2;
		for (var i = 0, l = config.data.length; i < l; i++) {
			if (v >= config.data[i][0]) {
				v2 = i
			} else {
				break;
			}
		}
		var v3 = v2 + 1,
			v2x = config.data[v2][0],
			v2y = config.data[v2][1],
			v3x = config.data[v3][0],
			v3y = config.data[v3][1];
		return (v - v2x) / (v3x - v2x) * (v3y - v2y) + v2y;
	}
	function YtoX(v) {
		var v2;
		for (var i = 0, l = config.data.length; i < l; i++) {
			if (v >= config.data[i][1]) {
				v2 = i
			} else {
				break;
			}
		}
		var v3 = v2 + 1,
			v2x = config.data[v2][0],
			v2y = config.data[v2][1],
			v3x = config.data[v3][0],
			v3y = config.data[v3][1];
		return (v - v2y) / (v3y - v2y) * (v3x - v2x) + v2x;
	}
	function drawChart() {
		// tooltip
		ctx.font = (ww < 541 ? 14 * pxd: 17 * pxd) + 'px Microsoft JhengHei';
		ctx.textBaseline = 'middle';
		if(config.tt) {
			ctx.fillStyle = '#c48c5b';
			ctx.beginPath();
			ttX = xPosition(YtoX(config.tt));
			ctx.textAlign = 'center';
			if (config.tt > config.yRange[3] + config.yRange[5] / 2) {
				ttY = yPosition(config.tt);
				// tooltip point
				ctx.beginPath();
				ctx.arc(ttX, ttY, config.pointWidth, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fill();
				// tooltip main
				ctx.fillStyle = '#1b1b1b';
				ww < 431 ? ttY += 60 * pxd: ttY += 35 * pxd;
				if (ttX + config.ttWidth / 2 > c.width) {
					ttR = c.width - config.ttArrowWidth / 2 - config.ttBorderRadius - ttX;
					ttL = config.ttWidth - config.ttArrowWidth / 2 - config.ttBorderRadius - c.width + ttX;
				} else {
					ttR = config.ttWidth / 2 - config.ttArrowWidth / 2 - config.ttBorderRadius;
					ttL = config.ttWidth / 2 - config.ttArrowWidth / 2 - config.ttBorderRadius;
				}
				ctx.beginPath();
				ctx.moveTo(ttX, ttY);
				ctx.lineTo(ttX + config.ttArrowWidth / 2, ttY + config.ttArrowHeight);
				ctx.lineTo(ttX + config.ttArrowWidth / 2 + ttR, ttY + config.ttArrowHeight);
				ctx.quadraticCurveTo(ttX + config.ttArrowWidth / 2 + ttR + config.ttBorderRadius, ttY + config.ttArrowHeight, ttX + config.ttArrowWidth / 2 + ttR + config.ttBorderRadius, ttY + config.ttArrowHeight + config.ttBorderRadius);
				ctx.lineTo(ttX + config.ttArrowWidth / 2 + ttR + config.ttBorderRadius, ttY + config.ttArrowHeight + config.ttHeight - config.ttBorderRadius);
				ctx.quadraticCurveTo(ttX + config.ttArrowWidth / 2 + ttR + config.ttBorderRadius, ttY + config.ttArrowHeight + config.ttHeight, ttX + config.ttArrowWidth / 2 + ttR, ttY + config.ttArrowHeight + config.ttHeight);
				ctx.lineTo(ttX - config.ttArrowWidth / 2 - ttL, ttY + config.ttArrowHeight + config.ttHeight);
				ctx.quadraticCurveTo(ttX - config.ttArrowWidth / 2 - ttL - config.ttBorderRadius, ttY + config.ttArrowHeight + config.ttHeight, ttX - config.ttArrowWidth / 2 - ttL - config.ttBorderRadius, ttY + config.ttArrowHeight + config.ttHeight - config.ttBorderRadius);
				ctx.lineTo(ttX - config.ttArrowWidth / 2 - ttL - config.ttBorderRadius, ttY + config.ttArrowHeight + config.ttBorderRadius);
				ctx.quadraticCurveTo(ttX - config.ttArrowWidth / 2 - ttL - config.ttBorderRadius, ttY + config.ttArrowHeight, ttX - config.ttArrowWidth / 2 - ttL, ttY + config.ttArrowHeight);
				ctx.lineTo(ttX - config.ttArrowWidth / 2, ttY + config.ttArrowHeight);
				ctx.closePath();
				ctx.fill();
				// tooltip text
				ctx.fillStyle = '#fff';
				if (ttX + config.ttWidth / 2 > c.width) {
					ttX = config.width - config.ttWidth/2;
				}
				ctx.fillText('累計訂單數', ttX, ttY + (ww < 431 ? 25 * pxd: 28 * pxd));
				ctx.fillText('突破' + config.tt + '大關', ttX, ttY + (ww < 431 ? 44 * pxd: 50 * pxd));
			} else {
				ttY = yPosition(config.tt);
				// tooltip point
				ctx.beginPath();
				ctx.arc(ttX, ttY, config.pointWidth, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fill();
				// tooltip main
				ctx.fillStyle = '#1b1b1b';
				ww < 431 ? ttY -= 60 * pxd: ttY -= 35 * pxd;
				if (ttX - config.ttWidth / 2 < config.yAxisWidth - 18 * pxd) {
					ttR = config.ttWidth - config.ttArrowWidth / 2 - config.ttBorderRadius + config.yAxisWidth - 18 * pxd - ttX;
					ttL = ttX - config.ttArrowWidth / 2 - config.ttBorderRadius - config.yAxisWidth + 18 * pxd;
				} else {
					ttR = config.ttWidth / 2 - config.ttArrowWidth / 2 - config.ttBorderRadius;
					ttL = config.ttWidth / 2 - config.ttArrowWidth / 2 - config.ttBorderRadius;
				}
				ctx.beginPath();
				ctx.moveTo(ttX, ttY);
				ctx.lineTo(ttX + config.ttArrowWidth / 2, ttY - config.ttArrowHeight);
				ctx.lineTo(ttX + config.ttArrowWidth / 2 + ttR, ttY - config.ttArrowHeight);
				ctx.quadraticCurveTo(ttX + config.ttArrowWidth / 2 + ttR + config.ttBorderRadius, ttY - config.ttArrowHeight, ttX + config.ttArrowWidth / 2 + ttR + config.ttBorderRadius, ttY - config.ttArrowHeight - config.ttBorderRadius);
				ctx.lineTo(ttX + config.ttArrowWidth / 2 + ttR + config.ttBorderRadius, ttY - config.ttArrowHeight - config.ttHeight + config.ttBorderRadius);
				ctx.quadraticCurveTo(ttX + config.ttArrowWidth / 2 + ttR + config.ttBorderRadius, ttY - config.ttArrowHeight - config.ttHeight, ttX + config.ttArrowWidth / 2 + ttR, ttY - config.ttArrowHeight - config.ttHeight);
				ctx.lineTo(ttX - config.ttArrowWidth / 2 - ttL, ttY - config.ttArrowHeight - config.ttHeight);
				ctx.quadraticCurveTo(ttX - config.ttArrowWidth / 2 - ttL - config.ttBorderRadius, ttY - config.ttArrowHeight - config.ttHeight, ttX - config.ttArrowWidth / 2 - ttL - config.ttBorderRadius, ttY - config.ttArrowHeight - config.ttHeight + config.ttBorderRadius);
				ctx.lineTo(ttX - config.ttArrowWidth / 2 - ttL - config.ttBorderRadius, ttY - config.ttArrowHeight - config.ttBorderRadius);
				ctx.quadraticCurveTo(ttX - config.ttArrowWidth / 2 - ttL - config.ttBorderRadius, ttY - config.ttArrowHeight, ttX - config.ttArrowWidth / 2 - ttL, ttY - config.ttArrowHeight);
				ctx.lineTo(ttX - config.ttArrowWidth / 2, ttY - config.ttArrowHeight);
				ctx.closePath();
				ctx.fill();
				// tooltip text
				ctx.fillStyle = '#fff';
				if (ttX - config.ttWidth / 2 < config.yAxisWidth - 18 * pxd) {
					ttX = config.yAxisWidth - 18 * pxd + config.ttWidth / 2;
				}
				ctx.fillText('累計訂單數', ttX, ttY - (ww < 431 ? 40 * pxd: 49 * pxd));
				ctx.fillText('突破' + config.tt + '大關', ttX, ttY - (ww < 431 ? 21 * pxd: 27 * pxd));
			}
		}
		// text
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'end';
		ctx.font = 18 * pxd + 'px Microsoft JhengHei';
		ctx.fillText('累積訂單數', xWidth + config.yAxisWidth, config.marginTop / 2);
		// main
		ctx.strokeStyle = '#c48c5b';
		ctx.beginPath();
		var chartStart = true;
		for (var i = 0, l = config.data.length; i < l; i++) {
			if (config.xRange[3] <= config.data[i][0]) {
				if (config.xRange[4] < config.data[i][0]) {
					break;
				} else if (chartStart) {
					chartStart = false;
					ctx.moveTo(xPosition(config.data[i][0]), yPosition(config.data[i][1]));
				} else {
					ctx.lineTo(xPosition(config.data[i][0]), yPosition(config.data[i][1]));
				}
			}
		}
		ctx.stroke();
		// axis
		ctx.strokeStyle = '#fff';
		ctx.beginPath();
		ctx.moveTo(1, config.marginTop);
		ctx.lineTo(1, yHeight + config.marginTop + 10 * pxd);
		ctx.lineTo(xWidth + config.yAxisWidth + 18 * pxd, yHeight + config.marginTop + 10 * pxd);
		ctx.stroke();
		// yAxis text
		ctx.font = 14 * pxd + 'px Microsoft JhengHei';
		ctx.textAlign = 'start';
		if (config.yRange[4] > 100) {
			ctx.fillText(numHandler2(config.yRange[4] * 0.05), 5 * pxd, yPosition(config.yRange[4] * 0.05));
			ctx.fillText(numHandler2(config.yRange[4] * 0.5), 5 * pxd, yPosition(config.yRange[4] * 0.5));
		}
		ctx.fillText(numHandler2(config.yRange[4]), 5 * pxd, yPosition(config.yRange[4] * 0.98));
		// xAxis text & mainPont
		ctx.textAlign = 'center';
		ctx.beginPath();
		if (config.xRange[5] < 600) {
			config.xSplit = 1;
		}
		for (var i = 0, l = config.xSplit; i <= l; i++) {
			var t = config.xRange[3] + config.xRange[5] * i / l,
				y;
			ctx.fillStyle = '#fff';
			if (config.xRange[5] < 600) {
				ctx.fillText(timeCal4(t), xPosition(t) - 10 * pxd, yHeight + config.marginTop + 24 * pxd);
			} else {
				ctx.fillText(timeCal2(t), xPosition(t), yHeight + config.marginTop + 24 * pxd);
			}
			ctx.fillStyle = '#c48c5b';
			ctx.beginPath();
			if (i == 0) {
				y = config.data[0][1];
			} else if (i == l) {
				y = config.data[config.data.length-1][1];
			} else {
				y = XtoY(t);
			}
			ctx.arc(xPosition(t), yPosition(y), config.pointWidth, 0, 2 * Math.PI);
			ctx.fill();
		}
	}
	var config = $.extend({
			data: [],
			width: $(this).width(),
			height: $(this).height(),
			marginTop: 30 * pxd,
			marginRight: 18 * pxd,
			xAxisWidth: 30 * pxd,
			yAxisWidth: 54 * pxd,
			yAxisPosition: 'left',
			xRange: [39600], // [Min, Max, Diff, filterMin, filterMax, filterDiff]
			yRange: [0], // [Min, Max, Diff, filterMin, filterMax, filterDiff]
			select: [0, 1], // [left, right, Diff]
			xAxisSort: false,
			xSplit: ww < 431 ? 5: 10,
			pointWidth: 5 * pxd,
			tt: false,
			ttWidth: ww < 431 ? 110 * pxd: 134 * pxd,
			ttHeight: ww < 431 ? 50 * pxd: 63 * pxd,
			ttArrowWidth: 10 * pxd,
			ttArrowHeight: 7 * pxd,
			ttBorderRadius: 3 * pxd
		}, settings),
		c = this[0],
		ctx = c.getContext('2d'),
		xWidth = config.width - config.yAxisWidth - config.marginRight,
		yHeight = config.height - config.xAxisWidth - config.marginTop,
		xMax = xMin = config.data[0][0],
		yMax = yMin = config.data[0][1],
		yFilterMax,
		yFilterMin,
		chartOrigin = [config.yAxisWidth, yHeight + config.marginTop],
		ttX,
		ttY,
		ttL,
		ttR;
	c.width = config.width;
	c.height = config.height;
	if (config.xRange[0] != undefined) {xMin = false;}
	if (config.xRange[1] != undefined) {xMax = false;}
	if (config.yRange[0] != undefined) {yMin = false;}
	if (config.yRange[1] != undefined) {yMax = false;}
	for (var i = 1, l = config.data.length; i < l; i++) {
		var x = config.data[i][0],
			y = config.data[i][1];
		if (xMin) xMin = Math.min(xMin, x);
		if (xMax) xMax = Math.max(xMax, x);
		if (yMin) yMin = Math.min(yMin, y);
		if (yMax) yMax = Math.max(yMax, y);
	}
	if (xMin) config.xRange[0] = xMin;
	if (xMax) config.xRange[1] = xMax;
	if (yMin) config.yRange[0] = yMin;
	if (yMax) config.yRange[1] = yMax;
	config.xRange[2] = config.xRange[1] - config.xRange[0];
	config.yRange[2] = config.yRange[1] - config.yRange[0];
	if (config.xAxisSort) xAxisSort();
	filterRange(config.select);
	ctx.lineWidth = 2 * pxd;
	drawChart();
};
$(function() {
	var f = 1;
	var imgOnload = 0,
		cTime = 0,
		fontPFix,
		ww = $('.wrapper').width() + getScrollbarWidth(),
		// image processing
		c = document.createElement('canvas'),
		ctx = c.getContext('2d'),
		// online user
		counter_people = [],
		counter_people_detail = [],
		counter_order = [],
		// city
		c4 = document.getElementById('city'),
		c4m = document.getElementById('city_mobile'),
		c4p,
		c4tx = [c4.getContext('2d'), c4m.getContext('2d')],
		c4Width = 236 * pxd,
		c4Height = 460 * pxd,
		c4Padding_l = 20 * pxd,
		c4Padding_r = 25 * pxd,
		carouselHeight = 96 * pxd,
		cityPaddingTop = 26 * pxd,
		cityTop = carouselHeight + cityPaddingTop,
		city = ['台中市','台北市','台東縣','台南市','宜蘭縣','花蓮縣','離島','南投縣','屏東縣','苗栗縣','桃園市','高雄市','基隆市','雲林縣','新北市','新竹市','新竹縣','嘉義市','嘉義縣','彰化縣'],
		cityImg = [],
		citySrc = ['taipei','new_taipei','taoyuan','taichung','tainan','kaohsiung','keelung','hsinchu_city','chiayi_city','hsinchu_county','miaoli','changhua','nantou','yunlin','chiayi_county','pingtung','yilan','hualien','taitung','pkln'],
		cityIndex = 0,
		cityW,
		cityH,
		cityX,
		cityY,
		cityColor,
		// order
		order_n,
		order_s,
		order_array=[0,0,0,0,0,0],
		// sex
		c1 = document.getElementById('sex'),
		c1tx = c1.getContext('2d'),
		c1Width = [450 * pxd, 280 * pxd],
		c1Height = [60 * pxd, 50 * pxd],
		iconWidth = [45 * pxd, 65 * pxd],
		iconHeight = 57 * pxd,
		c1IW,
		c1IH,
		c1barWidth,
		c1barHeight = 20 * pxd,
		c1LL = [18 * pxd, 14 * pxd],
		c1p,
		img1 = new Image(),
		img2 = new Image(),
		male,
		// horoscope
		c2 = document.getElementById('horoscope'),
		c2tx = c2.getContext('2d'),
		c2Width = 210 * pxd,
		c2Height = [460 * pxd, 370 * pxd],
		c2fontH = 20 * pxd,
		c2LL = [39 * pxd, 31 * pxd],
		fontWidth_l = 45 * pxd,
		fontWidth_r = 55 * pxd,
		c2barWidth = c2Width - fontWidth_l - fontWidth_r,
		c2barHeight = [20 * pxd, 10 * pxd],
		c2p,
		horoscope = ['白羊','金牛','雙子','巨蟹','獅子','處女','天秤','天蠍','射手','魔羯','水瓶','雙魚'],
		horo1,
		horo2,
		// age
		c3 = document.getElementById('age'),
		c3tx = c3.getContext('2d'),
		c3Width = [452 * pxd, 290 * pxd],
		c3Height = [130 * pxd, 190 * pxd],
		c3fontS = [14 * pxd, 12 * pxd],
		c3fHtop = 35 * pxd,
		c3fHbot = [35 * pxd, 50 * pxd],
		c3itemWidth = [44 * pxd, 33 * pxd],
		c3barWidth = 20 * pxd,
		c3barHeight,
		c3p,
		ageInterval = ['X20.24','X25.29','X30.34','X35.39','X40.44','X45.49','X50.59','X60.'],
		ageInterval2 = ['X20.24','X25.29','X30.34','X35.39','X40.44','X45.49','X50.59','X60.'],
		age1,
		age2,
		ageKey,
		// device
		c5 = document.getElementById('device'),
		c5tx = c5.getContext('2d'),
		c5Width = 246 * pxd,
		c5Height = 150 * pxd,
		c5item = 120 * pxd,
		c5r = c5item/2,
		startP = - Math.PI / 2,
		c5barWidth = 20 * pxd,
		c5FontWidth = 70 * pxd,
		desktop,
		// aq_np
		c6 = document.getElementById('aq_np'),
		c6tx = c6.getContext('2d'),
		c6Width = 246 * pxd,
		c6Height = 148 * pxd,
		c6item = 120 * pxd,
		c6r = c6item/2,
		c6barWidth = 20 * pxd,
		c6FontWidth = 70 * pxd,
		np,
		// np_company
		c7 = document.getElementById('np_company'),
		c7tx = c7.getContext('2d'),
		c7Width = 286 * pxd,
		c7Height = [330 * pxd, 190 * pxd],
		c7item = [254 * pxd, 120 * pxd],
		c7r,
		c7barWidth = [40 * pxd, 20 * pxd],
		c7FontWidth = 55 * pxd,
		c7Padding = 0,
		companyName,
		companyColor,
		c7icon = 18 * pxd,
		c7p,
		dp,
		dat,
		// marquee
		marqueeText,
		mw = 0,
		mx = -ww,
		// line
		lineData = [],
		lineTime,
		lineT1 = [1000, 5000, 10000, 50000, 999999],
		lineT2 = 0,
		lineT3 = [],
		lineT4 = 0,
		lineT5 = false;
	// https://goo.gl/Y6Jw1n sort
	for (var i = 0; i < 20; i++) {
		cityImg[i] = new Image();
		cityImg[i].src ='images/city/'+ citySrc[i] +'.png';
		if (cityImg[i].complete) {
			imgOnload++;
		} else {
			cityImg[i].addEventListener('load', function () {
				imgOnload++;
			});
		}
	}
	img1.src = 'images/male.png';
	img2.src = 'images/female.png';
	if (img1.complete) {
		imgOnload++;
	} else {
		img1.addEventListener('load', function () {
			imgOnload++;
		});
	}
	if (img2.complete) {
		imgOnload++;
	} else {
		img2.addEventListener('load', function () {
			imgOnload++;
		});
	}

	navigator.userAgent.indexOf('Firefox') > -1 ? fontPFix = 2 * pxd: fontPFix = 0;
	function getScrollbarWidth() {
		var outer = document.createElement("div");
		outer.style.visibility = "hidden";
		outer.style.width = "100px";
		document.body.appendChild(outer);

		var widthNoScroll = outer.offsetWidth;
		// force scrollbars
		outer.style.overflow = "scroll";

		// add innerdiv
		var inner = document.createElement("div");
		inner.style.width = "100%";
		outer.appendChild(inner);

		var widthWithScroll = inner.offsetWidth;

		// remove divs
		outer.parentNode.removeChild(outer);
		return widthNoScroll - widthWithScroll;
	}
	function RWD() {
		ww = $('.wrapper').width() + getScrollbarWidth();
		c4p = ww < 769 ? 1 : 0;
		c1p = ww < 431 ? 1 : 0;
		c2p = ww < 541 ? 1 : 0;
		c3p = ww < 431 ? 1 : 0;
		c7p = ww < 541 ? 1 : 0;
		// city
		c4.width = c4Width;
		c4.height = c4Height;
		c4m.width = c4Width;
		c4m.height = c4Height;
		// sex
		c1.width = c1Width[c1p];
		c1.height = c1Height[c1p];
		// horoscope
		c2.width = c2Width;
		c2.height = c2Height[c2p];
		// age
		c3.width = c3Width[c3p];
		c3.height = c3Height[c3p];
		// device
		c5.width = c5Width;
		c5.height = c5Height;
		// aq_np
		c6.width = c6Width;
		c6.height = c6Height;
		// np_company
		c7.width = c7Width;
		c7.height = c7Height[c7p];
	}
	RWD();
	function commafy(num) {
		num = num + '';
		var re = /(-?\d+)(\d{3})/;

		if (re.test(num)) {
			num = num.replace(re, '$1,$2');
		}
		return num;
	}
	// function numHandler(n) {
	// 	if (n < 1000) {
	// 		return n;
	// 	} else {
	// 		return Math.round(n/100)/10 + 'K'
	// 	}
	// }
	function numHandler(n) {
		if (n < 100) {
			return n;
		} else {
			return Math.round(n/100)/10 + 'K'
		}
	}
	function timeCal3(v) {
		var v2 = v.split(":");
		return v2[0] * 3600 + v2[1] * 60 + Number(v2[2]);
	}
	// line chart history
	function lineHistory() {
		$.ajax('https://tsailingwu.github.io/me/works/dashboard/file/final_order_11_40.json')
			.done(function(data) {
				function timeCal(v) {
					var v2 = v.split(":");
					return v2[0] * 3600 + v2[1] * 60;
				}
				for (var i = 0, l = data.length; i < l; i++) {
					lineData.push([timeCal(data[i]['time']), data[i]['累計訂單數']]);
				}
				for (var i = 0; i < 20; i++) {
					cityImg[i].onload = function() {

					}
				}
				imgLoader();
			})
			.fail(function() {
				setTimeout(lineHistory, 3000);
			});
	}
	lineHistory();
	function imgLoader() {
		if (imgOnload >= 22) {
			secData();
		} else {
			setTimeout(imgLoader, 300);
		}
	}
	var sData;
	function secData() {
		$.ajax('https://tsailingwu.github.io/me/works/dashboard/file/final_11_40_0'+ f +'.json')
			.done(function(data) {
				// console.log(data);
				sData = data;

				// line
				lineTime = timeCal3(data.time);
				if (data.order > lineT1[lineT2]) {
					lineT3.push(lineT1[lineT2]);
					lineT2++;
				}
				if (lineT3.length == 0) {
					lineT5 = false;
				} else {
					lineT4 + 1 >= lineT3.length ? lineT4 = 0 : lineT4++;
					lineT5 = lineT3[lineT4];
				}
				if (cTime == 0) {
					lineData.push([lineTime, data.order]);
				} else {
					lineData.length--;
					lineData.push([lineTime, data.order]);
				}
				$('#order_line').line({
					data: lineData,
					width: ww < 431 ? 394 * pxd: 651 * pxd, // 699
					height: ww < 431 ? 425 * pxd: 340 * pxd,
					tt: lineT5
					// tt: 35560
				});

				// online user
				counter_people = [data['在線']];
				counter_people_detail = [data['進入'], data['排隊']];
				$('.counter_people .number').html(commafy(counter_people));
				$('.counter_entered .number').html(commafy(counter_people_detail[0]));
				$('.counter_queue .number').html(commafy(counter_people_detail[1]));

				drawCanvas();

				cTime++;
				if (cTime > 6) cTime = 0;
				// demo's
				f++;
				f > 6 ? f = 1 :'';
				setTimeout(secData, 10000);
			})
			.fail(function() {
				setTimeout(secData, 3000);
			});
	}
	function drawCanvas() {
		// city
		city.sort(function(a, b){return sData.city[b] - sData.city[a]});
		c4tx[c4p].clearRect(0, 0, c4Width, c4Height);
		c4tx[c4p].font = 18 * pxd + 'px Microsoft JhengHei';
		c4tx[c4p].textBaseline = 'middle';
		for (var i = cTime * 3, l = i + 3 > 20 ? 20 : i + 3; i < l; i++) {
			c4tx[c4p].fillStyle = '#fff';
			if (i+1 === 1) {
				c4tx[c4p].fillStyle = '#c48c5b';
			}
			c4tx[c4p].textAlign = 'left';
			c4tx[c4p].fillText('No.'+ (i+1) + ' ' + city[i], c4Padding_l, (42 * (i % 3) + 10) * pxd);
			c4tx[c4p].textAlign = 'center';
			c4tx[c4p].fillText(numHandler(sData.city[city[i]]), c4Width - c4Padding_r, (42 * (i % 3) + 10) * pxd);
		}
		city.map(function (key, i) {
			if (i === 0) {
				cityColor = '492402';
			} else if (i === 1) {
				cityColor = '8f5828';
			} else if (i === 2) {
				cityColor = 'c89261';
			} else if (3 <= i && i < 10) {
				cityColor = 'dcba9c';
			} else if (10 <= i && i < 15) {
				cityColor = 'f4e9df';
			} else {
				cityColor = 'fff';
			}
			switch (key) {
				case '台北市':
					cityIndex = 0;
					cityW = 20;
					cityH = 25;
					cityX = 185;
					cityY = 9;
					break;
				case '新北市':
					cityIndex = 1;
					cityW = 67;
					cityH = 63;
					cityX = 169;
					cityY = 0;
					break;
				case '桃園市':
					cityIndex = 2;
					cityW = 46;
					cityH = 54;
					cityX = 141;
					cityY = 18;
					break;
				case '台中市':
					cityIndex = 3;
					cityW = 90;
					cityH = 44;
					cityX = 95;
					cityY = 86;
					break;
				case '台南市':
					cityIndex = 4;
					cityW = 58;
					cityH = 52;
					cityX = 53;
					cityY = 187;
					break;
				case '高雄市':
					cityIndex = 5;
					cityW = 82;
					cityH = 99;
					cityX = 65;
					cityY = 182;
					break;
				case '基隆市':
					cityIndex = 6;
					cityW = 17;
					cityH = 13;
					cityX = 200;
					cityY = 12;
					break;
				case '新竹市':
					cityIndex = 7;
					cityW = 13;
					cityH = 15;
					cityX = 132;
					cityY = 44;
					break;
				case '嘉義市':
					cityIndex = 8;
					cityW = 13;
					cityH = 9;
					cityX = 85;
					cityY = 176;
					break;
				case '新竹縣':
					cityIndex = 9;
					cityW = 44;
					cityH = 51;
					cityX = 136;
					cityY = 35;
					break;
				case '苗栗縣':
					cityIndex = 10;
					cityW = 60;
					cityH = 46;
					cityX = 107;
					cityY = 56;
					break;
				case '彰化縣':
					cityIndex = 11;
					cityW = 41;
					cityH = 42;
					cityX = 73;
					cityY = 110;
					break;
				case '南投縣':
					cityIndex = 12;
					cityW = 67;
					cityH = 80;
					cityX = 108;
					cityY = 105;
					break;
				case '雲林縣':
					cityIndex = 13;
					cityW = 58;
					cityH = 34;
					cityX = 61;
					cityY = 145;
					break;
				case '嘉義縣':
					cityIndex = 14;
					cityW = 79;
					cityH = 43;
					cityX = 61;
					cityY = 164;
					break;
				case '屏東縣':
					cityIndex = 15;
					cityW = 46;
					cityH = 98;
					cityX = 88;
					cityY = 240;
					break;
				case '宜蘭縣':
					cityIndex = 16;
					cityW = 61;
					cityH = 68;
					cityX = 172;
					cityY = 31;
					break;
				case '花蓮縣':
					cityIndex = 17;
					cityW = 74;
					cityH = 126;
					cityX = 141;
					cityY = 93;
					break;
				case '台東縣':
					cityIndex = 18;
					cityW = 70;
					cityH = 120;
					cityX = 118;
					cityY = 185;
					break;
				case '離島':
					cityIndex = 19;
					cityW = 199;
					cityH = 320;
					cityX = 0;
					cityY = 10;
					break;
				default:
					break;
			}
			c.width = cityW * pxd;
			c.height = cityH * pxd;
			ctx.fillStyle = '#' + cityColor;
			ctx.drawImage(cityImg[cityIndex], 0, 0, cityW, cityH, 0, 0, cityW * pxd, cityH * pxd);
			ctx.globalCompositeOperation='source-in';
			ctx.fillRect(0, 0, c.width, c.height);
			c4tx[c4p].drawImage(c, cityX * pxd,  cityTop + cityY * pxd);
		});

		// order_number
		order_n = '' + sData.order;
		for (var i = 0, l = order_n.length; i<l; i++) {
			order_s = order_n.slice(l-i-1, l-i);
			if (order_array[i] != Number(order_s)) {
				order_array[i] = Number(order_s);
				$('.counter_order > div').eq(5-i).html(order_s);
			}
		}

		// sex
		male = sData.sex['男']/(sData.sex['男']+sData.sex['女']);
		c1tx.clearRect(0, 0, c1Width[c1p], c1Height[c1p]);
		c1tx.font = c1LL[c1p] + 'px Microsoft JhengHei';
		c1tx.textBaseline = 'middle';
		c1IW = 19;
		c1IH = 57;
		c.width = c1IW * pxd;
		c.height = c1IH * pxd;
		if (male >= 0.5) {
			ctx.drawImage(img1, 0, 0, c1IW, c1IH, 0, 0, c.width, c.height);
			ctx.fillStyle = '#c48c5b';
			ctx.globalCompositeOperation='source-in';
			ctx.fillRect(0, 0, c.width * pxd, c.height * pxd);
			c1tx.drawImage(c, iconWidth[c1p]/2 - c.width/2, 0);
			c1tx.fillStyle = '#c48c5b';
		} else {
			c1tx.drawImage(img1, 0, 0, c1IW, c1IH, iconWidth[c1p]/2 - c.width/2, 0, c1IW * pxd, c1IH * pxd);
			c1tx.fillStyle = '#fff';
		}
		c1barWidth = c1Width[c1p] - iconWidth[c1p] * 2;
		c1tx.fillRect(iconWidth[c1p], 2, c1barWidth * male, c1barHeight);
		c1tx.textAlign = 'left';
		c1tx.fillText('男 ' + numHandler(sData.sex['男']), iconWidth[c1p], c1Height[c1p] - c1LL[c1p]/2);
		c1IW = 25;
		c.width = c1IW * pxd;
		if (male >= 0.5) {
			c1tx.drawImage(img2, 0, 0, c1IW, c1IH, iconWidth[c1p] + c1barWidth + iconWidth[c1p]/2 - c.width/2, 0, c1IW * pxd, c1IH * pxd);
			c1tx.fillStyle = '#fff';
		} else {
			ctx.drawImage(img2, 0, 0, c1IW, c1IH, 0, 0, c.width, c.height);
			ctx.fillStyle = '#c48c5b';
			ctx.globalCompositeOperation='source-in';
			ctx.fillRect(0, 0, c.width * pxd, c.height * pxd);
			c1tx.drawImage(c, iconWidth[c1p] + c1barWidth + iconWidth[c1p]/2 - c.width/2, 0);
			c1tx.fillStyle = '#c48c5b';
		}
		c1tx.fillRect(iconWidth[c1p] + c1barWidth * male, 2, c1barWidth * (1 - male), c1barHeight);
		c1tx.textAlign = 'right';
		c1tx.fillText('女 ' + numHandler(sData.sex['女']), c1Width[c1p] - iconWidth[c1p], c1Height[c1p] - c1LL[c1p]/2);

		// horoscope
		horoscope.sort(function(a, b){return sData.star[b]-sData.star[a]});
		horo1 = sData.star[horoscope[0]];
		c2tx.clearRect(0, 0, c2Width, c2Height[c2p]);
		c2tx.font = 18 * pxd + 'px Microsoft JhengHei';
		c2tx.textBaseline = 'middle';
		for (var i = 0; i < 12; i++) {
			horo2 = sData.star[horoscope[i]];
			c2tx.fillStyle = '#fff';
			if (horo2 == horo1) {
				c2tx.fillStyle = '#c48c5a';
			}
			c2tx.fillRect(fontWidth_l, i * c2LL[c2p] + (c2p === 1 ? 11 * pxd: 9 * pxd), c2barWidth * (horo2/horo1), c2barHeight[c2p]);
			c2tx.textAlign = 'left';
			c2tx.fillText(horoscope[i], 0, i * c2LL[c2p] + c2LL[c2p]/2 + fontPFix);
			c2tx.textAlign = 'center';
			c2tx.fillText(numHandler(horo2), c2Width - fontWidth_r/2, i * c2LL[c2p] + c2LL[c2p]/2 + fontPFix);
		}

		// age
		c3barHeight = c3Height[c3p] - c3fHtop - c3fHbot[c3p],
		ageInterval.sort(function(a, b){return sData.age[b]-sData.age[a]});
		age1 = sData.age[ageInterval[0]];
		c3tx.clearRect(0, 0, c3Width[c3p], c3Height[c3p]);
		c3tx.textBaseline = 'middle';
		c3tx.textAlign = 'center';
		for (var i = 0; i < 8; i++) {
			c3tx.font = c3fontS[c3p] + 'px Microsoft JhengHei';
			c3tx.fillStyle = '#fff';
			switch (i) {
				case 0:
					ageKey = '20-24';
					break;
				case 1:
					ageKey = '25-29';
					break;
				case 2:
					ageKey = '30-34';
					break;
				case 3:
					ageKey = '35-39';
					break;
				case 4:
					ageKey = '40-44';
					break;
				case 5:
					ageKey = '45-49';
					break;
				case 6:
					ageKey = '50-59';
					break;
				case 7:
					ageKey = ' 60+';
				default:
					break;
			}
			age2 = sData.age[ageInterval2[i]];
			if (c3p === 1) {
				c3tx.fillText(ageKey, (4 * pxd + c3itemWidth[c3p]) * i + (c3itemWidth[c3p] / 2), c3Height[c3p] - ( i % 2 === 1 ? 10 * pxd: 30 * pxd));
			} else {
				c3tx.fillText(ageKey, (14 * pxd + c3itemWidth[c3p]) * i + (c3itemWidth[c3p] / 2), c3Height[c3p] - c3fHbot[c3p]/2);
			}
			c3tx.font = (ww < 431 ? 12 * pxd: 18 * pxd) + 'px Microsoft JhengHei';
			c3tx.fillText(numHandler(age2), ((c3p === 1 ? 4 * pxd: 14 * pxd) + c3itemWidth[c3p]) * i + (c3itemWidth[c3p] / 2), c3barHeight - (c3barHeight * age2 / age1) + c3fHtop/2);
			if (age2 === age1) {
				c3tx.fillStyle = '#c48c5a';
			}
			c3tx.fillRect(((c3p === 1 ? 4 * pxd: 14 * pxd) + c3itemWidth[c3p]) * i + (c3itemWidth[c3p] - c3barWidth) / 2, c3Height[c3p] - c3fHbot[c3p] - c3barHeight * age2 / age1, c3barWidth, c3barHeight * age2 / age1);
		}

		// device
		desktop = sData.device['Desktop']/(sData.device['Desktop']+sData.device['Mobile']);
		c5tx.clearRect(0, 0, c5Width, c5Height);
		c5tx.font = 18 * pxd + 'px Microsoft JhengHei';
		c5tx.textBaseline = 'middle';
		c5tx.textAlign = 'center';
		c5tx.beginPath();
		if (desktop >= 0.5) {
			c5tx.fillStyle = '#c48c5b';
		} else {
			c5tx.fillStyle = '#fff';
		}
		c5tx.fillText('桌上電腦', c5Width - c5FontWidth/2, c5Height - 30 * pxd);
		c5tx.fillText(numHandler(sData.device['Desktop']), c5Width - c5FontWidth/2, c5Height - 8 * pxd);
		c5tx.arc(c5Width/2, c5item/2, c5r, startP, desktop * 2 * Math.PI + startP);
		c5tx.arc(c5Width/2, c5item/2, c5r - c5barWidth, desktop * 2 * Math.PI + startP, startP, true);
		c5tx.fill();
		c5tx.closePath();
		c5tx.beginPath();
		if (desktop >= 0.5) {
			c5tx.fillStyle = '#fff';
		} else {
			c5tx.fillStyle = '#c48c5b';
		}
		c5tx.fillText('移動裝置', c5FontWidth/2, c5Height - 30 * pxd);
		c5tx.fillText(numHandler(sData.device['Mobile']), c5FontWidth/2, c5Height - 8 * pxd);
		c5tx.arc(c5Width/2, c5item/2, c5r, desktop * 2 * Math.PI + startP, startP);
		c5tx.arc(c5Width/2, c5item/2, c5r - c5barWidth, startP, desktop * 2 * Math.PI + startP, true);
		c5tx.fill();
		c5tx.closePath();

		// aq_np
		np = sData.aq_np['攜碼']/(sData.aq_np['攜碼']+sData.aq_np['新申辦']);
		c6tx.clearRect(0, 0, c6Width, c6Height);
		c6tx.font = 18 * pxd + 'px Microsoft JhengHei';
		c6tx.textBaseline = 'middle';
		c6tx.textAlign = 'center';
		c6tx.beginPath();
		if (np >= 0.5) {
			c6tx.fillStyle = '#c48c5b';
		} else {
			c6tx.fillStyle = '#fff';
		}
		c6tx.fillText('攜碼', c6Width - c6FontWidth/2, c6Height - 30 * pxd);
		// c6tx.fillText(numHandler(sData.aq_np['攜碼']), c6Width - c6FontWidth/2, c6Height - 8 * pxd);
		c6tx.arc(c6Width/2, c6item/2, c6r, startP, np * 2 * Math.PI + startP);
		c6tx.arc(c6Width/2, c6item/2, c6r - c6barWidth, np * 2 * Math.PI + startP, startP, true);
		c6tx.fill();
		c6tx.closePath();
		c6tx.beginPath();
		if (np >= 0.5) {
			c6tx.fillStyle = '#fff';
		} else {
			c6tx.fillStyle = '#c48c5b';
		}
		c6tx.fillText('新申辦', c6FontWidth/2, c6Height - 30 * pxd);
		// c6tx.fillText(numHandler(sData.aq_np['新申辦']), c6FontWidth/2, c6Height - 8 * pxd);
		c6tx.arc(c6Width/2, c6item/2, c6r, np * 2 * Math.PI + startP, startP);
		c6tx.arc(c6Width/2, c6item/2, c6r - c6barWidth, startP, np * 2 * Math.PI + startP, true);
		c6tx.fill();
		c6tx.closePath();

		// np_company
		c7r = c7item[c7p]/2,
		c7tx.clearRect(0, 0, c7Width, c7Height[c7p]);
		c7tx.font = 18 * pxd + 'px Microsoft JhengHei';
		c7tx.textBaseline = 'middle';
		dat = sData.company['中華']+sData.company['台哥大']+sData.company['遠傳']+sData.company['亞太'];
		for (var i = 0; i < 4; i++) {
			switch (i) {
				case 0:
					companyName = '中華';
					companyColor = '492402';
					break;
				case 1:
					companyName = '遠傳';
					companyColor = '814a1a';
					break;
				case 2:
					companyName = '台哥大';
					companyColor = 'c89261';
					break;
				case 3:
					companyName = '亞太';
					companyColor = 'dcba9c';
					break;
				default:
					break;
			}
			dp = sData.company[companyName]/dat * 2 * Math.PI;
			c7tx.fillStyle = '#' + companyColor;
			c7tx.fillRect(i % 2 === 0 ? c7Padding : c7Width-130 * pxd, i<2 ? c7Height[c7p] - 50 * pxd : c7Height[c7p] - 25 * pxd, c7icon, c7icon);
			c7tx.beginPath();
			c7tx.arc(c7Width/2, c7item[c7p]/2, c7r, startP, startP + dp);
			c7tx.arc(c7Width/2, c7item[c7p]/2, c7r - c7barWidth[c7p], startP + dp, startP, true);
			c7tx.fill();
			c7tx.closePath();
			startP += dp;
			c7tx.fillStyle = '#fff';
			c7tx.textAlign = 'left';
			if (c7p === 1) {
				c7tx.fillText(companyName, i % 2 === 0 ? c7Padding + c7icon + 10 * pxd: c7Width - 130 * pxd + c7icon + 10 * pxd, i<2 ? c7Height[c7p] - 39 * pxd: c7Height[c7p] - 14 * pxd);
			} else {
				c7tx.fillText(companyName, i % 2 === 0 ? c7Padding + c7icon + 10 * pxd: c7Width - 130 * pxd + c7icon + 10 * pxd, i<2 ? c7Height[c7p] + fontPFix - 41 * pxd: c7Height[c7p] + fontPFix - 16 * pxd);
			}
			// c7tx.textAlign = 'center';
			// if (c7p === 1) {
			// 	c7tx.fillText(numHandler(sData.company[companyName]), i % 2 == 0 ? 90 * pxd + fontWidth_r/2 : c7Width - fontWidth_r/2, i < 2 ? c7Height[c7p] - 39 * pxd: c7Height[c7p] - 14 * pxd);
			// } else {
			// 	c7tx.fillText(numHandler(sData.company[companyName]), i % 2 == 0 ? 90 * pxd + fontWidth_r/2 : c7Width - fontWidth_r/2, i < 2 ? c7Height[c7p] + fontPFix - 41 * pxd: c7Height[c7p] + fontPFix - 16 * pxd);
			// }
		}
	}
	// marquee
	function marquee() {
		$.ajax('https://tsailingwu.github.io/me/works/dashboard/file/marquee.json')
			.done(function(data) {
			console.log(data.wording);
			marqueeText = data.wording;
			$('.marquee_width').html('');
			for (var i = 0, l = marqueeText.length; i<l; i++) {
				$('.marquee_width').append('<div>' + marqueeText[i] + '</div>');
			}
			mw = $('.marquee_width').width();
			setTimeout(marquee, 60000);
			})
			.fail(function() {
				setTimeout(marquee, 3000);
			});
	}
	marquee();
	$('.counter_people').on('click', function() {
		$('.counter_people_detail').toggleClass('active');
	});
	$('.counter_people_detail').on('click', function() {
		$('.counter_people').trigger('click');
	});
	var RWDtime;
	$(window).on('resize', function() {
		var newWidth = $(window).width();
		if (ww != newWidth) {
			RWD();
			ww = newWidth;
			clearTimeout(RWDtime);
			RWDtime = setTimeout(drawCanvas, 300);
		}
	});
	function marqueeDiv() {
		$('.marquee_content').css('left', mx * -1);
		mx += 2;
		if (mx >= mw) mx = -ww;
		// if (mx >= mw + 500) mx = 0;
		requestAnimationFrame(marqueeDiv);
	};
	marqueeDiv();
	// setInterval(marqueeDiv, 33);
});