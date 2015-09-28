(function () {
  'use strict';
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
