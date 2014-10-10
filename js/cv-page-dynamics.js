// cv page dynamics

(function () {
	'use strict';

	// Since the page title is redundant with the CV header content,
	// 	we remove the page header so it read's like a print CV
	$('#pp').animate({ height: 0, opacity: 0 }, 1500, function(){
		$(this).css('display','none');
		$('#nav').css('position', 'fixed')
				.css('display', 'block')	
				.css('padding', '15px')
				.css('background', '-webkit-linear-gradient(#333, #555)')
				.css('background', '-ms-linear-gradient(#333, #555)')
				.css('width', '100%')
				.css('border-bottom', '1px solid #111');

		$('.cv').css('margin-top', '40px');
	});

	$('.cv-head').fadeIn(3000);
})();


