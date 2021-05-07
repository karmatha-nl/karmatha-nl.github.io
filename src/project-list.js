$(document).ready(function(){
	$('#projectlist').slick({
			dots: true,
			slide: 'a',
			// slidesToShow: 3,
			prevArrow: '<div class="nav-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
			nextArrow: '<div class="nav-arrow"  style="right: 0"><i class="fa fa-angle-right" aria-hidden="true"></i></div>'
	});
});