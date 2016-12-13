window.addEventListener("deviceorientation", setRose, true);

function tryGPS() {
	
}

function setRose(e) {
	
	// No orientation data
	if(!e.absolute) {
		$('#no-dir').show();
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
