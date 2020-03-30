'use strict'
/* global $ window */


window.addEventListener('deviceorientation', function(e){
	
	// No orientation data
	if(!e||!e.alpha) $('#no-dir').show()
	
	// Set orientation
	else {
		$('#no-dir').hide()
		const rot = 'rotate('+e.alpha.toString().substring(0,5)+'deg)'
		$('#rose').css({
			'-ms-transform': rot,
			'-webkit-transform': rot,
			'transform': rot
		})
	}
	
}, true)
