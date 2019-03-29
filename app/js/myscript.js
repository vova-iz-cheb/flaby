$(function() {
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

});