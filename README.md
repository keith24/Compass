# Compass
###### by [Keith Irwin](https://keithirwin.us/)

Compass is a web app written in plain HTML/CSS/JS.  It uses [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent) and [geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) to show a smartphone's GPS coordinates and polar orientation.  

## Instructions

Open [compass.keithirwin.us](https://compass.keithirwin.us/) on a smartphone with a compass.  Hold the phone level and it should show your direction.  

### Is this accurate? 

No, not really.  Results may vary.  As of this writing, Firefox and Chrome browsers handle the DeviceOrientation spec differently.  It's only been tested on Chrome for Android.  

## Known issues

* When the screen is rotated, the image gets rotated 90 degrees.  I don't know how this could be fixed. 

## Image sources

The images used in this app were labeled for reuse with modification:

* The main compass image is from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Compass_rose_nesw.svg)
* The icons are adapted from an image found on [goodfreephotos.com](https://www.goodfreephotos.com/vector-images/compass-rose-vector-clipart.png.php)
