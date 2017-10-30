$(document).ready(function() {    
    // Sticky header
	var sticky = $(".sticky");
    var offsetTop = sticky.offset().top;
    $(window).scroll(checkSticky);

    function checkSticky(){
        if ($(window).scrollTop() >= offsetTop) {
            sticky.css('position', 'fixed');
        }
        else {
            sticky.css('position', 'inherit');
        }
    }
    checkSticky();
});