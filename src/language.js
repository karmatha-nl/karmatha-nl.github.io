// For switching languages. Requires there to be an element with class=`lang-selector`



$(document).ready(function() {    
	// Handle clicking on the language selector menu 
  	$('.lang-selector li').click(function( event ) {
		setLanguage(event.target.getAttribute('lang'), true);  
	}); 
	
	function setLanguage(lang, animate) {
		localStorage.setItem('language', lang);
		$('html').attr('lang', lang);
		if(animate){
			$('html').addClass('lang-animate').attr('lang', lang);					
		}
	}

	// Set initial language to browser language
	var lang = localStorage.getItem("language") || navigator.language.substr(0, 2);

	if(['en', 'nl'].indexOf(lang) > -1){
		setLanguage(lang);
	}
});


