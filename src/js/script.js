/* 
	Author: Harry McKillen
*/
$(document).ready(function(){
	$('.info-link').click(function(){
		if($(this).hasClass('showing')){
			$('.info-bubble').fadeOut('slow');
			$(this).removeClass('showing');
		}
		else{
			$('.info-bubble').fadeIn('slow');
			$(this).addClass('showing');
		}
	});
});