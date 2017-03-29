window.addEventListener("deviceorientation", setRose, true);
const metric = !(window.navigator.language=='en-US'||window.navigator.language=='my');
var elevator;
function gmapsCB(){
	elevator = new google.maps.ElevationService;
}


if (!navigator.geolocation){ $('#no-gps').show(); }
else {
	navigator.geolocation.watchPosition(
		// success
		function(pos) {
			setAltitude(pos.coords.latitude, pos.coords.longitude);
			var lat = pos.coords.latitude.toFixed(4);
			var lon = pos.coords.longitude.toFixed(4);
			lat = (lat.substring(0,1)=='-')? lat.substring(1)+' S' : lat+' N';
			lon = (lon.substring(0,1)=='-')? lon.substring(1)+' E' : lon+' W';
			$('#lat').text(lat);
			$('#lon').text(lon);
		}, 
		// error
		function() {
			$('.coord').hide();
			$('#rotated').hide();
			$('#no-gps').show();
		}, 
		// options
		{ enableHighAccuracy:true }
	);
}

function setAltitude(lat,lon) {
	if (typeof elevator != 'undefined') {
		elevator.getElevationForLocations({
			'locations': [ new google.maps.LatLng(lat,lon) ]
		}, function(res) {
			console.log(res);
			if (res[0].elevation){
				$('#no-alt').hide();
				var alt = res[0].elevation;
				// Convert
				if (metric) {
					alt = alt.toFixed(1)+' m';
				} else {
					alt = (alt*0.3048).toFixed(1)+' ft';
				}
				// Set element text
				$('#alt').text(alt);
			} else {
				// Show error
				if (res.status && res.status!='OK') {
					$('#no-alt').text('No altitude data available: '+res.status+'. ');
				}
				$('#no-alt').show();
			}
		});
	}
}

function setRose(e) {
	if(!e.absolute) { // No orientation data
		$('#rotated').hide();
		$('#no-dir').show();
	} else {
		var rot = 'rotate('+e.alpha.toString().substring(0,5)+'deg)';
		$('#rose').css({
			'-ms-transform': rot,
			'-webkit-transform': rot,
			'transform': rot
		});
	}
}
