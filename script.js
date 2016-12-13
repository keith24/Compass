window.addEventListener("deviceorientation", setRose, true);

if (!navigator.geolocation){ $('#no-gps').show(); }
else {
	navigator.geolocation.watchPosition(
		// success
		function(e) {
			$('#lat').text(e.coords.latitude);
			$('#lon').text(e.coords.longitude);
		}, 
		// error
		function() {
			$('.coord').hide();
			$('#no-gps').show();
		}, 
		// options
		{ enableHighAccuracy:true }
	);
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
