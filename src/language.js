// For switching languages. Requires there to be an element with class=`lang-selector`



$(document).ready(function() {    
	// Handle clicking on the language selector menu 
  	$('.lang-selector li').click(function( event ) {
		$('html').addClass('lang-animate').attr('lang', event.target.getAttribute('lang'));
    }); 
});

// Set initial language to browser language
var lang = navigator.language.substr(0, 2);

if(['en', 'nl'].indexOf(lang) > -1){
	$('html').attr('lang', lang);
}
