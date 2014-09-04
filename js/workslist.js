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