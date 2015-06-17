// page dynamics

(function () {
	'use strict';

	// Since the page title is redundant with the CV header content,
	// 	we remove the page header so it read's like a print CV
	$('#pp').animate({ height: 0, opacity: 0 }, 1500, function(){
		$(this).css('display','none');
		$('#nav').css('position', 'fixed')
				.css('display', 'block')	
				.css('padding', '15px')
				.css('background', 'rgb(220, 220, 220)')
				.css('width', '100%')
				.css('border-bottom', '1px solid #fcfcfc');

		$('.cv').css('margin-top', '40px');
	});

	$('.cv-head').fadeIn(2000);

	// affix nav menu if scrolled past its Y location
	var menu = $('.nav');
	var origOffsetY = menu.offset().top;
	function scroll() {
	    if ($(window).scrollTop() >= origOffsetY) {

	        $('.nav').addClass('nav-sticky');

	    } else {
	        $('.nav').removeClass('nav-sticky');
	    }
    }
    
	document.onscroll = scroll;
})();


