$(function() {

	//nav toggler

	var toggler = $('.header__toggler');

	toggler.on('click', function(event) {
		var nav = document.getElementsByClassName('header__collapsable')[0];
		var scrollHeight = nav.scrollHeight;
		var maxHeight = parseInt(nav.style.maxHeight);

		if(maxHeight) {
			nav.style.maxHeight = 0;
		} else {
			nav.style.maxHeight = scrollHeight + 'px';
		}
	});

	// customers slider

	var front = $('.front'),
		middle = $('.middle'),
		back = $('.back'),
		face = $('.customers__item div'),
		prev = $('.customers__prev'),
		next = $('.customers__next');

	next.on('click', function() {
		widthF = front.css('width');
		widthM = middle.css('width');
		widthB = back.css('width');

		middle.animate({
			height: "351px",
			top: "20px",
			width: widthF,
			opacity: 1,
		}, 200);

		back.animate({
			height: "309px",
			top: "41px",
			width: widthM,
			opacity: 0.8,
		}, 200);

		front.animate({
			height: "257px",
			top: "67px",
			maxWidth: widthB,
			width: widthB,
			opacity: 0.4,
		}, 200);

		//меняем классы местами и перезаписываем переменные
		//* стиль отменяется, чтобы во время анимации блок с лицом, который имеет абсолютное 
		//* позиционирование и выходит за границу родительского блока не обрезался.
		front.addClass('back').removeClass('front').attr('style', '');
		middle.addClass('front').removeClass('middle').attr('style', '');
		back.addClass('middle').removeClass('back').attr('style', '');
		front = $('.front');
		middle = $('.middle');
		back = $('.back');

		//отменить атрибут стиль через 300 милисекунд, чтобы при смене ширины окна, 
		//блоки не выходили за ее границы
		setTimeout(function() { 
			front.attr('style', '');
			middle.attr('style', '');
			back.attr('style', '');
		},300);
	});

	prev.on('click', function() {
		widthF = front.css('width');
		widthM = middle.css('width');
		widthB = back.css('width');

		back.animate({
			height: "351px",
			top: "20px",
			width: widthF,
			opacity: 1,
		}, 200);

		front.animate({
			height: "309px",
			top: "41px",
			maxWidth: widthM,
			width: widthM,
			opacity: 0.8,
		}, 200);

		middle.animate({
			height: "257px",
			top: "67px",
			width: widthB,
			opacity: 0.4,
		}, 200);

		back.addClass('front').removeClass('back').attr('style', '');
		front.addClass('middle').removeClass('front').attr('style', '');
		middle.addClass('back').removeClass('middle').attr('style', '');
		front = $('.front');
		middle = $('.middle');
		back = $('.back');

		setTimeout(function() {
			front.attr('style', '');
			middle.attr('style', '');
			back.attr('style', '');
		},300);
	});
});