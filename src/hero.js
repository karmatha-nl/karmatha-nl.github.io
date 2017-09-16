
$(document).ready(function() {    
	skrollr.init({
		render: function(data) {
			//Log the current scroll position.
			console.log(data.curTop);
		}// },
        // mobileCheck: function() {
        //   return !(/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
      	// }
	});
});
