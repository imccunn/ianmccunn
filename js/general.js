
  function fadeIn(element, opIntv) {
      var op = 0;  // initial opacity
      var timer = setInterval(function () {
          if (op >= 0.95){
              clearInterval(timer);
              element.style.backgroundColor = 'rgba( 255, 255, 255, 1)';
              return;
          }
          
          element.style.backgroundColor = 'rgba( 255, 255, 255, ' + op + ')';
          op += opIntv;
          //console.log(element +":"+op);
      }, 20);

  }

  function fadeOut(element, opIntv){
      var op = 1;  // initial opacity
      var timer = setInterval(function () {
          if (op <= 0.05){
              clearInterval(timer);
              element.style.backgroundColor = 'rgba( 255, 255, 255, 0.0)';
              return;
          }
          
          element.style.backgroundColor = 'rgba( 255, 255, 255, ' + op + ')';
          op -= opIntv;
          //console.log(element +":"+op);
      }, 20);

  }
/*
  document.getElementById('indexBio').addEventListener('mouseenter', function(){
    setTimeout(function(){fadeIn(indexBio, 0.03)}, 500);
    }, false);
  document.getElementById('indexBio').addEventListener('mouseleave', function(){
    setTimeout(function(){fadeOut(indexBio, 0.03)}, 500);
    },false);
*/


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



	//HTML LIST PARSER-------------------------------------------------------------------// 

	//Enable number input field box to select number of checked instrument
	$(document).on('click', '.slashCheck', function (){

      var thisCheck = $(this),
			    instr = $(this).parent().attr('id'),
          linkText = $(this).siblings('.instTitle').text();

      // Async HTML
      var addFwSlash = "<div class='slash tCell'><input class='slashbox' type='checkbox' id='" + instr + "Sl'></div>";
      var addRmDot = "<div class='dotB tCell'><input class='dotBox' type='checkbox' id='" + instr + "Dot' checked></div>";
      var addToolTip = "<div class='toolTip tCell'><input type='search' class='ttext' value='" + linkText + "' id='" + instr + "Xt' /></div>";
      
      //Fill in alternative default text for instrument quantity 
      var linkVal = -1;
      switch (linkText) {
        case 'Piano' : linkVal = 'Pf.';
          break;
        case 'Percussionists' : linkVal = 'Pc.+';
          break;
        default : linkVal = 1; 
          break;
      }
      var numIntsr = "<div class='mom tCell'><input type='text' class='numb' value='" + linkVal + "' min='0' max='14' id='" + instr + "num'></div>";      
      
      
      var allCols = numIntsr + addFwSlash + addRmDot + addToolTip;


      if (thisCheck.is (':checked')){
      	$(this).parent().parent().parent().children('div.tHead').css('display', 'table-header-group');

        $('#' + instr + '').parent().append(allCols);
        //$('#' + instr + '').parent().append(addFwSlash);
        //$('#' + instr + '').parent().append(addToolTip);

      }
      else if (thisCheck.attr('checked', false)){
        $('#' + instr + 'num').parent().remove();
        $('#' + instr + 'Sl').parent().remove();
        $('#' + instr + 'Xt').parent().remove();
        $('#' + instr + 'Dot').parent().remove();
      }

   });


	//Generate HTML for parsed list
  $(document).on('click', '#generateInstr', function(){

    var numsOfInstr = [],
        returnHtml = "<div>( ",
        counter = 0;

    $('.slashCheck').each(function(){

        if($(this).is(':checked')){

          numsOfInstr.push($(this).parent().siblings('.mom').children('.numb').val());
          returnHtml += "<a href='' class='instrLink' title='" + $(this).parent().parent().children('.toolTip').children('.ttext').val() + "'>" + numsOfInstr[counter] + "</a>";

          if($(this).parent().siblings('.slash').children('.slashbox').is(':checked')){
        	returnHtml += " / ";
        	}

	        if($(this).parent().siblings('.dotB').children('.dotBox').is(':checked')){
	        	returnHtml += ".";
        	}
        }
        else{

          numsOfInstr.push('0');
          if($(this).parent().siblings('.slash').children('.slashbox').is(':checked')){
        	returnHtml += " / ";
        	}

        }
        
        ++counter;
      
    });
    returnHtml += " )</div>";

    //Update DOM
    document.getElementById('visResult').innerHTML = returnHtml;
    document.getElementById('codeResult').innerHTML =  "<xmp>" + returnHtml + "</xmp>";
  });


	//Handle Workslist Clicks for 'catalog.html' control
	$(document).on('click', '.compExLnk', function() {
		
		//Find composition opus number, which is also file identifier
		var page = $(this).parent().parent().children('.comp-op').text();

		// boolean value for whether specific composition content has been requested and loaded
		var contentLoaded = $('#collapse' + page).data("contentLoaded");

		// if content exists on click, empty content and set data atrib to false; otherwise, load the content and set to true
		if (typeof(contentLoaded) == "undefined" && !contentLoaded){

			$.ajax('/compositions/op' + page + '.html').done(function(data) {
				$('#collapse' + page).append(data).fadeIn(750);
				$('#collapse' + page).data("contentLoaded", true);
			});
			
		}
		else $('#collapse' + page).data("contentLoaded", false);

		return false;
	});
});