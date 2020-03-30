'use strict'
/* global navigator $ */


// Set units based on browser locale
const metric = !(window.navigator.language=='en-US'||window.navigator.language=='my')

// Check for GPS capability
if (!navigator.geolocation) $('#no-gps').show()

// Start tracking
else navigator.geolocation.watchPosition(
		
	// Got location callbackw
	function(pos) {
		let lat = pos.coords.latitude.toFixed(4)
		let lon = pos.coords.longitude.toFixed(4)
		$('#lat').text(
			(lat.substring(0,1)=='-')? // Negative values are South
				lat.substring(1)+' S' : lat+' N'
		)
		$('#lon').text(
			(lon.substring(0,1)=='-')? // Negative values are East
				lon.substring(1)+' W' : lon+' E'
		)
		
		// Get altitude 
		if (pos.coords.altitude) {
			$('#alt').show().text(
				(metric)? // Convert to feet if needed
					pos.coords.altitude.toFixed(1)+' m':
					(pos.coords.altitude*3.28084).toFixed(1)+' ft'
			)
	}
		else $('#alt').hide()
	},
	
	// Got error
	function() {
		$('.coord').hide()
		$('#no-gps').show()
	}, 
	
	// Options
	{ enableHighAccuracy:true }
	
)
