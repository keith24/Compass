'use strict';
/* global navigator $ GyroNorm */

// Set units based on browser locale
const metric = !(window.navigator.language=='en-US'||window.navigator.language=='my');

// Track GPS location
if (!navigator.geolocation){ $('#no-gps').show(); }
else { navigator.geolocation.watchPosition(
		
		// Got location
		function(pos) {
			let lat = pos.coords.latitude.toFixed(4);
			let lon = pos.coords.longitude.toFixed(4);
			$('#lat').text((lat.substring(0,1)=='-')? lat.substring(1)+' S' : lat+' N');
			$('#lon').text((lon.substring(0,1)=='-')? lon.substring(1)+' E' : lon+' W');
			
			// Get altitude
			if (pos.coords.altitude){
				var alt = (metric)? pos.coords.altitude.toFixed(1)+' m':(pos.coords.altitude*0.3048).toFixed(1)+' ft';
				$('#alt').show().text(alt);
			}
			else {
				$('#alt').hide();
			}
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

// Set compass orientation
var gn = new GyroNorm()

gn.init().then(function(){
  gn.start(function(data){
	
		// No orientation data
		if (!data.do.absolute) {
			$('#rotated').hide();
			$('#no-dir').show();
		}
			
		// Set orientation
		else {
			const rot = 'rotate('+data.do.alpha.toString().substring(0,5)+'deg)';
			$('#rose').css({
				'-ms-transform': rot,
				'-webkit-transform': rot,
				'transform': rot
			})
		}
	
	})
	
})	
	
window.addEventListener("deviceorientation", setRose, true);