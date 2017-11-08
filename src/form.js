// For sending the contact form info through ajax. Prevents the user from being taken to an external page
// Intercepts the default form submit. 
// Requires there to be an element with id=`#contactForm`

$(document).ready(function() {    
	$('#contactForm')[0].reset()
	$('#contactForm').find(':submit').removeAttr('disabled');
	
	$('#contactForm').submit(function(e) {
		e.preventDefault();
		$(this).find('.fields').slideUp(500);
		$(this).find(':submit').val('').attr('disabled', 'disabled');

		$.ajax({
			url: this.action,
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function() {
			},
			success: function(data) {
				$(this).find('.fields').promise().done(function(){
					$('#contactForm #thanks').show().slideDown(500);
				});
			},
			error: function(err) {
			}
		});
	});
});