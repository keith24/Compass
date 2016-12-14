window.addEventListener("deviceorientation", setRose, true);

if (!navigator.geolocation){ $('#no-gps').show(); }
else {
	navigator.geolocation.watchPosition(
		// success
		function(pos) {
			var lat = pos.coords.latitude.toFixed(5);
			var lon = pos.coords.longitude.toFixed(5);
			lat = (lat.substring(0,1)=='-')? lat.substring(1)+' S' : lat+' N';
			lon = (lon.substring(0,1)=='-')? lon.substring(1)+' E' : lon+' W';
			$('#lat').text(lat);
			$('#lon').text(lon);
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
