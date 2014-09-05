$(document).ready(function() {

	$(document).on('click', '#compExLnk', function(e) {
		console.log('expand link');
		var page1 = $(this).parent().child('#comp-op').text();

		$.get('/compositions/op' + page1 + '.php', function(data) {
			$(this).parent().parent().next().child().child('#compInfo').html(data);
		});

		//$.ajax('/compositions/op' + page1 + '.php').done(function(html) {
		//	$(this).parent().parent().next().child().child('#compInfo').html(data);
		//});
		return false;
	});
});

	//Handle Workslist Clicks for 'catalog.html' control
// 	$(document).on('click', '.compExLnk', function() {
		
// 		//Find composition opus number, which is also file identifier
// 		var page = $(this).parent().parent().children('.comp-op').text();

// 		// boolean value for whether specific composition content has been requested and loaded
// 		var contentLoaded = $('#collapse' + page).data("contentLoaded");

// 		// if content exists on click, empty content and set data atrib to false; otherwise, load the content and set to true
// 		if (typeof(contentLoaded) == "undefined" && !contentLoaded){

// 			$.ajax('/compositions/op' + page + '.html').done(function(data) {
// 				$('#collapse' + page).append(data).fadeIn(750);
// 				$('#collapse' + page).data("contentLoaded", true);
// 			});
			
// 		}
// 		else $('#collapse' + page).data("contentLoaded", false);

// 		return false;
// 	});
// });
