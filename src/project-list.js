// For sending the contact form info through ajax. Prevents the user from being taken to an external page
// Intercepts the default form submit. 
// Requires there to be an element with id=`#contactForm`

$(document).ready(function() {    
	$('#contactForm')[0].reset()
	var submit = $('#contactForm').find(':submit');
	submit.on('textChanged', function() {
		var text = {
			send: 	 { en: 'send', 			nl: 'verstuur '},
			sending: { en: 'sending...', 	nl: 'versturen...'},
			sent: 	 { en: 'sent!', 		nl: 'verstuurd!'},
			error: 	 { en: 'error!', 		nl: 'fout!'}
		}
		$(this).val(text[$(this).attr('text')][$('html').attr('lang')]);
	})
	submit.removeAttr('disabled')
		.attr('text', 'send')
		.trigger('textChanged');

		window.addEventListener('languageChanged', function() {
			submit.trigger('textChanged');
		});
	
	$('#contactForm').submit(function(e) {
		e.preventDefault();
		$(this).find('.fields').slideUp(500);
			
		$.ajax({
			url: this.action,
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function() {
				submit.attr('disabled', 'disabled')
					.attr('text', 'sending')
					.trigger('textChanged');
			},
			success: function(data) {
				$(this).find('.fields').promise().done(function(){
					$('#contactForm #thanks').show().slideDown(500);
					submit.attr('text', 'sent')
						.trigger('textChanged');
				});
			},
			error: function(err) {
				$('#contactForm #formerror').show().slideDown(200);
				submit.attr('text', 'error')
					.trigger('textChanged');		
			}
		});
	});
});