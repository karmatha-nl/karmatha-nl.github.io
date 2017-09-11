
$(document).ready(function() {    
	skrollr.init({
		render: function(data) {
			//Log the current scroll position.
			console.log(data.curTop);
		}
	});
});
