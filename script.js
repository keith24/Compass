window.addEventListener("deviceorientation", setRose, true);

function setRose(e) {
	
	// No orientation data
	if(!e.absolute) {
		$('#rose-error').show();
	} else {
		
		// Rotate rose
		var rot = 'rotate('+e.alpha.toString().substring(0,5)+'deg)';
		$('#rose').css({
			'-ms-transform': rot,
			'-webkit-transform': rot,
			'transform': rot
		});
	}
	
}
