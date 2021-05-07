$(document).ready(function(){
  $('#projectlist').slick({
    dots: true,
    slide: 'a',
    slidesToShow: 3,
    prevArrow: '<div class="nav-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
    nextArrow: '<div class="nav-arrow"  style="right: 0"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }]
  });
});