'use strict';
/* global navigator google $ */

// Set units based on browser locale
const metric = !(window.navigator.language=='en-US'||window.navigator.language=='my');

// Track GPS location
if (!navigator.geolocation){ $('#no-gps').show(); }
else { navigator.geolocation.watchPosition(
		
		// Got location
		function(pos) {
			setAltitude(pos.coords.latitude, pos.coords.longitude);
			var lat = pos.coords.latitude.toFixed(4);
			var lon = pos.coords.longitude.toFixed(4);
			lat = (lat.substring(0,1)=='-')? lat.substring(1)+' S' : lat+' N';
			lon = (lon.substring(0,1)=='-')? lon.substring(1)+' E' : lon+' W';
			$('#lat').text(lat);
			$('#lon').text(lon);
		},
		
		// Got error
		function() {
			$('.coord').hide();
			$('#rotated').hide();
			$('#no-gps').show();
		}, 
		
		// Options
		{ enableHighAccuracy:true }
		
	);
}

// Set altitude
function setAltitude(lat,lon) {
	
	// Create elevator
	if (typeof elevator == 'undefined') {
		var elevator = new google.maps.ElevationService;
	}
		
	// Query API
	else {
		elevator.getElevationForLocations({
			'locations': [ new google.maps.LatLng(lat,lon) ]
		}, function(res) {
			
			// Show error
			if (!res[0].elevation) {
				if (res.status && res.status!='OK') {
					$('#no-alt').text('No altitude data available: '+res.status+'. ');
				}
				$('#no-alt').show();
			}
				
			// Successfully got altitude
			else {
				$('#no-alt').hide();
				var alt = res[0].elevation;
				
				// Convert
				if (metric) { alt=alt.toFixed(1)+' m'; }
				else { alt=(alt*0.3048).toFixed(1)+' ft'; }
				
				// Set element text
				$('#alt').text(alt);
				
			}
			
		});
	}
}

// Set compass orientation
function setRose(e) {
	
	// No orientation data
	if(!e.absolute) {
		$('#rotated').hide();
		$('#no-dir').show();
	}
		
	// Set orientation
	else {
		var rot = 'rotate('+e.alpha.toString().substring(0,5)+'deg)';
		$('#rose').css({
			'-ms-transform': rot,
			'-webkit-transform': rot,
			'transform': rot
		});
	}
	
}
window.addEventListener("deviceorientation", setRose, true);