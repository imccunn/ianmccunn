
// *****************************
// Background Parallax
//
//
//

$(document).ready(function(){

  $("#navbar li a").click(function(event) {
    // check if window is small enough so dropdown is created
    $("#nav-collapse").removeClass("in").addClass("collapse");
	});

  var $window = $(window); 
  
  $('body[data-type="background"]').each(function(){
  var $bgobj = $(this); 

    $(window).scroll(function() {
      var speed = $bgobj.data('speed');
      var yPos = -($window.scrollTop() / $bgobj.data('speed')).toFixed(3);
      var xPos = -($window.scrollTop() / ($bgobj.data('speed')*0.3)).toFixed(3);

      // Put together our final background position
      var coords = xPos + 'px ' + yPos + 'px';
      // Move the background
      $bgobj.css({ backgroundPosition: coords });
    });
  });

});


//handle workslist clicks with ajax
/*$(document).on('click', '#complink li a', function(){
  	var compdata = $(this).attr('href');
  	compdata = '../' + compdata + '.html';

  	//$(#workdetails).load(compdata);
  	$.get(compdata, function(data){
  		$("div#workdetails")
  			.hide()
  			.html(data)
  			.fadeIn(750);
  	});

  	return false;
  });*/
