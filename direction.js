'use strict'
/* global $ GyroNorm */

alert('direction loaded')


// Set compass orientation
var gn = new GyroNorm()

gn.init().then(function(){
  gn.start(function(data){
	
	  console.log(data.do.alpha)
		// No orientation data
		// if (!data.do.absolute) {
		// 	$('#rotated').hide()
		// 	$('#no-dir').show()
		// }
			
		// Set orientation
		// else {
			const rot = 'rotate('+data.do.alpha.toString().substring(0,5)+'deg)'
			$('#rose').css({
				'-ms-transform': rot,
				'-webkit-transform': rot,
				'transform': rot
			})
		// }
	
	})
	
})	
	
//window.addEventListener("deviceorientation", setRose, true)
